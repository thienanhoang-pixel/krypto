'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

interface DcaRow { price: string; usdt: string; }

export default function DcaTool() {
  const t = useTranslations('tools');
  const tc = useTranslations('cta');

  const [rows, setRows] = useState<DcaRow[]>([
    { price: '68000', usdt: '100' },
    { price: '65000', usdt: '100' },
  ]);

  const result = useMemo(() => {
    let tu=0, tc2=0;
    rows.forEach(r => {
      const p=parseFloat(r.price)||0;
      const u=parseFloat(r.usdt)||0;
      tu+=u; tc2+=p>0?u/p:0;
    });
    return { avg: tc2>0?tu/tc2:0, total: tu, coins: tc2 };
  }, [rows]);

  const dcaExch = ['gate','kucoin'].map(id=>exchanges.find(e=>e.id===id)!);

  function addRow() { setRows(r=>[...r,{price:'60000',usdt:'100'}]); }
  function updateRow(i:number, field:keyof DcaRow, val:string) {
    setRows(r=>r.map((row,j)=>j===i?{...row,[field]:val}:row));
  }

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-4">⬇ {t('dcaTitle')}</div>
        <div className="flex flex-col gap-2.5">
          {rows.map((row,i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">Buy {i+1} — Price ($)</label>
                <input type="number" value={row.price} onChange={e=>updateRow(i,'price',e.target.value)}
                  className="w-full px-3 py-2 text-[14px] font-sans rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50" />
              </div>
              <div>
                <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">USDT</label>
                <input type="number" value={row.usdt} onChange={e=>updateRow(i,'usdt',e.target.value)}
                  className="w-full px-3 py-2 text-[14px] font-sans rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50" />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addRow}
          className="mt-3 text-[12px] px-3 py-1.5 rounded-[7px] border border-dashed border-white/[0.14] text-[#8b93b0] hover:text-[#f0f2f8] hover:border-white/[0.25] transition-colors font-sans">
          {t('addBuy')}
        </button>
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          <ResultCard label={t('avgCost')} value={'$'+result.avg.toFixed(2)} variant="amber" />
          <ResultCard label={t('totalInvested')} value={result.total.toFixed(0)+' USDT'} />
          <ResultCard label={t('totalCoins')} value={result.coins.toFixed(6)} />
        </div>
      </div>
      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-2.5">{tc('dcaHdr')}</div>
        <div className="flex flex-col gap-1.5">
          {dcaExch.map(ex=><ExchangeItem key={ex.id} exchange={ex}/>)}
        </div>
      </div>
    </div>
  );
}
