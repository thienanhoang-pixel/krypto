'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CalcInput from '@/components/ui/CalcInput';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges, liqRecs } from '@/lib/exchanges';

function fmt(n: number) {
  return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function LiquidationTool() {
  const t = useTranslations('tools');
  const tc = useTranslations('cta');

  const [cap, setCap] = useState('200');
  const [lev, setLev] = useState('20');
  const [entry, setEntry] = useState('68000');
  const [dir, setDir] = useState<'long'|'short'>('long');

  const result = useMemo(() => {
    const c = parseFloat(cap)||0;
    const l = parseFloat(lev)||1;
    const e = parseFloat(entry)||0;
    const liqPrice = dir==='long' ? e*(1-0.9/l) : e*(1+0.9/l);
    const pct = (Math.abs(e-liqPrice)/e)*100;
    const posSize = c*l;
    const recIds = l>=50 ? liqRecs.high : l>=20 ? liqRecs.medium : liqRecs.low;
    const warnKey = l>=50 ? 'warnHigh' : l>=20 ? 'warnMid' : null;
    const ctaKey = l<20 ? 'liqLowHdr' : 'liqHighHdr';
    return { liqPrice, pct, posSize, recIds, warnKey, ctaKey, levNum: l };
  }, [cap, lev, entry, dir]);

  const recExchanges = result.recIds.map(id => exchanges.find(e => e.id===id)!).filter(Boolean);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-4">
          🔥 {t('liqTitle')}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CalcInput label={t('capital')} id="liq-cap" value={cap} onChange={setCap} />
          <CalcInput label={t('leverage')} id="liq-lev" value={lev} onChange={setLev} min={1} max={125} />
          <CalcInput label={t('entryPrice')} id="liq-entry" value={entry} onChange={setEntry} />
          <div>
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">{t('direction')}</label>
            <select value={dir} onChange={e=>setDir(e.target.value as 'long'|'short')}
              className="w-full px-3 py-2 text-[14px] font-sans rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none">
              <option value="long">{t('long')}</option>
              <option value="short">{t('short')}</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <ResultCard label={t('liqPrice')} value={fmt(result.liqPrice)} variant="red" />
          <ResultCard label={t('dropNeeded')} value={result.pct.toFixed(1)+'%'} variant="amber" />
          <ResultCard label={t('positionSize')} value={fmt(result.posSize)} />
        </div>
      </div>
      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        {result.warnKey && (
          <div className="flex items-center gap-2 text-[12px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-[7px] px-3 py-2 mb-3">
            ⚠ {tc(result.warnKey as any, {lev: result.levNum})}
          </div>
        )}
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-2.5">{tc(result.ctaKey as any)}</div>
        <div className="flex flex-col gap-1.5">
          {recExchanges.map(ex=><ExchangeItem key={ex.id} exchange={ex}/>)}
        </div>
      </div>
    </div>
  );
}
