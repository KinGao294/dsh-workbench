/**
 * LIGHT WAVE LAB 个人工作台 — Host 半边（标准 web 插件）
 *
 * 通过 profiles/web/cordis.patch.yml 绝对路径挂载，DSH 重启后自动加载。
 *
 * 提供：
 *   GET  /api/workbench/state         读取工作台数据
 *   POST /api/workbench/save          保存工作台数据
 *   POST /api/workbench/export        导出数据到 JSON 文件
 *   POST /api/workbench/reset         重置为默认数据
 *   GET  /workbench/client.js         浏览器端代码（client-v12.js）
 *   tapIndex                          注入 <script src="/workbench/client.js">
 *
 * 数据文件：{workspaceRoot}/.dsh-workbench.json（fallback cwd 同名文件）
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-host-webserver'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PKG_ROOT = join(__dirname, '..')

/** 读取 client 静态代码（打包后从 lib 外读 src，开发时直接读仓库文件） */
function clientSource(): string {
  const candidates = [
    join(PKG_ROOT, 'client-v12.js'),
    join(PKG_ROOT, 'src', 'client.js'),
    join(PKG_ROOT, 'lib', 'client.js'),
  ]
  for (const p of candidates) {
    try {
      return readFileSync(p, 'utf8')
    } catch {
      /* try next */
    }
  }
  return 'console.error("[workbench] client source not found")'
}

export const name = 'workbench'

export const inject = ['webServer', 'fs', 'sandboxPolicy']

interface WorkbenchSettings {
  userName?: string
  theme?: string
}

interface WorkbenchState {
  dateKey: string
  tasks: Record<string, Array<{ id: string; text: string; done: boolean }>>
  habits: Array<{ id: string; icon: string; name: string; done: boolean }>
  schedule: Array<{ id: string; time: string; text: string; done: boolean }>
  briefings: Array<{ id: string; title: string; tag: string }>
  budget: { total: number; spent: number }
  goals: Array<{ id: string; title: string; progress: number }>
  books: { reading: number; finished: number }
  streak: number
  quote: string
  topics: Array<{ id: string; title: string; tag: string; status: string }>
  bookList: Array<{ id: string; title: string; author: string; status: string; progress: number }>
  reviews: Array<{ id: string; date: string; text: string }>
  centerTasks: Array<{ id: string; title: string; priority: string; done: boolean }>
  settings: WorkbenchSettings
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function dateKey(d: Date): string {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

function defaults(): WorkbenchState {
  const now = new Date()
  const key = dateKey(now)
  const yesterday = new Date(now.getTime() - 86400000)
  const ykey = dateKey(yesterday)
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
    topics: [
      { id: 'tp1', title: 'AI 编程助手赛道观察：从 Copilot 到 Agent', tag: 'AI', status: '待写' },
      { id: 'tp2', title: '大模型私有化部署的成本账', tag: 'AI', status: '写作中' },
      { id: 'tp3', title: '内容创作者的工具链 2026', tag: '创作', status: '已发布' },
    ],
    bookList: [
      { id: 'bk1', title: '爱的博弈', author: '约翰·戈特曼', status: 'reading', progress: 60 },
      { id: 'bk2', title: '思考，快与慢', author: '丹尼尔·卡尼曼', status: 'finished', progress: 100 },
      { id: 'bk3', title: '纳瓦尔宝典', author: '埃里克·乔根森', status: 'wish', progress: 0 },
    ],
    reviews: [],
    centerTasks: [
      { id: 'ct1', title: '整理本周工作重点', priority: '高', done: false },
      { id: 'ct2', title: '给工作台写开源 README', priority: '中', done: false },
      { id: 'ct3', title: '预约下周例会', priority: '低', done: false },
    ],
    settings: { userName: '我的', theme: 'lavender' },
  }
}

export function apply(ctx: Context): (() => void) | void {
  const fs = ctx.get('fs')
  const sp = ctx.get('sandboxPolicy')
  let memory: WorkbenchState | null = null
  let target: any = null
  let policy: any = null

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

  async function load(): Promise<WorkbenchState> {
    if (memory) return memory
    const t = await ensureTarget()
    if (t) {
      try {
        const info = await fs.stat(t)
        if (info) {
          const raw = await fs.readText(t)
          memory = JSON.parse(raw)
        }
      } catch (e) {
        console.log('[workbench] load failed', e)
      }
    }
    if (!memory) memory = defaults()
    // 补全缺失字段（旧数据没有的新模块字段填默认值），防止渲染崩溃
    const base = defaults()
    const m: any = memory
    if (!Array.isArray(m.topics)) m.topics = base.topics
    if (!Array.isArray(m.bookList)) m.bookList = base.bookList
    if (!Array.isArray(m.reviews)) m.reviews = []
    if (!Array.isArray(m.centerTasks)) m.centerTasks = base.centerTasks
    if (!m.settings || typeof m.settings !== 'object') m.settings = base.settings
    if (!m.settings.theme) m.settings.theme = 'lavender'
    if (!Array.isArray(m.habits) || !m.habits.length) m.habits = base.habits
    if (!Array.isArray(m.schedule) || !m.schedule.length) m.schedule = base.schedule
    if (!Array.isArray(m.briefings) || !m.briefings.length) m.briefings = base.briefings
    if (!m.budget || typeof m.budget.total !== 'number') m.budget = base.budget
    if (!Array.isArray(m.goals)) m.goals = base.goals
    if (!m.books || typeof m.books.reading !== 'number') m.books = base.books
    if (typeof m.streak !== 'number') m.streak = base.streak
    if (!m.quote) m.quote = base.quote
    // 跨天滚动：仅把未完成的任务从旧日期移到昨天，已完成保留在原日期
    const now = new Date()
    const key = dateKey(now)
    if (m.dateKey && m.dateKey !== key) {
      const ykey = dateKey(new Date(now.getTime() - 86400000))
      const old = m.tasks[m.dateKey] || []
      const undone = old.filter((x: any) => !x.done)
      m.tasks[ykey] = (m.tasks[ykey] || []).concat(undone)
      m.tasks[key] = m.tasks[key] || []
      m.dateKey = key
    }
    return memory
  }

  async function save(data: WorkbenchState) {
    memory = data
    const t = await ensureTarget()
    if (t) {
      try {
        await fs.writeText(t, JSON.stringify(data, null, 2), undefined, undefined, policy)
      } catch (e) {
        console.log('[workbench] save failed', e)
      }
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
      } catch (e) {
        console.log('[workbench] export failed', e)
      }
    }
    return { ok: true, path }
  }

