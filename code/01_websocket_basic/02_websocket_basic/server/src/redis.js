// redis缓存
const Redis = require("ioredis");

const client = new Redis();

// 设置值 set() 
const setValue = (key, value, time) => {
  if (value === "undefined" || value == null || value === "") return;

  if (typeof value === "string") {
    if (typeof time !== "undefined") {
      client.set(key, value, "EX", time);
    } else {
      client.set(key, value);
    }
  } else if (typeof value === "object") {
    client.set(key,JSON.stringify(value))
  }
};

// 获取值
const getValue = (key) => {
  return client.get(key);
};


module.exports = {
  client,
  setValue,
  getValue
};
