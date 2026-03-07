'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Sparkles, Search } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: MapPin,
    title: 'Google Business Profile Management',
    description:
      'Import your businesses from Google or create them manually. Manage profiles, respond to reviews, handle Q&A, update working hours, and keep your business information accurate — all from the MyAdsGuru dashboard.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Post Creation',
    description:
      'Create and schedule Google Business posts with AI-generated content. Publish standard updates, events, offers, and alerts. Use the built-in calendar to plan your content and keep customers engaged.',
  },
  {
    icon: Search,
    title: 'Citation Building & Local SEO',
    description:
      'Build and maintain consistent business listings across directories in 50+ countries. Purchase citation building, GMB optimization, and conversion tracking services directly from the platform to boost your local rankings.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el
    },
    []
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      const cards = cardsRef.current.filter(Boolean)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div ref={titleRef} className="opacity-0 text-center mb-16">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
            Platform + Consulting
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What You Get
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={setCardRef(index)}
              className="opacity-0 group relative rounded-2xl p-8 lg:p-10 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/15 group-hover:border-blue-500/30 transition-all duration-300">
                  <service.icon
                    size={22}
                    className="text-blue-400"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
