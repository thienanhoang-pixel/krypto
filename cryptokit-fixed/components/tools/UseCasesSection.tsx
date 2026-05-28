'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges, useCases, BINANCE_LINK, type UseCaseKey } from '@/lib/exchanges';

const cards: { id: UseCaseKey; icon: string; titleKey: string; subKey: string }[] = [
  { id: 'small',  icon: '💰', titleKey: 'smallTitle',  subKey: 'smallSub' },
  { id: 'scalp',  icon: '⚡', titleKey: 'scalpTitle',  subKey: 'scalpSub' },
  { id: 'copy',   icon: '👥', titleKey: 'copyTitle',   subKey: 'copySub' },
  { id: 'mobile', icon: '📱', titleKey: 'mobileTitle', subKey: 'mobileSub' },
];

export default function UseCasesSection() {
  const t = useTranslations('useCases');
  const te = useTranslations('exchanges');
  const [active, setActive] = useState<UseCaseKey | null>(null);

  function getTitle(key: UseCaseKey) {
    const k = useCases[key].titleKey;
    return t(k as any);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <p className="text-[13px] text-[#8b93b0] mb-4">{t('subtitle')}</p>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        {cards.map(({ id, icon, titleKey, subKey }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`text-left bg-[#181c27] border rounded-[10px] p-4 transition-colors ${
              active === id ? 'border-[#F0B90B]/50' : 'border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <div className="text-xl mb-2">{icon}</div>
            <div className="text-[13px] font-semibold text-[#f0f2f8] mb-1">{t(titleKey as any)}</div>
            <div className="text-[11px] text-[#8b93b0]">{t(subKey as any)}</div>
          </button>
        ))}
      </div>

      {active && (
        <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
          <div className="text-[14px] font-semibold text-[#f0f2f8] mb-3">{getTitle(active)}</div>
          <div className="flex flex-col gap-1.5 mb-3">
            {useCases[active].items.map((id, i) => {
              const ex = exchanges.find(e => e.id === id)!;
              return <ExchangeItem key={id} exchange={ex} rank={i + 1} />;
            })}
          </div>
          <div className="text-[11px] text-[#5a6180] border-t border-white/[0.08] pt-3 text-center">
            {te('tierFootnote')}
            <a href={BINANCE_LINK} target="_blank" rel="nofollow sponsored noopener"
              className="text-[#378ADD] hover:underline">{te('tier1Link')}</a>
          </div>
        </div>
      )}
    </div>
  );
}
