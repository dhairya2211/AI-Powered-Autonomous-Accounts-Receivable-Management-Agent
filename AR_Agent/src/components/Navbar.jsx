import { Bell, Menu, Search, Settings } from 'lucide-react'

function Navbar({ onMenu }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-[#0B1120]/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open menu">
          <Menu size={18} />
        </button>

        <div className="relative max-w-md flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search invoices, customers, workflows..."
            className="w-full rounded-xl border border-line bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 transition focus:border-primary/50"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="icon-btn relative" aria-label="Notifications">
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>
          <button className="icon-btn" aria-label="Settings">
            <Settings size={16} />
          </button>

          <div className="ml-1 flex items-center gap-3 rounded-2xl border border-line bg-white/5 py-1.5 pl-1.5 pr-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-semibold">
              SC
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight">Sarah Chen</p>
              <p className="text-[11px] text-muted">AR Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
