'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X, Sparkles, Zap, Star } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const REGISTER_URL = 'https://app.myads.guru/auth/register'

interface CreditPack {
  name: string
  credits: number
  price: string
  perCredit: string
  popular: boolean
}

const creditPacks: CreditPack[] = [
  { name: 'Starter', credits: 25, price: '$9.99', perCredit: '$0.40', popular: false },
  { name: 'Growth', credits: 75, price: '$24.99', perCredit: '$0.33', popular: false },
  { name: 'Pro', credits: 200, price: '$49.99', perCredit: '$0.25', popular: true },
  { name: 'Enterprise', credits: 500, price: '$99.99', perCredit: '$0.20', popular: false },
]

interface CreditTool {
  name: string
  credits: number
}

const creditTools: CreditTool[] = [
  { name: 'Review Responder', credits: 2 },
  { name: 'Description Optimizer', credits: 3 },
  { name: 'Q&A Responder', credits: 2 },
  { name: 'Competitor Report', credits: 10 },
  { name: 'Social Calendar', credits: 8 },
  { name: 'Review Insights', credits: 5 },
  { name: 'Google Ads Copy', credits: 5 },
  { name: 'Website Content', credits: 8 },
  { name: 'Email Templates', credits: 3 },
  { name: 'Brand Voice', credits: 5 },
  { name: 'Seasonal Planner', credits: 5 },
  { name: 'FAQ Generator', credits: 3 },
  { name: 'GeoGrid Scan (5×5)', credits: 5 },
  { name: 'GeoGrid Scan (7×7)', credits: 8 },
  { name: 'GeoGrid Scan (9×9)', credits: 12 },
  { name: 'Bulk Post (per post)', credits: 1 },
]

interface SubscriptionPlan {
  name: string
  price: string
  period: string
  description: string
  popular: boolean
  features: {
    posting: string
    reviews: string
    credits: string
  }
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Get started and explore the platform',
    popular: false,
    features: {
      posting: 'No auto-posting',
      reviews: 'No review AI',
      credits: '5 credits on signup',
    },
  },
  {
    name: 'Growth',
    price: '$29',
    period: '/mo',
    description: 'For growing businesses ready to automate',
    popular: true,
    features: {
      posting: '2 posts/week auto-posting',
      reviews: '10 review responses/mo',
      credits: '25 monthly credits',
    },
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/mo',
    description: 'Full automation for serious businesses',
    popular: false,
    features: {
      posting: 'Daily auto-posting',
      reviews: 'Unlimited review auto-respond',
      credits: '75 monthly credits',
    },
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/mo',
    description: 'Multi-location power and priority support',
    popular: false,
    features: {
      posting: 'Daily + multi-location',
      reviews: 'Unlimited + insights',
      credits: '200 monthly credits',
    },
  },
]

