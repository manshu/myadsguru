import type { Metadata } from 'next'
import FAQsPageContent from '@/components/landing-page/faqs-page-content'

export const metadata: Metadata = {
  title: 'FAQs - MyAdsGuru | AI-Powered Local Marketing Platform',
  description:
    'Find answers to frequently asked questions about MyAdsGuru, our AI-powered local marketing tools, GeoGrid rank scanner, pricing plans, credits, and account management. Learn how MyAdsGuru helps local businesses grow.',
  keywords: [
    'MyAdsGuru FAQ',
    'local marketing FAQ',
    'Google Business Profile tools',
    'AI marketing tools',
    'GeoGrid rank scanner',
    'local SEO tools',
    'MyAdsGuru pricing',
    'MyAdsGuru credits',
    'AI review response',
    'Google Maps ranking',
  ],
  openGraph: {
    title: 'FAQs - MyAdsGuru | AI-Powered Local Marketing Platform',
    description:
      'Find answers to frequently asked questions about MyAdsGuru, our AI tools, GeoGrid scanning, pricing, and more.',
    type: 'website',
  },
}

export default function FAQsPage() {
  return <FAQsPageContent />
}
