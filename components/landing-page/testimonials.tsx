'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Himamshu turned our Google Ads around in just a month. But what really sets him apart is the MyAdsGuru platform — we manage all our Google Business Profiles, schedule posts, and track reviews from one place. The combination of his consulting and the platform is unbeatable.',
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    company: 'TechScale',
    featured: true,
  },
  {
    quote:
      'The AI post creation feature saves us hours every week. We used to struggle with what to post on our Google Business Profile — now we generate quality content in seconds and schedule it right from the calendar.',
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'GrowthHub',
    featured: false,
  },
  {
    quote:
      'Managing 12 business locations used to be a nightmare. With MyAdsGuru, we imported everything from Google, and now we handle reviews, Q&A, and posts for all locations in one dashboard. The citation building service boosted our local rankings significantly.',
    name: 'David Park',
    role: 'VP of Marketing',
    company: 'LaunchPad',
    featured: false,
  },
  {
    quote:
      'Himamshu is truly a superstar — 10x better than any agency we have worked with. His hands-on consulting combined with the platform tools means we get strategy and execution in one package. Our Google Ads and local presence have never been stronger.',
    name: 'Michael Rivera',
    role: 'CEO & Founder',
    company: 'ScaleUp Inc.',
    featured: true,
  },
  {
    quote:
      'The citation building service was a game changer. We went from barely showing up in local search to ranking in the top 3 for our key areas. Being able to order it right from the platform and track everything made it seamless.',
    name: 'Rachel Kim',
    role: 'Head of Sales',
    company: 'DataFlow',
    featured: false,
  },
  {
    quote:
      'We bought the GMB optimization package and saw results within weeks. The platform lets us see all our reviews, respond quickly, and keep our business info consistent. It does so much more than just ads.',
    name: 'James Wilson',
    role: 'Co-Founder & CEO',
    company: 'NexGen Labs',
    featured: false,
  },
]

export default function TestimonialsSection() {
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
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split testimonials into two columns for masonry effect
  const leftColumn = testimonials.filter((_, i) => i % 2 === 0)
  const rightColumn = testimonials.filter((_, i) => i % 2 === 1)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#080810]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div ref={titleRef} className="opacity-0 text-center mb-16">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            What Clients Say
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {leftColumn.map((testimonial, i) => {
              const globalIndex = i * 2
              return (
                <div
                  key={testimonial.name}
                  ref={setCardRef(globalIndex)}
                  className={`opacity-0 rounded-2xl border border-white/[0.06] hover:border-blue-500/15 transition-all duration-300 ${
                    testimonial.featured
                      ? 'p-8 lg:p-10 bg-gradient-to-br from-blue-500/[0.04] to-transparent'
                      : 'p-6 lg:p-8 bg-white/[0.02]'
                  }`}
                >
                  <Quote
                    size={24}
                    className="text-blue-500/30 mb-4"
                  />
                  <blockquote className={`text-zinc-300 leading-relaxed mb-6 ${testimonial.featured ? 'text-base lg:text-lg' : 'text-sm'}`}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right column - offset for masonry effect */}
          <div className="space-y-6 md:mt-12">
            {rightColumn.map((testimonial, i) => {
              const globalIndex = i * 2 + 1
              return (
                <div
                  key={testimonial.name}
                  ref={setCardRef(globalIndex)}
                  className={`opacity-0 rounded-2xl border border-white/[0.06] hover:border-blue-500/15 transition-all duration-300 ${
                    testimonial.featured
                      ? 'p-8 lg:p-10 bg-gradient-to-br from-blue-500/[0.04] to-transparent'
                      : 'p-6 lg:p-8 bg-white/[0.02]'
                  }`}
                >
                  <Quote
                    size={24}
                    className="text-blue-500/30 mb-4"
                  />
                  <blockquote className={`text-zinc-300 leading-relaxed mb-6 ${testimonial.featured ? 'text-base lg:text-lg' : 'text-sm'}`}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
