'use client'

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { OutletTag } from '@/components/outlet-tag'
import { InstallApp } from '@/components/install-app'

const HOME_URL = 'https://drive.google.com/drive/folders/15qpOarEx1useNKECwXbbkBg6xW2CkNte'
const PEJAM_URL = 'https://drive.google.com/drive/folders/1Jc03wmCCGwqS5JeldeImk0WGkNw7pbWK'
const REDCARD_URL = 'https://drive.google.com/drive/folders/1TKxxdhiWDI5_oXQKb8vpE2M-e2h5mXNe'
const STOCKTAKE_URL = 'https://drive.google.com/drive/folders/1Yd-huvVEizxQ4S4fgiLq7L_Ic4MiDuuP'
const MILEAGE_URL = 'https://docs.google.com/spreadsheets/d/10mqlNeEORDl06hlwBBfPlEdwEY0lmxDVwWH2bteymU4/edit?usp=drive_link'
const CENTRAL_KITCHEN_URL = 'https://drive.google.com/drive/folders/1Qah00bJcgASEIeGfWzdrTs4GHR-5zU0Q'

export function OutletBoard() {
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState<{ title: string; href: string } | null>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  function toggle() {
    const next = !open
    setOpen(next)
    if (next) {
      requestAnimationFrame(() => {
        optionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <div className="flex w-full max-w-[420px] flex-col gap-[22px]">
      {/* Home card */}
      <div className="relative rounded-[18px] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_55%,#121212_55%,#121212_100%)] px-6 pb-7 pt-8 shadow-[0_14px_34px_rgba(43,28,15,0.35)]">
        <span
          aria-hidden
          className="absolute left-1/2 top-3.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#96714F] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_0_3px_rgba(29,23,18,0.2)]"
        />
        <p className="text-center font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-brown">
          Home &middot; Folder Utama
        </p>
        <a
          href={HOME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-2 block rounded-[10px] px-2 py-1 text-ink transition-colors hover:bg-brand-brown/10"
        >
          <h1 className="text-center font-serif text-3xl font-bold leading-tight text-balance">
            StockCheck Outlet
            <span className="align-super font-sans text-base text-brand-brown"> {'\u2197'}</span>
          </h1>
        </a>

        <hr className="my-4 border-t-2 border-dashed border-[#e4d9cc]" />

        <div className="mx-auto w-fit rounded-xl border-[3px] border-transparent bg-white p-2.5 shadow-[0_4px_14px_rgba(29,23,18,0.15)] [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,var(--color-brand-brown),var(--color-brand-red))_border-box]">
          <QRCodeSVG value={HOME_URL} size={176} level="M" bgColor="#ffffff" fgColor="#1d1712" />
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="outlet-options"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--color-brand-brown)_0%,var(--color-brand-brown-dark)_45%,var(--color-brand-red-dark)_100%)] px-4 py-4 font-sans text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5 hover:brightness-110"
        >
          {open ? 'Tutup Pilihan' : 'Pilih Outlet'}
          <ChevronDown
            className={`size-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </div>

      {/* Options */}
      {open && (
        <div id="outlet-options" ref={optionsRef} className="flex flex-col gap-[22px]">
          <OutletTag
            className="bg-[linear-gradient(rgba(255,255,255,0.9),rgba(255,255,255,0.9))] bg-white"
            number="PILIHAN 1"
            eyebrow="Outlet"
            title="Pejam Mata Cafe"
            titleClassName="font-script text-4xl not-italic font-normal text-ink"
            href={PEJAM_URL}
            qrValue={PEJAM_URL}
            qrColor="#a57c5b"
            buttonLabel="Pejam Mata Cafe"
            buttonClassName="bg-[linear-gradient(135deg,var(--color-brand-brown),var(--color-brand-brown-dark))]"
            notice="Pejam Mata Cafe"
            onOpenNotice={(title, href) => setNotice({ title, href })}
          />

          <OutletTag
            className="bg-[#121212] shadow-[0_14px_34px_rgba(0,0,0,0.5)]"
            number="PILIHAN 2"
            eyebrow="Outlet"
            eyebrowClassName="text-brand-red"
            title={
              <>
                {'Red C'}
                <span className="text-brand-red">a</span>
                {'rd Cafe'}
              </>
            }
            titleClassName="font-display text-[42px] not-italic font-bold uppercase tracking-[0.28em] text-white -mr-[0.28em]"
            perfClassName="border-[#333]"
            href={REDCARD_URL}
            qrValue={REDCARD_URL}
            qrColor="#e0332b"
            buttonLabel="Redcard Cafe"
            buttonClassName="bg-[linear-gradient(135deg,var(--color-brand-red),var(--color-brand-red-dark))]"
            notice="Redcard Cafe"
            onOpenNotice={(title, href) => setNotice({ title, href })}
          />

          <OutletTag
            className="bg-[linear-gradient(180deg,#fff4a8_0%,#ffd35f_48%,#f6a15b_100%)]"
            number="PILIHAN 3"
            eyebrow="Warehouse"
            eyebrowClassName="text-brand-brown-dark"
            title="Central Kitchen"
            titleClassName="font-serif text-[29px] not-italic font-bold uppercase tracking-[0.06em] text-brand-brown-dark"
            perfClassName="border-brand-brown-dark/40"
            href={CENTRAL_KITCHEN_URL}
            qrValue={CENTRAL_KITCHEN_URL}
            qrColor="#7e5c40"
            buttonLabel="Central Kitchen"
            buttonClassName="bg-[linear-gradient(135deg,#f59e0b,#c96b32)]"
          />

          <OutletTag
            className="bg-[repeating-linear-gradient(180deg,#ffffff_0_27px,#c9d7e8_27px_29px)]"
            number="PILIHAN 4"
            eyebrow="Stocktake"
            eyebrowClassName="text-brand-green"
            title="Inventory Outlet"
            titleClassName="text-[25px] not-italic font-bold text-ink"
            perfClassName="border-[#e4d9cc]"
            href={STOCKTAKE_URL}
            qrValue={STOCKTAKE_URL}
            qrColor="#2f7a5e"
            buttonLabel="Stocktake"
            buttonClassName="bg-[linear-gradient(135deg,var(--color-brand-green),var(--color-brand-green-dark))]"
          />

          <OutletTag
            className="bg-[linear-gradient(180deg,#fff0dc_0%,#f9d5ae_100%)]"
            number="PILIHAN 5"
            eyebrow="Logistic"
            eyebrowClassName="text-brand-brown-dark"
            title="Report"
            titleClassName="font-display text-[38px] not-italic font-bold uppercase tracking-[0.08em] text-brand-brown-dark"
            perfClassName="border-brand-brown/40"
            href={MILEAGE_URL}
            qrValue={MILEAGE_URL}
            qrColor="#7e5c40"
            buttonLabel="Maleage Report"
            buttonClassName="bg-[linear-gradient(135deg,#b87943,#7e5c40)]"
          />
        </div>
      )}

      {notice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="outlet-notice-title"
          onClick={() => setNotice(null)}
        >
          <div
            className="w-full max-w-[380px] rounded-3xl bg-white p-5 text-ink shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id="outlet-notice-title" className="font-serif text-[22px] font-bold not-italic">
                {notice.title}
              </h2>
              <button
                type="button"
                onClick={() => setNotice(null)}
                className="px-1 text-2xl leading-none text-ink/45"
                aria-label="Tutup"
              >
                {'\u00d7'}
              </button>
            </div>
            <div className="mt-3 rounded-2xl border-2 border-amber-400 bg-amber-100 p-3 text-sm font-semibold leading-relaxed">
              {'\u26a0\ufe0f'} Sebelum buka, pastikan anda sudah muat turun aplikasi{' '}
              <mark className="rounded bg-yellow-300 px-1">Google Drive</mark> dan{' '}
              <mark className="rounded bg-yellow-300 px-1">Google Sheets</mark>.
            </div>
            <ol className="mt-3 space-y-1 text-sm leading-relaxed text-ink/80">
              <li><b>1.</b> Cari folder ikut <b>bulan & tahun</b>.</li>
              <li><b>2.</b> Pilih sheet ikut <b>tarikh minggu</b>.</li>
              <li><b>3.</b> Pilih tab ikut <b>hari & department</b>.</li>
            </ol>
            <a
              href={notice.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setNotice(null)}
              className="mt-4 block rounded-xl bg-brand-brown px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white"
            >
              Faham, Buka
            </a>
          </div>
        </div>
      )}

      <div className="mt-1 flex justify-center">
        <InstallApp />
      </div>

      <footer className="mt-0.5 text-center font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-ink/65">
        Scan QR atau tekan butang
      </footer>
    </div>
  )
}
