import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Activity,
  Sparkles,
  X,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/invoices', label: 'Invoices', icon: FileText },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/chat', label: 'Agent Chat', icon: MessageSquare },
  { to: '/activity', label: 'Agent Activity', icon: Activity },
]

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-line bg-sidebar transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-display text-sm font-semibold tracking-wide">AI AR Agent</p>
              <p className="text-[11px] text-muted">Autonomous v1.0</p>
            </div>
          </div>
          <button className="icon-btn h-8 w-8 lg:hidden" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-accent/10 text-white shadow-glow'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                        isActive
                          ? 'border-primary/40 bg-primary/20 text-primary'
                          : 'border-transparent bg-white/5 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="m-4 rounded-2xl border border-line bg-white/[0.03] p-4">
          <p className="text-xs font-medium text-slate-300">Agent health</p>
          <p className="mt-1 text-[11px] text-muted">All collection tools online</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
