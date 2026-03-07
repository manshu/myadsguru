'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CALENDLY_URL =
  'https://calendly.com/gurulabs/30min?embed_domain=myadsguru.com&embed_type=PopupText&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3b82f6&background_color=0a0a0a&text_color=ffffff'

type CalendlyContextType = {
  open: () => void
}

const CalendlyContext = createContext<CalendlyContextType>({ open: () => {} })

export function useCalendly() {
  return useContext(CalendlyContext)
}

export function CalendlyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <CalendlyContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl animate-[modalIn_0.2s_ease-out]">
            {/* Blue glow accent */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20 rounded-2xl blur-lg" />

            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="text-white font-display text-sm font-medium tracking-wide">
                    Schedule a Call
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <span className="text-xs font-mono hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                    ESC
                  </span>
                  <div className="p-1 rounded-lg hover:bg-white/5 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Calendly iframe */}
              <div className="h-[70vh] max-h-[700px]">
                <iframe
                  src={CALENDLY_URL}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.95) translateY(10px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </CalendlyContext.Provider>
  )
}
