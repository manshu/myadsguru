import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — My Ads Guru',
  description: 'Learn about My Ads Guru, an AI-powered local marketing platform by Sphnix, Inc. Founded by Himamshu Batra with 12+ years in digital advertising.',
}

export default function AboutPage() {
  return (
    <section className="min-h-screen py-32 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-white mb-2">About Us</h1>
        <p className="text-sm text-zinc-500 mb-12">My Ads Guru by Sphnix, Inc.</p>

        <div className="space-y-8 text-zinc-400 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Who We Are</h2>
            <p>
              My Ads Guru is an AI-powered local marketing platform built by{' '}
              <strong className="text-zinc-300">Sphnix, Inc.</strong> We help small and medium businesses
              take control of their online presence — from managing Google Business Profiles and responding
              to reviews, to running high-performance Google Ads campaigns and building local citations
              across 50+ countries.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Our Mission</h2>
            <p>
              Local businesses deserve the same caliber of marketing tools that enterprises use — without
              the enterprise price tag. My Ads Guru combines AI automation with proven digital marketing
              strategies to give every business owner a competitive edge in their local market.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Founded by Himamshu Batra</h2>
            <p>
              My Ads Guru was founded by <strong className="text-zinc-300">Himamshu Batra</strong>, a digital
              marketing strategist with over 12 years of hands-on experience in Google Ads management, SEO, and
              marketing automation. Having managed campaigns across industries ranging from B2B SaaS to local
              service businesses, Himamshu built My Ads Guru to solve the challenges he saw firsthand —
              fragmented tools, manual workflows, and a lack of actionable insights for local businesses.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">What We Do</h2>
            <p className="mb-3">
              Our platform integrates directly with Google APIs to provide a unified suite of tools for local marketing:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-300">Google Business Profile Management:</strong> Schedule posts, respond to reviews, manage Q&A, and keep your listing optimized — all from one dashboard.</li>
              <li><strong className="text-zinc-300">Google Ads Campaign Tools:</strong> AI-powered ad copy generation, campaign performance reporting, and bid strategy recommendations to maximize your ROAS.</li>
              <li><strong className="text-zinc-300">Local Citation Building:</strong> Distribute your business information across 50+ directories in multiple countries to strengthen local search rankings.</li>
              <li><strong className="text-zinc-300">AI-Powered Insights:</strong> 18+ AI tools including competitor analysis, local SEO audits, and keyword research — all pre-loaded with your business data.</li>
              <li><strong className="text-zinc-300">GeoGrid Rank Scanner:</strong> Visualize your local search rankings across your service area with color-coded heatmaps.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Our Company</h2>
            <div className="space-y-3">
              <p>
                <strong className="text-zinc-300">Legal Entity:</strong> Sphnix, Inc.
              </p>
              <p>
                <strong className="text-zinc-300">Address:</strong> 15833 Ibsen Pl, Dumfries, VA 22025
              </p>
              <p>
                <strong className="text-zinc-300">Email:</strong>{' '}
                <a href="mailto:hello@myads.guru" className="text-blue-400 hover:text-blue-300 underline">
                  hello@myads.guru
                </a>
              </p>
              <p>
                <strong className="text-zinc-300">Website:</strong>{' '}
                <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
                  www.myads.guru
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Legal</h2>
            <p>
              For details on how we handle your data, see our{' '}
              <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </Link>
              . For terms governing use of the platform, see our{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
