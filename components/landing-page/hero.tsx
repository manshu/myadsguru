'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  ArrowRight,
  Play,
  Sparkles,
  Grid3X3,
  FileText,
  BarChart3,
  Star,
  TrendingUp,
  CalendarCheck,
} from 'lucide-react'
import { useCalendly } from '@/components/calendly-modal'

/* ------------------------------------------------------------------ */
/*  Mini sub-components for the faux dashboard                        */
/* ------------------------------------------------------------------ */

function DashboardTitleBar() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-2 text-[11px] text-zinc-500 font-mono tracking-wide select-none">
        MyAds.Guru — Dashboard
      </span>
      <div className="ml-auto flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-emerald-400/80 font-mono">Live</span>
      </div>
    </div>
  )
}

function MiniToolCard({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mini-tool-card rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-400">
          {icon}
        </div>
        <span className="text-[11px] font-medium text-zinc-300">{title}</span>
      </div>
      {children}
    </div>
  )
}

function SkeletonLines({ count = 3 }: { count?: number }) {
  const widths = ['w-full', 'w-4/5', 'w-3/5', 'w-11/12', 'w-2/3']
  return (
    <div className="space-y-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full bg-white/[0.06] ${widths[i % widths.length]}`}
        />
      ))}
    </div>
  )
}

function MiniGeoGrid() {
  const colors = [
    'bg-emerald-500',
    'bg-emerald-400',
    'bg-yellow-400',
    'bg-emerald-500',
    'bg-yellow-500',
    'bg-red-400',
    'bg-emerald-400',
    'bg-emerald-500',
    'bg-yellow-400',
  ]
  return (
    <div className="grid grid-cols-3 gap-1">
      {colors.map((color, i) => (
        <div
          key={i}
          className={`w-full aspect-square rounded-[3px] ${color} opacity-70`}
        />
      ))}
    </div>
  )
}

