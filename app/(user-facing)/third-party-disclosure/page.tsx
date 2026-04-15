import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Working with a Third Party',
  description: 'My Ads Guru third-party disclosure — how we manage Google Ads on your behalf.',
}

export default function ThirdPartyDisclosure() {
  return (
    <section className="min-h-screen py-32 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Working with a Third Party</h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: April 3, 2026</p>

        <div className="space-y-8 text-zinc-400 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. Who We Are</h2>
            <p>
              <strong className="text-zinc-300">My Ads Guru</strong> (operated by{' '}
              <strong className="text-zinc-300">Sphnix, Inc.</strong>) is a third-party technology platform that
              helps businesses manage their Google Ads campaigns. When you use My Ads Guru to manage your Google
              Ads account, you are working with a third party as defined by Google&apos;s advertising policies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. What We Do on Your Behalf</h2>
            <p>When you connect your Google Ads account to My Ads Guru, we may perform the following actions on your behalf:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 mt-2">
              <li>View and report on your Google Ads account performance, campaigns, ad groups, and ads.</li>
              <li>Create, modify, pause, or remove campaigns, ad groups, keywords, and ads.</li>
              <li>Adjust bidding strategies and budget allocations.</li>
              <li>Generate performance reports and analytics.</li>
              <li>Provide AI-powered recommendations and optimizations for your campaigns.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Your Rights and Control</h2>
            <p>As the account owner, you retain full control over your Google Ads account at all times:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 mt-2">
              <li>You can review, approve, or reject any changes before they are applied to your account.</li>
              <li>You can revoke My Ads Guru&apos;s access to your Google Ads account at any time through your Google account settings or by disconnecting your account within the My Ads Guru platform.</li>
              <li>You maintain direct ownership of your Google Ads account and all associated data.</li>
              <li>You can request a full export of your data at any time.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. Data Access and Usage</h2>
            <p>
              We access your Google Ads data solely to provide the services described above. Your data is handled
              in accordance with our{' '}
              <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </a>
              . We do not sell, share, or use your Google Ads data for any purpose other than providing our
              services to you.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Fees and Billing</h2>
            <p>
              My Ads Guru charges separately from Google. Your Google Ads spend is billed directly by Google to
              your payment method on file with Google. My Ads Guru&apos;s platform fees are billed separately
              through our own subscription and credit system as outlined in our{' '}
              <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                Terms of Service
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">6. Relationship with Google</h2>
            <p>
              My Ads Guru is an independent third-party platform and is not affiliated with, endorsed by, or
              sponsored by Google. We use the Google Ads API in compliance with Google&apos;s API Terms of Service
              and policies. Google Ads is a trademark of Google LLC.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">7. Termination</h2>
            <p>
              You may stop using My Ads Guru to manage your Google Ads at any time. Upon termination, we will
              cease all access to your Google Ads account. Your Google Ads account and campaigns will remain
              intact and under your direct control.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
            <p>
              If you have questions about how My Ads Guru manages your Google Ads account, contact us at{' '}
              <a href="mailto:hello@myads.guru" className="text-blue-400 hover:text-blue-300 underline">
                hello@myads.guru
              </a>
            </p>
            <div className="mt-4 text-zinc-500 text-sm">
              <p>Sphnix, Inc.</p>
              <p>15833 Ibsen Pl</p>
              <p>Dumfries, VA 22025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
