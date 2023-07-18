// client 客户端应用程序

const WebSocket=require('ws')

const url='ws://localhost:8088'
const connection=new WebSocket(url)

connection.onopen=()=>{
  // todo 1.发送和接收文本数据
  // connection.send('Message From Client')

  // todo 2.发送二进制数据
  // 1byte = 8bit 1kb= 1024byte 1MB=1024KB GB TB PB...
  const arr=new Float32Array(5)

  for(let i=0;i<arr.length;i++){
    arr[i]= i / 2
  }

  connection.send(arr)
}

connection.onerror=(error)=>{
  console.log(`WEBSOCKET error:${error}`)
}

connection.onmessage=(e)=>{
  console.log(e.data)
}