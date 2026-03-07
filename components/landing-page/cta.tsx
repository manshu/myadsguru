'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
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
          <span className="gradient-text">grow locally</span>?
        </h2>

        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Get the platform and the consulting. Manage your Google Business
          Profile, create AI-powered posts, and boost your local SEO — all
          starting at $6.99/month.
        </p>

        {/* CTA button */}
        <Button
          onClick={openCalendly}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group"
        >
          Get Started
          <ArrowRight
            size={18}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </Button>

        <p className="text-sm text-zinc-600 mt-8">
          No credit card required. Free 14-day trial.
        </p>
      </div>
    </section>
  )
}
