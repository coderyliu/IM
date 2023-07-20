// ?服务器实例
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer();
const io = new Server(server);

// *实例方法/属性：
io.on("connection", (socket) => {
  // !Socket继承了EventEmitter的所有方法,例如：emit,on,once ,off
  // todo 1.每次与服务器建立连接，客户端都会生成独一无二的id
  // todo Socket 会加入由其自己的 id 标识的房间，这意味着您可以将其用于私人消息传递
  // socket.id

  // todo 2.rooms 对Socket当前房间的引用
  // socket.rooms

  // todo 3.handshake 含有一些握手的详细信息
  // socket.handshake

  // todo 4.事件机制
  socket.on();
  socket.emit();
  socket.once();
  socket.removeListener();
  socket.removeAllListeners();
  socket.onAny();
  socket.offAny();
  socket.on("disconnect", () => {});
  socket.on("disconnecting", () => {});

  // todo 方法
  socket.join();
  socket.leave();
  socket.to();
  socket.in();
  socket.except();
  socket.compress();
  socket.timeout();
  socket.disconnect();
  socket.broadcast.emit(); // everyone gets it but the sender
  socket.volatile.emit(); // the client may or may not receive it
});

console.log(io);

server.listen(5001, () => {
  console.log("server is running at 5001 port");
});
