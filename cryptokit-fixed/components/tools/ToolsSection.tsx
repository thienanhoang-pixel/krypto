'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import LiquidationTool from './LiquidationTool';
import ProfitTool from './ProfitTool';
import DcaTool from './DcaTool';
import RiskTool from './RiskTool';
import FundingRateTool from './FundingRateTool';
import CompoundingTool from './CompoundingTool';
import BreakevenTool from './BreakevenTool';
import ConverterTool from './ConverterTool';

type ToolId = 'liq' | 'profit' | 'dca' | 'risk' | 'funding' | 'compound' | 'breakeven' | 'converter';

const tools: { id: ToolId; icon: string; label: string; isNew?: boolean }[] = [
  { id: 'liq',       icon: '🔥', label: 'Liquidation' },
  { id: 'profit',    icon: '📈', label: 'Profit / PnL' },
  { id: 'dca',       icon: '⬇',  label: 'DCA' },
  { id: 'risk',      icon: '🛡',  label: 'Risk Sizing' },
  { id: 'funding',   icon: '💸', label: 'Funding Rate',  isNew: true },
  { id: 'compound',  icon: '📊', label: 'Compounding',   isNew: true },
  { id: 'breakeven', icon: '🎯', label: 'Break-even',    isNew: true },
  { id: 'converter', icon: '🔄', label: 'Converter',     isNew: true },
];

export default function ToolsSection() {
  const [active, setActive] = useState<ToolId>('liq');

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      {/* Tool pills — scrollable on mobile */}
      <div className="flex gap-2 flex-wrap mb-5">
        {tools.map(({ id, icon, label, isNew }) => (
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
            {icon} {label}
            {isNew && active !== id && (
              <span className="absolute -top-1.5 -right-1 text-[9px] bg-[#1D9E75] text-white px-1 py-px rounded-full font-semibold leading-none">
                NEW
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tool content */}
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
