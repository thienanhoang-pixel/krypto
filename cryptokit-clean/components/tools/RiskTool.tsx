'use client'
import { useState, useMemo } from 'react'
import { CalcShell, InputGrid, Field, NumInput, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'
import { RISK_RECS } from '@/lib/exchanges'

export function RiskTool() {
  const [cap,setCap]=useState('1000'); const [pct,setPct]=useState('2')
  const [entry,setEntry]=useState('68000'); const [sl,setSl]=useState('66000')
  const r = useMemo(()=>{
    const c=parseFloat(cap)||0, p=parseFloat(pct)||0, e=parseFloat(entry)||1, s=parseFloat(sl)||0
    const maxLoss=c*p/100, dist=Math.abs(e-s)/e*100, pos=dist>0?maxLoss/(dist/100):0
    return {maxLoss,dist,pos}
  },[cap,pct,entry,sl])
  return (
    <div>
      <CalcShell title="🛡 Position Size & Risk Management">
        <InputGrid>
          <Field label="Total Capital (USDT)"><NumInput value={cap} onChange={setCap}/></Field>
          <Field label="Risk per trade (%)"><NumInput value={pct} onChange={setPct}/></Field>
          <Field label="Entry ($)"><NumInput value={entry} onChange={setEntry}/></Field>
          <Field label="Stop-loss ($)"><NumInput value={sl} onChange={setSl}/></Field>
        </InputGrid>
        <Results>
          <Stat label="Max Loss" value={r.maxLoss.toFixed(2)+' USDT'} variant="red"/>
          <Stat label="Rec. Position" value={'$'+r.pos.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}/>
          <Stat label="SL Distance" value={r.dist.toFixed(2)+'%'} variant="amber"/>
        </Results>
      </CalcShell>
      <CtaBox title="Exchanges with advanced risk management tools" ids={RISK_RECS}/>
    </div>
  )
}
