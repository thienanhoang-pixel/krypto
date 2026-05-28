'use client';
import { useLang } from '@/components/layout/LangProvider';
import type { Exchange } from '@/lib/exchanges';

interface Props {
  exchange: Exchange;
  rank?: number;
}

export default function ExchangeItem({ exchange, rank }: Props) {
  const { t: tRaw2 } = useLang();
  const tc = (k: string, v?: Record<string,string>) => tRaw2('cta', k, v);
  const { logo, bg, fg, name, tag, link, badge, badgeVariant } = exchange;

  return (
    <div className="flex items-center justify-between px-3 py-2.5 bg-[#1e2233] rounded-[7px] border border-white/[0.08] hover:border-white/[0.14] transition-colors">
      <div className="flex items-center gap-2.5">
        {rank && (
          <span className="text-[11px] font-medium text-[#5a6180] min-w-[18px]">#{rank}</span>
        )}
        <div
          className="w-7 h-7 rounded-[7px] flex items-center justify-center text-[10px] font-bold flex-shrink-0"
          style={{ background: bg, color: fg }}
        >
          {logo}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-medium text-[#f0f2f8]">{name}</span>
            {badge && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                badgeVariant === 'top'
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-blue-900/30 text-blue-400'
              }`}>
                {badge}
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#8b93b0]">{tag}</div>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="text-[12px] text-[#BA7517] font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-[7px] border border-[#BA7517]/35 hover:bg-[#BA7517]/10 transition-colors whitespace-nowrap ml-3"
      >
        ↗ {tc('open')}
      </a>
    </div>
  );
}
