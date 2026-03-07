'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Youtube } from 'lucide-react'
import { useCalendly } from '@/components/calendly-modal'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const { open: openCalendly } = useCalendly()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-[#0a0a0a] to-cyan-500/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div
        ref={contentRef}
        className="opacity-0 relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to{' '}
          <span className="gradient-text">scale</span>?
        </h2>

        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Let&apos;s talk about your growth goals. I&apos;ll show you exactly
          where your marketing can improve and how to get there.
        </p>

        {/* CTA button */}
        <Button
          onClick={openCalendly}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group"
        >
          Schedule a Free Call
          <ArrowRight
            size={18}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </Button>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link
            href="https://github.com/manshu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200 group"
            aria-label="GitHub profile"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all">
              <Github size={16} />
            </div>
            <span className="hidden sm:inline">GitHub</span>
          </Link>

          <Link
            href="https://www.youtube.com/@batraio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200 group"
            aria-label="YouTube channel"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all">
              <Youtube size={16} />
            </div>
            <span className="hidden sm:inline">YouTube</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
