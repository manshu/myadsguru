'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { useCalendly } from '@/components/calendly-modal'

export default function Hero() {
  const { open: openCalendly } = useCalendly()
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1 },
          '-=0.6'
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: content */}
          <div className="order-2 lg:order-1">
            <div ref={badgeRef} className="opacity-0 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Google Ads &amp; Digital Marketing Consultant
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="opacity-0 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              I help businesses turn{' '}
              <span className="gradient-text">ad spend</span> into revenue
            </h1>

            <p
              ref={subtextRef}
              className="opacity-0 text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
            >
              Hey, I&apos;m Himamshu Batra. With 12+ years of experience in
              systems integration, digital marketing, and automation, I help
              ambitious businesses achieve profitable growth through Google Ads,
              SEO, and full-funnel strategy.
            </p>

            <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openCalendly}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group"
              >
                Book a Free Audit
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
              <Link href="#case-studies">
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200"
                >
                  See Results
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side: profile image with glow ring */}
          <div
            ref={imageRef}
            className="opacity-0 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/20 blur-xl animate-pulse" />

              {/* Gradient ring */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full p-[3px] bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] p-1">
                  <Image
                    src="/profile.webp"
                    alt="Himamshu Batra - Google Ads and Digital Marketing Consultant"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-2.5 flex items-center gap-2">
                <span className="text-sm font-medium text-white whitespace-nowrap">
                  12+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
