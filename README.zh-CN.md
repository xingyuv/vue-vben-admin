<div align="center"> <a href="https://github.com/xingyu4j/vue-vben-admin"> <img alt="VbenAdmin Logo" width="200" height="200" src="https://anncwb.github.io/anncwb/images/logo.png"> </a> <br> <br>

<h1>v2.0.0</h1>

## 预览地址

[预览地址](http://vben.x-surge.com)

## 实际开发项目

[ruoyi-vue-vben](https://gitee.com/xingyuv/yudao-ui-admin-vben)

</div>

## 简介

- Vue Vben Admin 是一个免费开源的中后台模版。
- 本项目基于 vben2.10 版本，升级最新版`vue`、`vite`、`antdv4`等依赖，重构部分组件，重构代码样式，重构 setup 语法糖。
- 使用了最新的`Vue3`,`Vite4`,`Antdv4`,`TypeScript5`,`Pinia`等主流技术开发，开箱即用的中后台前端解决方案。

## 框架

| 框架 | 说明 | 版本 |
| --- | --- | --- |
| [Vue](https://staging-cn.vuejs.org/) | Vue 框架 | 3.3.4 |
| [Vite](https://cn.vitejs.dev//) | 开发与构建工具 | 4.4.4 |
| [ant-design-vue](https://antdv.com/) | ant-design-vue | 4.0.0 |
| [TypeScript](https://www.typescriptlang.org/docs/) | JavaScript 的超集 | 5.1.6 |
| [pinia](https://pinia.vuejs.org/) | Vue 存储库 替代 vuex5 | 2.1.4 |
| [vueuse](https://vueuse.org/) | 常用工具集 | 10.2.1 |
| [vue-i18n](https://kazupon.github.io/vue-i18n/zh/introduction.html/) | 国际化 | 9.2.2 |
| [vue-router](https://router.vuejs.org/) | Vue 路由 | 4.2.4 |
| [unocss](https://uno.antfu.me/) | 原子 css | 0.53.5 |
| [iconify](https://icon-sets.iconify.design/) | 在线图标库 | 3.1.1 |

## 特性

- **最新技术栈**：使用 Vue3/vite4/antdv4 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题
- **国际化**：内置完善的国际化方案
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

<p align="center">
    <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview1.png">
    <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview2.png">
    <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview3.png">
</p>

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite4](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/xingyu4j/vue-vben-admin.git
or
git clone https://gitee.com/xingyu4j/vue-vben-admin.git
```

- 安装依赖

```bash
cd vue-vben-admin

pnpm i

```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

- docker

### dockerFile 位于项目根目录下 并且支持差异化部署

#### 构建镜像

```bash
docker build -t vue-vben-admin .
```

#### 动态使用环境变量实现容器差异化部署,通过不同的 VG_BASE_URL 环境变量，指向不同的后端服务地址，下面例子使用 <http://localhost:3333> 作为后端服务地址，并且将容器映射到 6666 端口

```bash
docker run --name vue-vben-admin -d -p 6666:80  -e VG_BASE_URL=http://localhost:3333 vue-vben-admin
```

而后可以打开 <http://localhost:6666> 访问

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
