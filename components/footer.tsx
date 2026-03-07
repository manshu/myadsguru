'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
const navLinks = [
  { label: 'Services', hash: '#services' },
  { label: 'Process', hash: '#how-i-do-things' },
  { label: 'Results', hash: '#case-studies' },
  { label: 'FAQs', hash: '#faqs' },
]

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const isHomePage = pathname === '/'

  const getHref = (hash: string) => {
    return isHomePage ? hash : `/${hash}`
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault()
    if (isHomePage) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/${hash.substring(1)}`)
    }
  }

  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center gap-10">
          {/* Logo */}
          <Link href="/">
            <span className="font-display text-xl font-bold text-white tracking-tight">
              MyAds
              <span className="text-blue-500">Guru</span>
            </span>
          </Link>

          {/* Nav */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-8">
              {navLinks.map((link) => (
                <li key={link.hash}>
                  <Link
                    href={getHref(link.hash)}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                    onClick={(e) => handleNavClick(e, link.hash)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://app.myads.guru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-full h-px bg-white/5" />

          {/* Copyright */}
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} MyAdsGuru by Himamshu Batra. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
