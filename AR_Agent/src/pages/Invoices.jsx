import { useState } from 'react'
import { Eye, Filter, MoreHorizontal, Search, Send } from 'lucide-react'
import { invoices } from '../data/invoices'

const statusBadge = {
  Paid: 'badge-paid',
  Pending: 'badge-pending',
  Overdue: 'badge-overdue',
  Processing: 'badge-processing',
}

function money(value) {
  return `$${value.toLocaleString()}`
}

function Invoices() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [notice, setNotice] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = invoices.filter((row) => {
    const matchQuery =
      row.id.toLowerCase().includes(query.toLowerCase()) ||
      row.customer.toLowerCase().includes(query.toLowerCase())
    const matchStatus = status === 'All' || row.status === status
    return matchQuery && matchStatus
  })

  const counts = {
    Total: invoices.length,
    Paid: invoices.filter((i) => i.status === 'Paid').length,
    Pending: invoices.filter((i) => i.status === 'Pending').length,
    Overdue: invoices.filter((i) => i.status === 'Overdue').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Invoices</h1>
        <p className="page-sub">Track and manage invoice collection workflows.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Invoices', counts.Total, '#2563EB'],
          ['Paid', counts.Paid, '#22C55E'],
          ['Pending', counts.Pending, '#F59E0B'],
          ['Overdue', counts.Overdue, '#EF4444'],
        ].map(([label, value, textColor]) => (
          <div key={label} className="kpi-card">
            <p className="kpi-label">{label}</p>
            <p className="kpi-value" style={{ color: textColor, marginTop: '0.5rem' }}>{value}</p>
            <div className="progress-bar mt-3">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (value / invoices.length) * 100)}%`, background: textColor }}
              />
            </div>
          </div>
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between"
             style={{ borderColor: 'var(--border)' }}>
          <div className="relative w-full max-w-md">
            <Search size={16} className="search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoice or customer"
              className="search-input w-full"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            {['All', 'Paid', 'Pending', 'Overdue'].map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`filter-pill ${status === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {notice && (
          <div className="border-b px-4 py-2.5 text-xs"
               style={{
                 borderColor: 'var(--border)',
                 background: 'rgba(37, 99, 235, 0.06)',
                 color: 'var(--text-secondary)',
               }}>
            {notice}
          </div>
        )}

        <div className="table-wrapper" style={{ maxHeight: '600px' }}>
          <table className="table">
            <thead>
              <tr>
                <th className="font-semibold">Invoice No</th>
                <th className="font-semibold">Customer</th>
                <th className="font-semibold">Amount</th>
                <th className="font-semibold">Due Date</th>
                <th className="font-semibold">Status</th>
                <th className="font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td className="font-semibold" style={{ color: '#2563EB' }}>{row.id}</td>
                  <td style={{ color: 'var(--text)' }}>{row.customer}</td>
                  <td style={{ color: 'var(--text)', fontWeight: 500 }}>{money(row.amount)}</td>
                  <td>{row.dueDate}</td>
                  <td>
                    <span className={`badge ${statusBadge[row.status] || 'badge-processing'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <button
                        className="icon-btn h-8 w-8"
                        title="View"
                        onClick={() => setSelected(row)}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        className="icon-btn h-8 w-8"
                        title="Send Reminder"
                        onClick={() => setNotice(`Reminder sent to ${row.customer} for ${row.id}.`)}
                      >
                        <Send size={14} />
                      </button>
                      <button className="icon-btn h-8 w-8" title="More">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Invoice Detail
            </p>
            <h3 className="mt-1 text-2xl font-bold" style={{ color: 'var(--text)' }}>{selected.id}</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="form-label">Customer</p>
                <p style={{ color: 'var(--text)' }}>{selected.customer}</p>
              </div>
              <div>
                <p className="form-label">Email</p>
                <p style={{ color: 'var(--text)' }}>{selected.email}</p>
              </div>
              <div>
                <p className="form-label">Amount</p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>{money(selected.amount)}</p>
              </div>
              <div>
                <p className="form-label">Due Date</p>
                <p style={{ color: 'var(--text)' }}>{selected.dueDate}</p>
              </div>
              <div>
                <p className="form-label">Aging</p>
                <p style={{ color: 'var(--text)' }}>{selected.aging}</p>
              </div>
              <div>
                <p className="form-label">Status</p>
                <span className={`badge ${statusBadge[selected.status] || 'badge-processing'}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {selected.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                className="btn-secondary flex-1"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
              <button
                className="btn-primary flex-1"
                onClick={() => {
                  setNotice(`Reminder sent to ${selected.customer} for ${selected.id}.`)
                  setSelected(null)
                }}
              >
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoices
