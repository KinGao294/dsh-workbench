/**
 * LIGHT WAVE LAB 个人工作台 — Client 半边（浏览器 UI）
 *
 * 用法：在 DSH Web GUI 中通过动态插件（cordis_define）定义本文件内容为
 * code.client；或作为标准 Cordis 插件的 client 入口。
 *
 * 界面（对照 LIGHT WAVE LAB 参考设计）：
 *   左侧 12 模块导航：看板 / 热点简报 / 工作日程 / 开销记账 / 选题库 /
 *   读书管理 / 习惯打卡 / 目标管理 / 自动复盘 / 任务中心 / 完成清单 / 设置
 *   看板页：早安横幅 + KPI 卡片 + 今日日程 + 最新 AI 简报 + 今日习惯 +
 *           今日完成清单 + 昨日补记 + 本月预算 + 目标进度
 *   独立页：工作日程 / 习惯打卡 / 开销记账 / 目标管理 / 完成清单 / 热点简报
 *
 * 入口：右下角悬浮按钮（避开 dsh-pet 小奶龙）+ 侧边栏底部 + 会话头部。
 * 数据：经 host.call('wb:load' / 'wb:save') 与 Host 半边通信，持久化到
 *       {workspace}/.dsh-workbench.json。
 *
 * 注意：本文件是「复制即用」形态，直接返回 Cordis 插件对象；无需构建。
 */
