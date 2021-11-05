"use strict";

module.exports = (option, app) => {
  return async function (ctx, next) {
    try {
      const { authtoken } = ctx.request.headers;
      if (!authtoken) {
        throw "认证失败";
      }
      const decodeToken = ctx.app.jwt.verify(
        authtoken,
        ctx.app.config.jwt.secret
      );
      if (decodeToken.exp < Math.floor(Date.now() / 1000)) {
        throw "认证无效";
      }
      ctx.userId = decodeToken.data._id;
    } catch (error) {
      ctx.throw(401, "认证无效");
    }
    await next();
  };
};
