"use strict";
//tag-文章关联表
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Category__ArticleSchema = new mongoose.Schema(
    {
      articleId: { type: String, required: true },
      categoryId: { type: String, required: true },
    },
    { versionKey: false }
  );
  return mongoose.model("Category__article", Category__ArticleSchema);
};
