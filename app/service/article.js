"use strict";

const Service = require("egg").Service;
class ArticleService extends Service {
  //创建
  async create(payload) {
    const { ctx } = this;
    const { title, content, tagIds, categoryIds, brief_content } = payload;
    const tidsArr = tagIds.split(",");
    const cidsArr = categoryIds.split(",");
    const params = {
      title,
      content,
      user: ctx.userId,
      tag: tidsArr,
      category: cidsArr,
      brief_content: brief_content,
    };
    const articleRes = await ctx.model.Article.create(params);
    tidsArr.map((item) => {
      const t_a_params = {
        articleId: articleRes._id,
        tagId: item,
      };
      ctx.model.Tag_Article.create(t_a_params);
    });
    cidsArr.map((item) => {
      const c_a_params = {
        articleId: articleRes._id,
        categoryId: item,
      };
      ctx.model.Category_Article.create(c_a_params);
    });
    return articleRes;
  }

  //删除
  async destroy(_id) {
    const { ctx } = this;
    const article = await ctx.model.Article.find({ _id, user: ctx.userId });
    if (!article) {
      ctx.throw(400, "文章不存在");
    }
    await ctx.model.Tag_Article.remove({ articleId: _id });
    await ctx.model.Category_Article.remove({ articleId: _id });
    return ctx.model.Article.findByIdAndRemove(_id);
  }

  //查询文章标题
  async index(id, payload) {
    const { ctx } = this;
    let { page, pageSize } = payload;
    page = page || 1;
    pageSize = pageSize || 10;
    let count = 0;
    let skip = (Number(page) - 1) * Number(pageSize);
    const res = await ctx.model.Article.find(
      { user: id },
      { content: false, user: false }
    )
      .skip(skip)
      .limit(Number(pageSize))
      .populate({
        path: "tag",
        select: "-createdAt",
      })
      .populate({
        path: "category",
        select: "-createdAt",
      })
      .sort({ createdAt: -1 })
      .exec();
    count = await ctx.model.Article.find({ user: id }).countDocuments().exec();
    return {
      totalCount: count,
      list: res,
    };
  }

  //查询某一篇文章
  async show(id) {
    const { ctx } = this;
    const res = await ctx.model.Article.findById(id)
      .populate({
        path: "user",
        select: "-password -_id -createdAt",
      })
      .populate({
        path: "tag",
        select: "-createdAt",
      })
      .populate({
        path: "category",
        select: "-createdAt",
      });
    if (!res) ctx.throw(400, "文章不存在！");
    return res;
  }

  //更新某一篇文章
  async update(id, payload) {
    const { ctx } = this;
    const { title, content, tagIds, categoryIds } = payload;
    const res = await ctx.model.Article.findById(id);
    if (!res) ctx.throw(400, "文章不存在！");
    const params = {
      title,
      content,
      tag: tagIds.split(","),
      category: categoryIds.split(","),
    };
    return ctx.model.Article.findByIdAndUpdate(id, params);
  }

  //根据tagid查文章列表
  async getArticleByTagId(payload) {
    const { ctx } = this;
    let { page, pageSize, id } = payload;
    page = page || 1;
    pageSize = pageSize || 10;
    let count = 0;
    let skip = (Number(page) - 1) * Number(pageSize);
    const res = await ctx.model.Article.find(
      { tag: { $elemMatch: { $eq: id } } },
      { content: false, user: false }
    )
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .exec();
    count = await ctx.model.Article.find({ tag: { $elemMatch: { $eq: id } } })
      .countDocuments()
      .exec();
    return {
      totalCount: count,
      list: res,
    };
  }

  //根据categoryid查文章列表
  async getArticleByCategoryId(payload) {
    const { ctx } = this;
    let { page, pageSize, id } = payload;
    page = page || 1;
    pageSize = pageSize || 10;
    let count = 0;
    let skip = (Number(page) - 1) * Number(pageSize);
    const res = await ctx.model.Article.find(
      { category: { $elemMatch: { $eq: id } } },
      { content: false, user: false }
    )
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .exec();
    count = await ctx.model.Article.find({
      category: { $elemMatch: { $eq: id } },
    })
      .countDocuments()
      .exec();
    return {
      totalCount: count,
      list: res,
    };
  }
}

module.exports = ArticleService;
