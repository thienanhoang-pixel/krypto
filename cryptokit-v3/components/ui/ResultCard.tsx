import clsx from 'clsx';

interface Props {
  label: string;
  value: string;
  variant?: 'default' | 'red' | 'green' | 'amber';
}

export default function ResultCard({ label, value, variant = 'default' }: Props) {
  return (
    <div className="bg-[#0f1117] rounded-[7px] p-3 text-center border border-white/[0.08]">
      <div className="text-[11px] text-[#8b93b0] mb-1.5">{label}</div>
      <div className={clsx('text-[16px] font-semibold font-mono', {
        'text-[#f0f2f8]': variant === 'default',
        'text-[#E24B4A]': variant === 'red',
        'text-[#1D9E75]': variant === 'green',
        'text-[#BA7517]': variant === 'amber',
      })}>
        {value}
      </div>
    </div>
  );
}
