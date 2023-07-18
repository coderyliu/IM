const Websocket = require("ws");

const { setValue, getValue } = require("./redis");

const wss = new Websocket.Server({
  port: 4399,
});

// 多聊天室功能呢
// roomId 对应相同的roomId广播消息
let group = {};

const prefix = "qq-";
// 监听连接
wss.on("connection", (ws) => {
  // *每一个客户端连接服务端，都会生成一个新的websocket连接对象表示客户端
  // 初始的心跳连接状态
  ws.isAlive = true;
  console.log("one client is connected");

  // 消息捕获
  ws.on("message", async (message) => {
    const msgObj = JSON.parse(message);
    const roomId = prefix + (msgObj.roomId ? msgObj.roomId : ws.roomId);

    // !event事件机制 enter-刚进入聊天室 heartbeat-心跳机制  message-消息机制
    if (msgObj.event === "enter") {
      // ?当用户进入之后，需要判断用户的房间是否存在
      // ?如果用户的房间不存在，则在redis中创建房间号，保存用户信息
      // ?用户统计房间人数，用户后面进行消息发送
      ws.name = msgObj.message;
      ws.roomId = msgObj.roomId;
      ws.uid = msgObj.uid;

      // todo 判断redis中是否有对应的roomId键值
      const result = await getValue(roomId);
      if (!result) {
        // 初始化一个房间,保存用户的uid，拿到用户信息
        setValue(roomId, ws.uid);
      } else {
        // 已经存在房间缓存数据
        const arrStr = await getValue(roomId);
        let arr = arrStr.split(",");
        if (arr.indexOf(ws.uid) === -1) {
          setValue(roomId, arrStr + "," + ws.uid);
        }
      }

      // 统计房间人数
      if (!group[ws.roomId]) {
        group[ws.roomId] = 1;
      } else {
        group[ws.roomId]++;
      }
    }

    // !心跳检测
    if (msgObj.event === "heartbeat" && msgObj.message === "pong") {
      ws.isAlive = true;
      return;
    }

    // !广播消息
    wss.clients.forEach(async (client) => {
      // 判断非自己的客户端
      if (client.readyState === Websocket.OPEN && client.roomId === ws.roomId) {
        msgObj.name = ws.name;
        msgObj.num = group[ws.roomId];
        client.send(JSON.stringify(msgObj));
      }
    });
  });

  // 断开连接
  ws.on('close',()=>{
    if(ws.name){
      group[ws.roomId]--
    }

    const msgObj={}
    // 广播消息
    wss.clients.forEach(client=>{
      // *事件机制 out-断开连接
      if(client.readyState===Websocket.OPEN && ws.roomId ===client.roomId){
        msgObj.name=ws.name
        msgObj.num=group[ws.roomId]
        msgObj.event='out'
        client.send(JSON.stringify(msgObj))
      }
    })
  })
});
