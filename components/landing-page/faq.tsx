'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'I specialize in Google Ads management (Search, Display, YouTube, Performance Max), SEO and content strategy, and marketing automation. I also provide strategic consulting on CRM integrations, landing page optimization, and full-funnel marketing strategy. For anything outside my core expertise, I have a network of trusted specialists I can bring in.',
  },
  {
    question: 'How does your pricing work?',
    answer:
      'I offer two pricing models: a flat monthly retainer, or a hybrid model with a smaller retainer plus a performance-based component tied to results. All engagements are month-to-month with no long-term contracts required. I am confident in the value I deliver, so I let the results speak for themselves.',
  },
  {
    question: 'What does your process look like?',
    answer:
      'It starts with a comprehensive audit of your current marketing efforts, followed by a strategic plan. Once aligned, I handle everything from campaign setup and launch to continuous optimization and reporting. You will receive clear, jargon-free reports focused on the metrics that matter: leads, revenue, and ROI -- not vanity metrics.',
  },
  {
    question: 'How long does it take to see results?',
    answer:
      'Most clients see measurable improvements within the first 30-60 days. However, the timeline varies depending on your industry, competition, existing account history, and budget. Google Ads can deliver quick wins, but sustainable growth typically takes 3-6 months of continuous optimization.',
  },
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'I work with B2B and B2C companies focused on lead generation across industries including SaaS, healthcare, professional services, and technology. My ideal clients are businesses with product-market fit doing $1M+ in revenue or VC-backed startups ready to scale. If you run a pure e-commerce business, I can recommend someone better suited for that.',
  },
]

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

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
        accordionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
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

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="relative py-24 lg:py-32"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div ref={titleRef} className="opacity-0 text-center mb-16">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-3">
            Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Frequently Asked
          </h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="opacity-0">
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
  )
}