return {
  apply(ctx) {
    const slots = ctx.get('slots')
    if (slots === undefined) return
    const h = React.createElement

    const CSS = `
.wb-root{position:fixed;inset:0;z-index:2147483000;display:flex;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;background:#f5f0e8;color:#403a4d;pointer-events:auto;}
.wb-root *{box-sizing:border-box;}
.wb-sidebar{width:218px;flex-shrink:0;background:linear-gradient(180deg,#f2eef6,#e9e4f1);border-right:1px solid #e2dcf0;display:flex;flex-direction:column;padding:20px 12px 14px;overflow-y:auto;}
.wb-logo{display:flex;align-items:center;gap:10px;padding:4px 10px 18px;}
.wb-logo-icon{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#b9b0ea,#8f86d8);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 12px rgba(143,134,216,.35);flex-shrink:0;}
.wb-logo-name{font-weight:800;font-size:14px;letter-spacing:.3px;color:#3c3560;}
.wb-logo-sub{font-size:9.5px;color:#8d86a8;letter-spacing:2.8px;margin-top:2px;}
.wb-nav{display:flex;flex-direction:column;gap:2px;}
.wb-nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:13.5px;color:#5b5570;cursor:pointer;border:none;background:transparent;text-align:left;transition:background .15s,color .15s;width:100%;font-family:inherit;}
.wb-nav-item:hover{background:rgba(255,255,255,.7);color:#3f3860;}
.wb-nav-item.active{background:#fff;color:#5b4fae;font-weight:700;box-shadow:0 2px 10px rgba(91,79,174,.14);}
.wb-nav-icon{width:22px;text-align:center;font-size:15px;flex-shrink:0;}
.wb-sidebar-foot{margin-top:auto;padding-top:14px;border-top:1px solid rgba(143,134,216,.18);}
.wb-main{flex:1;overflow-y:auto;padding:26px 30px 40px;min-width:0;}
.wb-page{max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:18px;}
.wb-hero{background:linear-gradient(120deg,#e7e1f8,#f6efe2);border:1px solid #e4dcf2;border-radius:18px;padding:22px 26px;display:flex;align-items:flex-start;gap:16px;position:relative;box-shadow:0 4px 18px rgba(143,134,216,.12);}
.wb-hero-left{flex:1;min-width:0;}
.wb-hero-title{font-size:22px;font-weight:800;color:#38315c;letter-spacing:.3px;}
.wb-hero-date{font-size:12.5px;color:#8a83a8;margin-top:6px;letter-spacing:.4px;}
.wb-hero-quote{font-size:12.5px;color:#6d6590;margin-top:12px;line-height:1.7;padding:10px 14px;background:rgba(255,255,255,.55);border-radius:10px;border-left:3px solid #a99fe2;}
.wb-close-btn{flex-shrink:0;width:32px;height:32px;border-radius:9px;border:none;background:rgba(255,255,255,.7);color:#6d6590;font-size:14px;cursor:pointer;transition:background .15s,color .15s;}
.wb-close-btn:hover{background:#fff;color:#5b4fae;}
.wb-kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));gap:14px;}
.wb-kpi{background:#fffdf8;border:1px solid #ece5f4;border-radius:16px;padding:16px 16px 14px;box-shadow:0 2px 10px rgba(120,110,160,.06);}
.wb-kpi-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#eee9fa,#e2dcf5);display:flex;align-items:center;justify-content:center;font-size:16px;margin-bottom:10px;}
.wb-kpi-value{font-size:24px;font-weight:800;color:#38315c;}
.wb-kpi-unit{font-size:12px;font-weight:500;color:#8a83a8;}
.wb-kpi-label{font-size:12.5px;color:#6d6590;margin-top:2px;}
.wb-kpi-sub{font-size:11px;color:#a099b8;margin-top:3px;}
.wb-kpi-bar{margin-top:8px;}
.wb-kpi-bar-track{height:6px;border-radius:4px;background:#efeaf6;overflow:hidden;}
.wb-kpi-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#b9b0ea,#8f86d8);}
.wb-kpi-bar-text{font-size:10.5px;color:#8a83a8;margin-top:4px;}
.wb-row3{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;align-items:start;}
.wb-grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:14px;align-items:start;}
.wb-panel{background:#fffdf8;border:1px solid #ece5f4;border-radius:16px;padding:16px 18px;box-shadow:0 2px 10px rgba(120,110,160,.06);}
.wb-panel-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.wb-panel-title{font-size:14.5px;font-weight:800;color:#3c3560;}
.wb-panel-link{font-size:12px;color:#8f86d8;cursor:pointer;border:none;background:none;padding:0;font-family:inherit;}
.wb-panel-link:hover{color:#5b4fae;}
.wb-list{display:flex;flex-direction:column;gap:8px;}
.wb-sched-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:#f8f5f0;border:1px solid #f0eae0;}
.wb-sched-row.done .wb-sched-text{text-decoration:line-through;color:#a8a0bc;}
.wb-sched-time{font-size:11px;font-weight:700;color:#8f86d8;background:#eee9fa;padding:3px 8px;border-radius:7px;flex-shrink:0;}
.wb-sched-text{flex:1;font-size:13px;color:#4a4460;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.wb-check{width:22px;height:22px;border-radius:7px;border:1.5px solid #d5cdef;background:#fff;color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .15s;padding:0;}
.wb-check.on{background:linear-gradient(135deg,#b9b0ea,#8f86d8);border-color:#8f86d8;}
.wb-brief-row{display:flex;align-items:flex-start;gap:10px;padding:9px 10px;border-radius:10px;background:#f8f5f0;border:1px solid #f0eae0;}
.wb-brief-num{font-size:11px;font-weight:800;color:#b9b0ea;width:18px;flex-shrink:0;padding-top:2px;}
.wb-brief-text{flex:1;font-size:12.5px;color:#4a4460;line-height:1.55;}
.wb-brief-tag{font-size:10px;color:#8f86d8;background:#eee9fa;padding:2px 8px;border-radius:20px;flex-shrink:0;white-space:nowrap;margin-top:1px;}
.wb-habit-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:#f8f5f0;border:1px solid #f0eae0;}
.wb-habit-row.done .wb-habit-name{text-decoration:line-through;color:#a8a0bc;}
.wb-habit-icon{font-size:15px;flex-shrink:0;}
.wb-habit-name{flex:1;font-size:13px;color:#4a4460;min-width:0;}
.wb-input{flex:1;border:1px solid #e5def0;background:#fff;border-radius:10px;padding:8px 12px;font-size:13px;color:#403a4d;font-family:inherit;outline:none;min-width:0;}
.wb-input:focus{border-color:#b9b0ea;box-shadow:0 0 0 3px rgba(185,176,234,.2);}
.wb-input-row{display:flex;gap:8px;margin-top:12px;}
.wb-add-btn{border:none;background:linear-gradient(135deg,#b9b0ea,#8f86d8);color:#fff;font-size:13px;font-weight:600;padding:8px 16px;border-radius:10px;cursor:pointer;flex-shrink:0;font-family:inherit;transition:opacity .15s;}
.wb-add-btn:hover{opacity:.88;}
.wb-empty{font-size:12px;color:#a8a0bc;padding:10px 4px;text-align:center;}
.wb-budget-hero{display:flex;align-items:baseline;gap:8px;}
.wb-budget-num{font-size:30px;font-weight:800;color:#38315c;}
.wb-budget-track{height:10px;border-radius:6px;background:#efeaf6;overflow:hidden;margin-top:10px;}
.wb-budget-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,#c9c2f2,#8f86d8);}
.wb-budget-meta{font-size:12px;color:#8a83a8;margin-top:8px;}
.wb-goal-row{padding:10px;border-radius:10px;background:#f8f5f0;border:1px solid #f0eae0;}
.wb-goal-top{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
.wb-goal-title{flex:1;font-size:13px;color:#4a4460;min-width:0;}
.wb-goal-pct{font-size:12px;font-weight:800;color:#8f86d8;}
.wb-range{width:100%;accent-color:#8f86d8;height:4px;}
.wb-range-wrap{display:flex;align-items:center;gap:10px;}
.wb-range-wrap input{flex:1;}
.wb-task-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;background:#f8f5f0;border:1px solid #f0eae0;}
.wb-task-row.done .wb-task-text{text-decoration:line-through;color:#a8a0bc;}
.wb-task-text{flex:1;font-size:13px;color:#4a4460;min-width:0;}
.wb-del-btn{border:none;background:none;color:#c3bcd8;font-size:14px;cursor:pointer;padding:2px 6px;border-radius:6px;flex-shrink:0;}
.wb-del-btn:hover{color:#e2888f;background:#fbeef0;}
.wb-page-head{display:flex;align-items:center;gap:12px;margin-bottom:2px;}
.wb-page-head-icon{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#eee9fa,#e2dcf5);display:flex;align-items:center;justify-content:center;font-size:18px;}
.wb-page-head-title{font-size:19px;font-weight:800;color:#38315c;}
.wb-page-head-sub{font-size:12px;color:#8a83a8;margin-top:2px;}
.wb-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:90px 20px;gap:10px;background:#fffdf8;border:1px dashed #ddd5ee;border-radius:18px;}
.wb-placeholder-icon{font-size:40px;}
.wb-placeholder-title{font-size:16px;font-weight:800;color:#3c3560;}
.wb-placeholder-sub{font-size:12.5px;color:#8a83a8;}
.wb-loading{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#f5f0e8;color:#8a83a8;font-size:14px;}
.wb-open-btn{display:flex;align-items:center;gap:8px;border:none;background:linear-gradient(135deg,#a99fe2,#8f86d8);color:#fff;font-size:13px;font-weight:600;cursor:pointer;padding:7px 12px;border-radius:9px;font-family:inherit;transition:opacity .15s;margin:2px;box-shadow:0 2px 8px rgba(143,134,216,.25);}
.wb-open-btn:hover{opacity:.88;}
.wb-open-btn .wb-open-icon{font-size:15px;}
.wb-head-btn{display:inline-flex;align-items:center;gap:6px;border:none;background:linear-gradient(135deg,#a99fe2,#8f86d8);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;padding:6px 12px;border-radius:9px;font-family:inherit;transition:opacity .15s;box-shadow:0 2px 8px rgba(143,134,216,.25);}
.wb-head-btn:hover{opacity:.88;}
.wb-fab{position:fixed;right:18px;bottom:210px;z-index:2147483100;display:flex;align-items:center;gap:8px;border:none;background:linear-gradient(135deg,#a99fe2,#8f86d8);color:#fff;font-size:14px;font-weight:700;cursor:pointer;padding:12px 18px;border-radius:999px;font-family:inherit;box-shadow:0 6px 20px rgba(143,134,216,.45);transition:opacity .15s,transform .15s;pointer-events:auto;}
.wb-fab:hover{opacity:.9;transform:translateY(-1px);}
.wb-fab-icon{font-size:17px;}
.wb-main::-webkit-scrollbar,.wb-sidebar::-webkit-scrollbar{width:8px;}
.wb-main::-webkit-scrollbar-thumb,.wb-sidebar::-webkit-scrollbar-thumb{background:#d9d2ea;border-radius:4px;}
@media (max-width:900px){.wb-sidebar{width:64px;padding:16px 8px;}.wb-nav-item span:last-child,.wb-logo>div:last-child,.wb-sidebar-foot .wb-nav-item span:last-child{display:none;}.wb-main{padding:18px 14px 30px;}}
`
    styles.insert(CSS)

    // ------- 打开状态（模块级，跨 Slot 共享） -------
    const listeners = new Set()
    let open = false
    function setOpen(v) { open = v; listeners.forEach((f) => f(v)) }
    function useOpen() {
      const [s, setS] = React.useState(open)
      React.useEffect(() => { listeners.add(setS); return () => { listeners.delete(setS) } }, [])
      return s
    }

    // ------- 工具 -------
    const pad = (n) => String(n).padStart(2, '0')
    function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }
    const WEEK = ['日', '一', '二', '三', '四', '五', '六']
    function greeting() { const hh = new Date().getHours(); return hh < 6 ? '夜深了 🌙' : hh < 12 ? '早上好 👋' : hh < 18 ? '下午好 ☀️' : '晚上好 🌙' }
    const uid = () => Math.random().toString(36).slice(2, 9)

    function defaults() {
      const now = new Date()
      const key = dateKey(now)
      const yk = dateKey(new Date(now.getTime() - 86400000))
      return {
        dateKey: key,
        tasks: { [key]: [], [yk]: [] },
        habits: [
          { id: 'h1', icon: '💧', name: '每天1.5L水', done: false },
          { id: 'h2', icon: '💤', name: '晚上12:30前睡觉', done: false },
          { id: 'h3', icon: '✍️', name: 'DONE LIST', done: false },
          { id: 'h4', icon: '🧗', name: '每周攀岩至少2次', done: false },
        ],
        schedule: [{ id: 's1', time: '09:30', text: '拍摄视频并剪辑', done: false }],
        briefings: [
          { id: 'b1', title: 'OpenRouter 并入 Stripe：AI 路由巨头为何选支付公司当靠山？', tag: '选题雷达' },
          { id: 'b2', title: '宇树上市首日造富 40 亿，王兴兴首谈「大脑」技术路线', tag: '选题雷达' },
          { id: 'b3', title: 'OpenAI 推出前沿模型零数据留存，企业客户终于能放心用 API？', tag: '选题雷达' },
          { id: 'b4', title: '为前沿模型提供零数据留存 / Zero-Data...', tag: '选题雷达' },
        ],
        budget: { total: 8000, spent: 3200 },
        goals: [
          { id: 'g1', title: '季度 OKR：内容矩阵 12 篇', progress: 40 },
          { id: 'g2', title: '读完《爱的博弈》', progress: 60 },
        ],
        books: { reading: 2, finished: 2 },
        streak: 1,
        quote: '“信任的建立，在于你是否愿意在对方需要时，放下自己的防御去回应他。” —《爱的博弈：建立信任、避免背叛与不忠》',
      }
    }

    // 数据兜底：任何输入都补全默认字段，防止渲染崩溃
    function normalize(d) {
      const base = defaults()
      const now = new Date()
      const key = dateKey(now)
      d = d && typeof d === 'object' ? d : {}
      const out = Object.assign({}, base, d)
      if (!out.tasks || typeof out.tasks !== 'object') out.tasks = {}
      if (out.dateKey !== key) {
        const yk = dateKey(new Date(now.getTime() - 86400000))
        const yList = (out.tasks[out.dateKey] || []).filter((t) => !t.done)
        out.tasks[yk] = (out.tasks[yk] || []).concat(yList)
        out.tasks[key] = (out.tasks[key] || []).concat(out.tasks[out.dateKey] ? out.tasks[out.dateKey].filter((t) => t.done) : [])
        out.dateKey = key
        out.habits = (out.habits || []).map((x) => Object.assign({}, x, { done: false }))
        out.schedule = (out.schedule || []).map((x) => Object.assign({}, x, { done: false }))
      }
      if (!out.habits || !out.habits.length) out.habits = base.habits
      if (!out.schedule || !out.schedule.length) out.schedule = base.schedule
      if (!out.briefings || !out.briefings.length) out.briefings = base.briefings
      if (!out.budget || typeof out.budget.total !== 'number') out.budget = base.budget
      if (!Array.isArray(out.goals)) out.goals = base.goals
      if (!out.books || typeof out.books.reading !== 'number') out.books = base.books
      if (typeof out.streak !== 'number') out.streak = base.streak
      if (!out.quote) out.quote = base.quote
      return out
    }

    const NAV = [
      { id: 'board', icon: '📊', label: '看板' },
      { id: 'brief', icon: '🔥', label: '热点简报' },
      { id: 'schedule', icon: '🗓', label: '工作日程' },
      { id: 'budget', icon: '💳', label: '开销记账' },
      { id: 'topic', icon: '🎯', label: '选题库' },
      { id: 'books', icon: '📚', label: '读书管理' },
      { id: 'habits', icon: '🌱', label: '习惯打卡' },
      { id: 'goals', icon: '🏆', label: '目标管理' },
      { id: 'review', icon: '🔁', label: '自动复盘' },
      { id: 'center', icon: '✅', label: '任务中心' },
      { id: 'tasks', icon: '✍️', label: '完成清单' },
      { id: 'settings', icon: '⚙️', label: '设置' },
    ]

    // ------- 原子组件 -------
    function Check(props) {
      return h('button', { className: 'wb-check' + (props.done ? ' on' : ''), onClick: props.onClick, title: props.done ? '标记未完成' : '标记完成' }, props.done ? '✓' : '')
    }
    function DelBtn(props) { return h('button', { className: 'wb-del-btn', onClick: props.onClick, title: '删除' }, '✕') }
    function Panel(props) {
      const head = h('div', { className: 'wb-panel-head' },
        h('div', { className: 'wb-panel-title' }, props.title),
        props.action ? h('button', { className: 'wb-panel-link', onClick: props.action.onClick }, props.action.text) : null)
      return h('div', { className: 'wb-panel ' + (props.className || '') }, head, props.children)
    }
    function InputRow(props) {
      return h('div', { className: 'wb-input-row' },
        h('input', { className: 'wb-input', placeholder: props.placeholder, value: props.value, onChange: (e) => { if (props.onChange) props.onChange(e.target.value) }, onKeyDown: (e) => { if (e.key === 'Enter') props.onAdd() } }),
        h('button', { className: 'wb-add-btn', onClick: props.onAdd }, props.addText || '记录'))
    }
    function KpiCard(props) {
      const bar = props.bar ? h('div', { className: 'wb-kpi-bar' },
        h('div', { className: 'wb-kpi-bar-track' }, h('div', { className: 'wb-kpi-bar-fill', style: { width: Math.min(100, props.bar.pct) + '%' } })),
        h('div', { className: 'wb-kpi-bar-text' }, props.bar.text + ' ' + Math.min(100, props.bar.pct) + '%')) : null
      const sub = props.sub ? h('div', { className: 'wb-kpi-sub' }, props.sub) : null
      return h('div', { className: 'wb-kpi' },
        h('div', { className: 'wb-kpi-icon' }, props.icon),
        h('div', { className: 'wb-kpi-value' }, String(props.value), h('span', { className: 'wb-kpi-unit' }, ' ' + props.unit)),
        h('div', { className: 'wb-kpi-label' }, props.label), sub, bar)
    }

    // ------- 侧边栏 -------
    function Sidebar(p) {
      return h('div', { className: 'wb-sidebar' },
        h('div', { className: 'wb-logo' },
          h('div', { className: 'wb-logo-icon' }, '💼'),
          h('div', null, h('div', { className: 'wb-logo-name' }, '我的工作台'), h('div', { className: 'wb-logo-sub' }, 'LIGHT WAVE LAB'))),
        h('div', { className: 'wb-nav' }, NAV.map((n) => h('button', {
          key: n.id,
          className: 'wb-nav-item' + (p.page === n.id ? ' active' : ''),
          onClick: () => p.setPage(n.id),
        }, h('span', { className: 'wb-nav-icon' }, n.icon), h('span', null, n.label)))),
        h('div', { className: 'wb-sidebar-foot' },
          h('button', { className: 'wb-nav-item', onClick: p.onClose },
            h('span', { className: 'wb-nav-icon' }, '🚪'), h('span', null, '关闭工作台'))))
    }

    // ------- 看板页 -------
    function BoardPage(p) {
      const now = new Date()
      const dateLine = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 星期' + WEEK[now.getDay()] + ' · LIGHT WAVE LAB'
      const hero = h('div', { className: 'wb-hero' },
        h('div', { className: 'wb-hero-left' },
          h('div', { className: 'wb-hero-title' }, greeting() + ' 今天也要稳步向前'),
          h('div', { className: 'wb-hero-date' }, dateLine),
          h('div', { className: 'wb-hero-quote' }, p.data.quote || '')),
        h('button', { className: 'wb-close-btn', onClick: p.onClose, title: '关闭工作台' }, '✕'))

      const budgetPct = p.data.budget.total > 0 ? Math.round((p.data.budget.spent / p.data.budget.total) * 100) : 0
      const kpis = [
        { icon: '✅', value: p.doneToday, unit: '条记录', label: '今日完成' },
        { icon: '🔥', value: p.data.streak || 0, unit: '天', label: '最长连续打卡', sub: '习惯坚持' },
        { icon: '📚', value: p.data.books.reading, unit: '本', label: '在读', sub: '共读完 ' + p.data.books.finished + ' 本' },
        { icon: '🏆', value: p.activeGoals, unit: '个', label: '进行中目标', sub: 'OKR' },
        { icon: '📰', value: (p.data.briefings || []).length, unit: '篇', label: '本周简报', sub: 'AI 热点' },
      ]
      const kpiGrid = h('div', { className: 'wb-kpi-grid' }, kpis.map((k, i) => h(KpiCard, Object.assign({ key: i }, k))))

      const schedPanel = h(Panel, { title: '🗓 今日日程', action: { text: '管理日程 →', onClick: () => p.setPage('schedule') } },
        h('div', { className: 'wb-list' }, (p.data.schedule || []).map((s) => h('div', { key: s.id, className: 'wb-sched-row' + (s.done ? ' done' : '') },
          h('div', { className: 'wb-sched-time' }, s.time || ''),
          h('div', { className: 'wb-sched-text' }, s.text),
          h(Check, { done: s.done, onClick: () => p.toggle('schedule', s.id) }),
          h(DelBtn, { onClick: () => p.del('schedule', s.id) })))))

      const briefPanel = h(Panel, { title: '📰 最新 AI 简报', action: { text: '去热点简报 →', onClick: () => p.setPage('brief') } },
        h('div', { className: 'wb-list' }, (p.data.briefings || []).slice(0, 4).map((b, i) => h('div', { key: b.id, className: 'wb-brief-row' },
          h('div', { className: 'wb-brief-num' }, String(i + 1).padStart(2, '0')),
          h('div', { className: 'wb-brief-text' }, b.title),
          h('span', { className: 'wb-brief-tag' }, b.tag || '选题')))),
        h('div', { style: { fontSize: 11, color: '#a099b8', marginTop: 10, textAlign: 'center' } }, '四任务重点聚合 · 每日自动更新'))

      const habitPanel = h(Panel, { title: '🌱 今日习惯', action: { text: '全部 →', onClick: () => p.setPage('habits') } },
        h('div', { className: 'wb-list' }, (p.data.habits || []).map((x) => h('div', { key: x.id, className: 'wb-habit-row' + (x.done ? ' done' : '') },
          h('span', { className: 'wb-habit-icon' }, x.icon || '⭐'),
          h('span', { className: 'wb-habit-name' }, x.name),
          h(Check, { done: x.done, onClick: () => p.toggle('habits', x.id) }),
          h(DelBtn, { onClick: () => p.del('habits', x.id) })))))

      const row3 = h('div', { className: 'wb-row3' }, schedPanel, briefPanel, habitPanel)

      const todayPanel = h(Panel, { title: '✍️ 今日完成清单 · 快速记录', action: { text: p.doneToday + ' 条', onClick: () => p.setPage('tasks') } },
        h('div', { className: 'wb-list' }, p.todayTasks.length ? p.todayTasks.map((t) => h('div', { key: t.id, className: 'wb-task-row' + (t.done ? ' done' : '') },
          h(Check, { done: t.done, onClick: () => p.toggleTask(t.id) }),
          h('span', { className: 'wb-task-text' }, t.text),
          h(DelBtn, { onClick: () => p.delTask(t.id) }))) : h('div', { className: 'wb-empty' }, '刚做完的事顺手记一条，回车记录 ✍️')),
        h(InputRow, { placeholder: '刚做完的事顺手记一条，回车记录', value: p.taskInput, onChange: p.setTaskInput, onAdd: p.addTask }))

      const yesterdayPanel = h(Panel, { title: '✅ 昨天完成清单', action: { text: p.yesterdayTasks.length + ' 条', onClick: () => p.setPage('tasks') } },
        h('div', { className: 'wb-list' }, p.yesterdayTasks.length ? p.yesterdayTasks.slice(0, 6).map((t) => h('div', { key: t.id, className: 'wb-task-row' + (t.done ? ' done' : '') },
          h(Check, { done: t.done, onClick: () => p.toggleYesterday(t.id) }),
          h('span', { className: 'wb-task-text' }, t.text),
          h(DelBtn, { onClick: () => p.delYesterday(t.id) }))) : h('div', { className: 'wb-empty' }, '补记昨天完成的事，回车记录 ✍️')),
        h(InputRow, { placeholder: '补记昨天完成的事，回车记录', value: p.yInput, onChange: p.setYInput, onAdd: p.addYesterday, addText: '补记' }))

      const budgetPanel = h(Panel, { title: '💳 本月预算', action: { text: '明细 →', onClick: () => p.setPage('budget') } },
        h('div', { className: 'wb-budget-hero' },
          h('div', { className: 'wb-budget-num' }, String(p.balance)),
          h('span', { style: { fontSize: 12, color: '#8a83a8' } }, '元 可支配余额')),
        h('div', { className: 'wb-budget-track' }, h('div', { className: 'wb-budget-fill', style: { width: Math.min(100, budgetPct) + '%' } })),
        h('div', { className: 'wb-budget-meta' }, '已支出 ' + p.data.budget.spent + ' / ' + p.data.budget.total + ' 元 · ' + budgetPct + '%'))

      const goalPanel = h(Panel, { title: '🎯 目标进度', action: { text: '管理 →', onClick: () => p.setPage('goals') } },
        h('div', { className: 'wb-list' }, (p.data.goals || []).slice(0, 4).map((g) => h('div', { key: g.id, className: 'wb-goal-row' },
          h('div', { className: 'wb-goal-top' },
            h('span', { className: 'wb-goal-title' }, g.title),
            h('span', { className: 'wb-goal-pct' }, (g.progress || 0) + '%')),
          h('div', { className: 'wb-budget-track' }, h('div', { className: 'wb-budget-fill', style: { width: Math.min(100, g.progress || 0) + '%' } }))))))

      const grid2 = h('div', { className: 'wb-grid2' }, todayPanel, yesterdayPanel, budgetPanel, goalPanel)
      return h('div', { className: 'wb-page' }, hero, kpiGrid, row3, grid2)
    }

    // ------- 页头 -------
    function PageHead(props) {
      return h('div', { className: 'wb-panel' },
        h('div', { className: 'wb-page-head' },
          h('div', { className: 'wb-page-head-icon' }, props.icon),
          h('div', null,
            h('div', { className: 'wb-page-head-title' }, props.title),
            h('div', { className: 'wb-page-head-sub' }, props.sub || ''))),
        props.children)
    }

    // ------- 工作日程页 -------
    function SchedulePage(p) {
      const [text, setText] = React.useState('')
      const [time, setTime] = React.useState('')
      function add() {
        if (!text.trim()) return
        p.update((d) => { d.schedule.push({ id: uid(), time: time.trim() || '全天', text: text.trim(), done: false }) })
        setText('')
      }
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🗓', title: '工作日程', sub: '安排今天的重点事项' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, (p.data.schedule || []).map((s) => h('div', { key: s.id, className: 'wb-sched-row' + (s.done ? ' done' : '') },
            h('div', { className: 'wb-sched-time' }, s.time || '全天'),
            h('div', { className: 'wb-sched-text' }, s.text),
            h(Check, { done: s.done, onClick: () => p.update((d) => { const x = d.schedule.find((y) => y.id === s.id); if (x) x.done = !x.done }) }),
            h(DelBtn, { onClick: () => p.update((d) => { d.schedule = d.schedule.filter((y) => y.id !== s.id) }) })))),
          h('div', { className: 'wb-input-row', style: { marginTop: 14 } },
            h('input', { className: 'wb-input', placeholder: '时间，如 14:00', value: time, onChange: (e) => setTime(e.target.value), style: { maxWidth: 120 } }),
            h('input', { className: 'wb-input', placeholder: '事项内容', value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') add() } }),
            h('button', { className: 'wb-add-btn', onClick: add }, '添加'))))
    }

    // ------- 习惯打卡页 -------
    function HabitsPage(p) {
      const [name, setName] = React.useState('')
      function add() {
        if (!name.trim()) return
        p.update((d) => { d.habits.push({ id: uid(), icon: '⭐', name: name.trim(), done: false }) })
        setName('')
      }
      const doneCount = (p.data.habits || []).filter((x) => x.done).length
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🌱', title: '习惯打卡', sub: '今日完成 ' + doneCount + ' / ' + (p.data.habits || []).length + ' · 最长连续 ' + (p.data.streak || 0) + ' 天' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, (p.data.habits || []).map((x) => h('div', { key: x.id, className: 'wb-habit-row' + (x.done ? ' done' : '') },
            h('span', { className: 'wb-habit-icon' }, x.icon || '⭐'),
            h('span', { className: 'wb-habit-name' }, x.name),
            h(Check, { done: x.done, onClick: () => p.update((d) => { const y = d.habits.find((z) => z.id === x.id); if (y) y.done = !y.done }) }),
            h(DelBtn, { onClick: () => p.update((d) => { d.habits = d.habits.filter((z) => z.id !== x.id) }) })))),
          h(InputRow, { placeholder: '新增习惯，如：每天读书 30 分钟', value: name, onChange: setName, onAdd: add, addText: '添加' })))
    }

    // ------- 开销记账页 -------
    function BudgetPage(p) {
      const b = p.data.budget
      const pct = b.total > 0 ? Math.round((b.spent / b.total) * 100) : 0
      const setNum = (key) => (e) => {
        const v = Number(e.target.value)
        p.update((d) => { d.budget[key] = isNaN(v) || v < 0 ? 0 : v })
      }
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '💳', title: '开销记账', sub: '本月收支概览' },
          h('div', { className: 'wb-grid2', style: { marginTop: 16 } },
            h('div', { className: 'wb-panel' },
              h('div', { className: 'wb-panel-title' }, '本月预算'),
              h('div', { className: 'wb-budget-hero', style: { marginTop: 12 } },
                h('div', { className: 'wb-budget-num' }, String(b.total - b.spent)),
                h('span', { style: { fontSize: 12, color: '#8a83a8' } }, '元 可支配')),
              h('div', { className: 'wb-budget-track' }, h('div', { className: 'wb-budget-fill', style: { width: Math.min(100, pct) + '%' } })),
              h('div', { className: 'wb-budget-meta' }, '已支出 ' + b.spent + ' / ' + b.total + ' 元 · ' + pct + '%'),
              h('div', { className: 'wb-input-row' },
                h('input', { className: 'wb-input', type: 'number', min: 0, placeholder: '预算总额', value: String(b.total), onChange: setNum('total') }),
                h('input', { className: 'wb-input', type: 'number', min: 0, placeholder: '已支出', value: String(b.spent), onChange: setNum('spent') }))),
            h('div', { className: 'wb-panel' },
              h('div', { className: 'wb-panel-title' }, '记账提示'),
              h('div', { style: { fontSize: 13, color: '#6d6590', lineHeight: 1.8, marginTop: 10 } },
                '· 输入数字即时更新预算进度\n· 可支配余额 = 总额 − 已支出\n· 建议每月初重置预算额度')))))
    }

    // ------- 目标管理页 -------
    function GoalsPage(p) {
      const [title, setTitle] = React.useState('')
      function add() {
        if (!title.trim()) return
        p.update((d) => { d.goals.push({ id: uid(), title: title.trim(), progress: 0 }) })
        setTitle('')
      }
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🏆', title: '目标管理', sub: '跟踪 OKR 与长期目标进度' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, (p.data.goals || []).map((g) => h('div', { key: g.id, className: 'wb-goal-row' },
            h('div', { className: 'wb-goal-top' },
              h('span', { className: 'wb-goal-title' }, g.title),
              h('span', { className: 'wb-goal-pct' }, (g.progress || 0) + '%'),
              h(DelBtn, { onClick: () => p.update((d) => { d.goals = d.goals.filter((x) => x.id !== g.id) }) })),
            h('div', { className: 'wb-range-wrap' },
              h('input', { className: 'wb-range', type: 'range', min: 0, max: 100, step: 5, value: g.progress || 0, onChange: (e) => p.update((d) => { const x = d.goals.find((y) => y.id === g.id); if (x) x.progress = Number(e.target.value) }) }))))),
          h(InputRow, { placeholder: '新增目标，如：读完 12 本书', value: title, onChange: setTitle, onAdd: add, addText: '添加' })))
    }

    // ------- 完成清单页 -------
    function TasksPage(p) {
      const [input, setInput] = React.useState('')
      const [yInput, setYInput] = React.useState('')
      function addToday() {
        if (!input.trim()) return
        p.update((d) => { d.tasks[p.todayKey] = (d.tasks[p.todayKey] || []).concat({ id: uid(), text: input.trim(), done: false }) })
        setInput('')
      }
      function addYesterday() {
        if (!yInput.trim()) return
        p.update((d) => { d.tasks[p.yesterdayKey] = (d.tasks[p.yesterdayKey] || []).concat({ id: uid(), text: yInput.trim(), done: false }) })
        setYInput('')
      }
      const doneCount = p.todayTasks.filter((t) => t.done).length
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '✍️', title: '完成清单', sub: '今日已记 ' + doneCount + ' / ' + p.todayTasks.length + ' 条' },
          h('div', { className: 'wb-grid2', style: { marginTop: 16 } },
            h('div', { className: 'wb-panel' },
              h('div', { className: 'wb-panel-title' }, '今日完成'),
              h('div', { className: 'wb-list', style: { marginTop: 10 } }, p.todayTasks.length ? p.todayTasks.map((t) => h('div', { key: t.id, className: 'wb-task-row' + (t.done ? ' done' : '') },
                h(Check, { done: t.done, onClick: () => p.update((d) => { d.tasks[p.todayKey] = (d.tasks[p.todayKey] || []).map((x) => x.id === t.id ? Object.assign({}, x, { done: !x.done }) : x) }) }),
                h('span', { className: 'wb-task-text' }, t.text),
                h(DelBtn, { onClick: () => p.update((d) => { d.tasks[p.todayKey] = (d.tasks[p.todayKey] || []).filter((x) => x.id !== t.id) }) }))) : h('div', { className: 'wb-empty' }, '今天还没有记录')),
              h(InputRow, { placeholder: '刚做完的事，回车记录', value: input, onChange: setInput, onAdd: addToday })),
            h('div', { className: 'wb-panel' },
              h('div', { className: 'wb-panel-title' }, '昨天完成'),
              h('div', { className: 'wb-list', style: { marginTop: 10 } }, p.yesterdayTasks.length ? p.yesterdayTasks.map((t) => h('div', { key: t.id, className: 'wb-task-row' + (t.done ? ' done' : '') },
                h(Check, { done: t.done, onClick: () => p.update((d) => { d.tasks[p.yesterdayKey] = (d.tasks[p.yesterdayKey] || []).map((x) => x.id === t.id ? Object.assign({}, x, { done: !x.done }) : x) }) }),
                h('span', { className: 'wb-task-text' }, t.text),
                h(DelBtn, { onClick: () => p.update((d) => { d.tasks[p.yesterdayKey] = (d.tasks[p.yesterdayKey] || []).filter((x) => x.id !== t.id) }) }))) : h('div', { className: 'wb-empty' }, '昨天没有记录')),
              h(InputRow, { placeholder: '补记昨天的完成，回车记录', value: yInput, onChange: setYInput, onAdd: addYesterday, addText: '补记' })))))
    }

    // ------- 热点简报页 -------
    function BriefingsPage(p) {
      const [input, setInput] = React.useState('')
      function add() {
        if (!input.trim()) return
        p.update((d) => { d.briefings.unshift({ id: uid(), title: input.trim(), tag: '选题雷达' }) })
        setInput('')
      }
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🔥', title: '热点简报', sub: '四任务重点聚合 · 每日自动更新' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, (p.data.briefings || []).map((b, i) => h('div', { key: b.id, className: 'wb-brief-row' },
            h('div', { className: 'wb-brief-num' }, String(i + 1).padStart(2, '0')),
            h('div', { className: 'wb-brief-text' }, b.title),
            h('span', { className: 'wb-brief-tag' }, b.tag || '选题'),
            h(DelBtn, { onClick: () => p.update((d) => { d.briefings = d.briefings.filter((x) => x.id !== b.id) }) })))),
          h(InputRow, { placeholder: '手动收录一条热点', value: input, onChange: setInput, onAdd: add, addText: '收录' })))
    }

    // ------- 占位页 -------
    function Placeholder(props) {
      const nav = NAV.find((n) => n.id === props.id) || {}
      return h('div', { className: 'wb-page' },
        h('div', { className: 'wb-placeholder' },
          h('div', { className: 'wb-placeholder-icon' }, nav.icon || '🚧'),
          h('div', { className: 'wb-placeholder-title' }, (nav.label || '') + ' · 建设中'),
          h('div', { className: 'wb-placeholder-sub' }, '该模块正在打磨，敬请期待')))
    }

    // ------- 工作台主体 -------
    function Workbench(props) {
      const [data, setData] = React.useState(null)
      const [page, setPage] = React.useState('board')
      const [taskInput, setTaskInput] = React.useState('')
      const [yInput, setYInput] = React.useState('')
      React.useEffect(() => {
        let alive = true
        host.call('wb:load').then((d) => { if (alive) setData(normalize(d)) }).catch(() => { if (alive) setData(normalize(null)) })
        return () => { alive = false }
      }, [])
      function update(fn) {
        setData((prev) => {
          const base = prev || {}
          const next = JSON.parse(JSON.stringify(base))
          fn(next)
          const norm = normalize(next)
          host.call('wb:save', norm).catch(() => {})
          return norm
        })
      }
      if (!data) return h('div', { className: 'wb-loading' }, '工作台加载中…')

      const todayKey = dateKey(new Date())
      const yesterdayKey = dateKey(new Date(Date.now() - 86400000))
      const todayTasks = data.tasks[todayKey] || []
      const yesterdayTasks = data.tasks[yesterdayKey] || []
      const doneToday = todayTasks.filter((t) => t.done).length
      const balance = (data.budget.total || 0) - (data.budget.spent || 0)
      const activeGoals = (data.goals || []).filter((g) => (g.progress || 0) < 100).length

      function toggleTask(id) { update((d) => { d.tasks[todayKey] = (d.tasks[todayKey] || []).map((x) => x.id === id ? Object.assign({}, x, { done: !x.done }) : x) }) }
      function delTask(id) { update((d) => { d.tasks[todayKey] = (d.tasks[todayKey] || []).filter((x) => x.id !== id) }) }
      function addTask() { if (!taskInput.trim()) return; update((d) => { d.tasks[todayKey] = (d.tasks[todayKey] || []).concat({ id: uid(), text: taskInput.trim(), done: false }) }); setTaskInput('') }
      function toggleYesterday(id) { update((d) => { d.tasks[yesterdayKey] = (d.tasks[yesterdayKey] || []).map((x) => x.id === id ? Object.assign({}, x, { done: !x.done }) : x) }) }
      function delYesterday(id) { update((d) => { d.tasks[yesterdayKey] = (d.tasks[yesterdayKey] || []).filter((x) => x.id !== id) }) }
      function addYesterday() { if (!yInput.trim()) return; update((d) => { d.tasks[yesterdayKey] = (d.tasks[yesterdayKey] || []).concat({ id: uid(), text: yInput.trim(), done: false }) }); setYInput('') }
      function toggleList(key, id) { update((d) => { d[key] = (d[key] || []).map((x) => x.id === id ? Object.assign({}, x, { done: !x.done }) : x) }) }
      function delList(key, id) { update((d) => { d[key] = (d[key] || []).filter((x) => x.id !== id) }) }

      let content
      switch (page) {
        case 'board': content = h(BoardPage, { data, setPage, onClose: props.onClose, todayTasks, yesterdayTasks, doneToday, balance, activeGoals, taskInput, setTaskInput, yInput, setYInput, addTask, delTask, toggleTask, toggleYesterday, delYesterday, addYesterday, toggle: toggleList, del: delList }); break
        case 'schedule': content = h(SchedulePage, { data, update }); break
        case 'habits': content = h(HabitsPage, { data, update }); break
        case 'budget': content = h(BudgetPage, { data, update }); break
        case 'goals': content = h(GoalsPage, { data, update }); break
        case 'tasks': content = h(TasksPage, { data, update, todayKey, yesterdayKey, todayTasks, yesterdayTasks }); break
        case 'brief': content = h(BriefingsPage, { data, update }); break
        default: content = h(Placeholder, { id: page })
      }
      return h('div', { className: 'wb-root' },
        h(Sidebar, { page, setPage, onClose: props.onClose }),
        h('div', { className: 'wb-main' }, content))
    }

    // ------- Slot 注册 -------
    slots.inject('sidebar.footer.action', () => slots.register(
      { name: 'sidebar.footer.action', id: 'workbench.open', order: 20, label: '工作台' },
      (props) => h('button', { className: 'wb-open-btn', onClick: () => setOpen(!open), title: '打开个人工作台' },
        h('span', { className: 'wb-open-icon' }, '💼'),
        props.wide ? h('span', null, '工作台') : null)
    ))

    slots.inject('conversation.session.header.actions', () => slots.register(
      { name: 'conversation.session.header.actions', id: 'workbench.open', order: 20, label: '工作台' },
      () => h('button', { className: 'wb-head-btn', onClick: () => setOpen(!open), title: '打开个人工作台' },
        h('span', null, '💼 工作台'))
    ))

    slots.inject('shell.overlay', () => slots.register(
      { name: 'shell.overlay', id: 'workbench.dashboard' },
      () => {
        const isOpen = useOpen()
        const fab = h('button', { className: 'wb-fab', onClick: () => setOpen(true), title: '打开个人工作台' },
          h('span', { className: 'wb-fab-icon' }, '💼'), ' 工作台')
        if (!isOpen) return fab
        return h('div', null, fab, h(Workbench, { onClose: () => setOpen(false) }))
      }
    ))
  },
}
