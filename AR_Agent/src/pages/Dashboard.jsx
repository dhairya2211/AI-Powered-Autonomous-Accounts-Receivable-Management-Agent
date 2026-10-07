import { useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Bell,
  FileText,
  Mail,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { agentStats, recentActivities } from '../data/activities'

const metrics = [
  {
    label: 'Total Invoices',
    value: '248',
    trend: '+12%',
    up: true,
    icon: FileText,
    fill: 'from-primary/25 to-primary/5',
  },
  {
    label: 'Overdue Invoices',
    value: '19',
    trend: '-5%',
    up: false,
    icon: AlertTriangle,
    fill: 'from-danger/25 to-danger/5',
  },
  {
    label: 'Payments Received',
    value: '$84.2k',
    trend: '+18%',
    up: true,
    icon: Wallet,
    fill: 'from-success/25 to-success/5',
  },
  {
    label: 'Escalated Cases',
    value: '07',
    trend: '+3%',
    up: true,
    icon: ShieldAlert,
    fill: 'from-warning/25 to-warning/5',
  },
]

const activityIcon = {
  overdue: AlertTriangle,
  reminder: Mail,
  payment: Banknote,
  escalate: ShieldAlert,
  promise: Bell,
}

function Dashboard() {
  const [running, setRunning] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">Collections intelligence</p>
          <h1 className="page-title">Autonomous AR Dashboard</h1>
          <p className="page-sub max-w-xl">
            AI-powered monitoring of invoice collections and customer payment workflows.
          </p>
        </div>
        <button
          onClick={() => setRunning(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-semibold shadow-glow transition hover:brightness-110"
        >
          <Sparkles size={16} />
          RUN AGENT
        </button>
      </div>

      {running && (
        <div className="card flex items-center gap-3 border-primary/30 px-4 py-3 text-sm text-slate-200">
          <span className="h-2 w-2 rounded-full bg-success" />
          Agent is running a collection sweep on overdue invoices.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className={`card card-hover overflow-hidden p-5 bg-gradient-to-br ${item.fill}`}>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon size={18} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    item.up ? 'text-success' : 'text-danger'
                  }`}
                >
                  {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {item.trend}
                </span>
              </div>
              <p className="mt-6 font-display text-3xl font-semibold">{item.value}</p>
              <p className="mt-1 text-sm text-muted">{item.label}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${
                    item.up ? 'w-2/3 bg-primary' : 'w-1/3 bg-danger'
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
              <p className="text-xs text-muted">Live stream from the collection agent</p>
            </div>
            <TrendingUp size={16} className="text-primary" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((item) => {
              const Icon = activityIcon[item.type]
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-2xl border border-transparent bg-white/[0.03] p-3 transition hover:border-line hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="truncate text-xs text-muted">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted">{item.time}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="card p-5">
          <h2 className="font-display text-lg font-semibold">Agent Status</h2>
          <p className="mb-4 text-xs text-muted">Autonomous run summary for this session</p>
          <div className="grid grid-cols-2 gap-3">
            {agentStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line bg-[#0B1120]/50 p-4 transition hover:border-primary/40">
                <p className="font-display text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-200">{stat.label}</p>
                <p className="text-[11px] text-muted">{stat.hint}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
