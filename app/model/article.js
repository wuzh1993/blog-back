"use strict";
//文章列表
module.exports = (app) => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const ArticleSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      tag: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tag",
        },
      ],
      category: [
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: { type: String },
      brief_content: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
  );
  return mongoose.model("Articles", ArticleSchema);
};
