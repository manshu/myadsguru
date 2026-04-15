'use client'

import { useCallback, useState } from 'react'
import TurnstileWidget from '@/components/turnstile-widget'

type FormState = {
  firstName: string
  lastName: string
  email: string
  country: string
  message: string
}

export default function BlockedPage() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    message: '',
  })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleToken = useCallback((token: string | null) => setTurnstileToken(token), [])

  function validate(values: FormState, token: string | null) {
    const errs: Record<string, string> = {}
    if (!values.firstName.trim()) errs.firstName = 'Required'
    if (!values.lastName.trim()) errs.lastName = 'Required'
    if (!values.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'Enter a valid email'
    if (!values.country.trim()) errs.country = 'Required'
    if (!values.message.trim()) errs.message = 'Tell us what you need'
    if (!token) errs.turnstile = 'Please complete the human check'
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = validate(form, turnstileToken)
    setErrors(v)
    if (Object.keys(v).length > 0) return
    if (!turnstileToken) return

    const subject = encodeURIComponent(`[Blocked Region Inquiry] from ${form.firstName} ${form.lastName}`)
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nCountry/Region: ${form.country}\n\n${form.message}`
    )
    window.location.href = `mailto:hello@myads.guru?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-display text-xl font-bold text-white tracking-tight">
            MyAds<span className="text-blue-500">.Guru</span>
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl font-bold text-white">
              This site is not available in your region
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              MyAds.Guru is currently only available in the United States.
            </p>
          </div>

          <div className="text-left">
            <h2 className="text-sm font-semibold text-white">Have a question?</h2>
            <p className="mt-1 text-xs text-zinc-500">
              Send us a message and we&apos;ll follow up by email.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              {submitted && (
                <div className="rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
                  Your email client should have opened. If not, email us directly at hello@myads.guru
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400">First name</label>
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400">Last name</label>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400">Country / Region</label>
                <input
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder="e.g. UK, DE, AU"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400">Message</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="What are you trying to do / ask?"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              <div>
                <TurnstileWidget onToken={handleToken} theme="dark" />
                {errors.turnstile && <p className="mt-1 text-xs text-red-400">{errors.turnstile}</p>}
              </div>

              <button
                type="submit"
                disabled={!turnstileToken}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send message
              </button>

              <p className="text-[11px] text-zinc-600 text-center">
                We usually respond within 1–2 business days.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
