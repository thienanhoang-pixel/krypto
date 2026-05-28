'use client';
import { useState, useMemo } from 'react';
import { useLang } from '@/components/layout/LangProvider';
import CalcInput from '@/components/ui/CalcInput';
import ResultCard from '@/components/ui/ResultCard';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

interface DataPoint { month: number; balance: number; }

export default function CompoundingTool() {
  const { t: tCta } = useLang();
  const tc = (k: string, v?: Record<string,string>) => tCta('cta', k, v);

  const [capital, setCapital] = useState('1000');
  const [winRate, setWinRate] = useState('55');
  const [rr, setRr] = useState('2');        // risk:reward
  const [riskPct, setRiskPct] = useState('2'); // % risk per trade
  const [tradesPerDay, setTradesPerDay] = useState('2');
  const [months, setMonths] = useState('12');

  const result = useMemo(() => {
    const cap = parseFloat(capital) || 0;
    const wr = parseFloat(winRate) / 100;
    const rrVal = parseFloat(rr) || 1;
    const rPct = parseFloat(riskPct) / 100;
    const tpd = parseFloat(tradesPerDay) || 1;
    const mo = parseInt(months) || 12;

    // Expected value per trade (as fraction of account)
    // Win: gain rPct * rrVal; Loss: lose rPct
    const evPerTrade = wr * (rPct * rrVal) - (1 - wr) * rPct;
    const tradesTotal = tpd * 30 * mo;
    const growthFactor = Math.pow(1 + evPerTrade, tradesTotal);
    const finalBalance = cap * growthFactor;
    const totalReturn = ((growthFactor - 1) * 100);

    // Monthly data for mini chart
    const data: DataPoint[] = [];
    for (let m = 0; m <= mo; m++) {
      const trades = tpd * 30 * m;
      const bal = cap * Math.pow(1 + evPerTrade, trades);
      data.push({ month: m, balance: bal });
    }

    const winPerTrade = rPct * rrVal * 100;
    const lossPerTrade = rPct * 100;

    return { finalBalance, totalReturn, evPerTrade, data, winPerTrade, lossPerTrade, tradesTotal };
  }, [capital, winRate, rr, riskPct, tradesPerDay, months]);

  const isPositive = result.totalReturn >= 0;
  const maxBal = Math.max(...result.data.map(d => d.balance));
  const minBal = Math.min(...result.data.map(d => d.balance));
  const chartH = 80;

  const compExch = ['bybit', 'bitget'].map(id => exchanges.find(e => e.id === id)!);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-1">📊 Compounding Calculator</div>
        <p className="text-[12px] text-[#8b93b0] mb-4">
          Project your account growth based on win rate, risk:reward and compounding.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <CalcInput label="Starting Capital (USDT)" id="cp-cap" value={capital} onChange={setCapital} />
          <CalcInput label="Win Rate (%)" id="cp-wr" value={winRate} onChange={setWinRate} min={1} max={99} />
          <CalcInput label="Risk:Reward (e.g. 2 = 1:2)" id="cp-rr" value={rr} onChange={setRr} />
          <CalcInput label="Risk per Trade (%)" id="cp-risk" value={riskPct} onChange={setRiskPct} />
          <CalcInput label="Trades per Day" id="cp-tpd" value={tradesPerDay} onChange={setTradesPerDay} min={1} />
          <CalcInput label="Months" id="cp-months" value={months} onChange={setMonths} min={1} max={60} />
        </div>

        {/* Mini sparkline chart */}
        <div className="mb-4 relative" style={{ height: chartH + 24 }}>
          <svg width="100%" height={chartH} viewBox={`0 0 400 ${chartH}`} preserveAspectRatio="none"
            className="rounded-[7px] overflow-hidden">
            <defs>
              <linearGradient id="cpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#1D9E75' : '#E24B4A'} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={isPositive ? '#1D9E75' : '#E24B4A'} stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map(f => (
              <line key={f} x1="0" y1={chartH * f} x2="400" y2={chartH * f}
                stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            ))}
            {/* Area fill */}
            {result.data.length > 1 && (() => {
              const pts = result.data.map((d, i) => {
                const x = (i / (result.data.length - 1)) * 400;
                const y = maxBal === minBal ? chartH / 2
                  : chartH - ((d.balance - minBal) / (maxBal - minBal)) * (chartH - 8) - 4;
                return `${x},${y}`;
              });
              const areaPath = `M0,${chartH} L${pts.join(' L')} L400,${chartH} Z`;
              const linePath = `M${pts.join(' L')}`;
              return (
                <>
                  <path d={areaPath} fill="url(#cpGrad)" />
                  <path d={linePath} fill="none"
                    stroke={isPositive ? '#1D9E75' : '#E24B4A'}
                    strokeWidth="2" />
                </>
              );
            })()}
          </svg>
          <div className="flex justify-between text-[10px] text-[#5a6180] mt-1">
            <span>Month 0</span>
            <span>Month {months}</span>
          </div>
        </div>

        {/* EV indicator */}
        <div className={`text-[12px] px-3 py-2 rounded-[7px] mb-3.5 ${
          result.evPerTrade >= 0
            ? 'bg-green-900/20 border border-green-800/30 text-green-400'
            : 'bg-red-900/20 border border-red-800/30 text-red-400'
        }`}>
          {result.evPerTrade >= 0
            ? `✓ Positive EV: +${(result.evPerTrade * 100).toFixed(3)}% per trade on average`
            : `✗ Negative EV: ${(result.evPerTrade * 100).toFixed(3)}% per trade — adjust win rate or R:R`
          }
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <ResultCard label="Final Balance"
            value={'$' + result.finalBalance.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            variant={isPositive ? 'green' : 'red'} />
          <ResultCard label="Total Return"
            value={(result.totalReturn >= 0 ? '+' : '') + result.totalReturn.toFixed(1) + '%'}
            variant={isPositive ? 'green' : 'red'} />
          <ResultCard label="Total Trades"
            value={result.tradesTotal.toFixed(0)}
            variant="default" />
          <ResultCard label="EV / Trade"
            value={(result.evPerTrade >= 0 ? '+' : '') + (result.evPerTrade * 100).toFixed(3) + '%'}
            variant={result.evPerTrade >= 0 ? 'green' : 'red'} />
        </div>
      </div>

      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-1">
          Apply this compounding strategy on exchanges with copy trading:
        </div>
        <p className="text-[11px] text-[#8b93b0] mb-2.5">
          Let your strategy auto-compound by copying your own sub-account or using bots.
        </p>
        <div className="flex flex-col gap-1.5">
          {compExch.map(ex => <ExchangeItem key={ex.id} exchange={ex} />)}
        </div>
      </div>
    </div>
  );
}
