"use strict";

const Controller = require("egg").Controller;
const fs = require("mz/fs");

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserCreateValidate = {
      userName: { type: "string", required: true, allowEmpty: false },
      password: { type: "string", require: true, allowEmpty: false },
    };
  }
  //创建用户
  async create() {
    const { ctx, service } = this;
    ctx.validate(this.UserCreateValidate);
    const payload = ctx.request.body || {};
    await service.user.create(payload);
    ctx.helper.success({ ctx, msg: "注册成功" });
  }

  //删除用户
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.destroy(id);
    ctx.helper.success({ ctx, msg: "删除用户成功" });
  }

  //查询用户列表(分页，模糊)
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.user.index(payload);
    ctx.helper.success({ ctx, res });
  }

  //用户登录
  async login() {
    const { ctx, service } = this;
    ctx.validate(this.UserCreateValidate);
    const payload = ctx.request.body || {};
    const res = await service.user.login(payload);
    ctx.helper.success({ ctx, res, msg: "登录成功" });
  }

  //查询某一个用户
  async getUser() {
    const { ctx, service } = this;
    const id = ctx.userId;
    const res = await service.user.getUser(id);
    ctx.helper.success({ ctx, res });
  }

  //上传用户头像
  async updateUser() {
    const { ctx, service } = this;
    const id = ctx.userId;
    const payload = ctx.request.body || {};
    await service.user.updateUser(id, payload);
    ctx.helper.success({ ctx, msg: "更新用户信息成功" });
  }

  //前端查询用户详情
  async getUserInfo() {
    const { ctx, service } = this;
    const res = await service.user.getUserInfo();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
