const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER_NAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});

connection.getConnection((err, conn) => {
  if (err) {
    console.log("数据库连接失败");
  } else {
    console.log("数据库连接成功");
  }
});

// 数据库promise化
module.exports = connection.promise();
