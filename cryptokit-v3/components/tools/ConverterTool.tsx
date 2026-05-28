'use client';
import { useState, useMemo } from 'react';
import CalcInput from '@/components/ui/CalcInput';
import ExchangeItem from '@/components/ui/ExchangeItem';
import { exchanges } from '@/lib/exchanges';

const PRESETS = [
  { label: 'BTC', price: 68000 },
  { label: 'ETH', price: 3600 },
  { label: 'SOL', price: 170 },
  { label: 'BNB', price: 580 },
  { label: 'XRP', price: 0.52 },
];

export default function ConverterTool() {
  const [coinPrice, setCoinPrice] = useState('68000');
  const [coinAmt, setCoinAmt] = useState('0.1');
  const [usdtAmt, setUsdtAmt] = useState('6800');
  const [selectedPreset, setSelectedPreset] = useState('BTC');

  // Sync: coin → usdt
  function handleCoinChange(val: string) {
    setCoinAmt(val);
    const n = parseFloat(val) || 0;
    const p = parseFloat(coinPrice) || 1;
    setUsdtAmt((n * p).toFixed(2));
  }

  // Sync: usdt → coin
  function handleUsdtChange(val: string) {
    setUsdtAmt(val);
    const n = parseFloat(val) || 0;
    const p = parseFloat(coinPrice) || 1;
    setCoinAmt((n / p).toFixed(8));
  }

  function handlePriceChange(val: string) {
    setCoinPrice(val);
    const p = parseFloat(val) || 1;
    const c = parseFloat(coinAmt) || 0;
    setUsdtAmt((c * p).toFixed(2));
  }

  function selectPreset(preset: typeof PRESETS[0]) {
    setSelectedPreset(preset.label);
    setCoinPrice(String(preset.price));
    const c = parseFloat(coinAmt) || 0;
    setUsdtAmt((c * preset.price).toFixed(2));
  }

  const fmtUSDT = (n: string) => {
    const num = parseFloat(n) || 0;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M USDT';
    if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K USDT';
    return num.toFixed(2) + ' USDT';
  };

  const spotExch = ['bybit', 'gate', 'kucoin'].map(id => exchanges.find(e => e.id === id)!);

  return (
    <div>
      <div className="bg-[#181c27] rounded-[10px] p-5 mb-3.5 border border-white/[0.08]">
        <div className="text-[14px] font-semibold mb-1">🔄 Coin ↔ USDT Converter</div>
        <p className="text-[12px] text-[#8b93b0] mb-4">
          Live conversion between coin amount and USDT value.
        </p>

        {/* Preset coins */}
        <div className="flex gap-2 flex-wrap mb-4">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => selectPreset(p)}
              className={`text-[12px] px-3 py-1 rounded-full border font-sans transition-all ${
                selectedPreset === p.label
                  ? 'bg-[#F0B90B] text-[#111] border-[#F0B90B] font-semibold'
                  : 'border-white/[0.14] bg-[#1e2233] text-[#8b93b0] hover:text-[#f0f2f8]'
              }`}>
              {p.label}
            </button>
          ))}
        </div>

        <div className="mb-3">
          <CalcInput label={`${selectedPreset} Price (USDT)`} id="cv-price" value={coinPrice} onChange={handlePriceChange} />
        </div>

        {/* Converter inputs */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">{selectedPreset}</label>
            <input type="number" value={coinAmt} onChange={e => handleCoinChange(e.target.value)}
              className="w-full px-3 py-3 text-[16px] font-mono rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50 transition-colors" />
          </div>
          <div className="text-[20px] text-[#5a6180] pt-5 flex-shrink-0 select-none">⇄</div>
          <div className="flex-1">
            <label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">USDT</label>
            <input type="number" value={usdtAmt} onChange={e => handleUsdtChange(e.target.value)}
              className="w-full px-3 py-3 text-[16px] font-mono rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50 transition-colors" />
          </div>
        </div>

        {/* Big display */}
        <div className="mt-4 bg-[#0f1117] rounded-[7px] p-4 border border-white/[0.08] text-center">
          <div className="text-[13px] text-[#8b93b0] mb-1">{coinAmt} {selectedPreset} =</div>
          <div className="text-[24px] font-semibold font-mono text-[#F0B90B]">
            {fmtUSDT(usdtAmt)}
          </div>
          <div className="text-[11px] text-[#5a6180] mt-1">
            1 {selectedPreset} = ${parseFloat(coinPrice).toLocaleString()} USDT
          </div>
        </div>
      </div>

      <div className="bg-[#181c27] border border-white/[0.08] rounded-[10px] p-4">
        <div className="text-[12px] font-medium text-[#f0f2f8] mb-1">
          Buy {selectedPreset} spot on these exchanges:
        </div>
        <p className="text-[11px] text-[#8b93b0] mb-2.5">
          All support {selectedPreset}/USDT pairs with low fees.
        </p>
        <div className="flex flex-col gap-1.5">
          {spotExch.map(ex => <ExchangeItem key={ex.id} exchange={ex} />)}
        </div>
      </div>
    </div>
  );
}
