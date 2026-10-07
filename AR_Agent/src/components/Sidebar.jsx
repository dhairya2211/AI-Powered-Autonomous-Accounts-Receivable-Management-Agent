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
      {open && (
        <div className="overlay" onClick={onClose} />
      )}

      <aside
        className={`sidebar w-60 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>AI AR Agent</p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Autonomous v1.0</p>
            </div>
          </div>
          <button className="icon-btn-ghost h-8 w-8 lg:hidden" onClick={onClose} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        <nav className="mt-1 flex-1 space-y-1 px-3">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="sidebar-icon">
                  <Icon size={16} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="m-4 rounded-card border p-4"
             style={{ borderColor: 'var(--border)', background: 'var(--card-secondary)' }}>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Agent health</p>
          <p className="mt-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>All collection tools online</p>
          <div className="progress-bar mt-3">
            <div className="progress-fill w-[86%]" />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
