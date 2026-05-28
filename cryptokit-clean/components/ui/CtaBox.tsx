import { ExchangeItem } from './ExchangeItem'
import { getExchanges } from '@/lib/exchanges'
interface Props { title: string; subtitle?: string; ids: readonly string[]; warning?: string }
export function CtaBox({ title, subtitle, ids, warning }: Props) {
  const exchanges = getExchanges(ids)
  return (
    <div className="bg-[#181c27] border border-white/[0.08] rounded-xl p-4 mt-3.5">
      {warning && <div className="flex items-center gap-2 text-[12px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2 mb-3">⚠ {warning}</div>}
      <div className="text-[12px] font-semibold text-[#f0f2f8] mb-1">{title}</div>
      {subtitle && <div className="text-[11px] text-[#8b93b0] mb-2.5">{subtitle}</div>}
      <div className="flex flex-col gap-1.5">{exchanges.map(ex => <ExchangeItem key={ex.id} exchange={ex}/>)}</div>
    </div>
  )
}
