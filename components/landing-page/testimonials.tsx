'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'We struggled with Google Ads for two years and received very few quality leads. Himamshu turned that around in just a month, generating a healthy volume of inbound leads that actually turned into customers. We have now doubled our monthly investment and are excited to keep working with him.',
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    company: 'TechScale',
    featured: true,
  },
  {
    quote:
      'Himamshu is an expert at what he does and brings incredible insights and execution to every team he helps. He has made our Google Ads the most profitable and largest revenue-driving stream in our organization.',
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'GrowthHub',
    featured: false,
  },
  {
    quote:
      'He was instrumental in helping us scale our ad spend multiple times over. His strategic insights, coupled with his hands-on approach to campaign management, allowed us to achieve growth that we had never thought possible.',
    name: 'David Park',
    role: 'VP of Marketing',
    company: 'LaunchPad',
    featured: false,
  },
  {
    quote:
      'Amazing partner for Google Ads. He helped us scale from thousands of dollars to millions. Himamshu is truly a superstar and 10x better than any other agency we have worked with. His technical expertise combined with marketing savvy is unmatched.',
    name: 'Michael Rivera',
    role: 'CEO & Founder',
    company: 'ScaleUp Inc.',
    featured: true,
  },
  {
    quote:
      'Working with Himamshu was a game changer for our organization. He not only drove incremental leads for our sales staff but also provided guidance and strategic direction for increasing conversions.',
    name: 'Rachel Kim',
    role: 'Head of Sales',
    company: 'DataFlow',
    featured: false,
  },
  {
    quote:
      'The results have been even better than we could have imagined. We relaunched Google Ads with him and ended up with a profitable and scalable system in the first year. He does so much more than just paid ads.',
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
