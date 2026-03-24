import './globals.css'
import { Inter, Sora } from 'next/font/google'
import { Metadata } from 'next'
import type { Viewport } from 'next'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export async function generateMetadata(): Promise<Metadata> {
  const title = 'My Ads Guru'
  const description =
    'Manage your Google Business Profile, create AI-powered posts, build citations, and grow your local presence. Consulting + platform by Himamshu Batra.'

  return {
    metadataBase: new URL('https://myadsguru.com'),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LWDRVFBR6S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LWDRVFBR6S');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${sora.variable} font-sans overflow-x-hidden antialiased`}
      >
        <div className="relative min-h-[100dvh] bg-[#0a0a0a]">
          {children}
        </div>
      </body>
    </html>
  )
}
