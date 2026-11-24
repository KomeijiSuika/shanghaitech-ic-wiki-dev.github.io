# 站点维护

维护者通过 Pull Request（合并请求）审阅内容和配置。合并到 `main` 后，GitHub Actions 用 Python、MkDocs 和 Material for MkDocs 生成静态 HTML，并将 `site/` 交给 GitHub Pages 发布。每次构建都从仓库中的 Markdown 和 `requirements.txt` 开始。

中文搜索由 Material 的本地索引和 jieba（结巴分词）支持。构建钩子 `hooks/wiki.py` 统一解析文章中的仓库地址，并把 LaTeX 公式排版为浏览器可直接显示的 MathML。Mermaid 图表由主题在读者打开含图页面时从 unpkg 加载，贡献者应为图表配上一句文字说明。升级依赖后可用[文章写作示例](writing.md)验证这些功能。

`mkdocs.yml` 管理导航、配色和 Markdown 扩展。中文搜索由主题的搜索插件配合 jieba 在构建期分词。`hooks/wiki.py` 在构建时填入仓库链接，并把 Arithmatex 识别出的 LaTeX 交给 latex2mathml，读者打开网页时可由浏览器直接显示公式。[文章写作示例](writing.md)

## 首次发布与重新部署

1. 打开仓库 **Settings → Pages → Build and deployment**，在 **Source** 选择 **GitHub Actions**。仓库已经提供部署工作流，可直接返回 **Actions**。[GitHub Pages 发布源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
2. 在 PR 的 **Checks** 查看 **Documentation CI / docs-build**。它用只读权限运行 `mkdocs build --strict`。构建通过后，维护者检查引用、版权和导航，再按仓库审核规则合并。
3. 合并后打开 **Actions → Deploy to GitHub Pages**，选择与合并提交相符的运行。先确认 **build** 成功上传静态文件，再确认 **deploy** 成功。在运行摘要中打开 **github-pages** 环境显示的网址，点开一个板块，搜索一个中文词，确认当前版本可用。[GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
4. 需要从当前正式版本重新发布时，在同一工作流选择 **Run workflow**，将分支选为 **main**，再点 **Run workflow**。如果本次修改需要回退，通过新的 PR 撤销相关提交，合并后会自动部署。

构建失败时，展开第一个红色步骤。安装失败可在干净的虚拟环境中重新安装同一份 `requirements.txt`。文档警告会指出文件和目标，可在本地用相同的严格构建命令复现。读取 Pages 配置失败时，先核对发布源。部署被挂起时，检查 **Settings → Environments → github-pages** 中已有的分支限制或审批要求。

## 保护 main 分支

首次部署和 PR 检查成功后，建议由仓库管理员进入 **Settings → Rules → Rulesets → New ruleset → New branch ruleset**，将名称设为 `protect-main`，**Enforcement status** 选 **Active**。在 **Target branches → Add target** 添加匹配 `main` 的规则，再保存下列选项。[GitHub Rulesets 创建说明](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)

| 选项 | 建议设置与效果 |
| --- | --- |
| Require a pull request before merging | 审批数设为 **1**，由另一位有审核权限的维护者批准。 |
| Require status checks to pass | 添加 GitHub Actions 产生的 **docs-build**。如果列表里还找不到，先让一个面向 `main` 的 PR 成功跑完 CI。 |
| Block force pushes | 勾选，阻止强制推送改写正式分支历史。 |
| Restrict deletions | 勾选，保护正式分支免于删除。 |

规则建议只应用于本仓库。保存后，可在下一份内容 PR 中核对未通过审核时的合并按钮状态，以及 **Checks** 中的构建结果。[GitHub 分支规则选项](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)

## 更新依赖与迁移

截至 2026 年 11 月 24 日，Material for MkDocs 已结束新功能开发。官方将严重缺陷修复与安全更新延长至 **2027 年 5 月 5 日**。本项目当前继续使用 MkDocs Material，维护者应在此日期前验证后继方案。更新 Python 依赖时，提交新的版本记录，用一次 PR 完成严格构建、中文搜索和代表页面的回归检查。[Material 维护公告](https://squidfunk.github.io/mkdocs-material/changelog/) · [维护期限延期说明](https://zensical.org/upcoming-changes/)

依赖更新可在新建的虚拟环境中进行。先按 `requirements.txt` 安装当前版本，再用 `python -m pip install --upgrade 包名` 升级目标包。运行 `python -m pip check`，用 `python -m pip freeze` 对照更新直接和间接依赖的固定版本。提交前在另一个空环境中按更新后的文件重新安装，执行 `mkdocs build --strict`。更新 Actions 时，两个工作流中的 `uses` 指向官方发布对应的完整提交 SHA，后面的注释记录版本号。

官方后继项目 Zensical 可以读取现有 `mkdocs.yml`。评估时从同一提交新建分支和独立虚拟环境，用 `zensical build` 生成预览。先核对已有插件与构建钩子的兼容性，再对照检查深层页面地址、中文搜索结果、编辑链接、手机导航，以及写作示例中的公式和 Mermaid 图。将差异记录在迁移 PR，确认可接受后，再一起更新构建命令、依赖和维护说明。[Zensical 官方迁移指南](https://zensical.org/docs/compatibility/mkdocs/migration/)

如果将来更改组织名或仓库名，更新 `mkdocs.yml` 中供本地构建使用的默认地址和 README 的访问入口，并核对 GitHub Pages 的发布源。工作流从当前仓库自动取得 `REPO_URL`，线上部署还会将 Pages 的实际地址传给 `SITE_URL`。发布后从首页进入一篇文章，确认搜索、编辑入口和分享出去的规范网址均指向新站。
