import { useState } from 'react'
import { Eye, Filter, MoreHorizontal, Search, Send } from 'lucide-react'
import { invoices } from '../data/invoices'

const statusStyle = {
  Paid: 'bg-success/15 text-success',
  Pending: 'bg-warning/15 text-warning',
  Overdue: 'bg-danger/15 text-danger',
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
          ['Total Invoices', counts.Total, 'text-primary'],
          ['Paid', counts.Paid, 'text-success'],
          ['Pending', counts.Pending, 'text-warning'],
          ['Overdue', counts.Overdue, 'text-danger'],
        ].map(([label, value, color]) => (
          <div key={label} className="card card-hover p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className={`mt-2 font-display text-3xl font-semibold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <section className="card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoice or customer"
              className="w-full rounded-xl border border-line bg-[#0B1120] py-2.5 pl-10 pr-3 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted" />
            {['All', 'Paid', 'Pending', 'Overdue'].map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                  status === item ? 'bg-primary text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {notice && (
          <div className="border-b border-line bg-primary/10 px-4 py-2 text-xs text-slate-200">{notice}</div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Invoice No</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Due Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-line/80 transition hover:bg-white/[0.04]">
                  <td className="px-4 py-3 font-medium text-primary">{row.id}</td>
                  <td className="px-4 py-3">{row.customer}</td>
                  <td className="px-4 py-3">{money(row.amount)}</td>
                  <td className="px-4 py-3 text-muted">{row.dueDate}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${statusStyle[row.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div className="card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs uppercase tracking-widest text-muted">Invoice detail</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{selected.id}</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>Customer: {selected.customer}</p>
              <p>Email: {selected.email}</p>
              <p>Amount: {money(selected.amount)}</p>
              <p>Due: {selected.dueDate}</p>
              <p>Aging: {selected.aging}</p>
              <p>Status: {selected.status}</p>
            </div>
            <button className="soft-btn mt-6 w-full" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Invoices
