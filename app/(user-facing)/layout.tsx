import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CalendlyProvider } from '@/components/calendly-modal'

export const metadata = {
  title: 'MyAdsGuru - Google Ads & Digital Marketing Consultant',
  description:
    'Scale your business with Himamshu Batra. Google Ads management, SEO, and marketing automation with 12+ years of experience.',
}

export default function UserFacingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CalendlyProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </CalendlyProvider>
  )
}
