'use client'
// components/calculators/LiquidationCalc.tsx
import { useState } from 'react'
import { ContextCTA } from '@/components/ui/ContextCTA'
import { useLang } from '@/components/layout/LangProvider'
import { ExchangeId } from '@/lib/exchanges'

function fmt(n: number) {
  return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function LiquidationCalc() {
  const { t } = useLang()
  const [capital, setCapital] = useState(200)
  const [leverage, setLeverage] = useState(20)
  const [entry, setEntry] = useState(68000)
  const [dir, setDir] = useState<'long' | 'short'>('long')

  // Calculate
  const posSize = capital * leverage
  const liqPrice = dir === 'long'
    ? entry * (1 - 0.9 / leverage)
    : entry * (1 + 0.9 / leverage)
  const dropPct = (Math.abs(entry - liqPrice) / entry) * 100

  // Contextual CTA logic — THIS is the trick
  type CTAConfig = {
    headerKey: string
    exchangeIds: ExchangeId[]
    warning?: string
  }

  const cta: CTAConfig = leverage >= 50
    ? {
        headerKey: 'cta_liq_high',
        exchangeIds: ['bybit', 'okx', 'bitget'],
        warning: t('warn_high_lev', { lev: leverage }),
      }
    : leverage >= 20
    ? {
        headerKey: 'cta_liq_mid',
        exchangeIds: ['bybit', 'okx'],
        warning: t('warn_mid_lev', { lev: leverage }),
      }
    : {
        headerKey: 'cta_liq_low',
        exchangeIds: ['mexc', 'gate'],
      }

  return (
    <div>
      {/* Inputs */}
      <div className="rounded-xl border border-white/[0.08] bg-bg-2 p-5 mb-3">
        <h2 className="mb-4 text-[14px] font-semibold text-white flex items-center gap-2">
          🔥 {t('tool_liquidation')} Calculator
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-white/40">{t('capital')}</span>
            <input
              type="number" value={capital}
              onChange={e => setCapital(+e.target.value)}
              className="input"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-white/40">{t('leverage')}</span>
            <input
              type="number" value={leverage} min={1} max={125}
              onChange={e => setLeverage(+e.target.value)}
              className="input"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-white/40">{t('entry_price')}</span>
            <input
              type="number" value={entry}
              onChange={e => setEntry(+e.target.value)}
              className="input"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-white/40">{t('direction')}</span>
            <select value={dir} onChange={e => setDir(e.target.value as 'long' | 'short')} className="input">
              <option value="long">{t('long')}</option>
              <option value="short">{t('short')}</option>
            </select>
          </label>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="result-card">
            <div className="result-label">{t('liq_price')}</div>
            <div className="result-val text-red-400">{fmt(liqPrice)}</div>
          </div>
          <div className="result-card">
            <div className="result-label">{t('drop_needed')}</div>
            <div className="result-val text-amber-400">{dropPct.toFixed(1)}%</div>
          </div>
          <div className="result-card">
            <div className="result-label">{t('position_size')}</div>
            <div className="result-val text-white">{fmt(posSize)}</div>
          </div>
        </div>
      </div>

      {/* Contextual CTA */}
      <ContextCTA
        headerKey={cta.headerKey}
        exchangeIds={cta.exchangeIds}
        warning={cta.warning}
      />
    </div>
  )
}