  async function resetData() {
    memory = defaults()
    const t = await ensureTarget()
    if (t) {
      try {
        await fs.writeText(t, JSON.stringify(memory, null, 2), undefined, undefined, policy)
      } catch (e) {
        console.log('[workbench] reset failed', e)
      }
    }
    return memory
  }

  const readBody = (req: any): Promise<any> =>
    new Promise((resolve, reject) => {
      let body = ''
      req.on('data', (c: Buffer) => {
        body += c.toString('utf8')
      })
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {})
        } catch (e) {
          reject(e)
        }
      })
      req.on('error', reject)
    })

  const json = (res: any, code: number, data: any) => {
    res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(data))
  }

  const handleApi = (req: any, res: any) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/api/workbench/state' && req.method === 'GET') {
      load()
        .then((d) => json(res, 200, d))
        .catch(() => json(res, 500, { ok: false }))
      return true
    }
    if (url.pathname === '/api/workbench/save' && req.method === 'POST') {
      readBody(req)
        .then((body) => save(body))
        .then((r) => json(res, 200, r))
        .catch(() => json(res, 500, { ok: false }))
      return true
    }
    if (url.pathname === '/api/workbench/export' && req.method === 'POST') {
      exportData()
        .then((r) => json(res, 200, r))
        .catch(() => json(res, 500, { ok: false }))
      return true
    }
    if (url.pathname === '/api/workbench/reset' && req.method === 'POST') {
      resetData()
        .then((d) => json(res, 200, d))
        .catch(() => json(res, 500, { ok: false }))
      return true
    }
    if (url.pathname === '/workbench/client.js' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/javascript; charset=utf-8' })
      res.end(clientSource())
      return true
    }
    return false
  }

  const disposers = [
    ctx.webServer.register({ kind: 'prefix', path: '/api/workbench', handler: handleApi }),
    ctx.webServer.register({ kind: 'exact', path: '/workbench/client.js', handler: handleApi }),
  ]
  const tap = ctx.webServer.tapIndex((html: string) => {
    const script = '<script src="/workbench/client.js"></script>'
    return html.includes('workbench/client.js') ? html : html.replace('</body>', script + '</body>')
  })
  disposers.push(tap)

  return () => {
    for (const d of disposers) d()
  }
}
