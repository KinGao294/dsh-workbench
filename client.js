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
/* 对称等高布局：中排三栏 / 下排两栏 */
.wb-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;align-items:stretch;}
.wb-grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:stretch;}
.wb-row3 .wb-panel,.wb-grid2 .wb-panel{display:flex;flex-direction:column;height:100%;min-height:230px;}
.wb-row3 .wb-panel .wb-list,.wb-grid2 .wb-panel .wb-list{flex:1;}
.wb-panel .wb-list{flex:1;}
@media (max-width:1100px){.wb-row3{grid-template-columns:1fr 1fr;}.wb-grid2{grid-template-columns:1fr;}}
@media (max-width:760px){.wb-row3{grid-template-columns:1fr;}}
/* 日程时间线 */
.wb-sched-list{flex:1;display:flex;flex-direction:column;gap:0;}
.wb-sched-item{display:flex;gap:12px;padding:7px 4px;position:relative;}
.wb-sched-item:not(:last-child)::after{content:'';position:absolute;left:17px;top:28px;bottom:-6px;width:2px;background:#ece5f4;border-radius:1px;}
.wb-sched-dot{width:12px;height:12px;border-radius:50%;background:#fff;border:2.5px solid #b9b0ea;flex-shrink:0;margin-top:6px;}
.wb-sched-item.done .wb-sched-dot{background:#8f86d8;border-color:#8f86d8;}
.wb-sched-body{flex:1;min-width:0;}
.wb-sched-body .wb-sched-time{font-size:11px;font-weight:700;color:#8f86d8;background:none;padding:0;margin-bottom:2px;}
.wb-sched-body .wb-sched-text{font-size:13px;color:#4a4460;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.wb-sched-item.done .wb-sched-text{text-decoration:line-through;color:#a8a0bc;}
/* 习惯进度 */
.wb-habit-progress{height:8px;border-radius:5px;background:#efeaf6;overflow:hidden;margin-bottom:12px;}
.wb-habit-progress-fill{height:100%;border-radius:5px;background:linear-gradient(90deg,#c9c2f2,#8f86d8);}
/* OKR / KR */
.wb-okr-row{background:#f8f5f0;border:1px solid #f0eae0;border-radius:12px;padding:12px 14px;margin-bottom:10px;}
.wb-okr-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.wb-okr-title{flex:1;font-size:13.5px;font-weight:700;color:#3c3560;}
.wb-okr-pct{font-size:12px;font-weight:800;color:#8f86d8;}
.wb-kr-row{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;background:#fffdf8;margin-bottom:6px;}
.wb-kr-row:last-child{margin-bottom:0;}
.wb-kr-text{flex:1;font-size:12.5px;color:#4a4460;min-width:0;}
.wb-kr-pct{font-size:11.5px;font-weight:700;color:#8f86d8;width:36px;text-align:right;}
.wb-kr-add-row{display:flex;gap:6px;margin-top:8px;}
.wb-kr-input{flex:1;border:1px solid #e5def0;background:#fff;border-radius:8px;padding:5px 10px;font-size:12px;color:#403a4d;font-family:inherit;outline:none;min-width:0;}
.wb-kr-input:focus{border-color:#b9b0ea;}
.wb-kr-add-btn{border:none;background:linear-gradient(135deg,#b9b0ea,#8f86d8);color:#fff;font-size:12px;font-weight:600;padding:5px 12px;border-radius:8px;cursor:pointer;flex-shrink:0;font-family:inherit;}
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
.wb-loading{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#f5f0e8;color:#8a83a8;font-size:14px;}
.wb-open-btn{display:flex;align-items:center;gap:8px;border:none;background:linear-gradient(135deg,#a99fe2,#8f86d8);color:#fff;font-size:13px;font-weight:600;cursor:pointer;padding:7px 12px;border-radius:9px;font-family:inherit;transition:opacity .15s;margin:2px;box-shadow:0 2px 8px rgba(143,134,216,.25);}
.wb-open-btn:hover{opacity:.88;}
.wb-open-btn .wb-open-icon{font-size:15px;}
.wb-head-btn{display:inline-flex;align-items:center;gap:6px;border:none;background:linear-gradient(135deg,#a99fe2,#8f86d8);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;padding:6px 12px;border-radius:9px;font-family:inherit;transition:opacity .15s;box-shadow:0 2px 8px rgba(143,134,216,.25);}
.wb-head-btn:hover{opacity:.88;}
.wb-fab{position:fixed;right:18px;bottom:210px;z-index:2147483100;display:flex;align-items:center;gap:8px;border:none;background:linear-gradient(135deg,#a99fe2,#8f86d8);color:#fff;font-size:14px;font-weight:700;cursor:pointer;padding:12px 18px;border-radius:999px;font-family:inherit;box-shadow:0 6px 20px rgba(143,134,216,.45);transition:opacity .15s,transform .15s;pointer-events:auto;}
.wb-fab:hover{opacity:.9;transform:translateY(-1px);}
.wb-fab-icon{font-size:17px;}
.wb-chip{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:20px;flex-shrink:0;cursor:pointer;border:none;font-family:inherit;transition:opacity .15s;}
.wb-chip:hover{opacity:.85;}
.wb-chip-lavender{background:#eee9fa;color:#8f86d8;}
.wb-chip-green{background:#e3f3ea;color:#4a9a6e;}
.wb-chip-amber{background:#fdf0dd;color:#c98a2d;}
.wb-chip-blue{background:#e4effb;color:#4a86c4;}
.wb-chip-gray{background:#efeaf1;color:#8a83a8;}
.wb-review-card{background:#f8f5f0;border:1px solid #f0eae0;border-radius:12px;padding:12px 14px;}
.wb-review-date{font-size:11px;font-weight:700;color:#8f86d8;margin-bottom:6px;}
.wb-review-text{font-size:12.5px;color:#4a4460;line-height:1.7;white-space:pre-wrap;}
.wb-theme-swatch{width:34px;height:34px;border-radius:10px;border:2px solid transparent;cursor:pointer;transition:border-color .15s,transform .15s;}
.wb-theme-swatch:hover{transform:scale(1.08);}
.wb-theme-swatch.active{border-color:#3c3560;}
.wb-setting-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f0eae0;}
.wb-setting-row:last-child{border-bottom:none;}
.wb-setting-label{flex:1;font-size:13px;color:#4a4460;min-width:0;}
.wb-danger-btn{border:none;background:#fbeef0;color:#e2888f;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:10px;cursor:pointer;font-family:inherit;transition:opacity .15s;}
.wb-danger-btn:hover{opacity:.85;}
.wb-main::-webkit-scrollbar,.wb-sidebar::-webkit-scrollbar{width:8px;}
.wb-main::-webkit-scrollbar-thumb,.wb-sidebar::-webkit-scrollbar-thumb{background:#d9d2ea;border-radius:4px;}
@media (max-width:900px){.wb-sidebar{width:64px;padding:16px 8px;}.wb-nav-item span:last-child,.wb-logo>div:last-child,.wb-sidebar-foot .wb-nav-item span:last-child{display:none;}.wb-main{padding:18px 14px 30px;}}
`
    styles.insert(CSS)

    const listeners = new Set()
    let open = false
    function setOpen(v) { open = v; listeners.forEach((f) => f(v)) }
    function useOpen() {
      const [s, setS] = React.useState(open)
      React.useEffect(() => { listeners.add(setS); return () => { listeners.delete(setS) } }, [])
      return s
    }

    const pad = (n) => String(n).padStart(2, '0')
    function dateKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }
    const WEEK = ['日', '一', '二', '三', '四', '五', '六']
    function greeting() { const hh = new Date().getHours(); return hh < 6 ? '夜深了 🌙' : hh < 12 ? '早上好 👋' : hh < 18 ? '下午好 ☀️' : '晚上好 🌙' }
    const uid = () => Math.random().toString(36).slice(2, 9)
    const THEMES = {
      lavender: { accent: '#8f86d8', accent2: '#b9b0ea', dark: '#5b4fae' },
      mint: { accent: '#5fae8c', accent2: '#a8dcc4', dark: '#3e8f72' },
      peach: { accent: '#e3916f', accent2: '#f2c0a8', dark: '#c96f4e' },
      ocean: { accent: '#5b93c9', accent2: '#a5c8e8', dark: '#3b76ad' }
    }
    const THEME_LABELS = { lavender: '薰衣草', mint: '薄荷', peach: '蜜桃', ocean: '海洋' }

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
          { id: 'h4', icon: '🧗', name: '每周攀岩至少2次', done: false }
        ],
        schedule: [{ id: 's1', time: '09:30', text: '拍摄视频并剪辑', done: false }],
        briefings: [
          { id: 'b1', title: 'OpenRouter 并入 Stripe：AI 路由巨头为何选支付公司当靠山？', tag: '选题雷达' },
          { id: 'b2', title: '宇树上市首日造富 40 亿，王兴兴首谈「大脑」技术路线', tag: '选题雷达' },
          { id: 'b3', title: 'OpenAI 推出前沿模型零数据留存，企业客户终于能放心用 API？', tag: '选题雷达' },
          { id: 'b4', title: '为前沿模型提供零数据留存 / Zero-Data...', tag: '选题雷达' }
        ],
        budget: { total: 8000, spent: 3200 },
        goals: [
          { id: 'g1', title: '季度 OKR：内容矩阵 12 篇', progress: 53, krs: [
            { id: 'kr11', title: '发布 3 篇深度长文', progress: 60 },
            { id: 'kr12', title: '小红书周更 2 条', progress: 50 },
            { id: 'kr13', title: '视频号月更 4 条', progress: 50 }
          ] },
          { id: 'g2', title: '读完《爱的博弈》', progress: 60, krs: [
            { id: 'kr21', title: '精读全书', progress: 70 },
            { id: 'kr22', title: '输出读书笔记', progress: 50 }
          ] }
        ],
        books: { reading: 2, finished: 2 },
        streak: 1,
        quote: '“信任的建立，在于你是否愿意在对方需要时，放下自己的防御去回应他。” —《爱的博弈：建立信任、避免背叛与不忠》',
        topics: [
          { id: 'tp1', title: 'AI 编程助手赛道观察：从 Copilot 到 Agent', tag: 'AI', status: '待写' },
          { id: 'tp2', title: '大模型私有化部署的成本账', tag: 'AI', status: '写作中' },
          { id: 'tp3', title: '内容创作者的工具链 2026', tag: '创作', status: '已发布' }
        ],
        bookList: [
          { id: 'bk1', title: '爱的博弈', author: '约翰·戈特曼', status: 'reading', progress: 60 },
          { id: 'bk2', title: '思考，快与慢', author: '丹尼尔·卡尼曼', status: 'finished', progress: 100 },
          { id: 'bk3', title: '纳瓦尔宝典', author: '埃里克·乔根森', status: 'wish', progress: 0 }
        ],
        reviews: [],
        centerTasks: [
          { id: 'ct1', title: '整理本周工作重点', priority: '高', done: false },
          { id: 'ct2', title: '给工作台写开源 README', priority: '中', done: false },
          { id: 'ct3', title: '预约下周例会', priority: '低', done: false }
        ],
        settings: { userName: '我的', theme: 'lavender' }
      }
    }

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
      out.goals.forEach((g) => { if (!Array.isArray(g.krs)) g.krs = [] })
      if (!out.books || typeof out.books.reading !== 'number') out.books = base.books
      if (typeof out.streak !== 'number') out.streak = base.streak
      if (!out.quote) out.quote = base.quote
      if (!Array.isArray(out.topics)) out.topics = base.topics
      if (!Array.isArray(out.bookList)) out.bookList = base.bookList
      if (!Array.isArray(out.reviews)) out.reviews = []
      if (!Array.isArray(out.centerTasks)) out.centerTasks = base.centerTasks
      if (!out.settings || typeof out.settings !== 'object') out.settings = base.settings
      if (!out.settings.theme || !THEMES[out.settings.theme]) out.settings.theme = 'lavender'
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
      { id: 'settings', icon: '⚙️', label: '设置' }
    ]

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
    function Chip(props) {
      return h('button', { className: 'wb-chip wb-chip-' + (props.color || 'gray'), onClick: props.onClick, title: props.title || '' }, props.children)
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
    function PageHead(props) {
      return h('div', { className: 'wb-panel' },
        h('div', { className: 'wb-page-head' },
          h('div', { className: 'wb-page-head-icon' }, props.icon),
          h('div', null,
            h('div', { className: 'wb-page-head-title' }, props.title),
            h('div', { className: 'wb-page-head-sub' }, props.sub || ''))),
        props.children)
    }

    function Sidebar(p) {
      return h('div', { className: 'wb-sidebar' },
        h('div', { className: 'wb-logo' },
          h('div', { className: 'wb-logo-icon' }, '💼'),
          h('div', null, h('div', { className: 'wb-logo-name' }, p.userName + '工作台'), h('div', { className: 'wb-logo-sub' }, 'LIGHT WAVE LAB'))),
        h('div', { className: 'wb-nav' }, NAV.map((n) => h('button', {
          key: n.id,
          className: 'wb-nav-item' + (p.page === n.id ? ' active' : ''),
          onClick: () => p.setPage(n.id)
        }, h('span', { className: 'wb-nav-icon' }, n.icon), h('span', null, n.label)))),
        h('div', { className: 'wb-sidebar-foot' },
          h('button', { className: 'wb-nav-item', onClick: p.onClose },
            h('span', { className: 'wb-nav-icon' }, '🚪'), h('span', null, '关闭工作台'))))
    }

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
      const readingN = (p.data.bookList || []).filter((b) => b.status === 'reading').length
      const finishedN = (p.data.bookList || []).filter((b) => b.status === 'finished').length
      const todoN = (p.data.centerTasks || []).filter((t) => !t.done).length
      const kpis = [
        { icon: '✅', value: p.doneToday, unit: '条记录', label: '今日完成' },
        { icon: '🔥', value: p.data.streak || 0, unit: '天', label: '最长连续打卡', sub: '习惯坚持' },
        { icon: '📚', value: readingN, unit: '本', label: '在读', sub: '共读完 ' + finishedN + ' 本' },
        { icon: '🏆', value: p.activeGoals, unit: '个', label: '进行中目标', sub: 'OKR' },
        { icon: '📰', value: (p.data.briefings || []).length, unit: '篇', label: '本周简报', sub: 'AI 热点' },
        { icon: '📌', value: todoN, unit: '项', label: '待办任务', sub: '任务中心' }
      ]
      const kpiGrid = h('div', { className: 'wb-kpi-grid' }, kpis.map((k, i) => h(KpiCard, Object.assign({ key: i }, k))))

      const schedList = (p.data.schedule || []).slice(0, 5)
      const schedPanel = h(Panel, { title: '🗓 今日日程', action: { text: '管理日程 →', onClick: () => p.setPage('schedule') } },
        schedList.length ? h('div', { className: 'wb-sched-list' }, schedList.map((s) => h('div', { key: s.id, className: 'wb-sched-item' + (s.done ? ' done' : '') },
          h('div', { className: 'wb-sched-dot' }),
          h('div', { className: 'wb-sched-body' },
            h('div', { className: 'wb-sched-time' }, s.time || '全天'),
            h('div', { className: 'wb-sched-text' }, s.text)),
          h(Check, { done: s.done, onClick: () => p.toggle('schedule', s.id) })))) : h('div', { className: 'wb-empty' }, '今天还没有日程'))

      const briefPanel = h(Panel, { title: '📰 最新 AI 简报', action: { text: '去热点简报 →', onClick: () => p.setPage('brief') } },
        h('div', { className: 'wb-list' }, (p.data.briefings || []).slice(0, 4).map((b, i) => h('div', { key: b.id, className: 'wb-brief-row' },
          h('div', { className: 'wb-brief-num' }, String(i + 1).padStart(2, '0')),
          h('div', { className: 'wb-brief-text' }, b.title),
          h('span', { className: 'wb-brief-tag' }, b.tag || '选题')))),
        h('div', { style: { fontSize: 11, color: '#a099b8', marginTop: 10, textAlign: 'center' } }, '四任务重点聚合 · 每日自动更新'))

      const habits = p.data.habits || []
      const habitDoneN = habits.filter((x) => x.done).length
      const habitPct = habits.length ? Math.round((habitDoneN / habits.length) * 100) : 0
      const habitPanel = h(Panel, { title: '🌱 今日习惯', action: { text: '全部 →', onClick: () => p.setPage('habits') } },
        h('div', { className: 'wb-habit-progress' }, h('div', { className: 'wb-habit-progress-fill', style: { width: habitPct + '%' } })),
        h('div', { className: 'wb-list' }, habits.map((x) => h('div', { key: x.id, className: 'wb-habit-row' + (x.done ? ' done' : '') },
          h('span', { className: 'wb-habit-icon' }, x.icon || '⭐'),
          h('span', { className: 'wb-habit-name' }, x.name),
          h(Check, { done: x.done, onClick: () => p.toggle('habits', x.id) })))),
        h('div', { style: { fontSize: 11, color: '#a099b8', marginTop: 10, textAlign: 'center' } }, '今日完成 ' + habitDoneN + ' / ' + habits.length + ' · ' + habitPct + '%'))

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

      const goalPanel = h(Panel, { title: '🎯 目标进度（OKR）', action: { text: '管理 →', onClick: () => p.setPage('goals') } },
        h('div', { className: 'wb-list' }, (p.data.goals || []).slice(0, 3).map((g) => {
          const krs = g.krs || []
          return h('div', { key: g.id, className: 'wb-okr-row' },
            h('div', { className: 'wb-okr-head' },
              h('span', { className: 'wb-okr-title' }, g.title),
              h('span', { className: 'wb-okr-pct' }, (g.progress || 0) + '%')),
            h('div', { className: 'wb-budget-track' }, h('div', { className: 'wb-budget-fill', style: { width: Math.min(100, g.progress || 0) + '%' } })),
            krs.slice(0, 3).map((k) => h('div', { key: k.id, className: 'wb-kr-row' },
              h('span', { className: 'wb-kr-text' }, k.title),
              h('span', { className: 'wb-kr-pct' }, (k.progress || 0) + '%'))))
        })))

      const grid2 = h('div', { className: 'wb-grid2' }, todayPanel, yesterdayPanel, budgetPanel, goalPanel)
      return h('div', { className: 'wb-page' }, hero, kpiGrid, row3, grid2)
    }

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

    function GoalBlock(props) {
      const [krTitle, setKrTitle] = React.useState('')
      function addKr() {
        if (!krTitle.trim()) return
        props.update((d) => {
          const g = d.goals.find((x) => x.id === props.g.id)
          if (!g) return
          if (!Array.isArray(g.krs)) g.krs = []
          g.krs.push({ id: uid(), title: krTitle.trim(), progress: 0 })
          g.progress = Math.round(g.krs.reduce((s, k) => s + (k.progress || 0), 0) / g.krs.length)
        })
        setKrTitle('')
      }
      function setKr(id, progress) {
        props.update((d) => {
          const g = d.goals.find((x) => x.id === props.g.id)
          if (!g) return
          const k = (g.krs || []).find((y) => y.id === id)
          if (!k) return
          k.progress = progress
          g.progress = Math.round(g.krs.reduce((s, x) => s + (x.progress || 0), 0) / g.krs.length)
        })
      }
      function delKr(id) {
        props.update((d) => {
          const g = d.goals.find((x) => x.id === props.g.id)
          if (!g) return
          g.krs = (g.krs || []).filter((y) => y.id !== id)
          g.progress = g.krs.length ? Math.round(g.krs.reduce((s, x) => s + (x.progress || 0), 0) / g.krs.length) : 0
        })
      }
      const krs = props.g.krs || []
      return h('div', { className: 'wb-okr-row' },
        h('div', { className: 'wb-okr-head' },
          h('span', { className: 'wb-okr-title' }, props.g.title),
          h('span', { className: 'wb-okr-pct' }, (props.g.progress || 0) + '%'),
          h(DelBtn, { onClick: () => props.update((d) => { d.goals = d.goals.filter((x) => x.id !== props.g.id) }) })),
        h('div', { className: 'wb-range-wrap' },
          h('input', { className: 'wb-range', type: 'range', min: 0, max: 100, step: 5, value: props.g.progress || 0, onChange: (e) => props.update((d) => { const x = d.goals.find((y) => y.id === props.g.id); if (x) x.progress = Number(e.target.value) }) })),
        h('div', { style: { fontSize: 11, color: '#8a83a8', fontWeight: 700, margin: '10px 0 6px' } }, '关键结果 KR'),
        krs.map((k) => h('div', { key: k.id, className: 'wb-kr-row' },
          h('span', { className: 'wb-kr-text' }, k.title),
          h('input', { className: 'wb-range', type: 'range', min: 0, max: 100, step: 5, value: k.progress || 0, onChange: (e) => setKr(k.id, Number(e.target.value)), style: { flex: 1, maxWidth: 140 } }),
          h('span', { className: 'wb-kr-pct' }, (k.progress || 0) + '%'),
          h(DelBtn, { onClick: () => delKr(k.id) }))),
        krs.length === 0 ? h('div', { className: 'wb-empty' }, '还没有 KR，添加第一个关键结果') : null,
        h('div', { className: 'wb-kr-add-row' },
          h('input', { className: 'wb-kr-input', placeholder: '新增 KR，如：发布 3 篇深度文章', value: krTitle, onChange: (e) => setKrTitle(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') addKr() } }),
          h('button', { className: 'wb-kr-add-btn', onClick: addKr }, '+ KR')))
    }

    function GoalsPage(p) {
      const [title, setTitle] = React.useState('')
      function add() {
        if (!title.trim()) return
        p.update((d) => { d.goals.push({ id: uid(), title: title.trim(), progress: 0, krs: [] }) })
        setTitle('')
      }
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🏆', title: '目标管理', sub: 'OKR 目标 + 关键结果（KR）逐项编辑，目标进度 = KR 平均' },
          h('div', { style: { marginTop: 14 } }, (p.data.goals || []).map((g) => h(GoalBlock, { key: g.id, g, update: p.update }))),
          h(InputRow, { placeholder: '新增目标（OKR），如：读完 12 本书', value: title, onChange: setTitle, onAdd: add, addText: '添加目标' })))
    }

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

    function TopicsPage(p) {
      const [title, setTitle] = React.useState('')
      const [tag, setTag] = React.useState('')
      function add() {
        if (!title.trim()) return
        p.update((d) => { d.topics.unshift({ id: uid(), title: title.trim(), tag: tag.trim() || '选题', status: '待写' }) })
        setTitle('')
      }
      const statusColor = { '待写': 'amber', '写作中': 'blue', '已发布': 'green' }
      const statusNext = { '待写': '写作中', '写作中': '已发布', '已发布': '待写' }
      const list = (p.data.topics || []).map((t) => h('div', { key: t.id, className: 'wb-task-row' },
        h('span', { className: 'wb-task-text', style: { flex: 1 } }, t.title),
        h(Chip, { color: 'gray' }, t.tag || '选题'),
        h(Chip, { color: statusColor[t.status] || 'gray', onClick: () => p.update((d) => { const x = d.topics.find((y) => y.id === t.id); if (x) x.status = statusNext[x.status] || '待写' }), title: '点击切换状态' }, t.status + ' ↻'),
        h(DelBtn, { onClick: () => p.update((d) => { d.topics = d.topics.filter((y) => y.id !== t.id) }) })))
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🎯', title: '选题库', sub: '选题状态流转：待写 → 写作中 → 已发布（点状态标签切换）' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, list),
          h('div', { className: 'wb-input-row', style: { marginTop: 14 } },
            h('input', { className: 'wb-input', placeholder: '选题标题', value: title, onChange: (e) => setTitle(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') add() } }),
            h('input', { className: 'wb-input', placeholder: '标签，如 AI', value: tag, onChange: (e) => setTag(e.target.value), style: { maxWidth: 120 } }),
            h('button', { className: 'wb-add-btn', onClick: add }, '添加'))))
    }

    function BooksPage(p) {
      const [title, setTitle] = React.useState('')
      const [author, setAuthor] = React.useState('')
      function add() {
        if (!title.trim()) return
        p.update((d) => { d.bookList.unshift({ id: uid(), title: title.trim(), author: author.trim() || '未知', status: 'wish', progress: 0 }) })
        setTitle('')
      }
      const statusColor = { reading: 'blue', finished: 'green', wish: 'amber' }
      const statusLabel = { reading: '在读', finished: '读完', wish: '想读' }
      const statusNext = { reading: 'finished', finished: 'wish', wish: 'reading' }
      const list = (p.data.bookList || []).map((b) => h('div', { key: b.id, className: 'wb-goal-row' },
        h('div', { className: 'wb-goal-top' },
          h('span', { className: 'wb-goal-title' }, b.title + (b.author ? ' · ' + b.author : '')),
          h(Chip, { color: statusColor[b.status] || 'gray', onClick: () => p.update((d) => { const x = d.bookList.find((y) => y.id === b.id); if (x) x.status = statusNext[x.status] || 'reading' }), title: '点击切换状态' }, statusLabel[b.status] + ' ↻'),
          h('span', { className: 'wb-goal-pct' }, (b.progress || 0) + '%'),
          h(DelBtn, { onClick: () => p.update((d) => { d.bookList = d.bookList.filter((y) => y.id !== b.id) }) })),
        h('div', { className: 'wb-range-wrap' },
          h('input', { className: 'wb-range', type: 'range', min: 0, max: 100, step: 5, value: b.progress || 0, onChange: (e) => p.update((d) => { const x = d.bookList.find((y) => y.id === b.id); if (x) x.progress = Number(e.target.value) }) }))))
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '📚', title: '读书管理', sub: '管理在读 / 想读 / 已读完的书籍（点状态标签切换）' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, list),
          h('div', { className: 'wb-input-row', style: { marginTop: 14 } },
            h('input', { className: 'wb-input', placeholder: '书名', value: title, onChange: (e) => setTitle(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') add() } }),
            h('input', { className: 'wb-input', placeholder: '作者', value: author, onChange: (e) => setAuthor(e.target.value), style: { maxWidth: 160 } }),
            h('button', { className: 'wb-add-btn', onClick: add }, '添加'))))
    }

    function ReviewPage(p) {
      const todayKey = p.todayKey
      const doneToday = (p.data.tasks[todayKey] || []).filter((t) => t.done)
      const habitDone = (p.data.habits || []).filter((x) => x.done).length
      const habitTotal = (p.data.habits || []).length
      const schedDone = (p.data.schedule || []).filter((s) => s.done).length
      const schedTotal = (p.data.schedule || []).length
      const taskLeft = (p.data.centerTasks || []).filter((t) => !t.done)
      function generate() {
        const lines = []
        lines.push('【今日完成】' + (doneToday.length ? doneToday.map((t) => t.text).join('、') : '无'))
        lines.push('【习惯打卡】' + habitDone + '/' + habitTotal + ' 项完成')
        lines.push('【日程】' + schedDone + '/' + schedTotal + ' 项已完成')
        lines.push('【待办任务】剩余 ' + taskLeft.length + ' 项' + (taskLeft.length ? '：' + taskLeft.map((t) => t.title).join('、') : ''))
        lines.push('【小结】' + (doneToday.length >= 3 ? '今天产出不错，继续保持节奏 💪' : '今天记录偏少，明天从一件小事开始 🌱'))
        const text = lines.join('\n')
        p.update((d) => { d.reviews.unshift({ id: uid(), date: p.dateLine, text }) })
      }
      const stats = [
        ['✅', '今日完成 ' + doneToday.length + ' 项', doneToday.length ? 'green' : 'gray', doneToday.length ? '有产出' : '暂无'],
        ['🌱', '习惯 ' + habitDone + '/' + habitTotal, habitDone ? 'green' : 'gray', habitDone ? '已打卡' : '未打卡'],
        ['🗓', '日程完成 ' + schedDone + '/' + schedTotal, schedDone ? 'green' : 'gray', schedDone ? '进行中' : '待安排'],
        ['📌', '剩余待办 ' + taskLeft.length + ' 项', taskLeft.length ? 'amber' : 'green', taskLeft.length ? '待处理' : '已清空']
      ]
      const statRows = stats.map((s, i) => h('div', { key: i, className: 'wb-habit-row' },
        h('span', { className: 'wb-habit-icon' }, s[0]),
        h('span', { className: 'wb-habit-name' }, s[1]),
        h(Chip, { color: s[2] }, s[3])))
      const reviewList = (p.data.reviews || []).map((r) => h('div', { key: r.id, className: 'wb-review-card' },
        h('div', { className: 'wb-review-date' }, r.date),
        h('div', { className: 'wb-review-text' }, r.text),
        h('div', { style: { textAlign: 'right', marginTop: 6 } }, h(DelBtn, { onClick: () => p.update((d) => { d.reviews = d.reviews.filter((x) => x.id !== r.id) }) }))))
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '🔁', title: '自动复盘', sub: '基于今日完成 / 习惯 / 日程 / 待办 一键生成复盘' },
          h('div', { className: 'wb-panel', style: { marginTop: 14 } },
            h('div', { className: 'wb-panel-head' },
              h('div', { className: 'wb-panel-title' }, '今日数据快照'),
              h('button', { className: 'wb-add-btn', onClick: generate }, '⚡ 一键生成复盘')),
            h('div', { className: 'wb-list' }, statRows)),
          h('div', { className: 'wb-panel', style: { marginTop: 14 } },
            h('div', { className: 'wb-panel-head' }, h('div', { className: 'wb-panel-title' }, '历史复盘'), null),
            reviewList.length ? h('div', { className: 'wb-list' }, reviewList) : h('div', { className: 'wb-empty' }, '还没有复盘记录，点「一键生成复盘」试试'))))
    }

    function CenterPage(p) {
      const [title, setTitle] = React.useState('')
      const [pri, setPri] = React.useState('中')
      function add() {
        if (!title.trim()) return
        p.update((d) => { d.centerTasks.unshift({ id: uid(), title: title.trim(), priority: pri, done: false }) })
        setTitle('')
      }
      const priColor = { '高': 'amber', '中': 'blue', '低': 'gray' }
      const priOrder = { '高': 0, '中': 1, '低': 2 }
      const sorted = (p.data.centerTasks || []).slice().sort((a, b) => (priOrder[a.priority] != null ? priOrder[a.priority] : 1) - (priOrder[b.priority] != null ? priOrder[b.priority] : 1))
      const doneCount = (p.data.centerTasks || []).filter((t) => t.done).length
      const list = sorted.map((t) => h('div', { key: t.id, className: 'wb-task-row' + (t.done ? ' done' : '') },
        h(Check, { done: t.done, onClick: () => p.update((d) => { const x = d.centerTasks.find((y) => y.id === t.id); if (x) x.done = !x.done }) }),
        h('span', { className: 'wb-task-text' }, t.title),
        h(Chip, { color: priColor[t.priority] || 'gray', onClick: () => p.update((d) => { const x = d.centerTasks.find((y) => y.id === t.id); if (x) x.priority = x.priority === '高' ? '中' : x.priority === '中' ? '低' : '高' }), title: '点击切换优先级' }, t.priority + ' ↻'),
        h(DelBtn, { onClick: () => p.update((d) => { d.centerTasks = d.centerTasks.filter((y) => y.id !== t.id) }) })))
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '✅', title: '任务中心', sub: '已完成 ' + doneCount + ' / ' + (p.data.centerTasks || []).length + ' 项 · 按优先级排序（点优先级切换）' },
          h('div', { className: 'wb-list', style: { marginTop: 14 } }, list),
          h('div', { className: 'wb-input-row', style: { marginTop: 14 } },
            h('input', { className: 'wb-input', placeholder: '新任务', value: title, onChange: (e) => setTitle(e.target.value), onKeyDown: (e) => { if (e.key === 'Enter') add() } }),
            h('select', { className: 'wb-input', value: pri, onChange: (e) => setPri(e.target.value), style: { maxWidth: 110 } },
              h('option', { value: '高' }, '高优先级'),
              h('option', { value: '中' }, '中优先级'),
              h('option', { value: '低' }, '低优先级')),
            h('button', { className: 'wb-add-btn', onClick: add }, '添加'))))
    }

    function SettingsPage(p) {
      const curName = (p.data.settings && p.data.settings.userName) || '我的'
      const [userName, setUserName] = React.useState(curName)
      const [msg, setMsg] = React.useState('')
      function saveName() {
        p.update((d) => { if (!d.settings) d.settings = {}; d.settings.userName = userName.trim() || '我的' })
        setMsg('已保存')
      }
      function doExport() {
        host.call('wb:export').then((r) => { setMsg(r && r.ok ? '已导出到 ' + (r.path || '工作区') : '导出失败') }).catch(() => setMsg('导出失败'))
      }
      function doReset() {
        host.call('wb:reset').then(() => { setMsg('已重置为默认数据'); p.update(() => {}) }).catch(() => setMsg('重置失败'))
      }
      const themeNames = Object.keys(THEMES)
      const swatches = themeNames.map((t) => {
        const th = THEMES[t]
        const cur = p.data.settings && p.data.settings.theme === t
        return h('div', { key: t, style: { textAlign: 'center' } },
          h('div', { className: 'wb-theme-swatch' + (cur ? ' active' : ''), style: { background: 'linear-gradient(135deg,' + th.accent2 + ',' + th.accent + ')' }, onClick: () => p.update((d) => { if (!d.settings) d.settings = {}; d.settings.theme = t }) }),
          h('div', { style: { fontSize: 11, color: '#8a83a8', marginTop: 4 } }, THEME_LABELS[t] || t))
      })
      return h('div', { className: 'wb-page' },
        h(PageHead, { icon: '⚙️', title: '设置', sub: '个性化你的工作台' },
          h('div', { className: 'wb-panel', style: { marginTop: 14 } },
            h('div', { className: 'wb-panel-title' }, '工作台名称'),
            h('div', { className: 'wb-input-row' },
              h('input', { className: 'wb-input', value: userName, onChange: (e) => setUserName(e.target.value), placeholder: '如：我的 / 小明的' }),
              h('button', { className: 'wb-add-btn', onClick: saveName }, '保存')),
            h('div', { style: { fontSize: 11, color: '#a099b8', marginTop: 6 } }, msg)),
          h('div', { className: 'wb-panel', style: { marginTop: 14 } },
            h('div', { className: 'wb-panel-title' }, '主题配色'),
            h('div', { className: 'wb-list', style: { flexDirection: 'row', marginTop: 10, gap: 12 } }, swatches)),
          h('div', { className: 'wb-panel', style: { marginTop: 14 } },
            h('div', { className: 'wb-panel-title' }, '数据管理'),
            h('div', { className: 'wb-setting-row' },
              h('div', { className: 'wb-setting-label' }, '导出全部数据到工作区 JSON 文件'),
              h('button', { className: 'wb-add-btn', onClick: doExport }, '导出')),
            h('div', { className: 'wb-setting-row' },
              h('div', { className: 'wb-setting-label' }, '重置为默认数据（清空所有记录）'),
              h('button', { className: 'wb-danger-btn', onClick: doReset }, '重置')),
            h('div', { style: { fontSize: 11, color: '#a099b8', marginTop: 6 } }, msg))))
    }

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

      const now = new Date()
      const todayKey = dateKey(now)
      const yesterdayKey = dateKey(new Date(Date.now() - 86400000))
      const dateLine = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 星期' + WEEK[now.getDay()]
      const todayTasks = data.tasks[todayKey] || []
      const yesterdayTasks = data.tasks[yesterdayKey] || []
      const doneToday = todayTasks.filter((t) => t.done).length
      const balance = (data.budget.total || 0) - (data.budget.spent || 0)
      const activeGoals = (data.goals || []).filter((g) => (g.progress || 0) < 100).length
      const userName = (data.settings && data.settings.userName) || '我的'

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
        case 'board': content = h(BoardPage, { data, setPage, onClose: props.onClose, todayTasks, yesterdayTasks, doneToday, balance, activeGoals, taskInput, setTaskInput, yInput, setYInput, addTask, delTask, toggleTask, toggleYesterday, delYesterday, addYesterday, toggle: toggleList }); break
        case 'schedule': content = h(SchedulePage, { data, update }); break
        case 'habits': content = h(HabitsPage, { data, update }); break
        case 'budget': content = h(BudgetPage, { data, update }); break
        case 'goals': content = h(GoalsPage, { data, update }); break
        case 'tasks': content = h(TasksPage, { data, update, todayKey, yesterdayKey, todayTasks, yesterdayTasks }); break
        case 'brief': content = h(BriefingsPage, { data, update }); break
        case 'topic': content = h(TopicsPage, { data, update }); break
        case 'books': content = h(BooksPage, { data, update }); break
        case 'review': content = h(ReviewPage, { data, update, todayKey, dateLine }); break
        case 'center': content = h(CenterPage, { data, update }); break
        case 'settings': content = h(SettingsPage, { data, update }); break
        default: content = h(Placeholder, { id: page })
      }
      return h('div', { className: 'wb-root' },
        h(Sidebar, { page, setPage, onClose: props.onClose, userName }),
        h('div', { className: 'wb-main' }, content))
    }

    function Placeholder(props) {
      const nav = NAV.find((n) => n.id === props.id) || {}
      return h('div', { className: 'wb-page' },
        h('div', { className: 'wb-placeholder' },
          h('div', { className: 'wb-placeholder-icon' }, nav.icon || '🚧'),
          h('div', { className: 'wb-placeholder-title' }, (nav.label || '') + ' · 建设中'),
          h('div', { className: 'wb-placeholder-sub' }, '该模块正在打磨，敬请期待')))
    }

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
  }
}
