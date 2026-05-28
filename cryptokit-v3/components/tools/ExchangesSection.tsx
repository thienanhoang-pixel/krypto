'use client';
import { useLang } from '@/components/layout/LangProvider';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges, BINANCE_LINK } from '@/lib/exchanges';

export default function ExchangesSection() {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="flex items-start gap-3 bg-[#F0B90B]/[0.06] border border-[#F0B90B]/20 rounded-[10px] p-4 mb-5">
        <span className="text-2xl mt-0.5">⬡</span>
        <div className="text-[13px] text-[#8b93b0] leading-relaxed">
          <span className="text-[#f0f2f8] font-semibold">Binance</span> — {t('exchanges', 'tier1Note')}
          {' '}<a href={BINANCE_LINK} target="_blank" rel="nofollow sponsored noopener"
            className="text-[#BA7517] hover:underline">{t('exchanges', 'tier1Link')}</a>
        </div>
      </div>
      <div className="text-[11px] font-medium uppercase tracking-widest text-[#5a6180] mb-3">
        {t('exchanges', 'tier2Label')}
      </div>
      <div className="flex flex-col gap-2">
        {exchanges.map(ex => <ExchangeItem key={ex.id} exchange={ex} />)}
      </div>
    </div>
  );
}
