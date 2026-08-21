# harness-learning 静态构建

`harness-learning` 是一套 docsify 知识库。`dist/` 是**已预渲染的纯静态站点**，可直接用浏览器打开 `dist/index.html`（file://）或部署到静态托管；`build/` 是重新生成 `dist/` 的工具。

## 重新构建

```sh
cd build
npm install        # 首次
npm run build      # 输出到 ../dist
```

构建脚本 `build.mjs` 用 markdown-it 把每个 `.md` 预渲染成独立 `.html`，改写内部链接为 `.html`、拷贝图/字体/KaTeX 资源、生成带章节侧边栏的布局，产物全相对路径、可离线运行。

## GitHub Pages

`.github/workflows/pages.yml` 在推送到 `main` 时，把已构建好的 `dist/` 直接布署到 GitHub Pages（CI 只拷贝、不编译）。
