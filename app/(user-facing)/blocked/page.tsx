import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Region Unavailable',
  description: 'This site is not available in your region.',
}

export default function BlockedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-8">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-3xl font-bold text-white mb-4">
          This site is not available in your region
        </h1>
        <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
          MyAds.Guru is currently only available in the United States. If you believe this is an error
          or have questions, please reach out to us.
        </p>
        <a
          href="mailto:hello@myads.guru"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          Contact Us
        </a>
      </div>
    </section>
  )
}
