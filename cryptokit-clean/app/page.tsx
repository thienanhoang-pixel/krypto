'use client'
import { useState } from 'react'
import { LiquidationTool } from '@/components/tools/LiquidationTool'
import { ProfitTool } from '@/components/tools/ProfitTool'
import { DcaTool } from '@/components/tools/DcaTool'
import { RiskTool } from '@/components/tools/RiskTool'
import { FundingTool } from '@/components/tools/FundingTool'
import { CompoundingTool } from '@/components/tools/CompoundingTool'
import { BreakevenTool } from '@/components/tools/BreakevenTool'
import { ConverterTool } from '@/components/tools/ConverterTool'
import { ExchangeItem } from '@/components/ui/ExchangeItem'
import { EXCHANGES, BINANCE_LINK, USE_CASES, getExchanges, type UseCaseKey } from '@/lib/exchanges'

type ToolId = 'liq'|'profit'|'dca'|'risk'|'funding'|'compound'|'breakeven'|'converter'
type TabId = 'tools'|'usecases'|'exchanges'

const TOOLS: {id:ToolId;icon:string;label:string;isNew?:boolean}[] = [
  {id:'liq',icon:'🔥',label:'Liquidation'},
  {id:'profit',icon:'📈',label:'Profit / PnL'},
  {id:'dca',icon:'⬇',label:'DCA'},
  {id:'risk',icon:'🛡',label:'Risk Sizing'},
  {id:'funding',icon:'💸',label:'Funding Rate',isNew:true},
  {id:'compound',icon:'📊',label:'Compounding',isNew:true},
  {id:'breakeven',icon:'🎯',label:'Break-even',isNew:true},
  {id:'converter',icon:'🔄',label:'Converter',isNew:true},
]

const UC_CARDS: {id:UseCaseKey;icon:string;title:string;sub:string}[] = [
  {id:'small', icon:'💰',title:'Best for $100 accounts',   sub:'Low deposit · low fees'},
  {id:'scalp', icon:'⚡',title:'Best for scalping',         sub:'Ultra-low maker fees'},
  {id:'copy',  icon:'👥',title:'Best copy trading',         sub:'Follow pro traders'},
  {id:'mobile',icon:'📱',title:'Best mobile app',           sub:'Trade anywhere'},
]

