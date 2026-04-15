'use client'

import Script from 'next/script'
import { useEffect, useId, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string
          theme?: 'light' | 'dark' | 'auto'
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        }
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

type Props = {
  onToken: (token: string | null) => void
  theme?: 'light' | 'dark' | 'auto'
}

export default function TurnstileWidget({ onToken, theme = 'dark' }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const instanceId = useId()
  const [ready, setReady] = useState(false)

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!ready || !siteKey || !containerRef.current || !window.turnstile) return

    if (widgetIdRef.current) {
      try { window.turnstile.remove(widgetIdRef.current) } catch {}
      widgetIdRef.current = null
    }
    containerRef.current.innerHTML = ''

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      callback: (token) => onToken(token),
      'expired-callback': () => onToken(null),
      'error-callback': () => onToken(null),
    })

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current) } catch {}
        widgetIdRef.current = null
      }
    }
  }, [ready, siteKey, theme, onToken, instanceId])

  if (!siteKey) {
    return (
      <p className="text-xs text-red-400">
        Turnstile site key missing (NEXT_PUBLIC_TURNSTILE_SITE_KEY).
      </p>
    )
  }

  return (
    <div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div ref={containerRef} />
    </div>
  )
}
