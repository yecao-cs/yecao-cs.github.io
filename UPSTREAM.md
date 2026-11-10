# 当前版本来源

- 参考站：https://leeibo.github.io/zh/
- 公开仓库：https://github.com/leeibo/leeibo.github.io
- 参考提交：`fc9ddb8c9bbc648d690390032feae8b3c75a4d21`
- 根模板：https://github.com/RayeRen/acad-homepage.github.io
- 许可：MIT，保留 LICENSE 与源码署名。
- 取样日期：2026-11-10。

## 直接复用的部分

`_includes`、`_layouts`、`_sass` 和 `assets` 从参考仓库复制。
实际页面加载参考站发布的原始 CSS：`assets/css/reference-main.css`。
该文件 SHA-256：`c62afe495f8fef622c1bb0b82dd85f85ceba1b020379ad7a9d588a9e8f9c4c75`。
Font Awesome / Academicons 的字体与主脚本使用本地副本，不热链源站资源。

## 必要调整

- 姓名、联系方式、论文、项目与经历换为待填内容，不复制作者个人成果。
- 中文放在根地址，英文放在 /en/；导航与语言切换相应调整。
- 保留源站无头像、窄侧栏、灰黑文字、蓝色链接、普通分隔线的外观。
- 未填联系方式显示普通文字提示，不生成虚假的外部链接。
- 不加载 Google Analytics、引用统计和当前未用到的外部 MathJax。
- 删除未提供父布局 compress 的引用，不影响外观。
- 上一版定制布局存入 docs/previous-design/，不参与构建。

本版中文正文改在 `_pages/about.md` 填写，英文正文在 `_pages/about-en.md`。
此前的墨绿两栏设计已被用户否定，本版不继续沿用。
