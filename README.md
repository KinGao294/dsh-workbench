# LIGHT WAVE LAB · 个人工作台

一个好看实用的个人工作台插件，运行在 **DSH (DeepSeek Harness) Web GUI** 内。
设计参考「LIGHT WAVE LAB」暖奶油 × 淡薰衣草配色，开箱即用。

## ✨ 功能

- **看板首页**：早安横幅（问候语 + 日期 + 每日一句）、KPI 卡片、今日日程、最新 AI 简报、今日习惯、今日完成清单（快速记录）、昨日补记、本月预算、目标进度
- **12 个模块**：看板 / 热点简报 / 工作日程 / 开销记账 / 选题库 / 读书管理 / 习惯打卡 / 目标管理 / 自动复盘 / 任务中心 / 完成清单 / 设置
  - 核心 7 个模块已可交互：看板、热点简报、工作日程、开销记账、习惯打卡、目标管理、完成清单
  - 其余为占位页（欢迎 PR 补全）
- **数据持久化**：所有记录经 Host 写入 `{workspace}/.dsh-workbench.json`，刷新不丢；跨天自动把未完成事项滚动到「昨天」
- **多入口**：右下角悬浮按钮（避开 dsh-pet 小奶龙）+ 侧边栏底部 + 会话头部

## 📦 安装

### 方式 A：复制即用（零构建，推荐）

本仓库是「复制即用」形态，无需打包。在 DSH Web GUI 中：

1. 让 agent 用动态插件功能（`cordis_define`）创建一个新插件，`idPrefix` 填 `wbench`：
   - `code.host` ← 粘贴 [`host.js`](./host.js) 内容
   - `code.client` ← 粘贴 [`client.js`](./client.js) 内容
2. `cordis_run` 激活并批准
3. 侧边栏底部 / 会话头部 / 右下角会出现「💼 工作台」入口

### 方式 B：作为标准 Cordis 插件

将 `host.js` / `client.js` 分别作为插件包的 host / client 入口，按 DSH 插件打包规范（`dsh.bundle.patch` + `dsh.client.inject`）构建即可，与 dsh-web-ui 全家桶插件一致。

## 🛠 使用

1. 点击任意「💼 工作台」入口打开全屏工作台
2. 看板直接操作：
   - **今日完成 / 昨日补记**：输入文字回车即记录，可勾选 / 删除
   - **今日习惯 / 今日日程**：勾选完成，✕ 删除
   - **本月预算**：输入总额与已支出，进度条实时更新
3. 左侧导航切换各模块页（日程 / 习惯 / 预算 / 目标 / 完成清单 / 简报均有完整管理界面）

## 📁 数据文件

- 路径：`{workspace}/.dsh-workbench.json`
- 内容：`dateKey`、`tasks`（按日期分组的完成清单）、`habits`、`schedule`、`briefings`、`budget`、`goals`、`books`、`streak`、`quote`
- 备份 / 迁移：直接复制该 JSON 文件即可

## 🔧 常见调整

- **配色**：`client.js` 顶部 CSS 变量中的色值（`#f5f0e8` 背景、`#8f86d8` 主题紫、`#38315c` 深色文字）
- **悬浮按钮位置**：`client.js` 中 `.wb-fab` 的 `right` / `bottom`（当前 `right:18px; bottom:210px`，为避开 dsh-pet 小奶龙而抬高）
- **默认数据**：`host.js` 的 `defaults()` 函数（默认习惯、简报、预算、目标等）
- **KPI 卡片**：`client.js` 的 `BoardPage` 中 `kpis` 数组，增删卡片即可

## 📄 License

Apache-2.0

## 🙌 致谢

- 界面设计灵感：LIGHT WAVE LAB 工作台概念稿
- 运行环境：[DSH (DeepSeek Harness)](https://github.com/deepseek-ai/dsh)
