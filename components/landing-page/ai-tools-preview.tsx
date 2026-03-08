'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, MessageSquare, FileText, Search } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const examples = [
  {
    icon: MessageSquare,
    title: 'Review Response',
    input: '"Great service! The team was very professional and fixed my AC unit quickly. Highly recommend!"',
    output: `Thank you so much for the wonderful review! We're thrilled to hear our team provided the fast, professional service you deserved. AC emergencies are stressful, and we're glad we could get you comfortable again quickly. We truly appreciate your recommendation — it means the world to our team. Don't hesitate to call us anytime you need help!`,
  },
  {
    icon: FileText,
    title: 'Optimized Description',
    input: 'Current: "We fix ACs and heaters. Call us."',
    output: `Premier HVAC services in Austin, TX — specializing in AC repair, furnace installation, and preventive maintenance for homes and businesses. Our certified technicians deliver same-day emergency service with transparent pricing and a 100% satisfaction guarantee. Serving the greater Austin area including Round Rock, Cedar Park, and Georgetown since 2015. Licensed, bonded, and insured for your peace of mind.`,
  },
  {
    icon: Search,
    title: 'Competitor Insight',
    input: 'Category: HVAC Services, Austin TX',
    output: `Your top 3 competitors focus heavily on "emergency AC repair" keywords but underserve the commercial HVAC segment. Opportunity: Target "commercial HVAC Austin" (890 monthly searches, low competition). Differentiate with same-day service guarantees — only 1 of 5 competitors offers this. Recommended seasonal push: pre-summer AC tune-up packages in March-April.`,
  },
]

export default function AIToolsPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)

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

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = examples[activeTab]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#080810]"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="opacity-0 text-center mb-16">
          <p className="text-sm font-medium text-cyan-400 uppercase tracking-widest mb-3">
            See It In Action
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Business Data Powers{' '}
            <span className="gradient-text">Every Tool</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Unlike generic AI, every response is pre-loaded with your business name, category, services, hours, and location.
          </p>
        </div>

        <div ref={cardsRef} className="opacity-0 max-w-4xl mx-auto">
          {/* Tab buttons */}
          <div className="flex gap-2 mb-8 justify-center">
            {examples.map((example, i) => (
              <button
                key={example.title}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === i
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    : 'text-zinc-400 hover:text-zinc-300 border border-transparent hover:border-white/10'
                }`}
              >
                <example.icon size={16} />
                {example.title}
              </button>
            ))}
          </div>

          {/* Demo card */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-zinc-500 ml-2 font-mono">
                MyAdsGuru AI — {current.title}
              </span>
            </div>

            <div className="p-6 lg:p-8 space-y-6">
              {/* Input */}
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Input</p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 italic">
                  {current.input}
                </div>
              </div>

              {/* AI generating indicator */}
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <Sparkles size={14} className="animate-pulse" />
                <span>AI Response</span>
              </div>

              {/* Output */}
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-sm text-zinc-300 leading-relaxed">
                {current.output}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
