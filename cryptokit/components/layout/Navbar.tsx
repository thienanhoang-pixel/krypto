'use client'
// components/layout/Navbar.tsx
import Link from 'next/link'
import { useLang } from './LangProvider'
import { LANGUAGES, Lang } from '@/lib/i18n'

export function Navbar() {
  const { t, lang, setLang } = useLang()

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold">
          <span className="text-brand-yellow">⬡</span>
          <span>Crypto<span className="text-brand-yellow">Kit</span></span>
        </Link>

        {/* Nav links (desktop) */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/tools/liquidation" className="text-[13px] text-white/60 hover:text-white transition-colors">
            {t('nav_tools')}
          </Link>
          <Link href="/review" className="text-[13px] text-white/60 hover:text-white transition-colors">
            {t('nav_usecases')}
          </Link>
          <Link href="/exchanges" className="text-[13px] text-white/60 hover:text-white transition-colors">
            {t('nav_exchanges')}
          </Link>
          <Link href="/blog" className="text-[13px] text-white/60 hover:text-white transition-colors">
            {t('nav_blog')}
          </Link>
        </nav>

        {/* Language selector */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          className="rounded-md border border-white/10 bg-bg-2 px-2.5 py-1.5 text-[12px] text-white/80 cursor-pointer"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}
