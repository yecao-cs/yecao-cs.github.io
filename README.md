# 学术主页：李一博原版结构

本版直接采用李一博公开 MIT 仓库的 AcadHomepage 布局、导航、侧栏、字体、脚本和响应式样式。
参考页面：https://leeibo.github.io/zh/
当前内容已根据用户确认的信息与 GitHub 公开简介填写，身份为电子科技大学硕士研究生（2027 年入学）。教育背景按你确认的专业填写，本科院校仅在教育背景显示。

## 填写位置

逐项填写说明：[docs/PERSONALIZE-zh.md](docs/PERSONALIZE-zh.md)。

| 内容 | 文件 |
| --- | --- |
| 中英文姓名、方向、学校、所在地、联系方式 | `_config.yml` 中的 `author` |
| 中文简介、动态、项目实践、教育、学习积累、技术背景 | `_pages/about.md` |
| 英文正文 | `_pages/about-en.md` |
| 中英文导航及锚点 | `_data/navigation.yml` |

`author.email` 填邮箱，`github` 填用户名，`googlescholar` 填完整链接，`wechat` 填微信号。
正文不再重复联系方式，统一在侧栏显示。项目与实践暂时留空；后续可按实际进展自行添加。
未填联系方式的提示已通过 `show_placeholders: false` 隐藏。姓名在正文中读取配置，其他正文内容需分别维护中英文。资料来源见 `docs/PROFILE-SOURCES-zh.md`。
原站不显示头像，本版也默认不显示；如需头像，可在 `author.avatar` 填本地图片路径。

本版正文直接写 Markdown，与参考站相同；上一版的 `_data/homepage.yml` 已存入 `docs/previous-design/`，不再参与页面生成。

## 本地预览

```powershell
cd E:\skyblog\academic-homepage
npm install
npm run preview
```

打开 http://127.0.0.1:4322/ ，顶部 EN 可切换到 /en/。
在 `E:\skyblog` 也可执行 `npm run preview:academic`。
运行 `npm run build:preview` 可生成 `.preview/index.html` 及配套资源，直接打开即可查看。
预览使用正式 Liquid 布局与 Markdown 正文，完整 Jekyll 构建仍以 GitHub Pages 为准。

## 发布

仅同步 `academic-homepage` 文件夹内的源码到组织网站仓库。
已配置仓库 `yecao-cs/yecao-cs.github.io` 和站点地址 `https://yecao-cs.github.io`。本地分支 `codex/academic-homepage` 基于远程 `main`，发布时将当前分支推送到远程 `main`。后续更新的发布步骤见 [docs/DEPLOYMENT-zh.md](docs/DEPLOYMENT-zh.md)。
中文为根地址，英文为 /en/，/zh/ 是兼容的中文入口。
原博客继续独立存放于 `E:\skyblog\blog`。

## 许可和样式来源

- `LICENSE`：保留上游 MIT 许可。
- `UPSTREAM.md`：源站提交、样式哈希和本地调整记录。
- `assets/css/reference-main.css`：直接保存的源站已发布样式，不加载上一版的自定义皮肤。
- `design-qa.md`：本版对照检查结果。
- `docs/previous-design/`：上一版自定义布局的备份，不会发布。

原模板：https://github.com/RayeRen/acad-homepage.github.io
参考站源码：https://github.com/leeibo/leeibo.github.io
