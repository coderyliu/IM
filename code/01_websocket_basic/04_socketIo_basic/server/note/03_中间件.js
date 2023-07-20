// ?服务器实例
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer();
const io = new Server(server);

// *实例方法/属性：
io.on("connection", (socket) => {

});

io.use((socket,next)=>{})

console.log(io);

server.listen(5001, () => {
  console.log("server is running at 5001 port");
});
