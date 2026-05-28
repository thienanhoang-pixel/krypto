'use client'
import { useState, useMemo } from 'react'
import { CalcShell, InputGrid, Field, NumInput, SelectInput, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'

export function BreakevenTool() {
  const [entry,setEntry]=useState('68000'); const [lev,setLev]=useState('10')
  const [fee,setFee]=useState('0.06'); const [fr,setFr]=useState('0.01')
  const [hours,setHours]=useState('24'); const [otype,setOtype]=useState('taker')
  const r = useMemo(()=>{
    const e=parseFloat(entry)||1, l=parseFloat(lev)||1
    const f=parseFloat(fee)/100, frate=parseFloat(fr)/100, h=parseFloat(hours)||0
    const feeCost=e*f*2, payments=Math.floor(h/8), fundCost=e*frate*payments
    const total=feeCost+fundCost, movPct=total/e*100
    return {beLong:e+total, beShort:e-total, feeCost, fundCost, movPct, roe:movPct*l, payments}
  },[entry,lev,fee,fr,hours,otype])
  const fmt=(n:number,d=2)=>'$'+n.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,',')
  return (
    <div>
      <CalcShell title="🎯 Break-even Calculator">
        <p className="text-[12px] text-[#8b93b0] mb-4">How much must price move to cover fees + funding?</p>
        <InputGrid>
          <Field label="Entry Price ($)"><NumInput value={entry} onChange={setEntry}/></Field>
          <Field label="Leverage"><NumInput value={lev} onChange={setLev} min={1}/></Field>
          <Field label="Order type"><SelectInput value={otype} onChange={v=>{setOtype(v);setFee(v==='maker'?'0.02':'0.06')}}><option value="taker">Taker (market)</option><option value="maker">Maker (limit)</option></SelectInput></Field>
          <Field label="Fee (%)"><NumInput value={fee} onChange={setFee}/></Field>
          <Field label="Funding Rate (%/8h)"><NumInput value={fr} onChange={setFr}/></Field>
          <Field label="Hold hours"><NumInput value={hours} onChange={setHours}/></Field>
        </InputGrid>
        <div className="grid grid-cols-2 gap-2 my-3 text-[12px]">
          <div className="bg-[#0f1117] rounded-lg p-3 border border-white/[0.08]"><div className="text-[#8b93b0] mb-1">Fee cost (both legs)</div><div className="font-mono font-semibold text-[#E24B4A]">{fmt(r.feeCost,4)}</div></div>
          <div className="bg-[#0f1117] rounded-lg p-3 border border-white/[0.08]"><div className="text-[#8b93b0] mb-1">Funding ({r.payments}× payments)</div><div className="font-mono font-semibold text-[#E24B4A]">{fmt(r.fundCost,4)}</div></div>
        </div>
        <Results cols={4}>
          <Stat label="Breakeven Long" value={fmt(r.beLong)} variant="amber"/>
          <Stat label="Breakeven Short" value={fmt(r.beShort)} variant="amber"/>
          <Stat label="Move needed" value={r.movPct.toFixed(3)+'%'} variant="red"/>
          <Stat label="ROE needed" value={r.roe.toFixed(2)+'%'} variant="red"/>
        </Results>
      </CalcShell>
      <CtaBox title="Lower breakeven with 0% maker fees:" subtitle="MEXC: 0% maker. OKX limit orders: 0.02%." ids={['mexc','okx']}/>
    </div>
  )
}
