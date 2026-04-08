import { Link } from 'react-router-dom'

const transactions = [
  {
    id: '#323537',
    customer: 'Abram Schleifer',
    email: 'abram@example.com',
    amount: '$43,999',
    dueDate: '25 Apr, 2027',
    status: 'Completed',
  },
  {
    id: '#323544',
    customer: 'Ava Smith',
    email: 'ava.smith@example.com',
    amount: '$1,200',
    dueDate: '01 Dec, 2027',
    status: 'Pending',
  },
  {
    id: '#323538',
    customer: 'Carla George',
    email: 'carla65@example.com',
    amount: '$919',
    dueDate: '11 May, 2027',
    status: 'Completed',
  },
]

function statusClass(status: string): string {
  return status === 'Completed'
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-amber-100 text-amber-700'
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-800">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
              DS
            </div>
            <div>
              <p className="text-lg font-semibold">DropShip Pro</p>
              <p className="text-xs text-slate-500">TailAdmin-inspired workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#overview"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:inline-flex"
            >
              Overview
            </a>
            <a
              href="#transactions"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:inline-flex"
            >
              Transactions
            </a>
            <Link
              to="/customers"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:inline-flex"
            >
              Customers
            </Link>
            <Link
              to="/login"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section id="overview" className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">Operations</p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ship smarter with one dashboard
            </h1>
            <p className="mb-6 max-w-2xl text-slate-500">
              Manage sellers, shipment vendors, and customers in one streamlined interface.
              Track orders, resolve delays, and get role-based visibility instantly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/customers"
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View customers
              </Link>
              <Link
                to="/login"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Start now
              </Link>
              <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Explore demo
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-blue-500 p-6 text-white shadow-sm">
            <p className="text-sm font-medium text-indigo-100">Live Metrics</p>
            <p className="mt-2 text-4xl font-bold">94.7%</p>
            <p className="text-sm text-indigo-100">On-time shipment completion this month</p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
                <span>Open Orders</span>
                <span className="font-semibold">312</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
                <span>New Customers</span>
                <span className="font-semibold">+58</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
                <span>Shipment Vendors</span>
                <span className="font-semibold">24</span>
              </div>
            </div>
          </div>
        </section>

        <section id="transactions" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(15,23,42,0.03)]">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
                <p className="text-sm text-slate-500">Your most recent transactions list</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  placeholder="Search..."
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                />
                <button className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  Last 7 Days
                </button>
                <button className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Total Amount</th>
                  <th className="px-6 py-4 font-semibold">Due Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {transactions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="px-6 py-4 font-semibold">{item.id}</td>
                    <td className="px-6 py-4 font-medium">{item.customer}</td>
                    <td className="px-6 py-4 text-slate-500">{item.email}</td>
                    <td className="px-6 py-4 font-semibold">{item.amount}</td>
                    <td className="px-6 py-4">{item.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