function MiniChart() {
  const bars = [40, 65, 50, 80, 70, 90, 85]
  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-500/40 to-blue-400/60"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating notification bubble                                      */
/* ------------------------------------------------------------------ */

function NotificationBubble({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`notification-bubble absolute glass rounded-xl px-3.5 py-2.5 shadow-2xl shadow-black/40 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero component                                                    */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const { open: openCalendly } = useCalendly()

  // Refs for GSAP animation targets
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const toolCardsRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------- entrance timeline ---------- */
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // 1. Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )

      // 2. Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word')
        tl.fromTo(
          words,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
          '-=0.3'
        )
      }

      // 3. Subtitle
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )

      // 4. CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )

      // 5. Dashboard card scales up with 3D
      tl.fromTo(
        dashboardRef.current,
        { opacity: 0, scale: 0.8, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      )

      // 6. Mini tool cards stagger
      if (toolCardsRef.current) {
        const cards =
          toolCardsRef.current.querySelectorAll('.mini-tool-card')
        tl.fromTo(
          cards,
          { opacity: 0, y: 15, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
          },
          '-=0.5'
        )
      }

      // 7. Notification bubbles
      if (notificationsRef.current) {
        const bubbles =
          notificationsRef.current.querySelectorAll('.notification-bubble')
        tl.fromTo(
          bubbles,
          { opacity: 0, scale: 0.6, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'back.out(2)',
          },
          '-=0.3'
        )
      }

      // 8. Trust bar
      tl.fromTo(
        trustRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )

      /* ---------- continuous animations ---------- */

      // Dashboard float
      gsap.to(dashboardRef.current, {
        y: -8,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2,
      })

      // Notification bubbles independent float
      if (notificationsRef.current) {
        const bubbles =
          notificationsRef.current.querySelectorAll('.notification-bubble')
        bubbles.forEach((bubble, i) => {
          gsap.to(bubble, {
            y: i % 2 === 0 ? -6 : 6,
            x: i % 2 === 0 ? 3 : -3,
            duration: 2.5 + i * 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 2.5 + i * 0.3,
          })
        })
      }

      // Orbs slow drift
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.drift-orb')
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            x: (i % 2 === 0 ? 1 : -1) * 30,
            y: (i % 3 === 0 ? 1 : -1) * 20,
            duration: 8 + i * 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ---------- headline word wrapping helper ---------- */
  function wordSpans(text: string, gradient = false) {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className={`hero-word inline-block opacity-0 ${gradient ? 'gradient-text' : ''}`}
      >
        {word}&nbsp;
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ===== BACKGROUND LAYERS ===== */}

      {/* Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-60" />

      {/* Holographic grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow behind dashboard */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[800px] h-[800px] bg-blue-600/[0.12] rounded-full blur-[160px] pointer-events-none" />

      {/* Drifting blur orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="drift-orb absolute top-[15%] left-[10%] w-80 h-80 bg-blue-600/[0.08] rounded-full blur-[120px]" />
        <div className="drift-orb absolute bottom-[20%] right-[8%] w-96 h-96 bg-cyan-500/[0.06] rounded-full blur-[140px]" />
        <div className="drift-orb absolute top-[60%] left-[55%] w-64 h-64 bg-blue-500/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16">
        {/* ---------- Badge ---------- */}
        <div ref={badgeRef} className="opacity-0 flex justify-center mb-7">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            AI-Powered Local Marketing Platform
          </span>
        </div>

        {/* ---------- Headline ---------- */}
        <h1
          ref={headlineRef}
          className="font-display text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
        >
          <span className="block">{wordSpans('Dominate Local Search')}</span>
          <span className="block mt-1 sm:mt-2">
            {wordSpans('With')}{' '}
            {wordSpans('AI That Knows', true)}{' '}
            {wordSpans('Your Business')}
          </span>
        </h1>

        {/* ---------- Subtitle ---------- */}
        <p
          ref={subtextRef}
          className="opacity-0 text-center text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          18+ AI tools pre-loaded with your business data. Auto-generate posts,
          respond to reviews, optimize your profile, and outrank competitors
          — all from one command center.
        </p>

        {/* ---------- CTAs ---------- */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 lg:mb-20"
        >
          <Link
            href="https://app.myads.guru/auth/register"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
              Get Started Free
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={openCalendly}
            className="border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white font-medium px-8 py-6 rounded-lg text-base transition-all duration-200"
          >
            <Play size={16} className="mr-2 fill-zinc-300" />
            Watch Demo
          </Button>
        </div>

        {/* ---------- Dashboard Preview + Floating Notifications ---------- */}
        <div className="relative mx-auto max-w-4xl">
          {/* Notification bubbles layer (positioned around the dashboard) */}
          <div ref={notificationsRef}>
            {/* Top-left: review notification */}
            <NotificationBubble className="-top-4 -left-4 sm:-top-6 sm:-left-12 z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                  <Star size={14} className="text-emerald-400 fill-emerald-400" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white whitespace-nowrap">
                    New Review — 5 Stars
                  </p>
                  <p className="text-[9px] text-zinc-500">Just now</p>
                </div>
              </div>
            </NotificationBubble>

            {/* Top-right: rankings notification */}
            <NotificationBubble className="-top-2 -right-2 sm:-top-4 sm:-right-10 z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <TrendingUp size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white whitespace-nowrap">
                    +12% Rankings
                    <span className="text-emerald-400 ml-1">&#8593;</span>
                  </p>
                  <p className="text-[9px] text-zinc-500">This week</p>
                </div>
              </div>
            </NotificationBubble>

            {/* Bottom-right: posts scheduled */}
            <NotificationBubble className="bottom-8 -right-3 sm:bottom-12 sm:-right-14 z-20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                  <CalendarCheck size={14} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white whitespace-nowrap">
                    3 Posts Scheduled
                  </p>
                  <p className="text-[9px] text-zinc-500">Next 7 days</p>
                </div>
              </div>
            </NotificationBubble>
          </div>

          {/* Dashboard card — GSAP animates this wrapper */}
          <div ref={dashboardRef} className="opacity-0 relative">
            {/* Gradient border glow */}
            <div
              className="absolute -inset-px rounded-2xl bg-gradient-to-b from-blue-500/30 via-blue-400/10 to-cyan-500/20 blur-sm pointer-events-none"
              style={{ perspective: '1200px', transform: 'rotateX(6deg)', transformOrigin: 'center bottom' }}
            />
            <div
              className="absolute -inset-[2px] rounded-2xl bg-gradient-to-b from-blue-500/20 via-transparent to-cyan-500/10 pointer-events-none"
              style={{ perspective: '1200px', transform: 'rotateX(6deg)', transformOrigin: 'center bottom' }}
            />

            {/* Perspective container (isolated from GSAP transforms) */}
            <div style={{ perspective: '1200px' }}>
              <div
                className="relative rounded-2xl bg-[#0c0c0f]/90 border border-white/[0.08] backdrop-blur-sm overflow-hidden shadow-2xl shadow-blue-950/30"
                style={{
                  transform: 'rotateX(6deg)',
                  transformOrigin: 'center bottom',
                }}
              >
                {/* Title bar */}
                <DashboardTitleBar />

                {/* Tool cards grid */}
                <div
                  ref={toolCardsRef}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4"
                >
                  {/* Card 1: Review Response */}
                  <MiniToolCard
                    icon={<Sparkles size={13} />}
                    title="Review Response"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={8}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                      <SkeletonLines count={3} />
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[9px] text-blue-400">
                          AI drafting...
                        </span>
                      </div>
                    </div>
                  </MiniToolCard>

                  {/* Card 2: GeoGrid Scan */}
                  <MiniToolCard
                    icon={<Grid3X3 size={13} />}
                    title="GeoGrid Scan"
                  >
                    <MiniGeoGrid />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] text-zinc-500">
                        3km radius
                      </span>
                      <span className="text-[9px] text-emerald-400 font-medium">
                        #1 in 6/9
                      </span>
                    </div>
                  </MiniToolCard>

                  {/* Card 3: Post Generator */}
                  <MiniToolCard
                    icon={<FileText size={13} />}
                    title="Post Generator"
                  >
                    <div className="space-y-2">
                      <div className="h-8 rounded-md bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/[0.04] flex items-center justify-center">
                        <span className="text-[9px] text-zinc-400">
                          Preview
                        </span>
                      </div>
                      <SkeletonLines count={2} />
                      <div className="flex gap-1.5">
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                          Event
                        </span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          Ready
                        </span>
                      </div>
                    </div>
                  </MiniToolCard>

                  {/* Card 4: Profile Optimizer */}
                  <MiniToolCard
                    icon={<BarChart3 size={13} />}
                    title="Profile Optimizer"
                  >
                    <MiniChart />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] text-zinc-500">Score</span>
                      <span className="text-[9px] text-blue-400 font-semibold">
                        92/100
                      </span>
                    </div>
                  </MiniToolCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Trust bar ---------- */}
        <div ref={trustRef} className="opacity-0 mt-14 lg:mt-16">
          {/* Gradient separator */}
          <div className="mx-auto w-2/3 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {[
              { text: '5 Free Credits', icon: Sparkles },
              { text: 'No Credit Card', icon: null },
              { text: 'Setup in 60 Seconds', icon: null },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-zinc-500 text-sm"
              >
                <div className="w-1 h-1 rounded-full bg-blue-500/60" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
