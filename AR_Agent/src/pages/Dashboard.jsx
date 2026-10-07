import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Clock,
  FileText,
  Mail,
  Percent,
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
    bgColor: 'rgba(37, 99, 235, 0.1)',
    iconColor: '#2563EB',
  },
  {
    label: 'Pending Payments',
    value: '$62,480',
    trend: '-5%',
    up: true,
    icon: Wallet,
    bgColor: 'rgba(245, 158, 11, 0.1)',
    iconColor: '#F59E0B',
  },
  {
    label: 'Collection Rate',
    value: '87.4%',
    trend: '+2.1%',
    up: true,
    icon: Percent,
    bgColor: 'rgba(34, 197, 94, 0.1)',
    iconColor: '#22C55E',
  },
  {
    label: 'Avg Days Outstanding',
    value: '32',
    trend: '-3',
    up: true,
    icon: Clock,
    bgColor: 'rgba(139, 92, 246, 0.1)',
    iconColor: '#8B5CF6',
  },
]

const activityIcon = {
  overdue: ShieldAlert,
  reminder: Mail,
  payment: Banknote,
  escalate: ShieldAlert,
  promise: Clock,
}

function Dashboard() {
  const [running, setRunning] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Collections Overview</p>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub max-w-xl">
            Real-time monitoring of invoice collections and customer payment performance.
          </p>
        </div>
        <button
          onClick={() => setRunning(true)}
          className="btn-primary"
        >
          <Sparkles size={16} />
          RUN AGENT
        </button>
      </div>

      {running && (
        <div className="card flex items-center gap-3 px-4 py-3 text-sm"
             style={{ borderColor: 'rgba(34, 197, 94, 0.3)', background: 'rgba(34, 197, 94, 0.05)' }}>
          <span className="h-2 w-2 rounded-full bg-success" />
          <span style={{ color: 'var(--text-secondary)' }}>
            Agent is running a collection sweep on overdue invoices.
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="kpi-card">
              <div className="flex items-start justify-between">
                <div
                  className="kpi-icon"
                  style={{ background: item.bgColor, color: item.iconColor }}
                >
                  <Icon size={18} />
                </div>
                <span className={item.up ? 'kpi-trend-up' : 'kpi-trend-down'}>
                  {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {item.trend}
                </span>
              </div>
              <p className="kpi-value">{item.value}</p>
              <p className="kpi-label">{item.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="page-section-title">Recent Activity</h2>
              <p className="page-section-sub">Live stream from the collection agent</p>
            </div>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div className="space-y-2.5">
            {recentActivities.map((item) => {
              const Icon = activityIcon[item.type]
              return (
                <div
                  key={item.id}
                  className="activity-item"
                >
                  <div className="activity-icon">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="activity-title">{item.title}</p>
                    <p className="activity-detail">{item.detail}</p>
                  </div>
                  <span className="activity-time">{item.time}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="page-section-title">Agent Status</h2>
          <p className="mb-5 page-section-sub">Autonomous run summary for this session</p>
          <div className="grid grid-cols-2 gap-3">
            {agentStats.map((stat) => (
              <div key={stat.label} className="stat-box">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-hint">{stat.hint}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
