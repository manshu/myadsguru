import Hero from '@/components/landing-page/hero'
import Stats from '@/components/landing-page/stats'
import Services from '@/components/landing-page/services'
import Process from '@/components/landing-page/process'
import AIToolsPreview from '@/components/landing-page/ai-tools-preview'
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
      <AIToolsPreview />
      <Results />
      <TestimonialsSection />
      <FAQSection />
      <CTA />
    </>
  )
}
