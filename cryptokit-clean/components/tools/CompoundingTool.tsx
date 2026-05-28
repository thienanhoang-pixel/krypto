'use client'
import { useState, useMemo } from 'react'
import { CalcShell, InputGrid, Field, NumInput, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'

export function CompoundingTool() {
  const [cap,setCap]=useState('1000'); const [wr,setWr]=useState('55')
  const [rr,setRr]=useState('2'); const [risk,setRisk]=useState('2')
  const [tpd,setTpd]=useState('2'); const [months,setMonths]=useState('12')

  const r = useMemo(()=>{
    const c=parseFloat(cap)||0, w=parseFloat(wr)/100, rv=parseFloat(rr)||1
    const rp=parseFloat(risk)/100, t=parseFloat(tpd)||1, m=parseInt(months)||12
    const ev = w*(rp*rv)-(1-w)*rp
    const trades=t*30*m
    const final=c*Math.pow(1+ev,trades)
    const ret=((final/c)-1)*100
    const pts=Array.from({length:m+1},(_,i)=>({m:i,b:c*Math.pow(1+ev,t*30*i)}))
    return {final,ret,ev,trades,pts}
  },[cap,wr,rr,risk,tpd,months])

  const isPos=r.ret>=0
  const maxB=Math.max(...r.pts.map(p=>p.b)), minB=Math.min(...r.pts.map(p=>p.b))

  return (
    <div>
      <CalcShell title="📊 Compounding Calculator">
        <p className="text-[12px] text-[#8b93b0] mb-4">Project account growth based on win rate, R:R and compounding.</p>
        <InputGrid>
          <Field label="Starting Capital (USDT)"><NumInput value={cap} onChange={setCap}/></Field>
          <Field label="Win Rate (%)"><NumInput value={wr} onChange={setWr} min={1} max={99}/></Field>
          <Field label="Risk:Reward ratio"><NumInput value={rr} onChange={setRr}/></Field>
          <Field label="Risk per Trade (%)"><NumInput value={risk} onChange={setRisk}/></Field>
          <Field label="Trades per Day"><NumInput value={tpd} onChange={setTpd} min={1}/></Field>
          <Field label="Months"><NumInput value={months} onChange={setMonths} min={1} max={60}/></Field>
        </InputGrid>

        {/* Sparkline */}
        <div className="mt-4 mb-3">
          <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="none" className="rounded-lg overflow-hidden">
            <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPos?'#1D9E75':'#E24B4A'} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={isPos?'#1D9E75':'#E24B4A'} stopOpacity="0"/>
            </linearGradient></defs>
            {[0.25,0.5,0.75].map(f=><line key={f} x1="0" y1={80*f} x2="400" y2={80*f} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
            {r.pts.length>1&&(()=>{
              const pts=r.pts.map((p,i)=>{
                const x=(i/(r.pts.length-1))*400
                const y=maxB===minB?40:80-((p.b-minB)/(maxB-minB))*(80-8)-4
                return `${x},${y}`
              })
              return <>
                <path d={`M0,80 L${pts.join(' L')} L400,80 Z`} fill="url(#cg)"/>
                <path d={`M${pts.join(' L')}`} fill="none" stroke={isPos?'#1D9E75':'#E24B4A'} strokeWidth="2"/>
              </>
            })()}
          </svg>
          <div className="flex justify-between text-[10px] text-[#5a6180] mt-1"><span>Month 0</span><span>Month {months}</span></div>
        </div>

        <div className={`text-[12px] px-3 py-2 rounded-lg mb-3.5 ${r.ev>=0?'bg-green-900/20 border border-green-800/30 text-green-400':'bg-red-900/20 border border-red-800/30 text-red-400'}`}>
          {r.ev>=0?`✓ Positive EV: +${(r.ev*100).toFixed(3)}% per trade average`:`✗ Negative EV: ${(r.ev*100).toFixed(3)}% — adjust win rate or R:R`}
        </div>

        <Results cols={4}>
          <Stat label="Final Balance" value={'$'+r.final.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')} variant={isPos?'green':'red'}/>
          <Stat label="Total Return" value={(r.ret>=0?'+':'')+r.ret.toFixed(1)+'%'} variant={isPos?'green':'red'}/>
          <Stat label="Total Trades" value={r.trades.toFixed(0)}/>
          <Stat label="EV/Trade" value={(r.ev>=0?'+':''+(r.ev*100).toFixed(3)+'%')} variant={r.ev>=0?'green':'red'}/>
        </Results>
      </CalcShell>
      <CtaBox title="Apply compounding with copy trading or bots:" subtitle="Auto-compound your strategy on these exchanges." ids={['bybit','bitget']}/>
    </div>
  )
}
