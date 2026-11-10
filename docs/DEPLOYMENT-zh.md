# 发布到 yecao-cs.github.io

## 仓库与站点配置

- 目录：`E:\skyblog\academic-homepage`。
- `origin`：`https://github.com/yecao-cs/yecao-cs.github.io.git`。
- 远程默认分支：`main`；本地保留其已有历史。
- 本地工作分支：`codex/academic-homepage`，跟踪 `origin/main`，保留已有历史。
- `_config.yml`：`repository: yecao-cs/yecao-cs.github.io`、`url: https://yecao-cs.github.io`、`baseurl: ''`。
- 用户已授权发布当前版本；之后每次更新可按下方命令提交并推送到 main。
- 个人资料填写方法见 `PERSONALIZE-zh.md`。原博客仍独立位于 `E:\skyblog\blog`。

## 后续更新与发布

在确认本地预览后执行以下命令：

```powershell
cd E:\skyblog\academic-homepage
npm run build:preview
git status
git diff
git add --all
git diff --cached --stat
git commit -m "Personalize academic homepage"
git push origin HEAD:main
```

本地分支名称与远程 main 不同，因此推送命令明确使用 `HEAD:main`。只同步此主页目录，不包括原博客、依赖与预览产物。本地设计讨论和上一版设计也已加入忽略规则。

当前已通过本机已有 GitHub 凭据确认账号具备组织仓库写权限。凭据由 Git Credential Manager 管理，不保存在源码中。
若远程已有新提交导致推送被拒绝，先获取并合并远程修改、解决冲突后再推送，不要使用强制推送。

## GitHub Pages 设置

仓库：https://github.com/yecao-cs/yecao-cs.github.io
进入 Settings → Pages，Source 选择 **Deploy from a branch**，分支 **main**，目录 **/(root)**，保存。
已确认 Pages 当前使用 main 分支根目录发布，HTTPS 已开启，无需修改设置。

推送后，在仓库 Actions 中等待 Pages 构建与部署完成：

- 中文：https://yecao-cs.github.io/
- 英文：https://yecao-cs.github.io/en/
- `/zh/` 为兼容的中文重定向入口。

页面使用 Jekyll 源码，不添加 `.nojekyll`。本机没有 Ruby / Bundler，`build:preview` 仅检查本地预览渲染，正式 Jekyll 构建以 GitHub Pages 的结果为准。

官方发布设置文档：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
