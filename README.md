# 上科大 IC Wiki

由上海科技大学同学维护的集成电路（IC）学生 Wiki：上科大课程与经验、教授与课题组、科研方向拓扑、科研与工艺平台、自学资源、EDA 工具、科研入门、升学就业与竞赛。

在线访问：<https://shanghaitech-ic-wiki-dev.github.io/>

灵感来自 [NJU 集成全家桶](https://njuic-students.github.io/) 与 [IC 自学指南](https://crys-chen.github.io/ic-guide/)。

## 本地预览

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 docs/.vitepress/dist
```

需要 Node.js 18+。

## 目录结构

```
docs/
├── index.md                 首页（HomePage 组件）
├── basics/  map/  courses/  shanghaitech/  research/
├── self-learning/  eda/  research-guide/  career/  competitions/  links/  about/
└── .vitepress/
    ├── config.mts           导航栏与侧边栏
    ├── data/                结构化数据（教授、课程、科研方向）
    └── theme/               配色与组件（拓扑图、教授卡片、课程表）
```

- 教授与课题组：`docs/.vitepress/data/faculty.ts`
- 课程表：`docs/.vitepress/data/courses.ts`（来自信息学院年度开课表）
- 科研方向：`docs/.vitepress/data/directions.ts`

修改数据后，首页拓扑图、教授卡片和课程表会同步更新。写作规范与投稿模板见站内「参与建设」页面。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 构建并发布到 GitHub Pages（仓库 Settings → Pages → Source 需选择 “GitHub Actions”）。

## 许可

内容以 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 共享。本站为学生自发维护的非官方站点，院系与课程信息以学校官网和教务系统为准。
