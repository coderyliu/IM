// 服务端响应客户端应用程序的服务器
const Websocket=require('ws')

const wss=new Websocket.Server({port:8088})

// todo 1.简单服务器
wss.on('connection',ws=>{
  ws.on('message',message=>{
    console.log(`Received message= > ${message}`)
  })
  ws.send('Hello! Message From Server!')
})

// todo 2.外部http/s服务器
