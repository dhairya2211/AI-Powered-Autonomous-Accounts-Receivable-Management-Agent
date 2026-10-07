import {
  Bot,
  CheckCircle2,
  Database,
  FileSearch,
  Mail,
  Shield,
  Sparkles,
  Wrench,
  ArrowDown,
} from 'lucide-react'
import { liveFlow, timelineSteps } from '../data/workflow'

const flowIcons = [Sparkles, Bot, Wrench, FileSearch, Shield, Mail, CheckCircle2]

function AgentActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Agent Activity</h1>
        <p className="page-sub">Track autonomous workflow execution.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="card p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Workflow Timeline</h2>
              <p className="text-xs text-muted">INV-1001 collection run · 09:14</p>
            </div>
            <span className="badge bg-success/15 text-success">Complete</span>
          </div>

          <ol className="space-y-0">
            {timelineSteps.map((step, index) => (
              <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
                {index < timelineSteps.length - 1 && (
                  <span className="absolute left-[17px] top-9 h-[calc(100%-12px)] w-px bg-gradient-to-b from-primary to-accent/40" />
                )}
                <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/20 text-primary">
                  <CheckCircle2 size={16} />
                </div>
                <div className="flex-1 rounded-2xl border border-line bg-white/[0.03] p-4 transition hover:border-primary/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{step.title}</p>
                    <span className="text-[11px] text-muted">{step.time}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{step.detail}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-wider text-success">{step.status}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold">Live Workflow Visualization</h2>
          <p className="mb-5 text-xs text-muted">Connected reasoning path for the current run</p>

          <div className="flex flex-col items-stretch">
            {liveFlow.map((node, index) => {
              const Icon = flowIcons[index]
              return (
                <div key={node.id} className="flex flex-col items-center">
                  <div className="w-full rounded-2xl border border-line bg-gradient-to-r from-[#0B1120] to-white/[0.04] p-4 transition hover:border-primary/50 hover:shadow-glow">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{node.title}</p>
                        <p className="text-xs text-muted">{node.caption}</p>
                      </div>
                    </div>
                  </div>
                  {index < liveFlow.length - 1 && (
                    <ArrowDown size={16} className="my-2 text-primary/70" />
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AgentActivity
