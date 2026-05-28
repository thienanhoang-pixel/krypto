'use client'
import { useState, useMemo } from 'react'
import { CalcShell, InputGrid, Field, NumInput, SelectInput, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'

export function FundingTool() {
  const [pos,setPos]=useState('5000'); const [rate,setRate]=useState('0.01')
  const [side,setSide]=useState('long'); const [days,setDays]=useState('30')
  const r = useMemo(()=>{
    const p=parseFloat(pos)||0, rt=parseFloat(rate)/100, d=parseFloat(days)||1
    const sign = side==='long' ? -1 : 1
    const per8h = sign*p*rt, perDay=per8h*3, total=perDay*d
    return {per8h,perDay,total, ann:Math.abs(rt*3*365*100)}
  },[pos,rate,side,days])
  const fmt=(n:number)=>(n>=0?'+':'')+n.toFixed(2)+' USDT'
  return (
    <div>
      <CalcShell title="💸 Funding Rate Cost Calculator">
        <p className="text-[12px] text-[#8b93b0] mb-4">Funding paid every 8h. Long pays when rate &gt; 0, short receives.</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {[['Bybit','0.01'],['OKX','0.01'],['MEXC','0.0075'],['Bitget','0.01']].map(([ex,v])=>(
            <button key={ex} onClick={()=>setRate(v)} className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.14] bg-[#1e2233] text-[#8b93b0] hover:text-[#f0f2f8] transition-colors">{ex}: {v}%</button>
          ))}
        </div>
        <InputGrid>
          <Field label="Position Size (USDT)"><NumInput value={pos} onChange={setPos}/></Field>
          <Field label="Funding Rate (%)"><NumInput value={rate} onChange={setRate}/></Field>
          <Field label="Side"><SelectInput value={side} onChange={setSide}><option value="long">Long (pays)</option><option value="short">Short (receives)</option></SelectInput></Field>
          <Field label="Days to hold"><NumInput value={days} onChange={setDays} min={1}/></Field>
        </InputGrid>
        <Results cols={4}>
          <Stat label="Per 8h" value={fmt(r.per8h)} variant={r.per8h>=0?'green':'red'}/>
          <Stat label="Per day" value={fmt(r.perDay)} variant={r.perDay>=0?'green':'red'}/>
          <Stat label={`${days} days`} value={fmt(r.total)} variant={r.total>=0?'green':'red'}/>
          <Stat label="Annualized" value={r.ann.toFixed(1)+'%'} variant="amber"/>
        </Results>
      </CalcShell>
      <CtaBox title="Exchanges with lowest funding rates:" subtitle="MEXC often has 0% maker. Check live rates before opening." ids={['mexc','bybit','okx']}/>
    </div>
  )
}
