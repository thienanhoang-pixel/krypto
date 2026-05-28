'use client'
// components/ui/ContextCTA.tsx
// The "trick": show contextually relevant exchanges BELOW the tool result.
// Pass a warning message and list of exchange IDs — it renders naturally,
// not like a banner.

import { ExchangeId, EXCHANGES } from '@/lib/exchanges'
import { ExchangeCard } from './ExchangeCard'
import { useLang } from '@/components/layout/LangProvider'

interface Props {
  headerKey: string          // i18n key for the header line
  exchangeIds: ExchangeId[]  // which exchanges to show
  warning?: string           // optional warning message (already translated)
  vars?: Record<string, string | number>
}

export function ContextCTA({ headerKey, exchangeIds, warning, vars }: Props) {
  const { t } = useLang()
  const exchanges = exchangeIds
    .map(id => EXCHANGES.find(e => e.id === id))
    .filter(Boolean) as typeof EXCHANGES

  return (
    <div className="mt-3 rounded-xl border border-white/[0.08] bg-bg-2 p-4">
      {warning && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[12px] text-amber-300">
          ⚠ {warning}
        </div>
      )}
      <p className="mb-2.5 text-[12px] font-medium text-white/50">
        {t(headerKey, vars)}
      </p>
      <div className="flex flex-col gap-1.5">
        {exchanges.map(e => (
          <ExchangeCard key={e.id} exchange={e} />
        ))}
      </div>
    </div>
  )
}
