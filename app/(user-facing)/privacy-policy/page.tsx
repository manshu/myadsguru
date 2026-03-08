import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'My Ads Guru privacy policy — how we collect, use, and protect your data.',
}

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen py-32 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: March 7, 2026</p>

        <div className="space-y-8 text-zinc-400 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              My Ads Guru ("we", "our", "us") operates the website <strong className="text-zinc-300">www.myads.guru</strong> and
              the MyAds.Guru platform at <strong className="text-zinc-300">app.myads.guru</strong>. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. What We Do</h2>
            <p>
              My Ads Guru is a subsidiary of Sphnix, Inc. My Ads Guru is an AI-powered local marketing platform that helps businesses manage their Google Business
              Profile, create and schedule posts, respond to reviews, build local citations, and run Google Ads campaigns.
              We connect to your Google account via OAuth to manage your business listings on your behalf.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-300">Account Information:</strong> Name, email address, and profile information provided during registration or Google OAuth sign-in.</li>
              <li><strong className="text-zinc-300">Google Business Profile Data:</strong> Business name, address, phone number, categories, reviews, Q&A, working hours, and posts — accessed via the Google Business Profile API with your authorization.</li>
              <li><strong className="text-zinc-300">Google Ads Data:</strong> Campaign performance data accessed via the Google Ads API with your authorization.</li>
              <li><strong className="text-zinc-300">Usage Data:</strong> Pages visited, features used, and interactions within the platform.</li>
              <li><strong className="text-zinc-300">Payment Information:</strong> Processed securely through Stripe. We do not store your full credit card details.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>To provide and maintain the MyAds.Guru platform and its features.</li>
              <li>To manage your Google Business Profile listings, posts, reviews, and Q&A on your behalf.</li>
              <li>To generate AI-powered content for your business posts and marketing materials.</li>
              <li>To manage Google Ads campaigns on your behalf.</li>
              <li>To process payments and manage subscriptions.</li>
              <li>To send service-related notifications and updates.</li>
              <li>To improve our platform and develop new features.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Google API Scopes & Data Access</h2>
            <p className="mb-3">
              My Ads Guru requests access to your Google account through OAuth 2.0 for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-300">Google Business Profile API:</strong> To read and manage your business listings, posts, reviews, and Q&A.</li>
              <li><strong className="text-zinc-300">Google Ads API:</strong> To read and manage your advertising campaigns.</li>
            </ul>
            <p className="mt-3">
              We only access data necessary to provide our services. You can revoke access at any time through your
              Google account settings at{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                myaccount.google.com/permissions
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">6. Data Sharing & Disclosure</h2>
            <p className="mb-3">We do not sell your personal data. We may share information with:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-300">Service Providers:</strong> Stripe (payments), AWS (hosting & storage), Anthropic/OpenAI (AI content generation — only business name and category are sent, no personal data).</li>
              <li><strong className="text-zinc-300">Google APIs:</strong> To perform actions on your Google Business Profile and Google Ads accounts as authorized by you.</li>
              <li><strong className="text-zinc-300">Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">7. Data Security</h2>
            <p>
              We use industry-standard security measures including encrypted connections (HTTPS/TLS), secure token
              storage, and access controls. OAuth tokens are stored encrypted and are never exposed to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">8. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active. You may request deletion of your account
              and associated data at any time by contacting us. Upon deletion, we remove your data within 30 days,
              except where retention is required by law.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 mt-2">
              <li>Access, update, or delete your personal information.</li>
              <li>Revoke Google OAuth access at any time.</li>
              <li>Request a copy of your data.</li>
              <li>Opt out of marketing communications.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:{' '}
              <a href="mailto:hello@myads.guru" className="text-blue-400 hover:text-blue-300 underline">
                hello@myads.guru
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
