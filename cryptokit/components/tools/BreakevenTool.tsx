'use client';
import { useState, useMemo } from 'react';
import CalcInput from '@/components/ui/CalcInput';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

export default function BreakevenTool() {
  const [entry, setEntry] = useState('68000');
  const [leverage, setLeverage] = useState('10');
  const [makerFee, setMakerFee] = useState('0.02');   // %
  const [takerFee, setTakerFee] = useState('0.06');   // %
  const [orderType, setOrderType] = useState<'maker'|'taker'>('taker');
  const [fundingRate, setFundingRate] = useState('0.01');
  const [holdingHours, setHoldingHours] = useState('24');

  const result = useMemo(() => {
    const e = parseFloat(entry) || 0;
    const lev = parseFloat(leverage) || 1;
    const fee = parseFloat(orderType === 'maker' ? makerFee : takerFee) / 100;
    const fr = parseFloat(fundingRate) / 100;
    const hours = parseFloat(holdingHours) || 0;

    // Fee cost: open + close (both sides)
    const feeCost = e * fee * 2;   // per unit, both legs
    // Funding cost: per 8h period
    const fundingPayments = Math.floor(hours / 8);
    const fundingCost = e * fr * fundingPayments;

    // Total cost as % of entry, adjusted for leverage
    const totalCostPct = ((feeCost + fundingCost) / e) * 100;
    // Breakeven price movement needed (long)
    const breakevenLong = e + (feeCost + fundingCost);
    const breakevenShort = e - (feeCost + fundingCost);
    const movementNeededPct = (feeCost + fundingCost) / e * 100;
    // ROE needed to break even
    const roeNeeded = movementNeededPct * lev;

    return {
      breakevenLong,
      breakevenShort,
      feeCostTotal: feeCost,
      fundingCostTotal: fundingCost,
      movementNeededPct,
      roeNeeded,
      fundingPayments,
    };
  }, [entry, leverage, makerFee, takerFee, orderType, fundingRate, holdingHours]);

  const fmt = (n: number, dec = 2) => '$' + n.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const lowFeeExch = ['mexc', 'okx'].map(id => exchanges.find(e => e.id === id)!);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-1">🎯 Break-even Calculator</div>
        <p className="text-[12px] text-[#8b93b0] mb-4">
          How much does price need to move just to cover fees and funding?
        </p>

        <div className="grid grid-cols-2 gap-3">
          <CalcInput label="Entry Price ($)" id="be-entry" value={entry} onChange={setEntry} />
          <CalcInput label="Leverage" id="be-lev" value={leverage} onChange={setLeverage} min={1} />
          <div>
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">Order type</label>
            <select value={orderType} onChange={e => setOrderType(e.target.value as 'maker'|'taker')}
              className="w-full px-3 py-2 text-[14px] font-sans rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none">
              <option value="taker">Taker (market order)</option>
              <option value="maker">Maker (limit order)</option>
            </select>
          </div>
          <CalcInput label="Fee (%)" id="be-fee"
            value={orderType === 'maker' ? makerFee : takerFee}
            onChange={v => orderType === 'maker' ? setMakerFee(v) : setTakerFee(v)} />
          <CalcInput label="Funding Rate (%/8h)" id="be-fr" value={fundingRate} onChange={setFundingRate} />
          <CalcInput label="Holding time (hours)" id="be-hours" value={holdingHours} onChange={setHoldingHours} />
        </div>

        {/* Cost breakdown */}
        <div className="mt-4 mb-3 grid grid-cols-2 gap-2 text-[12px]">
          <div className="bg-[#0f1117] rounded-[7px] p-3 border border-white/[0.08]">
            <div className="text-[#8b93b0] mb-1">Fee cost (open + close)</div>
            <div className="font-mono font-semibold text-[#E24B4A]">
              {fmt(result.feeCostTotal, 4)}
            </div>
          </div>
          <div className="bg-[#0f1117] rounded-[7px] p-3 border border-white/[0.08]">
            <div className="text-[#8b93b0] mb-1">
              Funding cost ({result.fundingPayments}× payments)
            </div>
            <div className="font-mono font-semibold text-[#E24B4A]">
              {fmt(result.fundingCostTotal, 4)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <ResultCard label="Breakeven (Long)" value={fmt(result.breakevenLong)} variant="amber" />
          <ResultCard label="Breakeven (Short)" value={fmt(result.breakevenShort)} variant="amber" />
          <ResultCard label="Move needed" value={result.movementNeededPct.toFixed(3) + '%'} variant="red" />
          <ResultCard label="ROE needed" value={result.roeNeeded.toFixed(2) + '%'} variant="red" />
        </div>
      </div>

      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-1">
          Lower your breakeven with 0% maker fees:
        </div>
        <p className="text-[11px] text-[#8b93b0] mb-2.5">
          MEXC charges 0% maker fee. Using limit orders on OKX drops fee to 0.02%.
        </p>
        <div className="flex flex-col gap-1.5">
          {lowFeeExch.map(ex => <ExchangeItem key={ex.id} exchange={ex} />)}
        </div>
      </div>
    </div>
  );
}
