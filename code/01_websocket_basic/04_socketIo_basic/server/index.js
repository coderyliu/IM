const koa = require("koa");
const { Server } = require("socket.io");

const app = new koa();
const server = require("http").createServer(app.callback());
const io = new Server(server, {
  // !socket.io 3.x版本以上规定必须解决跨域
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

const group = {};

io.on("connection", (socket) => {
  console.log("一个客户端连接了");
  // *监听连接的listener的参数是一个socket实例

  socket.on("welcome", (msg) => {
    console.log(msg);
    const data = JSON.parse(msg);
    socket.roomId = data.roomId;
    socket.name = data.name;

    // 统计当前房间在线人数
    if (!group[socket.roomId]) {
      group[socket.roomId] = 1;
    } else {
      group[socket.roomId]++;
    }

    socket.join(socket.roomId);

    io.to(socket.roomId).emit(
      "message",
      JSON.stringify({
        event: "enter",
        name: socket.name,
        num: group[socket.roomId],
      })
    );

    socket.on("msg", (msg) => {
      const v = JSON.parse(msg);

      io.to(socket.roomId).emit(
        "message",
        JSON.stringify({
          event: "message",
          name: v.name,
          message: v.message,
          num: group[socket.roomId],
        })
      );
    });
  });
  // *io.emit()能让所有客户端接收到消息
  // io.emit("message", socket.id);
  // *socket.emit()是触发当前连接的客户端的事件
  // socket.emit("message", socket.id);

  socket.on("disconnect", () => {
    io.to(socket.roomId).emit(
      "message",
      JSON.stringify({
        event: "out",
        name: socket.name,
        num: --group[socket.roomId],
      })
    );
  });
});

server.listen(4350, () => {
  console.log("server is running at 4350 port");
});
