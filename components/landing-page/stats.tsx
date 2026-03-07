'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '150+', label: 'Projects Delivered' },
  { value: '3x', label: 'Average ROAS' },
  { value: '$10M+', label: 'Ad Spend Managed' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="opacity-0 glass rounded-xl p-6 lg:p-8 text-center glow-border hover:border-blue-500/30 transition-all duration-300 group"
            >
              <p className="font-display text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
