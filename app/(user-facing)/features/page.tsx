'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MessageSquare,
  HelpCircle,
  BarChart3,
  Zap,
  Calendar,
  Globe,
  FileText,
  Search,
  Gauge,
  CheckCircle,
  Megaphone,
  Mail,
  ClipboardList,
  Building2,
  Wrench,
  Sparkles,
  ArrowRight,
  Grid3X3,
  Mic,
  Sun,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Tool {
  icon: LucideIcon
  name: string
  description: string
  cost: string
  costVariant?: 'blue' | 'green' | 'amber'
}

interface ToolCategory {
  label: string
  title: string
  tools: Tool[]
}

const categories: ToolCategory[] = [
  {
    label: 'Reputation Management',
    title: 'Reputation Management',
    tools: [
      {
        icon: MessageSquare,
        name: 'AI Review Responder',
        description:
          'Generate professional, authentic responses to every Google review in seconds. Empathetic for negatives, warm for positives.',
        cost: '2 credits',
        costVariant: 'blue',
      },
      {
        icon: HelpCircle,
        name: 'AI Q&A Responder',
        description:
          'Answer Google Business Q&A questions with accurate information from your actual business data.',
        cost: '2 credits',
        costVariant: 'blue',
      },
      {
        icon: BarChart3,
        name: 'AI Review Insights',
        description:
          'Sentiment analysis of all reviews: top themes, improvement suggestions, marketing angles.',
        cost: '5 credits',
        costVariant: 'blue',
      },
    ],
  },
  {
    label: 'Content Generation',
    title: 'Content Generation',
    tools: [
      {
        icon: Zap,
        name: 'AI GBP Post Automation',
        description:
          'Auto-generate and publish engaging posts to your Google profile weekly. Set it and forget it.',
        cost: 'Included in Growth plan',
        costVariant: 'green',
      },
      {
        icon: Calendar,
        name: 'AI Social Media Calendar',
        description:
          '30 days of posts with captions, hashtags, optimal posting times, and post types.',
        cost: '8 credits',
        costVariant: 'blue',
      },
      {
        icon: Globe,
        name: 'AI Website Content',
        description:
          'Full page content with SEO titles, meta descriptions, H1/H2 structure, and body copy.',
        cost: '8 credits',
        costVariant: 'blue',
      },
      {
        icon: Mic,
        name: 'AI Brand Voice',
        description:
          'Analyze your business and generate a consistent brand voice guide — tone, personality, and messaging pillars.',
        cost: '5 credits',
        costVariant: 'blue',
      },
      {
        icon: Sun,
        name: 'AI Seasonal Planner',
        description:
          'Get a full seasonal marketing plan with campaign ideas, promotions, and content themes tailored to your business category.',
        cost: '5 credits',
        costVariant: 'blue',
      },
      {
        icon: Layers,
        name: 'AI Bulk Post Generator',
        description:
          'Generate multiple GBP posts at once — pick a count and get ready-to-publish posts with images, captions, and CTAs.',
        cost: '1 credit/post',
        costVariant: 'blue',
      },
    ],
  },
  {
    label: 'SEO & Strategy',
    title: 'SEO & Strategy',
    tools: [
      {
        icon: FileText,
        name: 'AI Business Description Optimizer',
        description:
          'SEO-optimized GBP description (750 chars), 10 keywords, short name suggestion.',
        cost: '3 credits',
        costVariant: 'blue',
      },
      {
        icon: Search,
        name: 'AI Competitor Intelligence',
        description:
          'Positioning strategies, service differentiators, keyword recommendations for your market.',
        cost: '10 credits',
        costVariant: 'blue',
      },
      {
        icon: Grid3X3,
        name: 'GeoGrid Rank Scanner',
        description:
          'See where you rank on Google Maps across your service area. Color-coded heatmap with competitor analysis at every grid point.',
        cost: '5-12 credits',
        costVariant: 'blue',
      },
      {
        icon: Gauge,
        name: 'PageSpeed Insights',
        description:
          'Analyze any website\'s performance, accessibility, SEO, and best practices. Get Lighthouse scores, Core Web Vitals, resource breakdown, and actionable optimization opportunities with a shareable branded report.',
        cost: 'Free',
        costVariant: 'green',
      },
      {
        icon: BarChart3,
        name: 'GA4 Analytics Dashboard',
        description:
          'Connect your Google Analytics 4 property and visualize traffic trends, top pages, traffic sources, device breakdown, and key metrics — all with period-over-period comparisons.',
        cost: 'Free',
        costVariant: 'green',
      },
      {
        icon: CheckCircle,
        name: 'AI Local SEO Audit',
        description:
          'Complete GBP audit scoring completeness, review quality, post frequency, and more.',
        cost: '$49 - $149',
        costVariant: 'amber',
      },
    ],
  },
  {
    label: 'Advertising',
    title: 'Advertising',
    tools: [
      {
        icon: Megaphone,
        name: 'AI Google Ads Copy',
        description:
          '15 headlines, 4 descriptions, callout extensions, sitelink suggestions optimized for your category.',
        cost: '5 credits',
        costVariant: 'blue',
      },
      {
        icon: Mail,
        name: 'AI Email/SMS Templates',
        description:
          '5 email + 5 SMS templates: welcome, promo, re-engagement, review request, referral.',
        cost: '3 credits',
        costVariant: 'blue',
      },
      {
        icon: ClipboardList,
        name: 'AI FAQ Generator',
        description:
          '15-20 category-specific FAQs with schema.org markup. Post directly to GBP.',
        cost: '3 credits',
        costVariant: 'blue',
      },
    ],
  },
]

