import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Address = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

type NewCustomerForm = {
  name: string
  email: string
  password: string
  phone: string
  shippingAddress: Address
  billingAddress: Address
}

const EMPTY_ADDRESS: Address = {
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

const RECOMMENDED_EMAIL_PROVIDERS = [
  { name: 'Gmail', url: 'https://mail.google.com' },
  { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' },
  { name: 'Hotmail / Outlook', url: 'https://outlook.live.com' },
]

export default function NewCustomerPage() {
  const navigate = useNavigate()
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showEmailProvidersPopup, setShowEmailProvidersPopup] = useState(false)
  const [form, setForm] = useState<NewCustomerForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    shippingAddress: { ...EMPTY_ADDRESS },
    billingAddress: { ...EMPTY_ADDRESS },
  })

  const billingAddress = useMemo(
    () => (billingSameAsShipping ? form.shippingAddress : form.billingAddress),
    [billingSameAsShipping, form.billingAddress, form.shippingAddress],
  )

  const updateAddress = (type: 'shippingAddress' | 'billingAddress', field: keyof Address, value: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    const payload: NewCustomerForm = {
      ...form,
      billingAddress,
    }

    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const body = (await response.json()) as { id?: string; message?: string }

      if (!response.ok) {
        throw new Error(body.message ?? 'Unable to create customer right now.')
      }

      setSuccessMessage(`Customer created successfully${body.id ? ` (ID: ${body.id})` : ''}.`)
      setTimeout(() => navigate('/customers'), 800)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to create customer right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">DS</div>
            <div>
              <p className="text-lg font-semibold">DropShip Pro</p>
              <p className="text-xs text-slate-500">Create new customer profile</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/customers"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Customers
            </Link>
            <Link
              to="/customers/new"
              className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700"
            >
              New Customer
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgb(15,23,42,0.05)] sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">New Customer</h1>
            <p className="mt-1 text-sm text-slate-500">Fill out the form to create a customer account.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <section className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Full Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  placeholder="Alex Carter"
                />
              </label>

              <label htmlFor="customer-email" className="block text-sm font-medium text-slate-700">
                <button
                  type="button"
                  onClick={() => setShowEmailProvidersPopup(true)}
                  className="cursor-pointer text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-500"
                >
                  Email
                </button>
                <input
                  id="customer-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  placeholder="alex@retailco.com"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  required
                  type="password"
                  minLength={8}
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  placeholder="Minimum 8 characters"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input
                  required
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  placeholder="+1 (555) 000-0000"
                />
              </label>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  Street
                  <input
                    required
                    value={form.shippingAddress.street}
                    onChange={(event) => updateAddress('shippingAddress', 'street', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                    placeholder="742 Evergreen Terrace"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  City
                  <input
                    required
                    value={form.shippingAddress.city}
                    onChange={(event) => updateAddress('shippingAddress', 'city', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  State
                  <input
                    required
                    value={form.shippingAddress.state}
                    onChange={(event) => updateAddress('shippingAddress', 'state', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Postal Code
                  <input
                    required
                    value={form.shippingAddress.postalCode}
                    onChange={(event) => updateAddress('shippingAddress', 'postalCode', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Country
                  <input
                    required
                    value={form.shippingAddress.country}
                    onChange={(event) => updateAddress('shippingAddress', 'country', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2"
                  />
                </label>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-900">Billing Address</h2>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(event) => setBillingSameAsShipping(event.target.checked)}
                  />
                  Same as shipping
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  Street
                  <input
                    required
                    disabled={billingSameAsShipping}
                    value={billingAddress.street}
                    onChange={(event) => updateAddress('billingAddress', 'street', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 disabled:bg-slate-50 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  City
                  <input
                    required
                    disabled={billingSameAsShipping}
                    value={billingAddress.city}
                    onChange={(event) => updateAddress('billingAddress', 'city', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 disabled:bg-slate-50 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  State
                  <input
                    required
                    disabled={billingSameAsShipping}
                    value={billingAddress.state}
                    onChange={(event) => updateAddress('billingAddress', 'state', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 disabled:bg-slate-50 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Postal Code
                  <input
                    required
                    disabled={billingSameAsShipping}
                    value={billingAddress.postalCode}
                    onChange={(event) => updateAddress('billingAddress', 'postalCode', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 disabled:bg-slate-50 focus:ring-2"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Country
                  <input
                    required
                    disabled={billingSameAsShipping}
                    value={billingAddress.country}
                    onChange={(event) => updateAddress('billingAddress', 'country', event.target.value)}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none ring-indigo-500 placeholder:text-slate-400 disabled:bg-slate-50 focus:ring-2"
                  />
                </label>
              </div>
            </section>

            {errorMessage && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 items-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                {isSubmitting ? 'Saving...' : 'Create Customer'}
              </button>

              <Link
                to="/customers"
                className="inline-flex h-11 items-center rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </Link>
            </div>
          </form>
        </section>
      </main>

      {showEmailProvidersPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recommended Email Providers</h2>
                <p className="mt-1 text-sm text-slate-500">Choose a provider to create or access your email account.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailProvidersPopup(false)}
                className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close email provider popup"
              >
                x
              </button>
            </div>

            <ul className="space-y-2">
              {RECOMMENDED_EMAIL_PROVIDERS.map((provider) => (
                <li key={provider.name}>
                  <a
                    href={provider.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    {provider.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
