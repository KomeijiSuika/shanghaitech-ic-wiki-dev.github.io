# 参与 ShanghaiTech IC Wiki

如果你发现了一个失效链接，知道某项资源适合哪些读者，或愿意分享一次有日期、有出处的经历，都可以参与。协作时请遵守[社区行为准则](CODE_OF_CONDUCT.md)。

## 选择适合的入口

| 想做的事 | 在 GitHub 上的操作 |
| --- | --- |
| 报告错误、推荐资源、投稿或建议网站功能 | 打开 **Issues → New issue**，选择对应表单，附上页名和相关来源 |
| 讨论还没有成形的问题或约人合写 | 打开 **Discussions**，说明背景及希望获得的反馈 |
| 改正文字或链接 | 在网站文章标题附近点击编辑按钮，进入 GitHub 编辑页面。GitHub 提示时创建 Fork，保存修改并发起 PR |
| 新增文章或一次修改多个文件 | 按下文在个人 Fork 中创建分支、预览并发起 PR |

## 从个人分支开始

1. 在项目仓库右上角选择 **Fork → Create fork**，进入自己的仓库副本。
2. 在自己的 Fork 选择 **Code → HTTPS**，复制地址，将下例中的 `FORK_URL` 换成实际地址。在已有本地副本时直接进入仓库目录即可。

   ```bash
   git clone FORK_URL ic-wiki
   cd ic-wiki
   git switch -c docs/add-reading-notes
   ```

3. 以后开始新稿件前，在 GitHub 上打开 Fork 的 **Sync fork → Update branch**，再从本地更新过的 `main` 创建新分支。拥有本仓库写入权限的成员也可直接在仓库内创建开发分支。

## 修改或新增页面

在 `docs/` 中找到所属板块的 Markdown 文件。修改已有页面时尽量保留原路径，让读者保存的链接继续有效。新增页面可从[内容模板](templates/)复制，写完后删除模板中的提示文字。

1. 文件与文件夹用小写英文命名，多个单词用连字符分隔，例如 `docs/research/reading-notes.md`。使用一个一级标题，用二级标题组织正文。
2. 首次出现的重要专业术语写为英文（中文）。为链接使用能说明目的地的文字，站内链接使用相对 Markdown 路径，例如从 `docs/research/index.md` 链到 `[论文阅读](paper-reading.md)`。
3. 在所属板块首页添加入口。打开 [mkdocs.yml](mkdocs.yml)，在 `nav` 中对应板块下按相邻条目的缩进添加新页。路径相对 `docs/`。

   ```yaml
   - 阅读笔记: research/reading-notes.md
   ```

4. 发布代码、公式或流程图前，可对照[写作示例](docs/community/writing.md)检查排版。仍缺资料的小节请标出“待共建”，写明待补的具体问题。

## 引用、授权和审核标准

- **事实可以核查。** 靠近相关段落给出作者或机构、原文标题与链接。招生政策、课程大纲和软件版本同时写明适用年份、学期或版本。优先引用原始公告、公开课程页面、工具文档和论文原文入口。
- **区分来源与个人观察。** 经验文章交代时间、背景及适用范围。涉及教师、学生或实验室的陈述应有公开依据。尚未核实的信息可先放在 Issue 中提出。
- **署名和许可清晰。** 原创文稿可用真实姓名或公开署名。引用、翻译、改编或转载须检查原始授权，保留作者、原始出处、许可及修改说明。没有转载授权时可提供合法公开入口并用自己的话介绍。投稿的原创内容采用 [CC BY 4.0](LICENSE-CONTENT)，网站代码和配置采用 [MIT](LICENSE)。
- **保护第三方权益与隐私。** 请勿上传未经授权的课件、试题、教材、论文全文、实验室内部资料或个人联系方式。截图先遮去学号、账号凭据及其他私人信息。
- **页面便于复用。** 标题与正文相符，内部链接能打开，目录中可找到新页。对工具操作，写出环境与检查结果。对经历，说明哪些结论来自个人判断。

## 预览并提交 PR

从仓库根目录运行以下命令。Windows PowerShell 的激活方式见 [README](README.md#本地预览)。

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
mkdocs build --strict
mkdocs serve
```

打开 [本地预览](http://127.0.0.1:8000/)，沿导航找到文章，检查链接和版式。按 `Ctrl+C` 关闭预览。下例提交上面的新增页面及其入口，提交前按实际变更调整文件名。

```bash
git diff
git add docs/research/reading-notes.md docs/research/index.md mkdocs.yml
git diff --cached
git commit -m "docs: 增加论文阅读笔记"
git push -u origin docs/add-reading-notes
```

在 GitHub 上选择 **Compare & pull request**，确认目标是项目仓库的 `main`，来源是你的开发分支。填写 PR 模板，说明资料来源和检查结果。若使用网页编辑、尚未本地构建，可在模板中如实说明，并查看 **Checks** 中的 CI 结果。

维护者核对内容、署名、链接和构建结果后合并。收到修改意见时，在同一分支补充提交即可更新 PR。合并会触发网站部署，随后可在正式网站复查页面。[维护说明](docs/community/maintenance.md)