const steps = [
  {
    number: '01',
    icon: Building2,
    title: 'Select Your Business',
    description:
      'Import your Google Business Profile with one click. We pull in your reviews, Q&A, services, hours, and categories so the AI already knows your business.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Choose Your Tool',
    description:
      'Pick from 18+ AI tools organized by category — reputation management, content generation, SEO strategy, or advertising.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Get Instant Results',
    description:
      'Receive formatted, ready-to-use output in seconds. Copy to clipboard, download, or apply directly to your Google Business Profile.',
  },
]

/* ------------------------------------------------------------------ */
/*  Cost Badge Component                                               */
/* ------------------------------------------------------------------ */

function CostBadge({
  cost,
  variant = 'blue',
}: {
  cost: string
  variant?: 'blue' | 'green' | 'amber'
}) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[variant]}`}
    >
      {cost}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Tool Card Component                                                */
/* ------------------------------------------------------------------ */

function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = tool.icon

  return (
    <div className="opacity-0 tool-card group relative rounded-2xl p-7 lg:p-8 bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-500">
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon container */}
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/15 group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
          <IconComponent size={22} className="text-blue-400" />
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-white mb-3">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 leading-relaxed text-sm mb-5 flex-1">
          {tool.description}
        </p>

        {/* Cost badge */}
        <div>
          <CostBadge cost={tool.cost} variant={tool.costVariant} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function FeaturesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroBadgeRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<(HTMLElement | null)[]>([])
  const howItWorksRef = useRef<HTMLElement>(null)
  const howTitleRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const ctaSectionRef = useRef<HTMLElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)

  const setCategoryRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      categoryRefs.current[index] = el
    },
    []
  )

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

      /* -- Category sections -- */
      categoryRefs.current.forEach((section) => {
        if (!section) return

        const title = section.querySelector('.category-title')
        const cards = section.querySelectorAll('.tool-card')

        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: title,
                start: 'top 85%',
              },
            }
          )
        }

        if (cards.length) {
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
                trigger: section.querySelector('.tool-cards-grid'),
                start: 'top 85%',
              },
            }
          )
        }
      })

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
      <section className="relative min-h-[70dvh] flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full text-center">
          <div ref={heroBadgeRef} className="opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              18+ AI-Powered Tools
            </span>
          </div>

          <h1
            ref={heroTitleRef}
            className="opacity-0 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            AI Tools Built{' '}
            <span className="gradient-text">For Your Business</span>
          </h1>

          <p
            ref={heroSubRef}
            className="opacity-0 text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            Every tool is pre-loaded with your Google Business Profile data
            — your reviews, services, category, and location. No generic
            templates. Results that sound like you, not a robot.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL CATEGORY SECTIONS                                       */}
      {/* ============================================================ */}
      {categories.map((category, catIndex) => (
        <section
          key={category.label}
          ref={setCategoryRef(catIndex)}
          className={`relative py-20 lg:py-28 ${
            catIndex % 2 === 1 ? 'bg-[#080810]' : ''
          }`}
        >
          {/* Background accents */}
          {catIndex % 2 === 0 ? (
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
          ) : (
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
          )}

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
            {/* Category header */}
            <div className="opacity-0 category-title mb-12">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
                {category.label}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                {category.title}
              </h2>
            </div>

            {/* Tool cards grid */}
            <div className="tool-cards-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section
        ref={howItWorksRef}
        className="relative py-24 lg:py-32 bg-[#080810]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
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
            Start Free —{' '}
            <span className="gradient-text">5 Credits Included</span>
          </h2>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Sign up, import your business, and try any AI tool immediately.
            No credit card required.
          </p>

          {/* CTA button */}
          <Link href="https://app.myads.guru/auth/register">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
              Get Started
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
