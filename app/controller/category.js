"use strict";

const Controller = require("egg").Controller;
class CategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.categoryCreateValidate = {
      name: { type: "string", required: true, allowEmpty: false },
    };
  }

  //创建category
  async create() {
    const { ctx, service } = this;
    ctx.validate(this.categoryCreateValidate);
    const payload = ctx.request.body || {};
    await service.category.create(payload);
    ctx.helper.success({ ctx, msg: "新增category成功" });
  }

  //删除category
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.category.destroy(id);
    ctx.helper.success({ ctx, msg: "删除category成功" });
  }

  //查询category列表(分页，模糊)
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.category.index(payload);
    ctx.helper.success({ ctx, res });
  }

  //更新某一个分类
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.category.update(id, payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = CategoryController;
