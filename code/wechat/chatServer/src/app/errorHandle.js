const errorTypes = require("../constants/errorTypes");

module.exports = (ctx, error) => {
  let message = "";
  let status = 400;

  switch (error) {
    case errorTypes.PASSWORD_ERROR:
      status = 401;
      message = errorTypes.PASSWORD_ERROR;
      break;
    default:
      status = 400;
      break;
  }

  ctx.status = status;
  ctx.body = {
    code: -1,
    data: null,
    message,
  };
};
