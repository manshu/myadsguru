import type { Metadata } from 'next'
import FAQsPageContent from '@/components/landing-page/faqs-page-content'

export const metadata: Metadata = {
  title: 'FAQs - My Ads Guru | AI-Powered Local Marketing Platform',
  description:
    'Find answers to frequently asked questions about My Ads Guru, our AI-powered local marketing tools, GeoGrid rank scanner, pricing plans, credits, and account management. Learn how My Ads Guru helps local businesses grow.',
  keywords: [
    'My Ads Guru FAQ',
    'local marketing FAQ',
    'Google Business Profile tools',
    'AI marketing tools',
    'GeoGrid rank scanner',
    'local SEO tools',
    'My Ads Guru pricing',
    'My Ads Guru credits',
    'AI review response',
    'Google Maps ranking',
  ],
  openGraph: {
    title: 'FAQs - My Ads Guru | AI-Powered Local Marketing Platform',
    description:
      'Find answers to frequently asked questions about My Ads Guru, our AI tools, GeoGrid scanning, pricing, and more.',
    type: 'website',
  },
}

export default function FAQsPage() {
  return <FAQsPageContent />
}