interface FeatureRow {
  name: string
  free: boolean | string
  growth: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

const featureComparison: FeatureRow[] = [
  { name: 'AI-Powered GBP Posts', free: true, growth: true, pro: true, enterprise: true },
  { name: 'Auto-Posting', free: false, growth: '2/week', pro: 'Daily', enterprise: 'Daily + Multi' },
  { name: 'Review Auto-Respond', free: false, growth: '10/mo', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Monthly AI Credits', free: '5 (one-time)', growth: '25', pro: '75', enterprise: '200' },
  { name: 'Competitor Reports', free: false, growth: true, pro: true, enterprise: true },
  { name: 'Multi-Location Support', free: false, growth: false, pro: false, enterprise: true },
  { name: 'Priority Support', free: false, growth: false, pro: true, enterprise: true },
  { name: 'Custom Integrations', free: false, growth: false, pro: false, enterprise: true },
]

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What happens when I run out of credits?',
    answer:
      'You can purchase additional credit packs at any time from the dashboard. Your existing work and data remain accessible — you simply won\'t be able to run new AI-powered tools until you top up. Credit packs never expire, so buy what you need when you need it.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings. You\'ll continue to have access to your plan features until the end of your current billing period.',
  },
  {
    question: 'Do subscription credits roll over?',
    answer:
      'Monthly credits included with your subscription do not roll over to the next month. However, any credit packs you purchase separately never expire and remain in your account until used. This gives you flexibility to stock up when needed.',
  },
  {
    question: "What's the difference between credits and subscriptions?",
    answer:
      'Credits are a pay-as-you-go currency for AI-powered tools like review responding, content generation, and competitor analysis. Subscriptions give you recurring features like auto-posting, automated review responses, and a monthly allotment of credits. You can use credits without a subscription, or combine both for maximum value.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Every new account receives 5 free credits to try the platform. There\'s no credit card required to sign up. You can explore the dashboard, connect your Google Business Profile, and use your credits to test any AI-powered tool before purchasing a plan.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure payment processor, Stripe. All transactions are encrypted and PCI-compliant. We also support Apple Pay and Google Pay for quick checkout.',
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'credits' | 'subscriptions'>('credits')

  // Refs — sections
  const heroRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)
  const creditsSectionRef = useRef<HTMLDivElement>(null)
  const toolsSectionRef = useRef<HTMLDivElement>(null)
  const subsSectionRef = useRef<HTMLDivElement>(null)
  const faqSectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)

  // Refs — individual animated elements
  const heroTitleRef = useRef<HTMLDivElement>(null)
  const creditCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const toolCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const subCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const featureTableRef = useRef<HTMLDivElement>(null)
  const faqTitleRef = useRef<HTMLDivElement>(null)
  const faqAccordionRef = useRef<HTMLDivElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)
  const toolsTitleRef = useRef<HTMLDivElement>(null)

  const setCreditCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      creditCardsRef.current[index] = el
    },
    []
  )

  const setToolCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      toolCardsRef.current[index] = el
    },
    []
  )

  const setSubCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      subCardsRef.current[index] = el
    },
    []
  )

  /* ---- Hero + toggle animation ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        toggleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ---- Credit cards animation ---- */
  useEffect(() => {
    if (activeTab !== 'credits') return

    // Small delay so DOM is painted
    const raf = requestAnimationFrame(() => {
      const cards = creditCardsRef.current.filter(Boolean)
      if (!cards.length) return

      const ctx = gsap.context(() => {
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
              trigger: creditsSectionRef.current,
              start: 'top 85%',
            },
          }
        )
      }, creditsSectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [activeTab])

  /* ---- Tools grid animation ---- */
  useEffect(() => {
    if (activeTab !== 'credits') return

    const raf = requestAnimationFrame(() => {
      const cards = toolCardsRef.current.filter(Boolean)
      if (!cards.length) return

      const ctx = gsap.context(() => {
        gsap.fromTo(
          toolsTitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: toolsSectionRef.current,
              start: 'top 80%',
            },
          }
        )

        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: toolsSectionRef.current,
              start: 'top 75%',
            },
          }
        )
      }, toolsSectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [activeTab])

  /* ---- Subscription cards animation ---- */
  useEffect(() => {
    if (activeTab !== 'subscriptions') return

    const raf = requestAnimationFrame(() => {
      const cards = subCardsRef.current.filter(Boolean)
      if (!cards.length) return

      const ctx = gsap.context(() => {
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
              trigger: subsSectionRef.current,
              start: 'top 85%',
            },
          }
        )
      }, subsSectionRef)

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [activeTab])

  /* ---- Feature table animation ---- */
  useEffect(() => {
    if (activeTab !== 'subscriptions') return

    const raf = requestAnimationFrame(() => {
      if (!featureTableRef.current) return

      const ctx = gsap.context(() => {
        gsap.fromTo(
          featureTableRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featureTableRef.current,
              start: 'top 80%',
            },
          }
        )
      })

      return () => ctx.revert()
    })

    return () => cancelAnimationFrame(raf)
  }, [activeTab])

  /* ---- FAQ animation ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        faqTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: faqSectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        faqAccordionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: faqSectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, faqSectionRef)

    return () => ctx.revert()
  }, [])

  /* ---- CTA animation ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, ctaSectionRef)

    return () => ctx.revert()
  }, [])

  /* ---- Render helpers ---- */

  function renderFeatureValue(value: boolean | string) {
    if (value === true) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/15">
          <Check size={14} className="text-blue-400" />
        </span>
      )
    }
    if (value === false) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.04]">
          <X size={14} className="text-zinc-600" />
        </span>
      )
    }
    return <span className="text-sm text-zinc-300">{value}</span>
  }

  /* ---------------------------------------------------------------- */
  /*  JSX                                                              */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ======================== HERO ======================== */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <div ref={heroTitleRef} className="opacity-0">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles size={14} />
                Simple, transparent pricing
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Simple,{' '}
              <span className="gradient-text">Transparent Pricing</span>
            </h1>

            <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Pay only for what you use, or subscribe for automation
            </p>
          </div>
        </div>
      </section>

      {/* ======================== TOGGLE ======================== */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pb-16">
        <div ref={toggleRef} className="opacity-0 flex justify-center">
          <div className="inline-flex items-center rounded-full p-1 bg-white/[0.04] border border-white/[0.06]">
            <button
              onClick={() => setActiveTab('credits')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'credits'
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap size={15} />
                Credits
              </span>
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'subscriptions'
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Star size={15} />
                Subscriptions
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================== CREDITS TAB ======================== */}
      {activeTab === 'credits' && (
        <>
          {/* Credit packs */}
          <div
            ref={creditsSectionRef}
            className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pb-24"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {creditPacks.map((pack, index) => (
                <div
                  key={pack.name}
                  ref={setCreditCardRef(index)}
                  className={`opacity-0 group relative rounded-2xl p-8 transition-all duration-500 ${
                    pack.popular
                      ? 'bg-white/[0.04] border border-blue-500/30 glow-blue'
                      : 'bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Popular badge */}
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        <Star size={12} className="fill-current" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Pack name */}
                    <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">
                      {pack.name}
                    </p>

                    {/* Credits */}
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display text-4xl font-bold text-white">
                        {pack.credits}
                      </span>
                      <span className="text-zinc-500 text-sm">credits</span>
                    </div>

                    {/* Price */}
                    <p className="font-display text-2xl font-bold text-white mb-1">
                      {pack.price}
                    </p>
                    <p className="text-sm text-zinc-500 mb-8">
                      {pack.perCredit} per credit
                    </p>

                    {/* CTA */}
                    <Link
                      href={REGISTER_URL}
                      className={`block w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        pack.popular
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:from-blue-500 hover:to-blue-400'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.06]'
                      }`}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit tools breakdown */}
          <div
            ref={toolsSectionRef}
            className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pb-24 lg:pb-32"
          >
            <div ref={toolsTitleRef} className="opacity-0 text-center mb-12">
              <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
                Credit Usage
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                What can you do with credits?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creditTools.map((tool, index) => (
                <div
                  key={tool.name}
                  ref={setToolCardRef(index)}
                  className="opacity-0 group flex items-center justify-between rounded-xl p-5 bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
                      <Zap size={14} className="text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {tool.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {tool.credits} {tool.credits === 1 ? 'credit' : 'credits'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ======================== SUBSCRIPTIONS TAB ======================== */}
      {activeTab === 'subscriptions' && (
        <>
          {/* Subscription cards */}
          <div
            ref={subsSectionRef}
            className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pb-24"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  ref={setSubCardRef(index)}
                  className={`opacity-0 group relative rounded-2xl p-8 transition-all duration-500 ${
                    plan.popular
                      ? 'bg-white/[0.04] border border-blue-500/30 glow-blue'
                      : 'bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        <Star size={12} className="fill-current" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Plan name */}
                    <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">
                      {plan.name}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-display text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-zinc-500 text-sm">{plan.period}</span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/15 shrink-0">
                          <Check size={12} className="text-blue-400" />
                        </span>
                        <span className="text-sm text-zinc-300">{plan.features.posting}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/15 shrink-0">
                          <Check size={12} className="text-blue-400" />
                        </span>
                        <span className="text-sm text-zinc-300">{plan.features.reviews}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/15 shrink-0">
                          <Check size={12} className="text-blue-400" />
                        </span>
                        <span className="text-sm text-zinc-300">{plan.features.credits}</span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <Link
                      href={REGISTER_URL}
                      className={`block w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:from-blue-500 hover:to-blue-400'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.06]'
                      }`}
                    >
                      {plan.price === '$0' ? 'Get Started Free' : 'Get Started'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature comparison table */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pb-24 lg:pb-32">
            <div
              ref={featureTableRef}
              className="opacity-0 rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
            >
              {/* Table header */}
              <div className="grid grid-cols-5 gap-4 px-6 py-5 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="text-sm font-semibold text-white">Features</div>
                <div className="text-sm font-semibold text-zinc-400 text-center">Free</div>
                <div className="text-sm font-semibold text-blue-400 text-center">Growth</div>
                <div className="text-sm font-semibold text-zinc-400 text-center">Pro</div>
                <div className="text-sm font-semibold text-zinc-400 text-center">Enterprise</div>
              </div>

              {/* Table rows */}
              {featureComparison.map((row, index) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-5 gap-4 px-6 py-4 items-center ${
                    index < featureComparison.length - 1 ? 'border-b border-white/[0.04]' : ''
                  } hover:bg-white/[0.02] transition-colors`}
                >
                  <div className="text-sm text-zinc-300">{row.name}</div>
                  <div className="flex justify-center">{renderFeatureValue(row.free)}</div>
                  <div className="flex justify-center">{renderFeatureValue(row.growth)}</div>
                  <div className="flex justify-center">{renderFeatureValue(row.pro)}</div>
                  <div className="flex justify-center">{renderFeatureValue(row.enterprise)}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ======================== FAQ ======================== */}
      <section
        ref={faqSectionRef}
        className="relative py-24 lg:py-32"
      >
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <div ref={faqTitleRef} className="opacity-0 text-center mb-16">
            <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
              Questions
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Pricing FAQ
            </h2>
          </div>

          <div ref={faqAccordionRef} className="opacity-0">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-none rounded-xl bg-white/[0.03] overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 text-left text-white hover:no-underline hover:bg-white/[0.02] text-base font-medium transition-colors [&[data-state=open]]:bg-white/[0.02]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ======================== CTA ======================== */}
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
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles size={14} />
              No credit card required
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get Started Free{' '}
            <span className="gradient-text">5 Credits Included</span>
          </h2>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Sign up in seconds, connect your Google Business Profile, and start
            using AI-powered tools today. No strings attached.
          </p>

          <Link
            href={REGISTER_URL}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-4 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group"
          >
            Get Started Free
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-sm text-zinc-600 mt-8">
            Free forever plan available. Upgrade anytime.
          </p>
        </div>
      </section>
    </>
  )
}
