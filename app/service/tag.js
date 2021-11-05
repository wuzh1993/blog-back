"use strict";

const Service = require("egg").Service;

class TagService extends Service {
  async create(payload) {
    const { ctx } = this;
    const { name } = payload;
    const tag = await ctx.model.Tag.findOne({ name, userId: ctx.userId });
    if (tag) {
      ctx.throw(400, "tag已存在");
    }
    console.log(name);
    return ctx.model.Tag.create({ name, userId: ctx.userId });
  }

  async destroy(_id) {
    const { ctx } = this;
    const tag = await ctx.model.Tag.findOne({ _id, userId: ctx.userId });
    if (!tag) ctx.throw(400, "tag不存在");
    const tag_article = await ctx.model.Tag_Article.findOne({
      tagId: _id,
    });
    if (tag_article) ctx.throw(400, "tag被文章使用，无法删除！");
    return ctx.model.Tag.findByIdAndRemove(_id);
  }

  async index() {
    const { ctx } = this;
    let count = 0;
    const res = await ctx.model.Tag.find({ userId: ctx.userId }).sort({
      createdAt: -1,
    });
    count = await ctx.model.Tag.find({ userId: ctx.userId }).countDocuments();
    return {
      totalCount: count,
      list: res,
    };
  }

  async getArticlesFromTag(id) {
    const { ctx } = this;
    const articleIds = await ctx.model.Tag_Article.find(
      { tagId: id },
      { _id: false, tagId: false }
    );
    const solveIds = articleIds.map((item) => item.articleId);
    const articles = await ctx.model.Article.find()
      .where("_id")
      .in(solveIds)
      .select("_id title");
    return articles;
  }

  //更新某一个tag
  async update(id, payload) {
    const { ctx } = this;
    const { name } = payload;
    const res = await ctx.model.Tag.findById(id);
    if (!res) ctx.throw(400, "标签不存在！");
    const params = {
      name,
    };
    return ctx.model.Tag.findByIdAndUpdate(id, params);
  }
}

module.exports = TagService;
