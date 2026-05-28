interface Props {
  label: string;
  id: string;
  type?: 'number' | 'text';
  value: string | number;
  onChange: (val: string) => void;
  min?: number;
  max?: number;
}

export default function CalcInput({ label, id, type = 'number', value, onChange, min, max }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] text-[#8b93b0] uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-[14px] font-sans rounded-[7px] border border-white/[0.14] bg-[#1e2233] text-[#f0f2f8] outline-none focus:border-[#F0B90B]/50 transition-colors"
      />
    </div>
  );
}
