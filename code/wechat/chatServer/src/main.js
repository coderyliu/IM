const app=require('./app/index')

// 注入环境变量
const config=require('./app/config')

// 数据库
require('./app/database')

// 0.0.0.0这里Node文档中也说明，要想拿到ipv4地址必须这样写，否则拿到的是ipv6地址
app.listen(config.APP_PORT,'0.0.0.0',()=>{
  console.log(`server is running at ${config.APP_PORT}!`)
})