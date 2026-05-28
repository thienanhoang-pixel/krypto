'use client'
import { useState, useMemo } from 'react'
import { CalcShell, InputGrid, Field, NumInput, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'
import { PROFIT_RECS } from '@/lib/exchanges'

export function ProfitTool() {
  const [cap,setCap]=useState('500'); const [lev,setLev]=useState('10')
  const [entry,setEntry]=useState('68000'); const [target,setTarget]=useState('72000')
  const r = useMemo(()=>{
    const c=parseFloat(cap)||0, l=parseFloat(lev)||1, e=parseFloat(entry)||1, t=parseFloat(target)||0
    const chg=(t-e)/e*100, pnl=c*l*(chg/100), roe=(pnl/c)*100
    return {chg,pnl,roe}
  },[cap,lev,entry,target])
  return (
    <div>
      <CalcShell title="📈 Profit / PnL Calculator">
        <InputGrid>
          <Field label="Capital (USDT)"><NumInput value={cap} onChange={setCap}/></Field>
          <Field label="Leverage"><NumInput value={lev} onChange={setLev} min={1}/></Field>
          <Field label="Entry Price ($)"><NumInput value={entry} onChange={setEntry}/></Field>
          <Field label="Target Price ($)"><NumInput value={target} onChange={setTarget}/></Field>
        </InputGrid>
        <Results>
          <Stat label="PnL (USDT)" value={(r.pnl>=0?'+':'')+r.pnl.toFixed(2)+' USDT'} variant={r.pnl>=0?'green':'red'}/>
          <Stat label="ROE %" value={(r.roe>=0?'+':'')+r.roe.toFixed(1)+'%'} variant={r.roe>=0?'green':'red'}/>
          <Stat label="Price change" value={(r.chg>=0?'+':'')+r.chg.toFixed(2)+'%'}/>
        </Results>
      </CalcShell>
      <CtaBox title="Trade this setup on a low-fee exchange" ids={PROFIT_RECS}/>
    </div>
  )
}
