"use strict";

/**
 * @param {Egg.Application} app - egg application
 */

//  router.resources

module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);
  router.get("/front/getUserInfo", controller.user.getUserInfo); //前端获取用户信息
  router.get(
    "/front/getArticlesByUserId",
    controller.article.getArticlesByUserId
  ); //前端获取用户文章列表
  router.get("/front/getArticleById", controller.article.getArticleById); //前端通过文章id获取文章详情
  router.get("/front/getArticleByTagId", controller.article.getArticleByTagId); //前端通过tagid获取文章详情
  router.get("/front/getArticleByCategoryId", controller.article.getArticleByCategoryId); //前端通过categoryid获取文章详情

  router.get("/api/tag/:id/article", controller.tag.getArticlesFromTag); //查询某一个tag下的所有文章

  router.post("/manage/user/login", controller.user.login); //用户登录
  router.get("/manage/user/getUser", controller.user.getUser); //获取用户信息
  router.post("/manage/user/updateUser", controller.user.updateUser);
  // router.resources("user", "/api/user", controller.user); //用户
  router.resources("tag", "/manage/tag", controller.tag); //标签
  router.resources("category", "/manage/category", controller.category); //分类
  router.resources("article", "/manage/article", controller.article); //文章
};
