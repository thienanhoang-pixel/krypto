'use client'
// components/ui/ExchangeCard.tsx
// Reusable exchange card — used in CTAs, use-case pages, and the exchanges page.
import { Exchange } from '@/lib/exchanges'
import { useLang } from '@/components/layout/LangProvider'

interface Props {
  exchange: Exchange
  rank?: number
  variant?: 'compact' | 'full'
}

export function ExchangeCard({ exchange: e, rank, variant = 'compact' }: Props) {
  const { t } = useLang()

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-bg-3 px-3 py-2.5 hover:border-white/[0.14] transition-colors">
      <div className="flex items-center gap-2.5">
        {rank && (
          <span className="text-[11px] font-medium text-white/30 w-4">#{rank}</span>
        )}
        {/* Logo tile */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
          style={{ background: e.logoBg, color: e.logoFg }}
        >
          {e.logo}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-medium text-white">{e.name}</span>
            {variant === 'full' && e.affCommission !== 'CPA' && (
              <span className="rounded-full bg-green-900/30 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                {e.affCommission} {t('comm_label')}
              </span>
            )}
          </div>
          <p className="text-[11px] text-white/40">{e.tagline}</p>
        </div>
      </div>

      <a
        href={e.affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="ml-3 shrink-0 rounded-md border border-brand-yellow-dim/40 px-3 py-1.5 text-[12px] font-medium text-brand-yellow-dim hover:bg-brand-yellow-dim/10 transition-colors"
      >
        ↗ {t('open')}
      </a>
    </div>
  )
}
