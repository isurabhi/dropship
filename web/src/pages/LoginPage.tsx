import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="grid min-h-screen bg-[#f7f9fc] lg:grid-cols-2">
      <section className="hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-white text-slate-900">DS</span>
            DropShip Pro
          </div>
          <h1 className="max-w-md text-4xl font-bold leading-tight">
            Welcome back to your shipment control center
          </h1>
          <p className="mt-4 max-w-lg text-indigo-100">
            Sign in to manage sellers, shipment vendors, and customer delivery operations with live transaction insights.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm text-indigo-100">Trusted by logistics teams shipping worldwide</p>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">10k+</p>
              <p className="text-xs text-indigo-100">Daily Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold">99.2%</p>
              <p className="text-xs text-indigo-100">Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-indigo-100">Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgb(15,23,42,0.06)]">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Sign In</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Use your email and password to continue.</p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                Remember me
              </label>
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Need a quick overview first?{' '}
            <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
              View landing page
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-slate-500">
            Looking for account insights?{' '}
            <Link to="/customers" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Open customer list
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
