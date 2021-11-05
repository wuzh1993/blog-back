"use strict";

const Service = require("egg").Service;
class UserService extends Service {
  //创建
  async create(payload) {
    const { ctx } = this;
    const { userName } = payload;
    const user = await ctx.model.User.findOne({ userName });
    if (user) {
      ctx.throw(400, "用户已存在，请直接登录");
    }
    payload.password = await ctx.genHash(payload.password);
    return ctx.model.User.create(payload);
  }

  //删除
  async destroy(_id) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(_id);
    if (!user) {
      ctx.throw(400, "用户不存在");
    }
    return ctx.model.User.findByIdAndRemove(_id);
  }

  //查询所有用户-分页
  async index(payload) {
    const { ctx } = this;
    let { page, pageSize } = payload;
    page = page || 1;
    pageSize = pageSize || 10;
    let count = 0;
    let skip = (Number(page) - 1) * Number(pageSize);
    const res = await ctx.model.User.find({}, { password: false })
      .skip(skip)
      .limit(Number(pageSize))
      .sort({ createdAt: -1 })
      .exec();
    count = await ctx.model.User.find({}).countDocuments().exec();
    return {
      totalCount: count,
      list: res,
    };
  }

  //用户登录
  async login(payload) {
    const { ctx, service } = this;
    const userCount = await ctx.model.User.find().countDocuments();
    const { userName, password } = payload;
    let user;
    if (userCount === 0) {
      //没有用户就初始化一个用户
      user = await this.create(payload);
    } else {
      user = await ctx.model.User.findOne({ userName });
      if (!user) {
        ctx.throw(400, "用户不存在");
      }
      const verifyPsw = await ctx.compare(password, user.password);
      if (!verifyPsw) {
        ctx.throw(400, "密码错误");
      }
    }
    console.log(ctx.helper.generateToken)
    const token = await ctx.helper.generateToken({ ctx, id: user._id });
    return {
      token,
    };
  }

  //获取某个用户信息
  async getUser(id) {
    const { ctx } = this;
    const userInfo = await ctx.model.User.findById(id, {
      password: false,
      createdAt: false,
      userName: false,
    });
    return userInfo;
  }

  //更新用户信息
  async updateUser(id, payload) {
    const { ctx } = this;
    const res = await ctx.model.User.findById(id);
    if (!res) {
      ctx.throw(400, "用户不存在");
    }
    console.log(payload);
    payload.footData = JSON.parse(payload.footData);
    payload.projectData = JSON.parse(payload.projectData);
    return ctx.model.User.findByIdAndUpdate(id, payload);
  }

  //前端查询用户详情 默认查第一个
  async getUserInfo() {
    const { ctx } = this;
    const userInfo = await ctx.model.User.find(
      {},
      { password: false, createdAt: false, userName: false }
    );
    if (userInfo.length === 0) {
      ctx.throw(400, "用户未初始化");
    }
    const info = userInfo[0];
    const tag = await ctx.model.Tag.find(
      { userId: info._id },
      { userId: false, createdAt: false }
    );
    let category = await ctx.model.Category.find(
      { userId: info._id },
      { userId: false, createdAt: false }
    );
    const solveCategoryFunc = () => {
      return new Promise((resolve) => {
        Promise.all(
          category.map(async (item) => {
            const count = await ctx.model.Category_Article.find({
              categoryId: item._id,
            }).countDocuments();
            return {
              _id: item._id,
              name: item.name,
              articleNum: count,
            };
          })
        ).then((res) => {
          resolve(res);
        });
      });
    };

    const cateGoryList = await solveCategoryFunc();

    return {
      nickName: info.nickName,
      avatar: info.avatar,
      footData: info.footData,
      projectData: info.projectData,
      _id: info._id,
      tag: tag,
      category: cateGoryList,
    };
  }
}

module.exports = UserService;
