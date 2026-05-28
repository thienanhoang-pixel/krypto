'use client'
import { useState, useMemo } from 'react'
import { CalcShell, Results, Stat } from '@/components/ui/CalcShell'
import { CtaBox } from '@/components/ui/CtaBox'
import { DCA_RECS } from '@/lib/exchanges'

interface Row { price: string; usdt: string }

export function DcaTool() {
  const [rows, setRows] = useState<Row[]>([{price:'68000',usdt:'100'},{price:'65000',usdt:'100'}])
  const r = useMemo(()=>{
    let tu=0,tc=0
    rows.forEach(r=>{const p=parseFloat(r.price)||0,u=parseFloat(r.usdt)||0; tu+=u; tc+=p>0?u/p:0})
    return {avg:tc>0?tu/tc:0,total:tu,coins:tc}
  },[rows])
  const update=(i:number,f:keyof Row,v:string)=>setRows(rs=>rs.map((r,j)=>j===i?{...r,[f]:v}:r))
  return (
    <div>
      <CalcShell title="⬇ DCA Average Cost Calculator">
        <div className="flex flex-col gap-2.5">
          {rows.map((row,i)=>(
            <div key={i} className="grid grid-cols-2 gap-3">
              <div><label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">Buy {i+1} — Price ($)</label>
                <input type="number" value={row.price} onChange={e=>update(i,'price',e.target.value)} className="w-full px-3 py-2 text-[14px] rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50"/></div>
              <div><label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">USDT</label>
                <input type="number" value={row.usdt} onChange={e=>update(i,'usdt',e.target.value)} className="w-full px-3 py-2 text-[14px] rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50"/></div>
            </div>
          ))}
        </div>
        <button onClick={()=>setRows(rs=>[...rs,{price:'60000',usdt:'100'}])} className="mt-3 text-[12px] px-3 py-1.5 rounded-lg border border-dashed border-white/[0.14] text-[#8b93b0] hover:text-[#f0f2f8] transition-colors">+ Add buy</button>
        <Results>
          <Stat label="Avg Cost" value={'$'+r.avg.toFixed(2)} variant="amber"/>
          <Stat label="Total Invested" value={r.total.toFixed(0)+' USDT'}/>
          <Stat label="Total Coins" value={r.coins.toFixed(6)}/>
        </Results>
      </CalcShell>
      <CtaBox title="Exchanges with DCA / recurring buy features" ids={DCA_RECS}/>
    </div>
  )
}
