'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Grid3X3,
  MapPin,
  MousePointer,
  Maximize,
  BarChart3,
  Printer,
  Clock,
  ArrowRight,
  TrendingUp,
  Eye,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Feature Data                                                       */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: LucideIcon
  name: string
  description: string
}

const features: Feature[] = [
  {
    icon: Grid3X3,
    name: 'Color-Coded Heatmap',
    description:
      'See your rank at every grid point with intuitive color coding — green for top positions, red for areas that need work.',
  },
  {
    icon: MousePointer,
    name: 'Click-to-Place Grid',
    description:
      'Position your scanning grid anywhere on the map. Target specific neighborhoods, competitor locations, or service areas.',
  },
  {
    icon: BarChart3,
    name: 'Competitor Analysis',
    description:
      'See which competitors rank at every grid point. Understand who dominates each micro-area of your market.',
  },
  {
    icon: Maximize,
    name: 'Quadrant Analysis',
    description:
      'Break your grid into quadrants to identify your strongest and weakest geographic areas at a glance.',
  },
  {
    icon: Printer,
    name: 'Printable Reports',
    description:
      'Generate full PDF reports with the heatmap snapshot, stats, and competitor data. Perfect for client presentations.',
  },
  {
    icon: Clock,
    name: 'Scan History',
    description:
      'Track how your rankings change over time. Compare scans week-over-week to measure the impact of your SEO efforts.',
  },
]

/* ------------------------------------------------------------------ */
/*  Steps Data                                                         */
/* ------------------------------------------------------------------ */

interface Step {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: MapPin,
    title: 'Place Your Grid on the Map',
    description:
      'Click anywhere on the map to center your scanning grid. Target your business location, a competitor, or any area in your market.',
  },
  {
    number: '02',
    icon: Grid3X3,
    title: 'Choose Grid Size & Radius',
    description:
      'Select from 5\u00d75, 7\u00d77, or 9\u00d79 grids. Set your scan radius from 1 to 50 miles to cover your entire service area.',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'Get Instant Rank Data',
    description:
      'See your rank at every grid point with a color-coded heatmap, plus full competitor analysis and quadrant breakdown.',
  },
]

/* ------------------------------------------------------------------ */
/*  Pricing Data                                                       */
/* ------------------------------------------------------------------ */

interface GridOption {
  size: string
  points: number
  credits: number
  popular?: boolean
}

const gridOptions: GridOption[] = [
  { size: '5\u00d75', points: 25, credits: 5 },
  { size: '7\u00d77', points: 49, credits: 8, popular: true },
  { size: '9\u00d79', points: 81, credits: 12 },
]

