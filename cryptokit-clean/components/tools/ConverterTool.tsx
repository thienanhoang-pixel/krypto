'use client'
import { useState } from 'react'
import { CtaBox } from '@/components/ui/CtaBox'

const PRESETS = [{label:'BTC',price:68000},{label:'ETH',price:3600},{label:'SOL',price:170},{label:'BNB',price:580},{label:'XRP',price:0.52}]

export function ConverterTool() {
  const [preset,setPreset]=useState('BTC'); const [price,setPrice]=useState('68000')
  const [coin,setCoin]=useState('0.1'); const [usdt,setUsdt]=useState('6800')

  const onCoin=(v:string)=>{setCoin(v);setUsdt(((parseFloat(v)||0)*(parseFloat(price)||1)).toFixed(2))}
  const onUsdt=(v:string)=>{setUsdt(v);setCoin(((parseFloat(v)||0)/(parseFloat(price)||1)).toFixed(8))}
  const onPrice=(v:string)=>{setPrice(v);setUsdt(((parseFloat(coin)||0)*(parseFloat(v)||1)).toFixed(2))}
  const selectPreset=(p:typeof PRESETS[0])=>{setPreset(p.label);setPrice(String(p.price));setUsdt(((parseFloat(coin)||0)*p.price).toFixed(2))}

  const display=(n:string)=>{const x=parseFloat(n)||0; if(x>=1e6) return (x/1e6).toFixed(2)+'M USDT'; if(x>=1000) return (x/1000).toFixed(2)+'K USDT'; return x.toFixed(2)+' USDT'}

  return (
    <div>
      <div className="bg-[#181c27] rounded-xl p-5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-1">🔄 Coin ↔ USDT Converter</div>
        <p className="text-[12px] text-[#8b93b0] mb-4">Real-time bidirectional conversion.</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {PRESETS.map(p=><button key={p.label} onClick={()=>selectPreset(p)} className={`text-[12px] px-3 py-1 rounded-full border transition-all ${preset===p.label?'bg-[#F0B90B] text-[#111] border-[#F0B90B] font-semibold':'border-white/[0.14] bg-[#1e2233] text-[#8b93b0] hover:text-[#f0f2f8]'}`}>{p.label}</button>)}
        </div>
        <div className="mb-3">
          <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">{preset} Price (USDT)</label>
          <input type="number" value={price} onChange={e=>onPrice(e.target.value)} className="w-full px-3 py-2 text-[14px] rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50"/>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">{preset}</label>
            <input type="number" value={coin} onChange={e=>onCoin(e.target.value)} className="w-full px-3 py-3 text-[16px] font-mono rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50"/>
          </div>
          <div className="text-[20px] text-[#5a6180] pt-5 flex-shrink-0">⇄</div>
          <div className="flex-1">
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">USDT</label>
            <input type="number" value={usdt} onChange={e=>onUsdt(e.target.value)} className="w-full px-3 py-3 text-[16px] font-mono rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50"/>
          </div>
        </div>
        <div className="mt-4 bg-[#0f1117] rounded-lg p-4 border border-white/[0.08] text-center">
          <div className="text-[13px] text-[#8b93b0] mb-1">{coin} {preset} =</div>
          <div className="text-[24px] font-semibold font-mono text-[#F0B90B]">{display(usdt)}</div>
          <div className="text-[11px] text-[#5a6180] mt-1">1 {preset} = ${parseFloat(price).toLocaleString()} USDT</div>
        </div>
      </div>
      <CtaBox title={`Buy ${preset} spot on these exchanges:`} ids={['bybit','gate','kucoin']}/>
    </div>
  )
}
