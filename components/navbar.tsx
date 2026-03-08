'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCalendly } from '@/components/calendly-modal'

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'GeoGrid', href: '/geogrid' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Results', hash: '#case-studies' },
  { label: 'FAQs', href: '/faqs' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { open: openCalendly } = useCalendly()
  const pathname = usePathname()
  const router = useRouter()

  const isHomePage = pathname === '/'

  const getHref = (link: typeof navLinks[0]) => {
    if (link.href) return link.href
    if (link.hash) return isHomePage ? link.hash : `/${link.hash}`
    return '/'
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: typeof navLinks[0]
  ) => {
    if (link.href) {
      // Regular page link — let Next.js handle it
      setIsSheetOpen(false)
      return
    }
    // Hash link
    e.preventDefault()
    if (isHomePage && link.hash) {
      const element = document.querySelector(link.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (link.hash) {
      router.push(`/${link.hash.substring(1)}`)
    }
    setIsSheetOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-bold text-white tracking-tight">
              MyAds
              <span className="text-blue-500">.Guru</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={getHref(link)}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="https://app.myads.guru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Button
              onClick={openCalendly}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden text-zinc-400 hover:text-white transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-sm bg-[#0a0a0a] border-l border-white/5 p-8"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Mobile logo */}
                <Link
                  href="/"
                  onClick={() => setIsSheetOpen(false)}
                  className="mb-12"
                >
                  <span className="font-display text-xl font-bold text-white tracking-tight">
                    MyAds
                    <span className="text-blue-500">Guru</span>
                  </span>
                </Link>

                {/* Mobile nav links */}
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={getHref(link)}
                      className="text-lg text-zinc-400 hover:text-white transition-colors duration-200"
                      onClick={(e) => handleNavClick(e, link)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile login link */}
                <Link
                  href="https://app.myads.guru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 text-lg text-zinc-400 hover:text-white transition-colors duration-200"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Login
                </Link>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <Button
                    onClick={() => {
                      setIsSheetOpen(false)
                      openCalendly()
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
