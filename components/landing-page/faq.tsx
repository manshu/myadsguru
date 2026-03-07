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
    question: 'What is MyAdsGuru?',
    answer:
      'MyAdsGuru combines hands-on consulting from Himamshu Batra with a powerful SaaS platform. You get access to a dashboard where you can manage your Google Business Profiles, create AI-powered posts, track reviews and Q&A, schedule content, and purchase marketing services like citation building and GMB optimization — all in one place.',
  },
  {
    question: 'How much does the platform cost?',
    answer:
      'The Freelancer plan starts at $6.99/month or $75/year. This gives you full access to Google Business Profile management, AI-powered post creation, review management, calendar scheduling, and the service marketplace. Enterprise plans with custom pricing are available for agencies and larger teams managing multiple locations.',
  },
  {
    question: 'What services can I purchase in the marketplace?',
    answer:
      'The platform offers three core services: Local Citation Building ($199-$499) for consistent business listings across 50+ countries, GMB Optimization ($99-$399) for improving your Google Business Profile and local rankings, and Enhanced Conversion Tracking ($549-$4,999) for Google Tag Manager and Facebook Pixel setup.',
  },
  {
    question: 'Can I manage multiple business locations?',
    answer:
      'Yes. You can import all your locations from Google Business Profile with one click, or create businesses manually. Each location gets its own profile with reviews, Q&A, posts, and working hours. The calendar view lets you schedule content across all your businesses.',
  },
  {
    question: 'How does the AI post creation work?',
    answer:
      'When creating a Google Business post, simply click the AI button to generate engaging content automatically. You can create standard updates, events, offers, and alerts. Add media, set a call-to-action, and schedule it for later — or publish immediately. The AI adapts to your business context to produce relevant content.',
  },
  {
    question: 'Do I also get consulting?',
    answer:
      'Absolutely. On top of the platform, you get direct access to Himamshu Batra for strategic consulting on Google Ads, local SEO, and full-funnel marketing. Whether you need campaign management, a marketing audit, or growth strategy — the consulting and platform work together to deliver results.',
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
