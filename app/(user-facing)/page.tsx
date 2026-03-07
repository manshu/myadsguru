import Hero from '@/components/landing-page/hero'
import Stats from '@/components/landing-page/stats'
import Services from '@/components/landing-page/services'
import Process from '@/components/landing-page/process'
import Results from '@/components/landing-page/results'
import TestimonialsSection from '@/components/landing-page/testimonials'
import FAQSection from '@/components/landing-page/faq'
import CTA from '@/components/landing-page/cta'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Results />
      <TestimonialsSection />
      <FAQSection />
      <CTA />
    </>
  )
}
