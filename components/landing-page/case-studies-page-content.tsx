'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Quote,
  ArrowRight,
  TrendingUp,
  Clock,
  Target,
  CheckCircle2,
  BarChart3,
  Globe,
  Bot,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CaseStudy {
  metric: string
  title: string
  challenge: string
  solution: string
  results: string[]
  timeline: string
  category: string
  industry: string
}

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  featured: boolean
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { id: 'all', label: 'All' },
  { id: 'google-ads', label: 'Google Ads' },
  { id: 'local-seo', label: 'Local SEO' },
  { id: 'ai-platform', label: 'AI Platform' },
  { id: 'citation-building', label: 'Citation Building' },
]

const caseStudies: CaseStudy[] = [
  {
    metric: '312%',
    title: 'B2B SaaS Platform Triples Qualified Lead Volume',
    challenge:
      'A growing B2B SaaS company was burning through $25K/month on Google Ads with poor conversion tracking and broad keyword targeting. Their cost per qualified lead had climbed to $340, making acquisition unsustainable.',
    solution:
      'We rebuilt their entire campaign architecture from scratch \u2014 restructuring ad groups around high-intent keywords, implementing proper conversion tracking with offline import, and deploying smart bidding strategies aligned to their sales pipeline.',
    results: [
      '312% increase in qualified leads',
      'CPA reduced from $340 to $89',
      'CTR improved from 2.1% to 6.8%',
      '4.2x ROAS achieved',
    ],
    timeline: '4 months',
    category: 'google-ads',
    industry: 'B2B SaaS',
  },
  {
    metric: '5.2x',
    title: 'Enterprise Software Achieves Record ROAS',
    challenge:
      'An enterprise software company managing $150K/month in ad spend was seeing diminishing returns. Their Performance Max campaigns were cannibalizing branded search, and reporting was fragmented across multiple platforms.',
    solution:
      'We consolidated their account structure, separated brand and non-brand campaigns, implemented value-based bidding for different product tiers, and built unified cross-channel reporting dashboards.',
    results: [
      '5.2x return on ad spend',
      '43% reduction in wasted spend',
      'Revenue per click increased 67%',
      'Conversion rate improved from 3.1% to 5.8%',
    ],
    timeline: '3 months',
    category: 'google-ads',
    industry: 'Enterprise Software',
  },
  {
    metric: '847%',
    title: 'HVAC Company Dominates Local Pack in 90 Days',
    challenge:
      'A family-owned HVAC business in Austin, TX was invisible on Google Maps. They ranked outside the top 20 for their primary keywords and were losing customers to competitors with optimized profiles.',
    solution:
      'Using My Ads Guru\u2019s AI tools, we optimized their Google Business Profile description, generated 3 posts per week using AI Post Generator, responded to every review within hours using AI Review Responder, and tracked progress with weekly GeoGrid scans.',
    results: [
      '847% increase in Google Maps impressions',
      'Ranked #1\u20133 in 18 of 25 GeoGrid points',
      'Review response time reduced from 3 days to 2 hours',
      '156% increase in direction requests',
    ],
    timeline: '90 days',
    category: 'local-seo',
    industry: 'HVAC Services',
  },
  {
    metric: '50+',
    title: 'Multi-Location Restaurant Chain Expands Digital Footprint Globally',
    challenge:
      'A restaurant chain with 12 locations had inconsistent business information scattered across the internet. Different phone numbers, old addresses, and missing listings were confusing Google\u2019s algorithms and suppressing their local rankings.',
    solution:
      'We deployed our citation building service across 50+ directories and data aggregators worldwide. Each location received consistent NAP (Name, Address, Phone) data, structured citations, and ongoing monitoring for accuracy.',
    results: [
      'Consistent listings across 50+ countries',
      'Local pack rankings improved for all 12 locations',
      '34% increase in organic local traffic',
      'Citation accuracy score went from 42% to 97%',
    ],
    timeline: '6 weeks',
    category: 'citation-building',
    industry: 'Restaurant Chain',
  },
  {
    metric: '10hrs',
    title: 'Marketing Agency Saves 10 Hours Per Week Per Client',
    challenge:
      'A digital marketing agency managing 30+ client Google Business Profiles was overwhelmed. Writing unique review responses, creating weekly posts, and monitoring competitors for each client consumed their entire team\u2019s bandwidth.',
    solution:
      'They onboarded all 30+ clients to MyAds.Guru, leveraging AI Brand Voice to maintain unique tones for each client, Bulk Post Generator for batch content creation, and AI Review Responder for instant, personalized review management.',
    results: [
      '10 hours saved per client per week',
      '30+ businesses managed from one dashboard',
      'Client retention rate increased to 96%',
      'Content output tripled with half the team',
    ],
    timeline: '2 weeks to onboard',
    category: 'ai-platform',
    industry: 'Digital Agency',
  },
  {
    metric: '#1',
    title: 'Barbershop Goes from Invisible to #1 in Google Maps',
    challenge:
      'A barbershop in Woodbridge, VA was struggling to compete with established chains. Their GeoGrid scans showed they ranked outside the top 10 in most of their service area, with competitors dominating every quadrant.',
    solution:
      'We used GeoGrid to identify their weakest areas, optimized their profile with AI-generated descriptions and services, built citations in key directories, and ran a consistent posting schedule using the AI Post Generator.',
    results: [
      'Achieved #1 ranking in 60% of grid points',
      'Visibility score jumped from 23% to 91%',
      'Monthly customer inquiries increased 210%',
      'Average rank improved from #14.1 to #2.8',
    ],
    timeline: '8 weeks',
    category: 'local-seo',
    industry: 'Barbershop',
  },
]

