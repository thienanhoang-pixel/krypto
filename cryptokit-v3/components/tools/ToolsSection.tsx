'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { useLang } from '@/components/layout/LangProvider';
import LiquidationTool from './LiquidationTool';
import ProfitTool from './ProfitTool';
import DcaTool from './DcaTool';
import RiskTool from './RiskTool';
import FundingRateTool from './FundingRateTool';
import CompoundingTool from './CompoundingTool';
import BreakevenTool from './BreakevenTool';
import ConverterTool from './ConverterTool';

type ToolId = 'liq' | 'profit' | 'dca' | 'risk' | 'funding' | 'compound' | 'breakeven' | 'converter';

const tools: { id: ToolId; icon: string; labelKey: string; isNew?: boolean }[] = [
  { id: 'liq',       icon: '🔥', labelKey: 'liquidation' },
  { id: 'profit',    icon: '📈', labelKey: 'profit' },
  { id: 'dca',       icon: '⬇',  labelKey: 'dca' },
  { id: 'risk',      icon: '🛡',  labelKey: 'risk' },
  { id: 'funding',   icon: '💸', labelKey: 'funding',     isNew: true },
  { id: 'compound',  icon: '📊', labelKey: 'compounding', isNew: true },
  { id: 'breakeven', icon: '🎯', labelKey: 'breakeven',   isNew: true },
  { id: 'converter', icon: '🔄', labelKey: 'converter',   isNew: true },
];

export default function ToolsSection() {
  const { t } = useLang();
  const [active, setActive] = useState<ToolId>('liq');

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="flex gap-2 flex-wrap mb-5">
        {tools.map(({ id, icon, labelKey, isNew }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={clsx(
              'relative px-3.5 py-1.5 text-[12px] font-sans rounded-full border transition-all',
              active === id
                ? 'bg-[#F0B90B] text-[#111] border-[#F0B90B] font-semibold'
                : 'bg-[#181c27] text-[#8b93b0] border-white/[0.14] hover:text-[#f0f2f8]'
            )}
          >
            {icon} {t('tools', labelKey)}
            {isNew && active !== id && (
              <span className="absolute -top-1.5 -right-1 text-[9px] bg-[#1D9E75] text-white px-1 py-px rounded-full font-semibold leading-none">
                NEW
              </span>
            )}
          </button>
        ))}
      </div>
      {active === 'liq'       && <LiquidationTool />}
      {active === 'profit'    && <ProfitTool />}
      {active === 'dca'       && <DcaTool />}
      {active === 'risk'      && <RiskTool />}
      {active === 'funding'   && <FundingRateTool />}
      {active === 'compound'  && <CompoundingTool />}
      {active === 'breakeven' && <BreakevenTool />}
      {active === 'converter' && <ConverterTool />}
    </div>
  );
}
