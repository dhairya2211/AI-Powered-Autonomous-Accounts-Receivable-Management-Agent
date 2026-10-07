import { useState } from 'react'
import { Building2, Mail, Search } from 'lucide-react'
import { customers } from '../data/customers'

const riskBadge = {
  Low: 'badge-risk-low',
  Medium: 'badge-risk-medium',
  High: 'badge-risk-high',
}

const riskBarColor = {
  Low: '#22C55E',
  Medium: '#F59E0B',
  High: '#EF4444',
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
          <Search size={16} className="search-icon" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers"
            className="search-input w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Low', 'Medium', 'High'].map((item) => (
            <button
              key={item}
              onClick={() => setRisk(item)}
              className={`filter-pill ${risk === item ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="card card-hover p-5">
            <div className="flex items-start justify-between">
              <div className="customer-initials">
                {item.name.slice(0, 2).toUpperCase()}
              </div>
              <span className={`badge ${riskBadge[item.risk]}`}>{item.risk} Risk</span>
            </div>
            <h3 className="mt-4 text-lg font-bold" style={{ color: 'var(--text)' }}>{item.name}</h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Mail size={12} /> {item.email}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <Building2 size={12} /> {item.industry}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="stat-box">
                <p className="stat-hint">Total Invoices</p>
                <p className="stat-value" style={{ fontSize: '1rem' }}>{item.invoices}</p>
              </div>
              <div className="stat-box">
                <p className="stat-hint">Payment Status</p>
                <p className="mt-1 font-semibold" style={{ color: 'var(--text)', fontSize: '0.875rem' }}>
                  {item.paymentStatus}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                <span>Risk Score</span>
                <span>{item.score}/100</span>
              </div>
              <div className="progress-bar">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.score}%`, background: riskBarColor[item.risk] }}
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
