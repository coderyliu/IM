const dotenv = require("dotenv");

// 注入环境变量
dotenv.config();

const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER_NAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env;

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER_NAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
};
