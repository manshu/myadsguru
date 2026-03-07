'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Connect & Import',
    description:
      'Sign up with Google and import your existing businesses from Google Business Profile, or create new ones manually. We automatically sync your reviews, Q&A, photos, and business data into the MyAdsGuru dashboard.',
  },
  {
    number: '02',
    title: 'Manage & Create',
    description:
      'Use the dashboard to manage your business profiles, create AI-powered posts, schedule content on the calendar, and respond to customer reviews. Purchase citation building, GMB optimization, or conversion tracking services from the built-in marketplace.',
  },
  {
    number: '03',
    title: 'Grow & Optimize',
    description:
      'As your consultant, I work alongside the platform to optimize your strategy. Whether it is improving your local SEO rankings, refining your Google Ads campaigns, or scaling across multiple locations — you get hands-on support plus the tools to manage it all.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

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

      // Animate the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )

      // Animate each step
      const stepEls = stepsRef.current.filter(Boolean)
      stepEls.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-i-do-things"
      className="relative py-24 lg:py-32 bg-[#080810]"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div ref={titleRef} className="opacity-0 text-center mb-20">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            How It Works
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-8 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent origin-top"
          />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  stepsRef.current[index] = el
                }}
                className="opacity-0 relative flex gap-8 lg:gap-12"
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#0c1222] border border-blue-500/30 flex items-center justify-center">
                    <span className="font-display text-xl lg:text-2xl font-bold text-blue-400">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="pt-2 lg:pt-4 pb-2">
                  <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
