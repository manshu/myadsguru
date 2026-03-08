import type { Metadata } from 'next'
import CaseStudiesPageContent from '@/components/landing-page/case-studies-page-content'

export const metadata: Metadata = {
  title: 'Case Studies - My Ads Guru | Real Results for Local Businesses',
  description:
    'See how businesses achieve 312% more leads, 5.2x ROAS, and #1 Google Maps rankings with My Ads Guru\'s AI-powered local marketing platform, GeoGrid scanner, and Google Ads consulting.',
  keywords: [
    'My Ads Guru case studies',
    'local SEO results',
    'Google Ads case study',
    'GeoGrid results',
    'local marketing success stories',
    'Google Business Profile optimization results',
  ],
  openGraph: {
    title: 'Case Studies - My Ads Guru | Real Results for Local Businesses',
    description:
      'See how businesses achieve 312% more leads, 5.2x ROAS, and #1 Google Maps rankings with My Ads Guru\'s AI-powered local marketing platform.',
    type: 'website',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageContent />
}
