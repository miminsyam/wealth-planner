'use client'

import { useEffect, useState } from 'react'
import { Download, Share, Plus, MoreVertical, X } from 'lucide-react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallApp() {
  const [open, setOpen] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    const ua = window.navigator.userAgent.toLowerCase()
    const iosDevice =
      /iphone|ipad|ipod/.test(ua) ||
      (ua.includes('mac') && 'ontouchend' in document)
    setIsIos(iosDevice)

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true
    if (standalone) return

    if (window.localStorage.getItem('sco-install-dismissed') === '1') return

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => setOpen(false)

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)

    // Auto-show the banner shortly after load
    const t = window.setTimeout(() => setOpen(true), 900)

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.clearTimeout(t)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    setShowSteps(false)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sco-install-dismissed', '1')
    }
  }

  const handleInstall = async () => {
    if (deferred) {
      await deferred.prompt()
      const { outcome } = await deferred.userChoice
      setDeferred(null)
      if (outcome === 'accepted') {
        setOpen(false)
        return
      }
    }
    setShowSteps((v) => !v)
  }

  if (!open) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 pt-2">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_16px_50px_rgba(0,0,0,0.32)]">
        <div className="flex items-center gap-3 p-3">
          <img
            src="/icon-512.png"
            alt="Ikon StockCheck Outlet"
            className="h-12 w-12 flex-shrink-0 rounded-2xl"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans text-[15px] font-semibold text-ink">
              StockCheck Outlet
            </p>
            <p className="truncate font-sans text-[12px] text-ink/60">
              Pasang ke skrin utama telefon anda
            </p>
          </div>
          <button
            type="button"
            onClick={handleInstall}
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-brand-brown px-4 py-2 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-brand-brown-dark"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Pasang
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Tutup"
            className="flex-shrink-0 rounded-full p-1.5 text-ink/40 transition-colors hover:bg-black/5 hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>

        {showSteps && (
          <div className="border-t border-black/10 bg-[#faf7f2] px-4 py-3">
            {isIos ? (
              <ol className="space-y-2.5 font-sans text-[13px] leading-relaxed text-ink/80">
                <li className="flex items-start gap-2.5">
                  <StepNo n={1} />
                  <span className="flex items-center gap-1 pt-0.5">
                    {'Tekan butang '}
                    <strong>Share</strong>
                    <Share className="h-4 w-4 text-brand-brown" aria-hidden="true" />
                    {' di bar bawah Safari.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <StepNo n={2} />
                  <span className="flex items-center gap-1 pt-0.5">
                    {'Pilih '}
                    <strong>&ldquo;Add to Home Screen&rdquo;</strong>
                    <Plus className="h-4 w-4 text-brand-brown" aria-hidden="true" />
                    {'.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <StepNo n={3} />
                  <span className="pt-0.5">
                    {'Tekan '}
                    <strong>Add</strong>
                    {' — siap!'}
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-2.5 font-sans text-[13px] leading-relaxed text-ink/80">
                <li className="flex items-start gap-2.5">
                  <StepNo n={1} />
                  <span className="flex items-center gap-1 pt-0.5">
                    {'Tekan menu '}
                    <strong>tiga titik</strong>
                    <MoreVertical className="h-4 w-4 text-brand-brown" aria-hidden="true" />
                    {' di kanan atas pelayar.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <StepNo n={2} />
                  <span className="pt-0.5">
                    {'Pilih '}
                    <strong>&ldquo;Install app&rdquo;</strong>
                    {' atau '}
                    <strong>&ldquo;Add to Home screen&rdquo;</strong>
                    {'.'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <StepNo n={3} />
                  <span className="pt-0.5">
                    {'Sahkan pemasangan — siap!'}
                  </span>
                </li>
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StepNo({ n }: { n: number }) {
  return (
    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-brown/15 font-sans text-[11px] font-bold text-brand-brown-dark">
      {n}
    </span>
  )
}
