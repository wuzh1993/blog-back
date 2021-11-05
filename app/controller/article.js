"use strict";

const Controller = require("egg").Controller;

class ArticleController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.ArticleCreateValidate = {
      title: { type: "string", required: true, allowEmpty: false },
    };
  }
  //创建
  async create() {
    const { ctx, service } = this;
    ctx.validate(this.ArticleCreateValidate);
    const payload = ctx.request.body || {};
    await service.article.create(payload);
    ctx.helper.success({ ctx, msg: "发布文章成功" });
  }

  //删除
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.article.destroy(id);
    ctx.helper.success({ ctx, msg: "删除文章成功" });
  }

  //查询
  async index() {
    const { ctx, service } = this;
    const id = ctx.userId;
    const payload = ctx.query;
    const res = await service.article.index(id, payload);
    ctx.helper.success({ ctx, res });
  }

  //查询某一篇文章
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.article.show(id);
    ctx.helper.success({ ctx, res });
  }

  //更新某一篇文章
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.article.update(id, payload);
    ctx.helper.success({ ctx, res });
  }

  //前端根据用户id查询文章列表
  async getArticlesByUserId() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    const res = await service.article.index(id, ctx.query);
    ctx.helper.success({ ctx, res });
  }

  //前端根据文章id查询文章
  async getArticleById() {
    const { ctx, service } = this;
    const { id } = ctx.query;
    const res = await service.article.show(id);
    ctx.helper.success({ ctx, res });
  }

  //前端根据tagid查询文章列表
  async getArticleByTagId() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.article.getArticleByTagId(payload);
    ctx.helper.success({ ctx, res });
  }

  //前端根据categoryid查询文章列表
  async getArticleByCategoryId() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.article.getArticleByCategoryId(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = ArticleController;