/* ------------------------------------------------------------------ */
/*  Stat Card Component                                                */
/* ------------------------------------------------------------------ */

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon
  label: string
  value: string
  color: string
}) {
  return (
    <div className="stat-card opacity-0 bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500">
      <div
        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
          {label}
        </p>
        <p className="font-display text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Feature Card Component                                             */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature }: { feature: Feature }) {
  const IconComponent = feature.icon

  return (
    <div className="feature-card opacity-0 group relative rounded-2xl p-7 lg:p-8 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500">
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon container */}
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/15 group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
          <IconComponent size={22} className="text-blue-400" />
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-white mb-3">
          {feature.name}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 leading-relaxed text-sm flex-1">
          {feature.description}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function GeoGridPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroBadgeRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const demoSectionRef = useRef<HTMLElement>(null)
  const demoGridRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const howTitleRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const featuresSectionRef = useRef<HTMLElement>(null)
  const featuresTitleRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLElement>(null)
  const pricingTitleRef = useRef<HTMLDivElement>(null)
  const pricingCardsRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el
    },
    []
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* -- Hero animations (timeline) -- */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl
        .fromTo(
          heroBadgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
        .fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          heroSubRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )

      /* -- Demo section -- */
      if (demoSectionRef.current) {
        gsap.fromTo(
          demoGridRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: demoSectionRef.current,
              start: 'top 80%',
            },
          }
        )

        // Animate stat cards
        const statCards = demoSectionRef.current.querySelectorAll('.stat-card')
        if (statCards.length) {
          gsap.fromTo(
            statCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: statCards[0],
                start: 'top 88%',
              },
            }
          )
        }
      }

      /* -- How It Works section -- */
      gsap.fromTo(
        howTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: 'top 80%',
          },
        }
      )

      const stepEls = stepRefs.current.filter(Boolean)
      stepEls.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            },
            delay: i * 0.12,
          }
        )
      })

      /* -- Features section -- */
      gsap.fromTo(
        featuresTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresSectionRef.current,
            start: 'top 80%',
          },
        }
      )

      if (featuresSectionRef.current) {
        const featureCards =
          featuresSectionRef.current.querySelectorAll('.feature-card')
        if (featureCards.length) {
          gsap.fromTo(
            featureCards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: featuresSectionRef.current.querySelector(
                  '.features-grid'
                ),
                start: 'top 85%',
              },
            }
          )
        }
      }

      /* -- Pricing section -- */
      gsap.fromTo(
        pricingTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pricingSectionRef.current,
            start: 'top 80%',
          },
        }
      )

      if (pricingCardsRef.current) {
        const pricingCards =
          pricingCardsRef.current.querySelectorAll('.pricing-card')
        if (pricingCards.length) {
          gsap.fromTo(
            pricingCards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: pricingCardsRef.current,
                start: 'top 85%',
              },
            }
          )
        }
      }

      /* -- CTA section -- */
      gsap.fromTo(
        ctaContentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-[80dvh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full text-center">
          {/* Badge */}
          <div ref={heroBadgeRef} className="opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Local Rank Tracking
            </span>
          </div>

          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="opacity-0 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-5xl mx-auto"
          >
            See Where You Rank on Google Maps{' '}
            <span className="gradient-text">&mdash; Everywhere</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            className="opacity-0 text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Drop a grid on any location and instantly see your Google Maps
            ranking at every point. Color-coded heatmap, competitor analysis,
            and actionable insights for your local SEO strategy.
          </p>

          {/* CTAs */}
          <div ref={heroCtaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.myads.guru/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
                Try GeoGrid Free
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link href="/features">
              <Button
                variant="outline"
                className="border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200"
              >
                See All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  VISUAL DEMO SECTION                                          */}
      {/* ============================================================ */}
      <section
        ref={demoSectionRef}
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Live Preview
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your Rankings, <span className="gradient-text">Visualized</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Every cell represents a search from a different location.
              See exactly where you dominate and where competitors outrank you.
            </p>
          </div>

          <div
            ref={demoGridRef}
            className="opacity-0 max-w-lg mx-auto"
          >
            {/* Heatmap grid */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-xl" />

              {/* Grid container */}
              <div className="relative bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                {/* Grid header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                      <Grid3X3 size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        GeoGrid Scan
                      </p>
                      <p className="text-xs text-zinc-500">
                        7&times;7 Grid &middot; 5 mi radius
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">
                    &quot;barber shop near me&quot;
                  </span>
                </div>

                {/* GeoGrid screenshot */}
                <Image
                  src="/geogrid-sample.png"
                  alt="GeoGrid scan showing color-coded rank markers overlaid on a Google Maps view"
                  width={600}
                  height={600}
                  className="w-full rounded-xl"
                />

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-green-500" />
                    <span className="text-xs text-zinc-500">#1-3</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-yellow-400" />
                    <span className="text-xs text-zinc-500">#4-7</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-orange-400" />
                    <span className="text-xs text-zinc-500">#8-10</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-400" />
                    <span className="text-xs text-zinc-500">#11-15</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-red-600" />
                    <span className="text-xs text-zinc-500">#16+</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-zinc-700" />
                    <span className="text-xs text-zinc-500">Not found</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              <StatCard
                icon={TrendingUp}
                label="Avg Rank"
                value="8.4"
                color="bg-orange-500/20"
              />
              <StatCard
                icon={Trophy}
                label="Top 3"
                value="24%"
                color="bg-green-500/20"
              />
              <StatCard
                icon={Eye}
                label="Visibility"
                value="84%"
                color="bg-blue-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section
        ref={howItWorksRef}
        className="relative py-24 lg:py-32 bg-[#080810]"
      >
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section heading */}
          <div ref={howTitleRef} className="opacity-0 text-center mb-16 lg:mb-20">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              How It Works
            </h2>
          </div>

          {/* Steps grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div
                  key={step.number}
                  ref={setStepRef(index)}
                  className="opacity-0 relative text-center group"
                >
                  {/* Connector line (between cards, desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-blue-500/30 to-blue-500/10" />
                  )}

                  {/* Step number circle */}
                  <div className="relative z-10 w-24 h-24 rounded-full mx-auto mb-6 bg-[#0c1222] border border-blue-500/30 flex items-center justify-center group-hover:border-blue-500/50 transition-colors duration-300">
                    <div className="absolute inset-0 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-300" />
                    <StepIcon
                      size={32}
                      className="relative z-10 text-blue-400"
                    />
                  </div>

                  {/* Step number label */}
                  <p className="text-xs font-medium text-blue-400/60 uppercase tracking-widest mb-2">
                    Step {step.number}
                  </p>

                  {/* Step title */}
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Step description */}
                  <p className="text-zinc-400 leading-relaxed text-sm max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  FEATURES                                                     */}
      {/* ============================================================ */}
      <section
        ref={featuresSectionRef}
        className="relative py-24 lg:py-32"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section heading */}
          <div ref={featuresTitleRef} className="opacity-0 text-center mb-16">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Capabilities
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Dominate Local</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              GeoGrid gives you the complete picture of your local search
              presence with powerful analysis tools.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="features-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.name} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  PRICING / GRID OPTIONS                                       */}
      {/* ============================================================ */}
      <section
        ref={pricingSectionRef}
        className="relative py-24 lg:py-32 bg-[#080810]"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section heading */}
          <div ref={pricingTitleRef} className="opacity-0 text-center mb-16">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Grid Options
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Choose Your <span className="gradient-text">Scan Size</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Larger grids give you more data points for a detailed view of your
              ranking landscape.
            </p>
          </div>

          {/* Pricing cards */}
          <div
            ref={pricingCardsRef}
            className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {gridOptions.map((option) => (
              <div
                key={option.size}
                className={`pricing-card opacity-0 group relative rounded-2xl p-8 bg-white/[0.02] border transition-all duration-500 text-center ${
                  option.popular
                    ? 'border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.08)]'
                    : 'border-white/[0.06] hover:border-blue-500/20'
                } hover:bg-white/[0.04]`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Popular badge */}
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Grid size */}
                  <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-500/15 group-hover:border-blue-500/30 transition-all duration-300">
                    <Grid3X3
                      size={28}
                      className="text-blue-400"
                    />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {option.size} Grid
                  </h3>

                  <p className="text-zinc-500 text-sm mb-6">
                    {option.points} scan points
                  </p>

                  {/* Credit cost */}
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="font-display text-4xl font-bold text-white">
                      {option.credits}
                    </span>
                    <span className="text-zinc-500 text-sm">credits</span>
                  </div>

                  {/* Features list */}
                  <ul className="text-sm text-zinc-400 space-y-2 mb-8 text-left">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      Color-coded heatmap
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      Competitor data at every point
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      Quadrant analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      Printable PDF report
                    </li>
                  </ul>

                  <Link href="https://app.myads.guru/auth/register">
                    <Button
                      className={`w-full font-medium py-5 rounded-lg text-sm transition-all duration-200 group/btn ${
                        option.popular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                          : 'bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/[0.08]'
                      }`}
                    >
                      Get Started
                      <ArrowRight
                        size={16}
                        className="ml-1.5 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section
        ref={ctaSectionRef}
        className="relative py-24 lg:py-32 overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-[#0a0a0a] to-cyan-500/5" />

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />

        <div
          ref={ctaContentRef}
          className="opacity-0 relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start Scanning{' '}
            <span className="gradient-text">&mdash; 5 Free Credits</span>
          </h2>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Sign up, import your Google Business Profile, and run your first
            GeoGrid scan immediately. See exactly where you rank — everywhere.
          </p>

          {/* CTA button */}
          <Link href="https://app.myads.guru/auth/register">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
              Try GeoGrid Free
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>

          <p className="text-sm text-zinc-600 mt-8">
            No credit card required. 5 free credits on signup.
          </p>
        </div>
      </section>
    </div>
  )
}
