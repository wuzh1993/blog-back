"use strict";
//tag-文章关联表
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Tag__ArticleSchema = new mongoose.Schema(
    {
      articleId: { type: String, required: true },
      tagId: { type: String, required: true },
    },
    { versionKey: false }
  );
  return mongoose.model("Tag__Article", Tag__ArticleSchema);
};
