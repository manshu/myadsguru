import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MyAdsGuru terms of service — rules and guidelines for using our platform.',
}

export default function TermsOfService() {
  return (
    <section className="min-h-screen py-32 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: March 7, 2026</p>

        <div className="space-y-8 text-zinc-400 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using MyAdsGuru ("the Service"), operated at <strong className="text-zinc-300">www.myads.guru</strong> and{' '}
              <strong className="text-zinc-300">app.myads.guru</strong>, you agree to be bound by these Terms of Service. If you
              do not agree, please do not use the Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              MyAdsGuru is an AI-powered local marketing platform that enables businesses to manage their Google
              Business Profile, create AI-generated posts, respond to reviews, build local citations, and manage
              Google Ads campaigns. The platform connects to Google APIs with your explicit authorization.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">3. Account Registration</h2>
            <p>
              You may register using Google OAuth or email/password. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity under your account. You must
              provide accurate and complete information during registration.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">4. Google API Integration</h2>
            <p>
              By connecting your Google account, you authorize MyAdsGuru to access and manage your Google Business
              Profile and Google Ads data as described in our Privacy Policy. You can revoke this access at any
              time through your Google account settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2 mt-2">
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Attempt to gain unauthorized access to the Service or its systems.</li>
              <li>Use the Service to spam, harass, or distribute malicious content.</li>
              <li>Resell or redistribute the Service without authorization.</li>
              <li>Violate Google's Terms of Service or API policies through your use of MyAdsGuru.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">6. AI-Generated Content</h2>
            <p>
              MyAdsGuru uses AI to generate post content and marketing materials. While we strive for accuracy,
              AI-generated content may contain errors. You are responsible for reviewing and approving all content
              before it is published to your Google Business Profile or other platforms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">7. Payments & Subscriptions</h2>
            <p>
              Certain features require a paid subscription or credits. Payments are processed securely through
              Stripe. Refunds are handled on a case-by-case basis. We reserve the right to modify pricing with
              30 days' notice.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              MyAdsGuru is provided "as is" without warranties of any kind. We are not liable for any indirect,
              incidental, or consequential damages arising from your use of the Service, including but not limited
              to loss of data, revenue, or business opportunities.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">9. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these terms. You may delete your account
              at any time. Upon termination, your right to use the Service ceases immediately.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">10. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Service after changes constitutes
              acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">11. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
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
