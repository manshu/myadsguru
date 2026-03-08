'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FAQ {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  label: string
  faqs: FAQ[]
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const faqCategories: FAQCategory[] = [
  {
    id: 'platform',
    label: 'Platform',
    faqs: [
      {
        question: 'What is My Ads Guru?',
        answer:
          'My Ads Guru is an AI-powered local marketing platform designed specifically for businesses that rely on Google Business Profiles to attract local customers. It combines 18+ AI tools, a GeoGrid rank scanner, automated posting, and competitor intelligence into a single dashboard — all pre-loaded with your actual business data so you get personalized, ready-to-use results.',
      },
      {
        question: 'How does My Ads Guru help local businesses?',
        answer:
          'My Ads Guru helps local businesses grow by automating the most time-consuming parts of local marketing. From responding to Google reviews in seconds with AI to generating SEO-optimized posts and scanning your Google Maps rankings across your entire service area, every tool is built to save you hours each week while improving your online visibility and reputation.',
      },
      {
        question:
          'What is a Google Business Profile and why does it matter?',
        answer:
          'A Google Business Profile (formerly Google My Business) is your free listing on Google Search and Google Maps. It displays your business name, hours, reviews, photos, and services. For local businesses, it is often the first thing potential customers see — businesses with optimized profiles get significantly more calls, direction requests, and website visits than those without.',
      },
      {
        question:
          'How do I connect my Google Business Profile to MyAds.Guru?',
        answer:
          'After signing up, simply click "Add Business" on your dashboard and sign in with the Google account that manages your business listing. My Ads Guru securely imports your profile data — reviews, Q&A, services, categories, and more — so every AI tool already understands your business from the start. The process takes less than a minute.',
      },
      {
        question: 'Is My Ads Guru suitable for multi-location businesses?',
        answer:
          'Yes. My Ads Guru supports multiple Google Business Profiles under a single account. You can switch between locations, run AI tools for each profile individually, and track GeoGrid rankings for every location. This makes it ideal for franchise owners, agencies, and businesses with several branches.',
      },
      {
        question: 'Do I need technical skills to use My Ads Guru?',
        answer:
          'Not at all. My Ads Guru is designed for business owners, not developers. Every tool has a simple interface — select your business, choose a tool, and get results. There is no coding, no complex configuration, and no learning curve. If you can use email, you can use My Ads Guru.',
      },
      {
        question:
          'How is My Ads Guru different from other local SEO tools?',
        answer:
          'Most local SEO tools offer generic templates and require you to manually input your business details every time. My Ads Guru pre-loads your actual Google Business Profile data into every AI tool, so responses reference your real services, location, and brand voice. Combined with the GeoGrid rank scanner and automated posting, it is an all-in-one platform rather than a collection of disconnected utilities.',
      },
    ],
  },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    faqs: [
      {
        question: 'What AI tools does My Ads Guru offer?',
        answer:
          'My Ads Guru offers 18+ AI-powered tools organized into four categories: Reputation Management (review responder, Q&A responder, review insights), Content Generation (post automation, social media calendar, website content, brand voice, seasonal planner, bulk post generator), SEO & Strategy (business description optimizer, competitor intelligence, GeoGrid scanner, local SEO audit), and Advertising (Google Ads copy, email/SMS templates, FAQ generator).',
      },
      {
        question: 'How does the AI Review Response tool work?',
        answer:
          'Paste any Google review into the AI Review Responder, and it generates a professional, authentic reply in seconds. The AI understands context — it crafts empathetic responses for negative reviews and warm, grateful replies for positive ones. Every response references your business name and services so it sounds like you, not a template. Each response costs 2 credits.',
      },
      {
        question:
          'What is the AI Post Generator and how can it help my business?',
        answer:
          'The AI Post Generator creates engaging Google Business Profile posts complete with captions, calls-to-action, and relevant content tailored to your business category and services. You can generate individual posts or use the Bulk Post Generator to create multiple posts at once. Regular posting signals to Google that your business is active, which can improve your local search rankings.',
      },
      {
        question:
          'How does AI Profile Optimization improve my Google listing?',
        answer:
          'The AI Business Description Optimizer analyzes your current Google Business Profile and generates an SEO-optimized description (within the 750-character limit), suggests high-value keywords for your category, and recommends a short name. An optimized profile helps Google understand what your business offers, improving your chances of appearing in relevant local searches.',
      },
      {
        question:
          'What is AI Brand Voice and how does it maintain consistency?',
        answer:
          'AI Brand Voice analyzes your business data, reviews, and existing content to generate a comprehensive brand voice guide. It defines your tone, personality, and messaging pillars so every piece of content — from review responses to social posts — sounds consistently like your brand. This is especially valuable for businesses with multiple team members creating content.',
      },
      {
        question: 'What is the AI Seasonal Planner?',
        answer:
          'The AI Seasonal Planner generates a complete marketing plan tailored to your business category and location. It includes campaign ideas, promotional strategies, and content themes for upcoming seasons and holidays relevant to your industry. For example, an HVAC company would get pre-summer AC tune-up campaigns, while a restaurant might receive holiday catering promotions.',
      },
      {
        question: 'How does the AI Bulk Post Generator work?',
        answer:
          'The Bulk Post Generator lets you specify how many posts you need and generates them all at once — each with unique captions, calls-to-action, and content variations. This is perfect for planning ahead or scheduling a month of content in one session. Each post costs 1 credit, making it one of the most cost-effective tools on the platform.',
      },
      {
        question: 'Can I edit AI-generated content before publishing?',
        answer:
          'Absolutely. Every piece of AI-generated content is fully editable before you use it. You can tweak wording, adjust tone, add specific details, or combine elements from multiple suggestions. The AI gives you a strong starting point, and you have complete control over the final output.',
      },
    ],
  },
  {
    id: 'geogrid',
    label: 'GeoGrid',
    faqs: [
      {
        question: 'What is the GeoGrid Rank Scanner?',
        answer:
          'The GeoGrid Rank Scanner is a local SEO tool that shows you exactly where your business ranks on Google Maps across your entire service area. It places a grid of scan points over any location on the map and checks your ranking at each point, then displays the results as a color-coded heatmap so you can instantly see your strongest and weakest areas.',
      },
      {
        question: 'How does GeoGrid scanning work?',
        answer:
          'You click on the map to place your scanning grid, choose a keyword (like "plumber near me"), select a grid size (5x5, 7x7, or 9x9), and set a scan radius. My Ads Guru then simulates Google Maps searches from each grid point and records where your business ranks. The entire scan typically completes in under a minute.',
      },
      {
        question: 'What do the colors on the GeoGrid heatmap mean?',
        answer:
          'The heatmap uses intuitive color coding: green cells indicate top positions (#1-3) where you are highly visible, yellow shows mid-range rankings (#4-7), orange represents lower visibility (#8-10), red flags poor rankings (#11-15), dark red means very low rankings (#16+), and gray indicates your business was not found in the results at that location.',
      },
      {
        question:
          'What grid sizes are available and how many credits do they cost?',
        answer:
          'My Ads Guru offers three grid sizes: 5x5 (25 scan points) for 5 credits, 7x7 (49 scan points) for 8 credits, and 9x9 (81 scan points) for 12 credits. Larger grids provide more granular data across your service area. All grid sizes include competitor analysis and quadrant breakdown at no additional cost.',
      },
      {
        question: 'How often should I run GeoGrid scans?',
        answer:
          'We recommend running GeoGrid scans weekly or bi-weekly to track how your rankings change over time. This is especially useful after making changes to your Google Business Profile, publishing new posts, or implementing SEO recommendations. Your scan history is saved so you can compare results and measure the impact of your efforts.',
      },
      {
        question: 'Can I see competitor rankings in GeoGrid results?',
        answer:
          'Yes. Every GeoGrid scan includes full competitor analysis. You can see which businesses rank at each grid point, identify your top competitors, and understand who dominates specific micro-areas of your market. The quadrant analysis breaks your grid into four sections so you can quickly compare your performance in different geographic areas.',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    faqs: [
      {
        question: 'How does the credit system work?',
        answer:
          'My Ads Guru uses a simple credit system. Each AI tool has a fixed credit cost displayed before you use it — for example, generating a review response costs 2 credits, while a competitor intelligence report costs 10 credits. Credits are deducted only when you run a tool, and you can always see your remaining balance on your dashboard.',
      },
      {
        question: 'Do I get free credits when I sign up?',
        answer:
          'Yes. Every new My Ads Guru account receives 5 free credits immediately upon signup — no credit card required. This is enough to try several AI tools (like two review responses and a business description optimization) so you can experience the platform before deciding on a plan.',
      },
      {
        question: 'What happens when I run out of credits?',
        answer:
          'When your credits reach zero, you can purchase additional credit packs or upgrade to a higher-tier plan that includes more monthly credits. You will never be charged automatically — you have full control over when and how you add credits. Your existing data, scan history, and generated content remain accessible regardless of your credit balance.',
      },
      {
        question:
          'Can I buy more credits without upgrading my plan?',
        answer:
          'Yes. My Ads Guru offers standalone credit packs that you can purchase anytime without changing your subscription plan. This is useful if you need a burst of credits for a specific project, like generating a full month of content or running multiple GeoGrid scans for a client presentation.',
      },
      {
        question: 'What are the available pricing plans?',
        answer:
          'My Ads Guru offers tiered pricing plans designed for different business sizes. Each plan includes a monthly credit allocation, access to all AI tools, and GeoGrid scanning. Higher-tier plans include additional features like automated GBP post scheduling, priority support, and increased credit allowances. Visit our pricing page for the latest plan details and pricing.',
      },
      {
        question: 'Is there a free trial?',
        answer:
          'My Ads Guru offers a free-to-start model rather than a time-limited trial. You get 5 free credits on signup with full access to all AI tools and the GeoGrid scanner. There is no expiration date on your free credits, so you can take your time exploring the platform at your own pace before committing to a paid plan.',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    faqs: [
      {
        question: 'How do I create an account?',
        answer:
          'Creating a My Ads Guru account takes about 30 seconds. Click "Get Started Free" on our website, sign in with your Google account, and you are ready to go. We use Google OAuth for secure authentication, which also makes it easy to connect your Google Business Profile in the next step.',
      },
      {
        question: 'Is my business data secure?',
        answer:
          'Yes. My Ads Guru takes data security seriously. We use industry-standard encryption for all data in transit and at rest, authenticate exclusively through Google OAuth (we never store your Google password), and access only the Google Business Profile data necessary to power the AI tools. We do not sell or share your business data with third parties.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer:
          'Yes. You can cancel your subscription at any time from your account settings. There are no long-term contracts, cancellation fees, or lock-in periods. If you cancel, you retain access to your plan features until the end of your current billing period, and any remaining credits stay in your account.',
      },
      {
        question: 'How do I contact support?',
        answer:
          'You can reach our support team by emailing support@myads.guru. We also offer in-app support through the dashboard. For general questions, our FAQs (you are here!) cover the most common topics. We aim to respond to all support requests within 24 hours during business days.',
      },
    ],
  },
]

const allCategoryId = 'all'

/* ------------------------------------------------------------------ */
/*  Accordion Item Component                                           */
/* ------------------------------------------------------------------ */

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className={`faq-item group rounded-2xl border transition-all duration-500 ${
        isOpen
          ? 'bg-white/[0.03] border-white/[0.08] shadow-[inset_3px_0_0_0_rgba(59,130,246,0.4)]'
          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.03]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 lg:p-7 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="font-display text-base lg:text-lg font-semibold text-white pr-4">
          {faq.question}
        </h3>
        <div
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-blue-500/15 border border-blue-500/30'
              : 'bg-white/[0.05] border border-white/[0.08] group-hover:border-white/[0.15]'
          }`}
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-blue-400' : 'text-zinc-400'
            }`}
          />
        </div>
      </button>

      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-6 lg:px-7 pb-6 lg:pb-7">
          <p className="text-zinc-400 leading-relaxed text-sm lg:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main FAQs Content Component                                        */
/* ------------------------------------------------------------------ */

export default function FAQsPageContent() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroBadgeRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const faqListRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)
  const ctaContentRef = useRef<HTMLDivElement>(null)

  const [activeCategory, setActiveCategory] = useState(allCategoryId)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = useCallback((question: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(question)) {
        next.delete(question)
      } else {
        next.add(question)
      }
      return next
    })
  }, [])

  const filteredFaqs =
    activeCategory === allCategoryId
      ? faqCategories
      : faqCategories.filter((cat) => cat.id === activeCategory)

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

  /* Animate FAQ items when filter changes */
  useEffect(() => {
    if (!faqListRef.current) return

    const items = faqListRef.current.querySelectorAll('.faq-item')
    if (!items.length) return

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      }
    )
  }, [activeCategory])

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
              <HelpCircle size={14} />
              Help Center
            </span>
          </div>

          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="opacity-0 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            className="opacity-0 text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            Everything you need to know about My Ads Guru, our AI tools,
            GeoGrid rank scanning, pricing, and getting started. Can&apos;t
            find what you&apos;re looking for? Reach out to our team.
          </p>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* ============================================================ */}
      {/*  CATEGORY TABS + FAQ LIST                                     */}
      {/* ============================================================ */}
      <section className="relative py-20 lg:py-28">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          {/* Category tabs */}
          <div
            ref={tabsRef}
            className="opacity-0 flex flex-wrap gap-2 mb-12 justify-center"
          >
            <button
              onClick={() => setActiveCategory(allCategoryId)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === allCategoryId
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  : 'text-zinc-400 hover:text-zinc-300 border border-transparent hover:border-white/10'
              }`}
            >
              All
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                    : 'text-zinc-400 hover:text-zinc-300 border border-transparent hover:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div ref={faqListRef} className="space-y-10">
            {filteredFaqs.map((category) => (
              <div key={category.id}>
                {/* Category heading */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-1">
                    {category.label}
                  </p>
                  <div className="w-12 h-px bg-blue-500/30" />
                </div>

                {/* FAQ items */}
                <div className="space-y-3">
                  {category.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      faq={faq}
                      isOpen={openItems.has(faq.question)}
                      onToggle={() => toggleItem(faq.question)}
                    />
                  ))}
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        {/* Glow orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px]" />

        <div
          ref={ctaContentRef}
          className="opacity-0 relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Still Have{' '}
            <span className="gradient-text">Questions?</span>
          </h2>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Our team is here to help. Reach out and we&apos;ll get back to
            you within 24 hours. Or jump straight in — 5 free credits are
            waiting for you.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="mailto:support@myads.guru">
              <Button
                variant="outline"
                className="border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200"
              >
                Contact Support
              </Button>
            </Link>
            <Link href="https://app.myads.guru/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
                Get Started Free
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
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
