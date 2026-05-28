type Variant = 'default'|'red'|'green'|'amber'
const vc: Record<Variant,string> = { default:'text-[#f0f2f8]', red:'text-[#E24B4A]', green:'text-[#1D9E75]', amber:'text-[#BA7517]' }

export function CalcShell({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-[#181c27] rounded-xl p-5 border border-white/[0.08]"><div className="text-[14px] font-semibold mb-4">{title}</div>{children}</div>
}
export function InputGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">{label}</label>{children}</div>
}
export function NumInput({ value, onChange, min, max }: { value: string; onChange:(v:string)=>void; min?: number; max?: number }) {
  return <input type="number" value={value} min={min} max={max} onChange={e=>onChange(e.target.value)} className="w-full px-3 py-2 text-[14px] font-sans rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50 transition-colors"/>
}
export function SelectInput({ value, onChange, children }: { value: string; onChange:(v:string)=>void; children: React.ReactNode }) {
  return <select value={value} onChange={e=>onChange(e.target.value)} className="w-full px-3 py-2 text-[14px] font-sans rounded-lg border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none">{children}</select>
}
export function Results({ children, cols=3 }: { children: React.ReactNode; cols?: number }) {
  return <div className={`grid gap-2 mt-3.5 ${cols===2?'grid-cols-2':cols===4?'grid-cols-2 sm:grid-cols-4':'grid-cols-3'}`}>{children}</div>
}
export function Stat({ label, value, variant='default' }: { label: string; value: string; variant?: Variant }) {
  return <div className="bg-[#0f1117] rounded-lg p-3 text-center border border-white/[0.08]"><div className="text-[11px] text-[#8b93b0] mb-1.5">{label}</div><div className={`text-[16px] font-semibold font-mono ${vc[variant]}`}>{value}</div></div>
}
