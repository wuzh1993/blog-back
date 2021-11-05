"use strict";
//用户操作 注册登入登出等
module.exports = (app) => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema(
    {
      userName: { type: String, trim: true, required: true, unique: true },
      password: { type: String, required: true },
      nickName: { type: String, trim: true, default: "coder" },
      footData: { type: Array },
      projectData: { type: Array },
      avatar: {
        type: String,
        trim: true,
        default: "http://www.wzhcode.com:3001/images/file-1633692475703.png",
      },
      createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
  );
  return mongoose.model("User", UserSchema);
};
