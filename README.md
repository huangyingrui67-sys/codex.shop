# 青禾 QINGHE

以时令食材与慢生活为主题的中文餐厅首页。原生 HTML、CSS、JavaScript，无需安装第三方依赖。

## 本地预览

```sh
node server.js
```

浏览器访问 http://127.0.0.1:3000 。可通过 `PORT` 环境变量调整端口。

## 功能

- 响应式首页：品牌首屏、当季菜单、餐厅故事、到店信息。
- 菜单分类、完整菜单展开、菜品详情与食材说明。
- 用餐计划弹窗、表单校验、过期时段禁选和本机保存。
- 移动导航、键盘操作、对话框焦点管理和减少动态效果支持。

页面中的餐厅品牌、地址和价格均为概念示例。预约表单仅在当前浏览器保存用餐计划，未连接餐厅订位服务。

## 素材

照片来源：Unsplash。原始照片 ID 与下载地址记录在 `scripts/fetch-assets.ps1`。中文标题字体使用 Google Fonts 提供的 Noto Serif SC，遵循 SIL Open Font License。照片与字体均保存在 `assets/`，预览无需访问外部服务。

```sh
node --check app.js
node --check server.js
```
