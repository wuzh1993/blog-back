module.exports = {
  success: ({ ctx, res = null, msg = "请求成功" }) => {
    ctx.body = {
      code: 0,
      data: res,
      msg,
    };
    ctx.status = 200;
  },
  generateToken: ({ ctx, id }) => {
    const res = ctx.app.jwt.sign(
      {
        data: {
          _id: id,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      ctx.app.config.jwt.secret
    );
    return res;
  },
};
