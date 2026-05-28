'use client';
import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import CalcInput from '@/components/ui/CalcInput';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

// Typical funding rates by exchange (per 8h, annualized reference)
const EXCHANGE_RATES: Record<string, { typical: number; label: string }> = {
  bybit:  { typical: 0.01,  label: 'Bybit typical' },
  okx:    { typical: 0.01,  label: 'OKX typical' },
  mexc:   { typical: 0.0075,label: 'MEXC typical' },
  bitget: { typical: 0.01,  label: 'Bitget typical' },
};

export default function FundingRateTool() {
  const tc = useTranslations('cta');

  const [posSize, setPosSize] = useState('5000');
  const [rate, setRate] = useState('0.01');
  const [side, setSide] = useState<'long'|'short'>('long');
  const [days, setDays] = useState('30');

  const result = useMemo(() => {
    const p = parseFloat(posSize) || 0;
    const r = parseFloat(rate) / 100;
    const d = parseFloat(days) || 1;
    // Funding paid 3x per day (every 8h)
    const perPayment = p * r;
    const perDay = perPayment * 3;
    const total = perDay * d;
    // Negative = you pay, Positive = you receive
    // Long pays when rate > 0, Short receives when rate > 0
    const sign = side === 'long' ? -1 : 1;
    return {
      perPayment: sign * perPayment,
      perDay: sign * perDay,
      total: sign * total,
      annualized: Math.abs(r * 3 * 365 * 100),
    };
  }, [posSize, rate, side, days]);

  const fmt = (n: number) =>
    (n >= 0 ? '+' : '') + n.toFixed(2) + ' USDT';

  const fundingExch = ['mexc', 'bybit', 'okx']
    .map(id => exchanges.find(e => e.id === id)!)
    .filter(Boolean);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-1">💸 Funding Rate Cost Calculator</div>
        <p className="text-[12px] text-[#8b93b0] mb-4">
          Funding is paid every 8 hours. Long pays when rate &gt; 0, short receives.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <CalcInput label="Position Size (USDT)" id="fr-pos" value={posSize} onChange={setPosSize} />
          <CalcInput label="Funding Rate (%)" id="fr-rate" value={rate} onChange={setRate} />
          <div>
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">Side</label>
            <select value={side} onChange={e => setSide(e.target.value as 'long'|'short')}
              className="w-full px-3 py-2 text-[14px] font-sans rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none">
              <option value="long">Long (pays funding)</option>
              <option value="short">Short (receives funding)</option>
            </select>
          </div>
          <CalcInput label="Days to hold" id="fr-days" value={days} onChange={setDays} min={1} />
        </div>

        {/* Exchange rate comparison */}
        <div className="mt-3 mb-2">
          <div className="text-[11px] text-[#8b93b0] uppercase tracking-wide mb-2">Quick fill — typical rates</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(EXCHANGE_RATES).map(([ex, { typical, label }]) => (
              <button key={ex} onClick={() => setRate(String(typical))}
                className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.14] bg-[#1e2233] text-[#8b93b0] hover:text-[#f0f2f8] hover:border-white/[0.25] transition-colors font-sans">
                {label}: {typical}%
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3.5 sm:grid-cols-4">
          <ResultCard label="Per payment (8h)"
            value={fmt(result.perPayment)}
            variant={result.perPayment >= 0 ? 'green' : 'red'} />
          <ResultCard label="Per day"
            value={fmt(result.perDay)}
            variant={result.perDay >= 0 ? 'green' : 'red'} />
          <ResultCard label={`Over ${days} days`}
            value={fmt(result.total)}
            variant={result.total >= 0 ? 'green' : 'red'} />
          <ResultCard label="Annualized rate"
            value={result.annualized.toFixed(1) + '%'}
            variant="amber" />
        </div>
      </div>

      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-1">
          Exchanges with the lowest funding rates:
        </div>
        <p className="text-[11px] text-[#8b93b0] mb-2.5">
          MEXC often has 0% maker fees. Check live rates before opening a position.
        </p>
        <div className="flex flex-col gap-1.5">
          {fundingExch.map(ex => <ExchangeItem key={ex.id} exchange={ex} />)}
        </div>
      </div>
    </div>
  );
}
