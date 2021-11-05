"use strict";
//文章标签
module.exports = (app) => {
  const mongoose = app.mongoose;
  const TagSchema = new mongoose.Schema(
    {
      name: { type: String, trim: true, required: true },
      userId: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
  );
  return mongoose.model("Tag", TagSchema);
};
