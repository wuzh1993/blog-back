/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1630377954079_6249";

  // add your middleware config here
  config.middleware = ["errorHandler", "tokenCheck"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      // ignore: (ctx) => ctx.ip === "121.41.49.9",
    },
  };

  config.mongoose = {
    url: "mongodb://@127.0.0.1:27017/blog",
    options: {},
  };

  config.jwt = {
    secret: "123456",
  };

  config.tokenCheck = {
    match(ctx) {
      const url = ctx.request.url;
      if (url === "/manage/user/login" || url.indexOf("front") > -1) {
        return false;
      }
      return true;
    },
  };

  config.cors = {
    origin: "*",
  };

  config.multipart = {
    mode: "file",
  };

  return {
    ...config,
    ...userConfig,
  };
};
