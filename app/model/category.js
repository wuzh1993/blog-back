"use strict";
//文章标签
module.exports = (app) => {
  const mongoose = app.mongoose;
  const CategorySchema = new mongoose.Schema(
    {
      name: { type: String, trim: true, required: true, unique: true },
      userId: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
  );
  return mongoose.model("Category", CategorySchema);
};
