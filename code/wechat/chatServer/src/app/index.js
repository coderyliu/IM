const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const errorHandle = require("./errorHandle");

const app = new Koa();

// 跨域
app.use(cors());
// 处理body请求体
app.use(bodyParser());

app.on("error", errorHandle);

module.exports = app;
