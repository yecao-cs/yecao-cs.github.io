# 个人信息填写与维护

项目目录：`E:\skyblog\academic-homepage`。已配置组织仓库 `yecao-cs/yecao-cs.github.io`。当前版本已获用户授权发布，后续维护步骤见 `DEPLOYMENT-zh.md`。

## 已填写的内容

姓名和邮箱保留你的本地配置。研究兴趣、学习方向和技术背景参考 GitHub 公开简介；项目与实践目前留空，供以后自行添加。
教育背景已按你确认的信息填写：电子科技大学 · 计算机技术 · 硕士（2027 年入学），湖南科技大学 · 物联网工程 · 本科（2023–2027），两条使用相同排版。本科院校仅在教育背景出现。未知的学院、导师、入学月份、硕士毕业时间和奖项没有补写。
正文联系方式已删除，统一显示在侧栏；未填写的社交平台提示已隐藏。
资料依据见 `PROFILE-SOURCES-zh.md`。

## 1. 配置：_config.yml

| 字段 | 内容 | 出现位置 |
| --- | --- | --- |
| `title` | 浏览器标签上的姓名 | 浏览器标签 |
| `author.name` / `author.name_zh` | 英文 / 中文姓名 | 侧栏、页脚和正文第一段 |
| `author.bio` / `author.bio_zh` | 英文 / 中文研究方向 | 姓名下方 |
| `author.employer` / `author.employer_zh` | 英文 / 中文学校名称 | 侧栏 |
| `author.location` / `author.location_zh` | 英文 / 中文所在地 | 侧栏 |
| `author.email` | 邮箱地址 | 侧栏 |
| `author.github` | GitHub 用户名，当前为 `zzsky233` | 侧栏 GitHub 链接 |
| `author.googlescholar` | Scholar 个人页完整 URL | 侧栏，未填时隐藏 |
| `author.wechat` | 微信号 | 侧栏，未填时隐藏 |
| `author.avatar` | 可选本地图片，如 `/images/avatar.jpg` | 头像，默认不显示 |

不公开的联系方式保持 `null`；不要写空字符串 `""`。`show_placeholders: false` 隐藏未填写联系方式的提示。
`repository`、`url` 和空的 `baseurl` 已配置好，不用改。其他不使用的社交字段保持 `null`。
`description` 是可选的英文侧栏介绍。YAML 保留缩进，含特殊符号的文本用引号包住。

## 2. 正文与项目

- `_pages/about.md`：中文介绍、动态、项目实践、教育背景、学习积累、技术背景。
- `_pages/about-en.md`：对应英文内容，需要独立维护，不自动翻译。
- 姓名在正文通过 `site.author.name` / `site.author.name_zh` 引用配置；学校、年份、方向和项目介绍在正文中单独维护。
- 正文没有联系方式区块，以后只改配置里的联系方式即可。
- 添加真实论文、实习或获奖后，再增加对应栏目与条目；保留现有 class 即可沿用原版格式。
- 文件顶部 `excerpt` 为摘要，可按需修改；`layout`、`permalink`、`lang`、`author_profile` 保持现状。

## 3. 导航和图片

`_data/navigation.yml` 中 `main_zh` 是中文导航，`main` 是英文导航。增删栏目时同步更新导航，`url` 中的锚点需与正文 id 对应。
图片放在 `images/`；如需头像，在配置中填本地图片路径。

## 4. 本地预览和之后发布

```powershell
cd E:\skyblog
npm run preview:academic
```

打开 http://127.0.0.1:4322/ ，保存源码后刷新。顶部 EN 可检查英文版。
`.preview/` 是生成结果，不要在那里直接改内容；可在主页目录运行 `npm run build:preview` 更新离线预览。
更新内容并确认后，按 `DEPLOYMENT-zh.md` 提交和推送。
