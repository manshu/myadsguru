'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

gsap.registerPlugin(ScrollTrigger)

const results = [
  {
    metric: '312%',
    headline: 'Increase in Qualified Leads',
    description:
      'Rebuilt campaign architecture and implemented conversion tracking for a B2B SaaS platform, tripling their qualified lead volume in 4 months.',
    industry: 'SaaS',
  },
  {
    metric: '60%',
    headline: 'Reduction in Cost-Per-Acquisition',
    description:
      'Overhauled keyword strategy and landing page experience for a professional services firm, cutting CPA by more than half while increasing volume.',
    industry: 'Professional Services',
  },
  {
    metric: '$2.4M',
    headline: 'Revenue Generated in Year One',
    description:
      'Launched a full-funnel Google Ads strategy for a healthcare technology startup, scaling from zero to $2.4M in attributed revenue within 12 months.',
    industry: 'Healthcare Tech',
  },
  {
    metric: '5.2x',
    headline: 'Return on Ad Spend',
    description:
      'Optimized Performance Max and Search campaigns for an enterprise software company, achieving a 5.2x ROAS across a $150K monthly ad budget.',
    industry: 'Enterprise Software',
  },
  {
    metric: '10x',
    headline: 'Scaling Monthly Ad Spend Profitably',
    description:
      'Helped a VC-backed startup scale from $5K to $50K monthly ad spend while maintaining profitability through continuous optimization and testing.',
    industry: 'Startup',
  },
]

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[200px]" />

      <div className="relative z-10">
        {/* Section heading */}
        <div ref={titleRef} className="opacity-0 text-center mb-16 px-6 lg:px-8">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
            Proven Results
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Results That Speak
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 lg:-ml-6">
              {results.map((result, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 lg:pl-6 basis-[85%] md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full group rounded-2xl p-8 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 transition-all duration-500 flex flex-col">
                    {/* Industry tag */}
                    <span className="inline-block self-start text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                      {result.industry}
                    </span>

                    {/* Metric */}
                    <p className="font-display text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {result.metric}
                    </p>

                    {/* Headline */}
                    <h3 className="font-display text-lg font-semibold text-white mb-4">
                      {result.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-500 leading-relaxed mt-auto">
                      {result.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mt-10">
              <CarouselPrevious className="static h-11 w-11 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all" />
              <CarouselNext className="static h-11 w-11 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
