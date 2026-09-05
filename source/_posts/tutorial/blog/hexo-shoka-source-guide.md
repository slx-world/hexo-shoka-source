---
title: 四、博客源码说明与维护指南
date: 2026-08-16 20:47:42
updated: 2026-08-16 20:47:42
description: 荒天帝博客源码的本地运行、内容发布、背景图片、搜索、评论、浏览计数和自动部署说明
sticky: true
categories:
  - 教程
tags:
  - 博客
cover: https://images.weserv.nl/?url=https://cdn.jsdelivr.net/gh/slx-world/blog-images@master/102.jpg
---

:::primary

[++一、博客搭建++{.info}](/tutorial/blog/hexo-shoka/) :airplane: [++二、图床搭建++{.info}](/tutorial/blog/github-picgo-typora/) :airplane: [++三、备份与持续集成++{.info}](/tutorial/blog/hexo-shoka-appveyor/) :airplane: [++四、源码说明与维护指南++{.info}](/tutorial/blog/hexo-shoka-source-guide/)

:::

# :cherry_blossom: 项目简介

本博客使用 [Hexo](https://hexo.io/) 7 和经过定制的 Shoka 主题构建，源码托管在 [slx-world/hexo-shoka-source](https://github.com/slx-world/hexo-shoka-source)，生成后的静态站点发布到 [slx-world/slx-world.github.io](https://github.com/slx-world/slx-world.github.io)。

- 线上地址：[https://slx-world.top](https://slx-world.top)
- 站内搜索：Algolia
- 评论系统：Giscus + GitHub Discussions
- 浏览计数：Vercount
- 自动构建和部署：AppVeyor
- 静态站点托管：GitHub Pages

# :gift_heart: 目录结构

```text
.
├─ _config.yml              # Hexo 站点、部署和 Algolia 配置
├─ appveyor.yml             # AppVeyor 构建与部署流程
├─ package.json             # npm 依赖和运行命令
├─ scaffolds/               # Hexo 文章模板
├─ source/
│  ├─ _posts/               # Markdown 文章
│  ├─ about/                # 关于页面
│  ├─ friends/              # 友链页面
│  └─ links/                # 常用链接页面
└─ themes/shoka/
   ├─ _config.yml           # 主题、评论、计数和音乐配置
   ├─ _images.yml           # 顶部随机背景图列表
   ├─ layout/               # 页面模板
   ├─ scripts/              # Hexo 扩展
   └─ source/               # 样式、脚本和主题资源
```

`node_modules/`、`public/` 和 `db.json` 都是安装或构建生成的内容，不需要提交到源码仓库。

# :gift_heart: 本地安装与预览

建议安装 Node.js 20 LTS 和 Git，然后执行：

```bash
git clone https://github.com/slx-world/hexo-shoka-source.git
cd hexo-shoka-source
npm ci
npm run clean
npm run server
```

浏览器打开 `http://localhost:4000` 即可预览。

常用命令：

```bash
npm run server   # 启动本地预览
npm run clean    # 清理 Hexo 缓存和 public 目录
npm run build    # 生成静态站点
npm run deploy   # 按站点配置部署，使用前应确认目标仓库
```

修改主题模板、脚本或配置后，建议先清理再构建，避免旧缓存影响页面结果：

```bash
npm run clean
npm run build
```

# :gift_heart: 发布新文章

使用 Hexo 命令创建文章：

```bash
npx hexo new post "文章标题"
```

文章保存在 `source/_posts/`。教程类博客文章可以使用以下 Front Matter：

```yaml
---
title: 文章标题
date: 2026-08-16 20:47:42
categories:
  - 教程
tags:
  - 博客
cover: https://example.com/images/cover.webp
description: 一句话文章摘要
comment: true
---
```

- `comment: false` 可以关闭单篇文章的评论。
- `cover` 建议使用可公开访问的 HTTPS 图片地址。
- 当前没有启用文章资源文件夹，所有图片上传至 `slx-world/blog-images`，使用 weserv + jsDelivr 地址；不再将图片文件放入博客源码。
- “教程”和“博客”的公开路径仍分别使用 `tutorial` 与 `blog`，因此旧链接保持不变。

# :gift_heart: 背景图和文章封面

顶部随机背景图在 `themes/shoka/_images.yml` 中维护。相对文件名通过下列链路加载：

```text
slx-world/blog-images → jsDelivr → images.weserv.nl
```

| 使用位置 | 推荐尺寸 | 注意事项 |
| --- | --- | --- |
| 顶部背景或轮播图 | 2560 × 1440 | 最低 1920 × 1080，主体放在中央 |
| 偏重桌面端的顶部图 | 2560 × 1080 | 电脑端裁剪较少，手机会裁掉更多左右区域 |
| 首页文章封面 | 1200 × 675 | 也可以使用 1600 × 900 |

主题使用 `cover` 方式居中裁剪，顶部轮播动画还会放大到约 110%。人物、文字和其他关键元素不要靠近边缘。推荐使用 WebP，并将单张图片控制在约 300–800 KB。

教程截图不适合作为随机背景：截图尺寸和比例通常不一致，容易造成严重裁剪或模糊。

# :gift_heart: Algolia 搜索

Algolia 配置位于根目录 `_config.yml`。浏览器端仅使用 Search-Only API Key；更新索引所需的受限写入密钥只允许通过环境变量提供：

```powershell
$env:ALGOLIA_ADMIN_API_KEY = "<受限索引密钥>"
npx hexo algolia
```

不要把 Algolia 管理密钥写入配置文件、文章、README 或 Git 历史。AppVeyor 只在 `master` 分支的正式构建中更新搜索索引，Pull Request 构建不会修改线上索引。

如果搜索没有结果，可以检查：

1. Application ID、Search-Only API Key 和索引名称是否匹配。
2. Algolia 脚本是否被浏览器扩展拦截。
3. 最近一次 AppVeyor 正式构建是否成功更新索引。

# :gift_heart: Giscus 评论

评论配置位于 `themes/shoka/_config.yml`。当前评论数据存放在本仓库的 GitHub Discussions `Announcements` 分类中，并使用文章路径进行映射。

评论功能支持：

- 懒加载
- PJAX 页面切换
- 明暗主题同步
- 加载失败时不阻塞文章正文

访客必须登录 GitHub 才能发表评论。仓库需要保持公开、启用 Discussions，并允许 Giscus App 访问本仓库。为减少授权范围，Giscus App 应只选择 `slx-world/hexo-shoka-source`。

LeanCloud/MiniValine 运行时代码已经移除，旧 LeanCloud 评论不会自动迁移至 GitHub Discussions。Giscus 没有适用于当前场景的匿名最新评论接口，因此侧栏最新评论组件默认关闭。

# :gift_heart: Vercount 浏览计数

浏览计数与评论系统相互独立，配置位于 `themes/shoka/_config.yml`：

```yaml
view_counter:
  enable: true
  endpoint: https://events.vercount.one/api/v2/log
  timeout: 5000
```

计数请求异步执行并设置了超时，即使第三方计数服务异常，也不会阻塞文章内容。计数没有显示时，可以检查浏览器网络请求、内容拦截扩展和 Vercount 服务状态。

# :gift_heart: AppVeyor 自动部署

`appveyor.yml` 定义了完整发布流程：

1. 使用 `npm ci` 安装锁定依赖。
2. 清理缓存并生成 `public/` 静态站点。
3. 正式构建更新 Algolia 索引。
4. 将 `public/` 同步至静态站点仓库。
5. 提交并推送目标分支，由 GitHub Pages 发布。

AppVeyor 需要配置以下环境变量：

| 变量 | 用途 |
| --- | --- |
| `STATIC_SITE_REPO` | 静态站点仓库地址 |
| `TARGET_BRANCH` | 静态站点目标分支 |
| `GIT_USER_NAME` | 自动提交使用的 Git 用户名 |
| `GIT_USER_EMAIL` | 自动提交使用的 Git 邮箱 |
| `ALGOLIA_ADMIN_API_KEY` | Algolia 受限索引密钥，必须加密保存 |
| `access_token` | 推送静态站点的 GitHub Token，必须加密保存 |

Pull Request 只进行构建验证，不更新索引，也不发布线上站点。合并到 `master` 后，AppVeyor 才会执行正式部署。

# :gift_heart: 常见问题

## 图片无法显示

- 检查图片地址是否使用 HTTPS。
- 检查 `_images.yml` 中的文件名是否真实存在于图片仓库。
- 注意文件名和路径大小写。
- 通过浏览器 Network 面板查看请求状态码。
- CDN 更新后可能存在短暂缓存延迟，可直接访问源图验证。

## 页面仍是旧样式

先执行清理和构建，再强制刷新浏览器。如果线上仍未变化，检查 AppVeyor 构建结果以及静态站点仓库的最新提交。

## 评论区不显示

检查文章是否关闭评论、Discussions 是否开启、Giscus App 权限以及仓库 ID 和分类 ID 是否正确。浏览器如果拦截 `giscus.app`，评论组件也无法加载。

# :gift_heart: 内容许可

当前主题配置使用 Creative Commons `BY-NC-SA 4.0` 作为博客内容声明。第三方主题、依赖、图片和其他素材仍遵循各自的许可证或授权条款。
