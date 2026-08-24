return {
  apply(ctx) {
    const fs = ctx.get('fs')
    const sp = ctx.get('sandboxPolicy')
    const web = ctx.get('web')
    const pad = (n) => String(n).padStart(2, '0')
    const todayKey = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) }

    async function fetchText(url) {
      if (!web || typeof web.fetch !== 'function') return null
      const attempts = [() => web.fetch({ url }), () => web.fetch(url)]
      for (const attempt of attempts) {
        try {
          const r = await attempt()
          if (!r) continue
          if (typeof r === 'string') return r
          if (typeof r.text === 'string') return r.text
          if (typeof r.content === 'string') return r.content
          if (typeof r.body === 'string') return r.body
        } catch (e) {}
      }
      return null
    }

    const AI_WORDS = ['ai', 'openai', 'anthropic', 'claude', 'gpt', 'llm', 'model', 'agent', 'copilot', 'gemini', 'deepseek', 'mistral', 'llama', 'neural', 'robot', 'chip', 'gpu']
    function looksAI(t) {
      const s = String(t).toLowerCase()
      return AI_WORDS.some((w) => s.indexOf(w) >= 0)
    }

    async function fetchHN() {
      const idsRaw = await fetchText('https://hacker-news.firebaseio.com/v0/topstories.json')
      if (!idsRaw) return null
      let ids = []
      try { ids = JSON.parse(idsRaw).slice(0, 20) } catch (e) { return null }
      const picked = []
      for (const id of ids) {
        if (picked.length >= 8) break
        const raw = await fetchText('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
        if (!raw) continue
        try {
          const item = JSON.parse(raw)
          if (item && item.title && !item.dead) picked.push(item)
        } catch (e) {}
      }
      if (!picked.length) return null
      const aiFirst = picked.filter((x) => looksAI(x.title)).concat(picked.filter((x) => !looksAI(x.title)))
      return aiFirst.slice(0, 4).map((item) => ({
        id: 'hn' + item.id,
        title: String(item.title),
        tag: looksAI(item.title) ? 'AI 热点' : '科技雷达'
      }))
    }

    async function ensureFreshBriefings(data, force) {
      const today = todayKey()
      if (!force && data.briefingsDate === today && Array.isArray(data.briefings) && data.briefings.length) return data
      try {
        const fresh = await fetchHN()
        if (fresh && fresh.length) {
          data.briefings = fresh
          data.briefingsDate = today
          await save(data)
        }
      } catch (e) { console.log('[workbench] briefings refresh failed', e) }
      return data
    }
    let memory = null
    let target = null
    let policy = null
    function defaults() {
      const now = new Date()
      const pad = (n) => String(n).padStart(2, '0')
      const key = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate())
      const yesterday = new Date(now.getTime() - 86400000)
      const ykey = yesterday.getFullYear() + '-' + pad(yesterday.getMonth() + 1) + '-' + pad(yesterday.getDate())
      return {
        dateKey: key,
        tasks: { [key]: [], [ykey]: [] },
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
        budget: { total: 8000, spent: 0 },
        expenses: [
          { id: 'ex1', date: key, amount: 38, cat: '餐饮', note: '午餐外卖' },
          { id: 'ex2', date: key, amount: 46, cat: '交通', note: '打车去公司' },
          { id: 'ex3', date: key, amount: 199, cat: '付费学习', note: 'AI 课程月卡' },
          { id: 'ex4', date: ykey, amount: 120, cat: '餐饮', note: '和朋友聚餐' },
          { id: 'ex5', date: ykey, amount: 25, cat: '交通', note: '地铁 + 共享单车' }
        ],
        goals: [
          { id: 'g1', title: '季度内容矩阵：系统化产出 12 篇深度内容', krs: [
            { id: 'kr11', title: '发布 3 篇深度长文', progress: 60 },
            { id: 'kr12', title: '小红书每周更新 2 条', progress: 50 },
            { id: 'kr13', title: '视频号每月更新 4 条', progress: 50 }
          ] },
          { id: 'g2', title: '精读《爱的博弈》并输出读书笔记', krs: [
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
    async function ensureTarget() {
      if (target) return target
      if (!fs) return null
      try {
        const root = sp && sp.workspaceRoot ? sp.workspaceRoot : undefined
        target = root ? await fs.resolve(root + '/.dsh-workbench.json') : await fs.resolve('.dsh-workbench.json')
        if (sp) policy = sp.resolve()
      } catch (e) {
        console.log('[workbench] resolve failed', e)
        target = null
      }
      return target
    }
    async function load() {
      if (memory) return memory
      const t = await ensureTarget()
      if (t) {
        try {
          const info = await fs.stat(t)
          if (info) {
            const raw = await fs.readText(t)
            memory = JSON.parse(raw)
          }
        } catch (e) { console.log('[workbench] load failed', e) }
      }
      if (!memory) memory = defaults()
      return memory
    }
    async function save(data) {
      memory = data
      const t = await ensureTarget()
      if (t) {
        try { await fs.writeText(t, JSON.stringify(data, null, 2), undefined, undefined, policy) }
        catch (e) { console.log('[workbench] save failed', e) }
      }
      return { ok: true }
    }
    async function exportData() {
      const data = await load()
      const t = await ensureTarget()
      let path = ''
      if (t) {
        try {
          const root = sp && sp.workspaceRoot ? sp.workspaceRoot : undefined
          const out = root ? await fs.resolve(root + '/dsh-workbench-export.json') : await fs.resolve('dsh-workbench-export.json')
          await fs.writeText(out, JSON.stringify(data, null, 2), undefined, undefined, policy)
          path = fs.processPath ? fs.processPath(out) : String(out)
        } catch (e) { console.log('[workbench] export failed', e) }
      }
      return { ok: true, path }
    }
    async function resetData() {
      memory = defaults()
      const t = await ensureTarget()
      if (t) {
        try { await fs.writeText(t, JSON.stringify(memory, null, 2), undefined, undefined, policy) }
        catch (e) { console.log('[workbench] reset failed', e) }
      }
      return memory
    }
    harness.handle('wb:load', async () => {
      try {
        const d = await load()
        return await ensureFreshBriefings(d, false)
      } catch (e) { return defaults() }
    })
    harness.handle('wb:briefings-refresh', async () => {
      try {
        const d = await load()
        return await ensureFreshBriefings(d, true)
      } catch (e) { return defaults() }
    })
    harness.handle('wb:save', async (args) => { try { return await save(args || defaults()) } catch (e) { return { ok: false } } })
    harness.handle('wb:export', async () => { try { return await exportData() } catch (e) { return { ok: false } } })
    harness.handle('wb:reset', async () => { try { return await resetData() } catch (e) { return defaults() } })
  }
}