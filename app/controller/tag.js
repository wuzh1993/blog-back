"use strict";

const Controller = require("egg").Controller;
class TagController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.tagCreateValidate = {
      name: { type: "string", required: true, allowEmpty: false },
    };
  }

  //创建tag
  async create() {
    const { ctx, service } = this;
    ctx.validate(this.tagCreateValidate);
    const payload = ctx.request.body || {};
    await service.tag.create(payload);
    ctx.helper.success({ ctx, msg: "新增tag成功" });
  }

  //删除tag
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.tag.destroy(id);
    ctx.helper.success({ ctx, msg: "删除tag成功" });
  }

  //查询tag列表(分页，模糊)
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.tag.index(payload);
    ctx.helper.success({ ctx, res });
  }

  //展示某一个tag
  async getArticlesFromTag() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.tag.getArticlesFromTag(id);
    ctx.helper.success({ ctx, res });
  }

  //更新某一个tag
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.tag.update(id, payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = TagController;
