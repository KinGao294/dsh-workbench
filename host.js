/**
 * LIGHT WAVE LAB 个人工作台 — Host 半边（持久化）
 *
 * 用法：在 DSH Web GUI 中通过动态插件（cordis_define）定义本文件内容为
 * code.host；或作为标准 Cordis 插件的 host 入口。
 *
 * 提供两个 Package-private RPC：
 *   wb:load — 读取工作台数据（首次返回默认数据，之后返回内存缓存）
 *   wb:save — 保存工作台数据（写入工作区 .dsh-workbench.json，原子写）
 *
 * 数据文件位置：{workspaceRoot}/.dsh-workbench.json（fallback: cwd 下同名文件）。
 */
return {
  apply(ctx) {
    const fs = ctx.get('fs')
    const sp = ctx.get('sandboxPolicy')
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

    harness.handle('wb:load', async () => { try { return await load() } catch (e) { return defaults() } })
    harness.handle('wb:save', async (args) => { try { return await save(args || defaults()) } catch (e) { return { ok: false } } })
  },
}
