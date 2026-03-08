'use client'

import Link from 'next/link'

const productLinks = [
  { label: 'AI Tools', href: '/features' },
  { label: 'GeoGrid Scanner', href: '/geogrid' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'GBP Management', href: '/features' },
  { label: 'Citation Building', href: '/features' },
]

const companyLinks = [
  { label: 'Results', href: '/#case-studies' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Login', href: 'https://app.myads.guru', external: true },
  { label: 'Sign Up', href: 'https://app.myads.guru/auth/register', external: true },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
]

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <span className="font-display text-xl font-bold text-white tracking-tight">
                MyAds
                <span className="text-blue-500">.Guru</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              AI-powered local marketing platform. Manage your Google Business Profile, automate posts, respond to reviews, and grow your local presence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@myads.guru"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
            <Link
              href="https://app.myads.guru/auth/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Start Free
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} MyAdsGuru by Himamshu Batra. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
