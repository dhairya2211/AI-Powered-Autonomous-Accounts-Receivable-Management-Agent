import { Bell, Menu, Moon, Search, Settings, Sun } from 'lucide-react'
import { useTheme } from '../hooks/ThemeContext'

function Navbar({ onMenu }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="navbar">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          className="icon-btn lg:hidden"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>

        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="search"
            placeholder="Search invoices, customers, workflows..."
            className="search-input"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button className="icon-btn relative" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>

          <button className="icon-btn" aria-label="Settings">
            <Settings size={18} />
          </button>

          <div className="ml-1 flex items-center gap-3 rounded-card border py-1.5 pl-1.5 pr-3"
               style={{ borderColor: 'var(--border)', background: 'var(--card-secondary)' }}>
            <div className="avatar">
              SC
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>Sarah Chen</p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>AR Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
