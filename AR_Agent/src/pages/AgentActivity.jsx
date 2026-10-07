import {
  Bot,
  CheckCircle2,
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
        <p className="page-sub">Track autonomous workflow execution in real-time.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="card p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="page-section-title">Workflow Timeline</h2>
              <p className="page-section-sub">INV-1001 collection run · 09:14</p>
            </div>
            <span className="badge badge-paid">Complete</span>
          </div>

          <ol className="space-y-0">
            {timelineSteps.map((step, index) => (
              <li key={step.id} className="timeline-item">
                {index < timelineSteps.length - 1 && (
                  <span className="timeline-connector" />
                )}
                <div className="timeline-node">
                  <CheckCircle2 size={16} />
                </div>
                <div className="timeline-card">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold" style={{ color: 'var(--text)' }}>{step.title}</p>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{step.time}</span>
                  </div>
                  <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>{step.detail}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-success">
                    {step.status}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="page-section-title">Live Workflow Visualization</h2>
          <p className="mb-5 page-section-sub">Connected reasoning path for the current run</p>

          <div className="flex flex-col items-stretch">
            {liveFlow.map((node, index) => {
              const Icon = flowIcons[index % flowIcons.length]
              return (
                <div key={node.id} className="flex flex-col items-center">
                  <div className="workflow-node">
                    <div className="flex items-center gap-3">
                      <div className="workflow-icon">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>{node.title}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{node.caption}</p>
                      </div>
                    </div>
                  </div>
                  {index < liveFlow.length - 1 && (
                    <ArrowDown size={18} className="my-2" style={{ color: 'var(--text-muted)' }} />
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
