'use client'
import { useState, useMemo } from 'react'
import { CalcShell, InputGrid, Field, NumInput, SelectInput, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'
import { LIQ_RECS } from '@/lib/exchanges'

const fmt = (n: number) => '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export function LiquidationTool() {
  const [cap, setCap] = useState('200')
  const [lev, setLev] = useState('20')
  const [entry, setEntry] = useState('68000')
  const [dir, setDir] = useState('long')

  const r = useMemo(() => {
    const c=parseFloat(cap)||0, l=parseFloat(lev)||1, e=parseFloat(entry)||0
    const liqPrice = dir==='long' ? e*(1-0.9/l) : e*(1+0.9/l)
    const pct = (Math.abs(e-liqPrice)/e)*100
    const ids = l>=50 ? LIQ_RECS.high : l>=20 ? LIQ_RECS.medium : LIQ_RECS.low
    const warn = l>=50 ? `Warning: x${l} leverage has very high liquidation risk.`
               : l>=20 ? `Note: x${l} leverage — watch your liquidation price closely.`
               : undefined
    const ctaTitle = l<20 ? "You're using low leverage. Competitive fee exchanges:"
                          : "Exchanges with better risk management tools:"
    return { liqPrice, pct, posSize: c*l, ids, warn, ctaTitle }
  }, [cap, lev, entry, dir])

  return (
    <div>
      <CalcShell title="🔥 Futures Liquidation Calculator">
        <InputGrid>
          <Field label="Capital (USDT)"><NumInput value={cap} onChange={setCap}/></Field>
          <Field label="Leverage"><NumInput value={lev} onChange={setLev} min={1} max={125}/></Field>
          <Field label="Entry Price ($)"><NumInput value={entry} onChange={setEntry}/></Field>
          <Field label="Direction">
            <SelectInput value={dir} onChange={setDir}>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </SelectInput>
          </Field>
        </InputGrid>
        <Results>
          <Stat label="Liquidation Price" value={fmt(r.liqPrice)} variant="red"/>
          <Stat label="Drop needed" value={r.pct.toFixed(1)+'%'} variant="amber"/>
          <Stat label="Position Size" value={fmt(r.posSize)}/>
        </Results>
      </CalcShell>
      <CtaBox title={r.ctaTitle} ids={r.ids} warning={r.warn}/>
    </div>
  )
}
