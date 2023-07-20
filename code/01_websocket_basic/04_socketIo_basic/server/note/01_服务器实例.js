// ?服务器实例
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer();
const io = new Server(server);

// *实例方法：
// todo 1.socketsJoin(string|string[])  匹配的 Socket 实例加入房间
io.socketsJoin()
// todo 2.socketsLeave(string|string[])  匹配的 Socket 实例离开房间
io.socketsLeave()
// todo 3.disconnectSockets(boolean|undefined)  匹配的 Socket 实例断开连接
io.disconnectSockets()
// todo 4.fetchSockets()  返回一个promise包含匹配的socket实例数组
io.fetchSockets()
// todo 5.serverSideEmit()  允许向集群其他的socket服务器发出事件
io.serverSideEmit()
// todo 6.close(fn)  关闭socket服务器，并于客户端断开连接
io.close()
// todo 7.of(string | Regexp |Function) 匹配命名空间 命名空间默认是'/' 返回一个命名空间
io.of()
// todo 8.

// *事件event a.connection b.new_namespace
// todo 1.connection 确立连接之后，返回的第一个参数socket实例
io.on('connection',(socket)=>{

})

// todo 2.new_namespace 创建命名空间之后，返回一个命名空间实例
io.on('new_namespace',(namespace)=>{

})

console.log(io)

server.listen(5001, () => {
  console.log("server is running at 5001 port");
});
