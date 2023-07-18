const Websocket = require("ws");

const ws = new Websocket("ws://localhost:4399");

// 确立连接
// todo open事件连接建立触发
ws.on("open", () => {
  console.log(ws)
  
  // *Websocket方法 send()发送数据 
  ws.send("你好啊，李银河");

  // *websocket方法 close连接关闭
});

// 收到消息
// todo message事件 客户端收到服务端消息触发
ws.on("message", (message) => {
  // ?服务端收到的消息是buffer类型，可以转换为字符串
  console.log(Buffer.from(message).toString());
});

// todo error事件 通信错误触发
// 连接错误
ws.on("error", (err) => {
  console.log(err);
});

// todo close事件 连接关闭触发
ws.on('close',()=>{
  console.log('connect close')
})

// *ws.readyState属性用来判断当前状态
// 0 连接还没开启
// 1 连接已开启 准备进行通信
// 3 连接正在关闭
// 4 连接伊关闭 或者无法连接