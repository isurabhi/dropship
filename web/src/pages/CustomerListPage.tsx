import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

type CustomerStatus = 'Active' | 'At Risk' | 'New'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  orders: number
  lifetimeValue: number
  lastOrder: string
  status: CustomerStatus
}

const customers: Customer[] = [
  {
    id: 'CUS-1031',
    name: 'Mia Johnson',
    email: 'mia.johnson@westbay.com',
    phone: '+1 (415) 554-0911',
    city: 'San Francisco',
    orders: 34,
    lifetimeValue: 18640,
    lastOrder: '2026-03-21',
    status: 'Active',
  },
  {
    id: 'CUS-1032',
    name: 'Noah Patel',
    email: 'noah.patel@newlinehq.com',
    phone: '+1 (628) 884-1150',
    city: 'San Jose',
    orders: 8,
    lifetimeValue: 3210,
    lastOrder: '2026-04-02',
    status: 'New',
  },
  {
    id: 'CUS-1033',
    name: 'Olivia Green',
    email: 'olivia.green@packly.io',
    phone: '+1 (510) 774-9912',
    city: 'Oakland',
    orders: 21,
    lifetimeValue: 12015,
    lastOrder: '2026-01-15',
    status: 'At Risk',
  },
  {
    id: 'CUS-1034',
    name: 'Liam Chen',
    email: 'liam.chen@cloudretail.com',
    phone: '+1 (925) 200-8842',
    city: 'Walnut Creek',
    orders: 12,
    lifetimeValue: 6120,
    lastOrder: '2026-03-28',
    status: 'Active',
  },
  {
    id: 'CUS-1035',
    name: 'Emma Torres',
    email: 'emma.torres@havenbox.co',
    phone: '+1 (408) 550-1309',
    city: 'Santa Clara',
    orders: 5,
    lifetimeValue: 2015,
    lastOrder: '2026-04-01',
    status: 'New',
  },
  {
    id: 'CUS-1036',
    name: 'Aiden Brooks',
    email: 'aiden.brooks@trundle.ai',
    phone: '+1 (650) 900-4430',
    city: 'Palo Alto',
    orders: 18,
    lifetimeValue: 9740,
    lastOrder: '2026-02-09',
    status: 'At Risk',
  },
]

function statusClass(status: CustomerStatus): string {
  if (status === 'Active') {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (status === 'New') {
    return 'bg-sky-100 text-sky-700'
  }

  return 'bg-amber-100 text-amber-700'
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(value: string): string {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export default function CustomerListPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'All' | CustomerStatus>('All')
  const [sortBy, setSortBy] = useState<'orders' | 'lifetimeValue' | 'lastOrder'>('lifetimeValue')

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const result = customers.filter((customer) => {
      const matchQuery =
        normalizedQuery.length === 0 ||
        customer.name.toLowerCase().includes(normalizedQuery) ||
        customer.email.toLowerCase().includes(normalizedQuery) ||
        customer.id.toLowerCase().includes(normalizedQuery)

      const matchStatus = status === 'All' || customer.status === status

      return matchQuery && matchStatus
    })

    return result.sort((a, b) => {
      if (sortBy === 'orders') {
        return b.orders - a.orders
      }

      if (sortBy === 'lastOrder') {
        return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
      }

      return b.lifetimeValue - a.lifetimeValue
    })
  }, [query, sortBy, status])

  const stats = useMemo(() => {
    const active = filteredCustomers.filter((customer) => customer.status === 'Active').length
    const atRisk = filteredCustomers.filter((customer) => customer.status === 'At Risk').length
    const totalRevenue = filteredCustomers.reduce((acc, customer) => acc + customer.lifetimeValue, 0)

    return {
      count: filteredCustomers.length,
      active,
      atRisk,
      totalRevenue,
    }
  }, [filteredCustomers])

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">DS</div>
            <div>
              <p className="text-lg font-semibold">DropShip Pro</p>
              <p className="text-xs text-slate-500">Customer relationship overview</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Dashboard
            </Link>
            <Link
              to="/customers"
              className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
            >
              Customers
            </Link>
            <Link
              to="/login"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15,23,42,0.03)]">
            <p className="text-sm font-medium text-slate-500">Visible Customers</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.count}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15,23,42,0.03)]">
            <p className="text-sm font-medium text-slate-500">Active Accounts</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.active}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15,23,42,0.03)]">
            <p className="text-sm font-medium text-slate-500">At Risk</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{stats.atRisk}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(15,23,42,0.03)]">
            <p className="text-sm font-medium text-slate-500">Lifetime Revenue</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{formatMoney(stats.totalRevenue)}</p>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_rgb(15,23,42,0.05)]">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Customer List</h1>
                <p className="text-sm text-slate-500">Search and monitor customer performance.</p>
              </div>

              <Link
                to="/customers/new"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                + New
              </Link>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search name, email, or ID"
                  className="h-11 min-w-64 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                />

                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as 'All' | CustomerStatus)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-indigo-500 focus:ring-2"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="At Risk">At Risk</option>
                  <option value="New">New</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as 'orders' | 'lifetimeValue' | 'lastOrder')
                  }
                  className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-indigo-500 focus:ring-2"
                >
                  <option value="lifetimeValue">Sort: Lifetime Value</option>
                  <option value="orders">Sort: Orders</option>
                  <option value="lastOrder">Sort: Last Order</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Orders</th>
                  <th className="px-6 py-4 font-semibold">Lifetime Value</th>
                  <th className="px-6 py-4 font-semibold">Last Order</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p>{customer.email}</p>
                      <p className="text-xs text-slate-500">{customer.phone}</p>
                    </td>
                    <td className="px-6 py-4">{customer.city}</td>
                    <td className="px-6 py-4 font-semibold">{customer.orders}</td>
                    <td className="px-6 py-4 font-semibold">{formatMoney(customer.lifetimeValue)}</td>
                    <td className="px-6 py-4">{formatDate(customer.lastOrder)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(customer.status)}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="border-t border-slate-100 px-6 py-8 text-center text-sm text-slate-500">
              No customers found for the current filters.
            </div>
          )}
        </section>
      </main>
    </div>
  )
}