const testimonials: Testimonial[] = [
  {
    quote:
      'Himamshu turned our Google Ads around in just a month. But what really sets him apart is the MyAds.Guru platform \u2014 we manage all our Google Business Profiles, schedule posts, and track reviews from one place. The combination of his consulting and the platform is unbeatable.',
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    company: 'TechScale',
    featured: true,
  },
  {
    quote:
      'The AI post creation feature saves us hours every week. We used to struggle with what to post on our Google Business Profile \u2014 now we generate quality content in seconds and schedule it right from the calendar.',
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'GrowthHub',
    featured: false,
  },
  {
    quote:
      'Managing 12 business locations used to be a nightmare. With MyAds.Guru, we imported everything from Google, and now we handle reviews, Q&A, and posts for all locations in one dashboard. The citation building service boosted our local rankings significantly.',
    name: 'David Park',
    role: 'VP of Marketing',
    company: 'LaunchPad',
    featured: false,
  },
  {
    quote:
      'Himamshu is truly a superstar \u2014 10x better than any agency we have worked with. His hands-on consulting combined with the platform tools means we get strategy and execution in one package. Our Google Ads and local presence have never been stronger.',
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

const headlineMetrics = [
  { value: 312, suffix: '%', label: 'Average Lead Increase' },
  { value: 5.2, suffix: 'x', label: 'Average ROAS', decimals: 1 },
  { value: 50, suffix: '+', label: 'Countries Covered' },
  { value: 500, suffix: '+', label: 'Businesses Served' },
]

/* ------------------------------------------------------------------ */
/*  Category Icon Helper                                               */
/* ------------------------------------------------------------------ */

function getCategoryIcon(category: string) {
  switch (category) {
    case 'google-ads':
      return Target
    case 'local-seo':
      return MapPin
    case 'ai-platform':
      return Bot
    case 'citation-building':
      return Globe
    default:
      return BarChart3
  }
}

function getCategoryLabel(category: string) {
  return categories.find((c) => c.id === category)?.label ?? category
}

/* ------------------------------------------------------------------ */
/*  Case Study Card Component                                          */
/* ------------------------------------------------------------------ */

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const Icon = getCategoryIcon(study.category)

  return (
    <div className="case-study-card group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 p-8 lg:p-10">
        {/* Top row: industry tag + timeline */}
        <div className="flex items-center justify-between mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Icon size={12} />
            {getCategoryLabel(study.category)}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
            <Clock size={12} />
            {study.timeline}
          </span>
        </div>

        {/* Hero metric */}
        <div className="mb-6">
          <p className="font-display text-5xl lg:text-6xl font-bold gradient-text leading-none">
            {study.metric}
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-medium">
            {study.industry}
          </p>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl lg:text-2xl font-semibold text-white mb-6 leading-snug">
          {study.title}
        </h3>

        {/* Challenge */}
        <div className="mb-5">
          <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">
            Challenge
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {study.challenge}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-2">
            Solution
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {study.solution}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-blue-500/20 via-white/[0.06] to-transparent mb-6" />

        {/* Results */}
        <div>
          <p className="text-xs text-blue-400 uppercase tracking-widest font-medium mb-3">
            Results
          </p>
          <ul className="space-y-2.5">
            {study.results.map((result) => (
              <li key={result} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={16}
                  className="text-green-400/80 shrink-0 mt-0.5"
                />
                <span className="text-zinc-300 text-sm leading-relaxed">
                  {result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page Content Component                                        */
/* ------------------------------------------------------------------ */

export default function CaseStudiesPageContent() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroBadgeRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const metricsSectionRef = useRef<HTMLElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const caseStudiesListRef = useRef<HTMLDivElement>(null)
  const testimonialsSectionRef = useRef<HTMLElement>(null)
  const testimonialsTitleRef = useRef<HTMLDivElement>(null)
  const testimonialCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaSectionRef = useRef<HTMLElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)

  const [activeCategory, setActiveCategory] = useState('all')

  const setTestimonialCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      testimonialCardsRef.current[index] = el
    },
    []
  )

  const filteredCaseStudies =
    activeCategory === 'all'
      ? caseStudies
      : caseStudies.filter((s) => s.category === activeCategory)

  /* -- GSAP Animations -- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero timeline */
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

      /* Metrics counter animation */
      if (metricsRef.current) {
        const counterEls =
          metricsRef.current.querySelectorAll<HTMLElement>('.metric-value')

        gsap.fromTo(
          metricsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: metricsSectionRef.current,
              start: 'top 85%',
              once: true,
            },
            onComplete: () => {
              counterEls.forEach((el) => {
                const target = parseFloat(
                  el.getAttribute('data-target') ?? '0'
                )
                const decimals = parseInt(
                  el.getAttribute('data-decimals') ?? '0',
                  10
                )
                const suffix = el.getAttribute('data-suffix') ?? ''
                const obj = { val: 0 }

                gsap.to(obj, {
                  val: target,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: () => {
                    el.textContent =
                      decimals > 0
                        ? obj.val.toFixed(decimals) + suffix
                        : Math.round(obj.val) + suffix
                  },
                })
              })
            },
          }
        )
      }

      /* Tabs */
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 90%',
          },
        }
      )

      /* Testimonials section */
      gsap.fromTo(
        testimonialsTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: testimonialsSectionRef.current,
            start: 'top 80%',
          },
        }
      )

      const tCards = testimonialCardsRef.current.filter(Boolean)
      if (tCards.length) {
        gsap.fromTo(
          tCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: testimonialsSectionRef.current,
              start: 'top 60%',
            },
          }
        )
      }

      /* CTA section */
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

  /* Animate case study cards when filter changes */
  useEffect(() => {
    if (!caseStudiesListRef.current) return

    const cards =
      caseStudiesListRef.current.querySelectorAll('.case-study-card')
    if (!cards.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    )
  }, [activeCategory])

  /* Masonry columns for testimonials */
  const leftColumn = testimonials.filter((_, i) => i % 2 === 0)
  const rightColumn = testimonials.filter((_, i) => i % 2 === 1)

  return (
    <div ref={pageRef}>
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-[60dvh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full text-center">
          {/* Badge */}
          <div ref={heroBadgeRef} className="opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp size={14} />
              Client Success Stories
            </span>
          </div>

          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="opacity-0 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            <span className="gradient-text">Real Results</span> for Real
            Businesses
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            className="opacity-0 text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            From tripling qualified leads to dominating Google Maps, see how
            businesses like yours achieve measurable growth with MyAds.Guru.
          </p>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  HEADLINE METRICS BAR                                         */}
      {/* ============================================================ */}
      <section ref={metricsSectionRef} className="relative py-16 lg:py-20">
        <div
          ref={metricsRef}
          className="opacity-0 relative z-10 max-w-5xl mx-auto px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {headlineMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`text-center ${
                  index < headlineMetrics.length - 1
                    ? 'md:border-r md:border-white/[0.06]'
                    : ''
                }`}
              >
                <p
                  className="metric-value font-display text-4xl lg:text-5xl font-bold text-white mb-2"
                  data-target={metric.value}
                  data-suffix={metric.suffix}
                  data-decimals={metric.decimals ?? 0}
                >
                  0{metric.suffix}
                </p>
                <p className="text-sm text-zinc-500 font-medium">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  CASE STUDIES                                                  */}
      {/* ============================================================ */}
      <section className="relative py-20 lg:py-28">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* Section heading */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Proven Track Record
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Our <span className="gradient-text">Case Studies</span>
            </h2>
          </div>

          {/* Category tabs */}
          <div
            ref={tabsRef}
            className="opacity-0 flex flex-wrap gap-2 mb-14 justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    : 'text-zinc-400 hover:text-zinc-300 border border-transparent hover:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Case study cards */}
          <div
            ref={caseStudiesListRef}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filteredCaseStudies.map((study) => (
              <CaseStudyCard key={study.title} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                  */}
      {/* ============================================================ */}
      <section
        ref={testimonialsSectionRef}
        className="relative py-24 lg:py-32 bg-[#080810]"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section heading */}
          <div ref={testimonialsTitleRef} className="opacity-0 text-center mb-16">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Testimonials
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              What Our Clients Say
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
                    ref={setTestimonialCardRef(globalIndex)}
                    className={`opacity-0 rounded-2xl border border-white/[0.06] hover:border-blue-500/15 transition-all duration-300 ${
                      testimonial.featured
                        ? 'p-8 lg:p-10 bg-gradient-to-br from-blue-500/[0.04] to-transparent'
                        : 'p-6 lg:p-8 bg-white/[0.02]'
                    }`}
                  >
                    <Quote size={24} className="text-blue-500/30 mb-4" />
                    <blockquote
                      className={`text-zinc-300 leading-relaxed mb-6 ${
                        testimonial.featured
                          ? 'text-base lg:text-lg'
                          : 'text-sm'
                      }`}
                    >
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
                    ref={setTestimonialCardRef(globalIndex)}
                    className={`opacity-0 rounded-2xl border border-white/[0.06] hover:border-blue-500/15 transition-all duration-300 ${
                      testimonial.featured
                        ? 'p-8 lg:p-10 bg-gradient-to-br from-blue-500/[0.04] to-transparent'
                        : 'p-6 lg:p-8 bg-white/[0.02]'
                    }`}
                  >
                    <Quote size={24} className="text-blue-500/30 mb-4" />
                    <blockquote
                      className={`text-zinc-300 leading-relaxed mb-6 ${
                        testimonial.featured
                          ? 'text-base lg:text-lg'
                          : 'text-sm'
                      }`}
                    >
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />

        <div
          ref={ctaContentRef}
          className="opacity-0 relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Get{' '}
            <span className="gradient-text">Results Like These</span>?
          </h2>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join hundreds of businesses already growing with MyAds.Guru. Start
            with 5 free credits and see the difference for yourself.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.myads.guru/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
                Get Started Free
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
                See AI Tools
              </Button>
            </Link>
          </div>

          <p className="text-sm text-zinc-600 mt-8">
            No credit card required. 5 free credits on signup.
          </p>
        </div>
      </section>
    </div>
  )
}
