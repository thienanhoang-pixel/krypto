'use client';
import { useState } from 'react';
import { useLang } from '@/components/layout/LangProvider';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges, useCases, BINANCE_LINK, type UseCaseKey } from '@/lib/exchanges';

const cards: { id: UseCaseKey; icon: string; titleKey: string; subKey: string }[] = [
  { id: 'small',  icon: '💰', titleKey: 'smallTitle',  subKey: 'smallSub' },
  { id: 'scalp',  icon: '⚡', titleKey: 'scalpTitle',  subKey: 'scalpSub' },
  { id: 'copy',   icon: '👥', titleKey: 'copyTitle',   subKey: 'copySub' },
  { id: 'mobile', icon: '📱', titleKey: 'mobileTitle', subKey: 'mobileSub' },
];

export default function UseCasesSection() {
  const { t } = useLang();
  const [active, setActive] = useState<UseCaseKey | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <p className="text-[13px] text-[#8b93b0] mb-4">{t('useCases', 'subtitle')}</p>
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
            <div className="text-[13px] font-semibold text-[#f0f2f8] mb-1">{t('useCases', titleKey)}</div>
            <div className="text-[11px] text-[#8b93b0]">{t('useCases', subKey)}</div>
          </button>
        ))}
      </div>
      {active && (
        <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
          <div className="text-[14px] font-semibold text-[#f0f2f8] mb-3">
            {t('useCases', useCases[active].titleKey)}
          </div>
          <div className="flex flex-col gap-1.5 mb-3">
            {useCases[active].items.map((id, i) => {
              const ex = exchanges.find(e => e.id === id)!;
              return <ExchangeItem key={id} exchange={ex} rank={i + 1} />;
            })}
          </div>
          <div className="text-[11px] text-[#5a6180] border-t border-white/[0.08] pt-3 text-center">
            {t('exchanges', 'tierFootnote')}
            <a href={BINANCE_LINK} target="_blank" rel="nofollow sponsored noopener"
              className="text-[#378ADD] hover:underline">{t('exchanges', 'tier1Link')}</a>
          </div>
        </div>
      )}
    </div>
  );
}
