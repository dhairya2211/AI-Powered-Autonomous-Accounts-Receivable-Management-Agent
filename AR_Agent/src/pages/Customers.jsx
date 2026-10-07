import { useState } from 'react'
import { Building2, Mail, Search } from 'lucide-react'
import { customers } from '../data/customers'

const riskStyle = {
  Low: 'bg-success/15 text-success',
  Medium: 'bg-warning/15 text-warning',
  High: 'bg-danger/15 text-danger',
}

function Customers() {
  const [query, setQuery] = useState('')
  const [risk, setRisk] = useState('All')

  const filtered = customers.filter((item) => {
    const matchQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase())
    const matchRisk = risk === 'All' || item.risk === risk
    return matchQuery && matchRisk
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Customers</h1>
        <p className="page-sub">Monitor customer payment behavior and risk profiles.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers"
            className="w-full rounded-xl border border-line bg-card py-2.5 pl-10 pr-3 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Low', 'Medium', 'High'].map((item) => (
            <button
              key={item}
              onClick={() => setRisk(item)}
              className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                risk === item ? 'bg-primary text-white' : 'soft-btn'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map((item) => (
          <article key={item.id} className="card card-hover p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 font-display text-sm font-semibold">
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <span className={`badge ${riskStyle[item.risk]}`}>{item.risk} Risk</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{item.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <Mail size={12} /> {item.email}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <Building2 size={12} /> {item.industry}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-line bg-[#0B1120]/40 p-3">
                <p className="text-[11px] text-muted">Total Invoices</p>
                <p className="mt-1 font-semibold">{item.invoices}</p>
              </div>
              <div className="rounded-xl border border-line bg-[#0B1120]/40 p-3">
                <p className="text-[11px] text-muted">Payment Status</p>
                <p className="mt-1 font-semibold">{item.paymentStatus}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-[11px] text-muted">
                <span>Risk Score</span>
                <span>{item.score}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${
                    item.risk === 'High' ? 'bg-danger' : item.risk === 'Medium' ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Customers
