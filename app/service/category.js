"use strict";

const Service = require("egg").Service;

class CategoryService extends Service {
  async create(payload) {
    const { ctx } = this;
    const { name } = payload;
    const category = await ctx.model.Category.findOne({
      name,
      userId: ctx.userId,
    });
    if (category) {
      ctx.throw(400, "category已存在");
    }
    return ctx.model.Category.create({ name, userId: ctx.userId });
  }

  async destroy(_id) {
    const { ctx } = this;
    const category = await ctx.model.Category.findOne({
      _id,
      userId: ctx.userId,
    });
    if (!category) ctx.throw(400, "category不存在");
    const category_article = await ctx.model.Category_Article.findOne({
      categoryId: _id,
    });
    if (category_article) ctx.throw(400, "分类被文章使用，无法删除！");
    return ctx.model.Category.findByIdAndRemove(_id);
  }

  async index() {
    const { ctx } = this;
    let count = 0;
    const res = await ctx.model.Category.find({ userId: ctx.userId }).sort({
      createdAt: -1,
    });
    count = await ctx.model.Category.find({
      userId: ctx.userId,
    }).countDocuments();
    return {
      totalCount: count,
      list: res,
    };
  }

  //更新某一个分类
  async update(id, payload) {
    const { ctx } = this;
    const { name } = payload;
    const res = await ctx.model.Category.findById(id);
    if (!res) ctx.throw(400, "分类不存在！");
    const params = {
      name,
    };
    return ctx.model.Category.findByIdAndUpdate(id, params);
  }
}

module.exports = CategoryService;
