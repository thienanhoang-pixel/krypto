'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CalcInput from '@/components/ui/CalcInput';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

export default function ProfitTool() {
  const t = useTranslations('tools');
  const tc = useTranslations('cta');

  const [cap, setCap] = useState('500');
  const [lev, setLev] = useState('10');
  const [entry, setEntry] = useState('68000');
  const [target, setTarget] = useState('72000');

  const result = useMemo(() => {
    const c = parseFloat(cap)||0;
    const l = parseFloat(lev)||1;
    const e = parseFloat(entry)||1;
    const tg = parseFloat(target)||0;
    const chg = (tg-e)/e*100;
    const pnl = c*l*(chg/100);
    const roe = (pnl/c)*100;
    return { chg, pnl, roe };
  }, [cap, lev, entry, target]);

  const profitExch = ['bybit','okx'].map(id=>exchanges.find(e=>e.id===id)!);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-4">📈 {t('profitTitle')}</div>
        <div className="grid grid-cols-2 gap-3">
          <CalcInput label={t('capital')} id="pr-cap" value={cap} onChange={setCap} />
          <CalcInput label={t('leverage')} id="pr-lev" value={lev} onChange={setLev} min={1} />
          <CalcInput label={t('entryPrice')} id="pr-entry" value={entry} onChange={setEntry} />
          <CalcInput label={t('targetPrice')} id="pr-target" value={target} onChange={setTarget} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <ResultCard label={t('pnl')} value={(result.pnl>=0?'+':'')+result.pnl.toFixed(2)+' USDT'} variant={result.pnl>=0?'green':'red'} />
          <ResultCard label={t('roe')} value={(result.roe>=0?'+':'')+result.roe.toFixed(1)+'%'} variant={result.roe>=0?'green':'red'} />
          <ResultCard label={t('priceChange')} value={(result.chg>=0?'+':'')+result.chg.toFixed(2)+'%'} />
        </div>
      </div>
      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-2.5">{tc('profitHdr')}</div>
        <div className="flex flex-col gap-1.5">
          {profitExch.map(ex=><ExchangeItem key={ex.id} exchange={ex}/>)}
        </div>
      </div>
    </div>
  );
}
