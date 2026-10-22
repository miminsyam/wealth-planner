import { QRCodeSVG } from 'qrcode.react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type OutletTagProps = {
  className?: string
  eyebrow: string
  number?: string
  title: ReactNode
  titleClassName?: string
  titleHref?: string
  href: string
  qrValue: string
  qrColor: string
  buttonClassName: string
  buttonLabel: string
  eyebrowClassName?: string
  perfClassName?: string
}

export function OutletTag({
  className,
  eyebrow,
  number,
  title,
  titleClassName,
  titleHref,
  href,
  qrValue,
  qrColor,
  buttonClassName,
  buttonLabel,
  eyebrowClassName,
  perfClassName,
}: OutletTagProps) {
  const heading = (
    <h2
      className={cn(
        'text-center font-serif text-2xl font-bold italic leading-tight text-balance',
        titleClassName,
      )}
    >
      {title}
    </h2>
  )

  return (
    <div
      className={cn(
        'relative rounded-[18px] px-6 pb-7 pt-8 shadow-[0_14px_34px_rgba(43,28,15,0.35)]',
        className,
      )}
    >
      {/* tag hole */}
      <span
        aria-hidden
        className="absolute left-1/2 top-3.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#96714F] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_0_3px_rgba(29,23,18,0.2)]"
      />

      {number && (
        <span className="absolute right-5 top-5 font-sans text-[10px] font-semibold tracking-[0.16em] text-[#c0b5a4]">
          {number}
        </span>
      )}

      <p
        className={cn(
          'text-center font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-brown',
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </p>

      {titleHref ? (
        <a
          href={titleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-2 block rounded-[10px] px-2 py-1 transition-colors hover:bg-brand-brown/10"
        >
          {heading}
        </a>
      ) : (
        <div className="mt-2">{heading}</div>
      )}

      <hr className={cn('my-4 border-t-2 border-dashed border-[#e4d9cc]', perfClassName)} />

      <div className="mx-auto w-fit rounded-xl border-2 bg-white p-2.5 shadow-[0_4px_14px_rgba(29,23,18,0.15)]"
        style={{ borderColor: qrColor }}
      >
        <QRCodeSVG value={qrValue} size={176} level="M" bgColor="#ffffff" fgColor="#1d1712" />
      </div>

      <a
        href={href}
        target={href.includes('docs.google.com/spreadsheets') ? '_self' : '_blank'}
        rel={href.includes('docs.google.com/spreadsheets') ? undefined : 'noopener noreferrer'}
        className={cn(
          'mt-4 block rounded-xl px-4 py-4 text-center font-sans text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5 hover:brightness-110',
          buttonClassName,
        )}
      >
        {buttonLabel}
      </a>
    </div>
  )
}
