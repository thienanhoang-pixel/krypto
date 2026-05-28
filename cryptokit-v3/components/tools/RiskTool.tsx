'use client';
import { useState, useMemo } from 'react';
import { useLang } from '@/components/layout/LangProvider';
import CalcInput from '@/components/ui/CalcInput';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

export default function RiskTool() {
  const { t: tRaw } = useLang();
  const t = (k: string) => tRaw('tools', k);
  const { t: tCta } = useLang();
  const tc = (k: string, v?: Record<string,string>) => tCta('cta', k, v);

  const [cap, setCap] = useState('1000');
  const [pct, setPct] = useState('2');
  const [entry, setEntry] = useState('68000');
  const [sl, setSl] = useState('66000');

  const result = useMemo(() => {
    const c=parseFloat(cap)||0, p=parseFloat(pct)||0;
    const e=parseFloat(entry)||1, s=parseFloat(sl)||0;
    const maxLoss = c*p/100;
    const dist = Math.abs(e-s)/e*100;
    const pos = dist>0 ? maxLoss/(dist/100) : 0;
    return { maxLoss, dist, pos };
  }, [cap, pct, entry, sl]);

  const riskExch = ['bybit','bitget'].map(id=>exchanges.find(e=>e.id===id)!);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-4">🛡 {t('riskTitle')}</div>
        <div className="grid grid-cols-2 gap-3">
          <CalcInput label={t('totalCapital')} id="rk-cap" value={cap} onChange={setCap} />
          <CalcInput label={t('riskPerTrade')} id="rk-pct" value={pct} onChange={setPct} />
          <CalcInput label={t('entryPrice')} id="rk-entry" value={entry} onChange={setEntry} />
          <CalcInput label={t('stoploss')} id="rk-sl" value={sl} onChange={setSl} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <ResultCard label={t('maxLoss')} value={result.maxLoss.toFixed(2)+' USDT'} variant="red" />
          <ResultCard label={t('recPosition')} value={'$'+result.pos.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')} />
          <ResultCard label={t('slDistance')} value={result.dist.toFixed(2)+'%'} variant="amber" />
        </div>
      </div>
      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-2.5">{tc('riskHdr')}</div>
        <div className="flex flex-col gap-1.5">
          {riskExch.map(ex=><ExchangeItem key={ex.id} exchange={ex}/>)}
        </div>
      </div>
    </div>
  );
}
