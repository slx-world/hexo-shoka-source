# 荒天帝 · Hexo Shoka 博客源码

这是 [slx-world.top](https://slx-world.top) 的 Hexo 源码仓库，基于 Hexo 7 和 Shoka 主题构建。

- 源码仓库：[slx-world/hexo-shoka-source](https://github.com/slx-world/hexo-shoka-source)
- 静态站点仓库：[slx-world/slx-world.github.io](https://github.com/slx-world/slx-world.github.io)
- 线上地址：[https://slx-world.top](https://slx-world.top)

## 功能概览

- Shoka 响应式主题、暗色模式和 PJAX 页面切换
- Algolia 全站搜索
- Giscus 评论（数据保存在 GitHub Discussions）
- Vercount 页面浏览计数
- RSS、Atom 和 JSON Feed
- 代码高亮、文章目录、图片懒加载及背景音乐
- AppVeyor 自动构建、更新搜索索引并部署至 GitHub Pages

## 技术栈

| 组件 | 用途 |
| --- | --- |
| Hexo 7 | 静态博客生成器 |
| Shoka | 博客主题（本仓库内置并做了定制） |
| Algolia | 站内搜索和索引 |
| Giscus | 基于 GitHub Discussions 的评论系统 |
| Vercount | 页面浏览计数 |
| AppVeyor | 持续集成和自动部署 |
| GitHub Pages | 静态站点托管 |

## 目录结构

```text
.
├─ _config.yml              # Hexo 站点配置、部署及 Algolia 配置
├─ appveyor.yml             # AppVeyor 构建和部署流程
├─ package.json             # 依赖和 npm 命令
├─ scaffolds/               # Hexo 文章模板
├─ source/
│  ├─ _posts/               # Markdown 文章
│  ├─ about/                # 关于页面
│  ├─ friends/              # 友链页面
│  ├─ links/                # 常用链接页面
│  └─ CNAME                 # 自定义域名
└─ themes/shoka/
   ├─ _config.yml           # 主题、评论、计数、音乐等配置
   ├─ _images.yml           # 顶部随机背景图列表
   ├─ layout/               # Nunjucks 页面模板
   ├─ scripts/              # Hexo 扩展和辅助函数
   └─ source/               # Stylus、JavaScript 和主题静态资源
```

`public/`、`node_modules/` 和 `db.json` 都是本地生成内容，不应提交到仓库。

## 本地运行

建议使用 Node.js 20 LTS，并确保 Git 已安装。

```bash
git clone https://github.com/slx-world/hexo-shoka-source.git
cd hexo-shoka-source
npm ci
npm run clean
npm run server
```

浏览器打开 `http://localhost:4000` 预览。

常用命令：

```bash
npm run server   # 启动本地预览服务器
npm run clean    # 清理 Hexo 缓存和 public 目录
npm run build    # 生成静态站点到 public 目录
npm run deploy   # 按 _config.yml 的配置部署（谨慎使用）
```

修改主题模板、脚本或配置后，推荐先执行 `npm run clean` 再重新构建，以免旧缓存影响结果。

## 发布文章

新建文章：

```bash
npx hexo new post "文章标题"
```

文章保存在 `source/_posts/`。推荐的 Front Matter 示例：

```yaml
---
title: 文章标题
date: 2026-08-16 12:00:00
updated: 2026-08-16 12:00:00
categories:
  - 教程
tags:
  - 博客
cover: https://example.com/images/cover.webp
description: 一句话文章摘要
comment: true
---
```

- `cover` 可使用可公开访问的 HTTPS 图片地址。
- `comment: false` 可关闭单篇文章的评论。
- 分类和标签映射维护在根目录 `_config.yml`。
- 当前 `post_asset_folder` 为 `false`，所有图片上传至 `slx-world/blog-images`，使用 weserv + jsDelivr 地址；不再将图片文件放入博客源码。

## 背景图和文章封面

### 图片存储约定

图片统一上传到 `slx-world/blog-images`，不提交图片文件到本仓库。Typora 继续通过 PicGo 上传，正文及 `cover` 使用以下格式：

```text
https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/目录/图片.png
```

新上传路径使用 `/`，例如 `test/python/`，不要使用 Windows 的 `\`。历史 `%5C` 链接若仍指向图床中的真实文件名，保留它们；不能仅替换分隔符而不迁移文件。

分类显示图在根配置 `_config.yml` 的 `category_covers` 中按分类 slug 设置远程 URL；无需再放置本地 `cover.jpg`。主题头像、赞赏码和图标通过 `themes/shoka/_config.yml` 的 `image_base` 读取，CSS/JS 仍由博客自身提供。

迁移文件与图床路径、原文件 Git Blob SHA 的对应关系见 `image-migration-manifest.json`。这是路径清单，不包含图片或密钥。删除的图片可从图床或原 Git 历史恢复；此次迁移不重写历史。

发布前运行 `npm run build` 和 `npm run test:images`，检查源码未重新包含图片文件，且生成页面的图片引用符合图床约定。CI 同样执行此检查。

顶部随机背景图列表位于 `themes/shoka/_images.yml`。列表中的相对文件名会通过以下链路读取：

```text
slx-world/blog-images → jsDelivr → images.weserv.nl
```

推荐规格：

| 使用位置 | 推荐尺寸 | 说明 |
| --- | --- | --- |
| 顶部背景/轮播图 | 2560 × 1440（16:9） | 最低 1920 × 1080，主体置于中央安全区域 |
| 仅偏重桌面端的顶部图 | 2560 × 1080（21:9） | 桌面裁剪较少，移动端会裁掉较多左右内容 |
| 首页文章封面 | 1200 × 675（16:9） | 也可使用 1600 × 900 |

图片会使用 `cover` 方式居中裁剪，顶部轮播还会放大到约 110%。人物、文字和其他关键内容不要靠近边缘。建议转换为 WebP，并将单张图片控制在约 300–800 KB。

不要把教程截图加入随机背景列表：截图比例不统一，被用作背景时容易出现严重裁剪、模糊或视觉不协调。

## 搜索：Algolia

搜索参数位于根目录 `_config.yml` 的 `algolia` 配置段。浏览器只使用 Search-Only API Key，该密钥可以公开，但必须限制为搜索权限和指定索引。

更新索引需要写入权限。索引密钥只能通过环境变量提供：

```bash
# PowerShell
$env:ALGOLIA_ADMIN_API_KEY = "<restricted-indexing-key>"
npx hexo algolia
```

不要将 Algolia Admin API Key 或具备账户管理权限的密钥写入 `_config.yml`、README、文章或 Git 历史。AppVeyor 仅在 `master` 分支的非 Pull Request 构建中执行 `npx hexo algolia`。

## 评论：Giscus

评论配置位于 `themes/shoka/_config.yml`：

- 仓库：`slx-world/hexo-shoka-source`
- Discussions 分类：`Announcements`
- 页面映射方式：`pathname`
- 支持懒加载、PJAX 页面切换和明暗主题同步

评论内容保存在 GitHub Discussions 中，访客需要登录 GitHub 才能评论。GitHub 仓库必须保持公开、启用 Discussions，并安装 Giscus App。为遵循最小权限原则，Giscus App 应只被授权访问本仓库。

如果评论区没有显示，请依次检查：

1. 当前文章是否设置了 `comment: false`。
2. GitHub Discussions 是否仍处于启用状态。
3. Giscus App 是否仍有权访问本仓库。
4. `repo_id`、`category_id` 和分类名称是否与 GitHub 当前配置一致。
5. 浏览器是否拦截了 `https://giscus.app/client.js`。

原 LeanCloud/MiniValine 评论运行时代码已移除，历史 LeanCloud 评论不会自动迁移到 GitHub Discussions。由于 Giscus 没有适用于此场景的匿名“最新评论”接口，侧栏最新评论组件默认关闭。

## 浏览计数：Vercount

浏览计数独立于评论系统，配置位于 `themes/shoka/_config.yml` 的 `view_counter` 段：

```yaml
view_counter:
  enable: true
  endpoint: https://events.vercount.one/api/v2/log
  timeout: 5000
```

请求采用异步方式，并设置了超时；计数服务异常时不会阻塞文章正文渲染。若计数不显示，请检查浏览器网络请求、内容拦截扩展和服务端可用性。

## 自动部署

AppVeyor 流程定义在 `appveyor.yml`：

1. 使用 `npm ci` 安装锁定依赖。
2. 执行 `npm run clean` 和 `npm run build`。
3. `master` 分支的正式构建更新 Algolia 索引。
4. 将 `public/` 内容同步到静态站点仓库。
5. 提交并推送至目标分支，由 GitHub Pages 发布。

Pull Request 只进行构建验证，不更新 Algolia 索引，也不发布线上站点。

AppVeyor 需要配置以下环境变量；敏感值必须使用 Encrypt/Secret 保存：

| 变量 | 用途 | 是否敏感 |
| --- | --- | --- |
| `STATIC_SITE_REPO` | 静态站点 Git 仓库地址 | 否 |
| `TARGET_BRANCH` | 静态站点目标分支，当前为 `master` | 否 |
| `GIT_USER_NAME` | 自动提交使用的 Git 用户名 | 否 |
| `GIT_USER_EMAIL` | 自动提交使用的 Git 邮箱 | 视情况 |
| `ALGOLIA_ADMIN_API_KEY` | Algolia 受限索引密钥 | 是 |
| `access_token` | 推送静态站点仓库的 GitHub Token | 是 |

建议的修改流程：

```bash
git switch -c feature/your-change
npm ci
npm run clean
npm run build
git add <本次修改的文件>
git commit -m "描述本次修改"
git push -u origin feature/your-change
```

通过 Pull Request 合并到 `master` 后，AppVeyor 会自动完成正式部署。不要直接提交 `public/`，也不要在本地和 CI 同时部署同一个提交。

## 故障排查

### 页面样式或脚本仍是旧版本

```bash
npm run clean
npm run build
```

然后清除浏览器缓存或强制刷新。若线上仍未更新，检查 AppVeyor 构建结果和静态站点仓库的最新提交。

### 图片无法显示

- 在浏览器开发者工具的 Network 面板检查图片请求状态码。
- 确保地址使用 HTTPS，且源站允许公开读取。
- 检查 `themes/shoka/_images.yml` 中的文件名是否存在于图片仓库。
- 避免文件名大小写不一致；GitHub Pages 和 CDN 路径区分大小写。
- CDN 刚更新时可能存在缓存延迟，可先直接访问原图地址验证。

### 搜索框没有结果

- 检查 Algolia 前端脚本是否被广告拦截扩展阻止。
- 确认 Search-Only API Key、Application ID 和索引名相互匹配。
- 检查最近一次正式 AppVeyor 构建是否成功执行了 `npx hexo algolia`。

### 评论区没有出现

按照“评论：Giscus”一节检查文章开关、Discussions、App 权限和仓库/分类 ID。Giscus 加载失败不会阻止文章正文显示。

## 内容许可

主题配置当前为 Creative Commons `BY-NC-SA 4.0`，用于博客文章内容的署名、非商业及相同方式共享声明。第三方主题、依赖、图片和其他素材仍遵循其各自的许可证或授权条款。