export default function Home() {
  const [tab, setTab] = useState<TabId>('tools')
  const [tool, setTool] = useState<ToolId>('liq')
  const [uc, setUc] = useState<UseCaseKey|null>(null)

  return (
    <div>
      {/* NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-[#0f1117]/90 backdrop-blur-xl">
        <div className="text-[15px] font-semibold flex items-center gap-2">
          <span className="text-[#F0B90B] text-lg">⬡</span>
          <span className="text-[#F0B90B]">Crypto</span>Kit
        </div>
        <div className="flex gap-4 text-[13px] text-[#8b93b0]">
          <button onClick={()=>setTab('tools')} className={tab==='tools'?'text-[#f0f2f8] font-medium':''}>Tools</button>
          <button onClick={()=>setTab('usecases')} className={tab==='usecases'?'text-[#f0f2f8] font-medium':''}>Use Cases</button>
          <button onClick={()=>setTab('exchanges')} className={tab==='exchanges'?'text-[#f0f2f8] font-medium':''}>Exchanges</button>
        </div>
      </nav>

      {/* TAB BAR */}
      <div className="flex border-b border-white/[0.08] overflow-x-auto">
        {(['tools','usecases','exchanges'] as TabId[]).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-5 py-3 text-[13px] border-b-2 whitespace-nowrap transition-all capitalize ${tab===t?'text-[#f0f2f8] border-[#F0B90B] font-medium':'text-[#8b93b0] border-transparent hover:text-[#f0f2f8]'}`}>
            {t==='tools'?'⚙ Tools':t==='usecases'?'★ Use Cases':'⬡ Exchanges'}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5">

        {/* ===== TOOLS TAB ===== */}
        {tab==='tools' && (
          <div>
            <div className="flex gap-2 flex-wrap mb-5">
              {TOOLS.map(({id,icon,label,isNew})=>(
                <button key={id} onClick={()=>setTool(id)}
                  className={`relative px-3.5 py-1.5 text-[12px] rounded-full border transition-all ${tool===id?'bg-[#F0B90B] text-[#111] border-[#F0B90B] font-semibold':'bg-[#181c27] text-[#8b93b0] border-white/[0.14] hover:text-[#f0f2f8]'}`}>
                  {icon} {label}
                  {isNew&&tool!==id&&<span className="absolute -top-1.5 -right-1 text-[9px] bg-[#1D9E75] text-white px-1 py-px rounded-full font-semibold leading-none">NEW</span>}
                </button>
              ))}
            </div>
            {tool==='liq'       && <LiquidationTool/>}
            {tool==='profit'    && <ProfitTool/>}
            {tool==='dca'       && <DcaTool/>}
            {tool==='risk'      && <RiskTool/>}
            {tool==='funding'   && <FundingTool/>}
            {tool==='compound'  && <CompoundingTool/>}
            {tool==='breakeven' && <BreakevenTool/>}
            {tool==='converter' && <ConverterTool/>}
          </div>
        )}

        {/* ===== USE CASES TAB ===== */}
        {tab==='usecases' && (
          <div>
            <p className="text-[13px] text-[#8b93b0] mb-4">Find the right exchange for your trading style — not just the biggest name.</p>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {UC_CARDS.map(({id,icon,title,sub})=>(
                <button key={id} onClick={()=>setUc(id)}
                  className={`text-left bg-[#181c27] border rounded-xl p-4 transition-colors ${uc===id?'border-[#F0B90B]/50':'border-white/[0.08] hover:border-white/20'}`}>
                  <div className="text-xl mb-2">{icon}</div>
                  <div className="text-[13px] font-semibold mb-1">{title}</div>
                  <div className="text-[11px] text-[#8b93b0]">{sub}</div>
                </button>
              ))}
            </div>
            {uc && (
              <div className="bg-[#181c27] border border-white/[0.08] rounded-xl p-4">
                <div className="text-[14px] font-semibold mb-3">{USE_CASES[uc].title}</div>
                <div className="flex flex-col gap-1.5 mb-3">
                  {getExchanges(USE_CASES[uc].ids).map((ex,i)=><ExchangeItem key={ex.id} exchange={ex} rank={i+1}/>)}
                </div>
                <div className="text-[11px] text-[#5a6180] border-t border-white/[0.08] pt-3 text-center">
                  Binance is also a reliable option —{' '}
                  <a href={BINANCE_LINK} target="_blank" rel="nofollow sponsored noopener" className="text-[#378ADD] hover:underline">read our overview →</a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== EXCHANGES TAB ===== */}
        {tab==='exchanges' && (
          <div>
            <div className="flex items-start gap-3 bg-[#F0B90B]/[0.06] border border-[#F0B90B]/20 rounded-xl p-4 mb-5">
              <span className="text-2xl">⬡</span>
              <div className="text-[13px] text-[#8b93b0] leading-relaxed">
                <span className="text-[#f0f2f8] font-semibold">Binance</span> — largest exchange by volume, strong security record. Good as a primary spot account.{' '}
                <a href={BINANCE_LINK} target="_blank" rel="nofollow sponsored noopener" className="text-[#BA7517] hover:underline">Read our overview →</a>
              </div>
            </div>
            <div className="text-[11px] font-medium uppercase tracking-widest text-[#5a6180] mb-3">Tier 2 — Growth exchanges</div>
            <div className="flex flex-col gap-2">
              {EXCHANGES.map(ex=><ExchangeItem key={ex.id} exchange={ex}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
