# ShanghaiTech IC Wiki

上科大芯知库由上海科技大学 IC 荣誉项目学生发起，面向初学者、在校生、校友及其他集成电路爱好者。我们希望把选方向、学课程、做项目时反复遇到的问题整理成可检索、可引用、可持续修订的中文资料。

**网站**　[shanghaitech-ic-wiki-dev.github.io](https://shanghaitech-ic-wiki-dev.github.io/)

## 从哪里读起

| 板块                                    | 可以在这里找什么                               |
| --------------------------------------- | ---------------------------------------------- |
| [认识 IC](docs/explore-ic/index.md)      | 集成电路知识地图、产业链与研究方向             |
| [学习地图](docs/learning/index.md)       | 不同方向的基础知识、学习顺序与公开资源         |
| [上科大 IC](docs/shanghaitech/index.md)  | 校内课程、教师、课题组与 IC 荣誉项目的公开信息 |
| [竞赛与项目](docs/competitions/index.md) | 赛事入口、工程项目与参赛复盘                   |
| [科研探索](docs/research/index.md)       | 从明确问题、查找论文到做阅读笔记的方法         |
| [升学与职业](docs/career/index.md)       | 升学路径、实习与就业经验                       |
| [工具与资源](docs/tools/index.md)        | EDA 工具、开发环境与开源项目                   |
| [社区与共建](docs/community/index.md)    | 投稿入口、写作示例与维护说明                   |

标有“待共建”的页面列出了征集方向。你可以从补一条有出处的资源、修正一个失效链接开始。

## 本地预览

在仓库目录中，用 Python 3.13 创建虚拟环境并安装依赖。

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs serve
```

打开 [本地预览](http://127.0.0.1:8000/)。保存 Markdown 后，浏览器会自动刷新。Windows PowerShell 下可分别用 `py -3.13 -m venv .venv` 和 `.\.venv\Scripts\Activate.ps1` 完成前两步。

## 构建与发布

MkDocs 读取 `docs/` 中的 Markdown 和 [站点配置](mkdocs.yml)，使用 Material for MkDocs 生成静态页面。`mkdocs build --strict` 会将构建警告计为失败，生成的网页位于 `site/`。

向 `main` 发起 Pull Request（合并请求）会触发 GitHub Actions 的严格构建检查。合并后，发布工作流重新构建站点，将产物部署到 GitHub Pages。维护者可在仓库的 **Actions** 标签页查看日志和部署地址。[维护与迁移说明](docs/community/maintenance.md)

## 参与共建

- **纠错或提案**　打开仓库的 **Issues → New issue**，选择内容投稿、资源推荐、错误反馈或功能建议。
- **讨论选题**　在仓库的 **Discussions** 发起讨论。有了具体修改后可附上讨论链接发起 PR。
- **直接写文章**　复制合适的文章模板，修改 Markdown，并通过 Fork（个人副本）提交 PR。具体步骤见[贡献指南](CONTRIBUTING.md)、[文章模板](templates/)和[社区行为准则](CODE_OF_CONDUCT.md)。

## 许可与声明

网站代码、配置、工作流与脚本采用 [MIT License](LICENSE)。原创文章、Markdown 模板、项目说明及标明为原创的配图采用 [CC BY 4.0](LICENSE-CONTENT)。再使用原创内容时请注明作者、出处、许可与所作修改。第三方素材、依赖及外部资源遵循各自的许可，具体标注优先。

本站由学生独立发起和维护。文章仅代表作者观点。课程、招生、招聘及课题组信息请以上海科技大学、相关院系或发布单位的最新公告为准。
