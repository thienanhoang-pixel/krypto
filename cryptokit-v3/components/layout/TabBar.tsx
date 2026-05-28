'use client';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useLang } from '@/components/layout/LangProvider';

const tabs = [
  { id: 'tools',     icon: '⚙',  labelKey: 'tools' },
  { id: 'usecases',  icon: '★',  labelKey: 'useCases' },
  { id: 'exchanges', icon: '⬡',  labelKey: 'exchanges' },
] as const;

export default function TabBar() {
  const { t } = useLang();
  const [active, setActive] = useState<string>('tools');

  useEffect(() => {
    tabs.forEach(({ id }) => {
      const el = document.getElementById(`sec-${id}`);
      if (el) el.style.display = id === active ? 'block' : 'none';
    });
  }, [active]);

  return (
    <div className="flex gap-0.5 px-6 border-b border-white/[0.08] overflow-x-auto">
      {tabs.map(({ id, icon, labelKey }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={clsx(
            'px-4 py-3 text-[13px] font-sans border-b-2 transition-all whitespace-nowrap',
            active === id
              ? 'text-[#f0f2f8] border-[#F0B90B] font-medium'
              : 'text-[#8b93b0] border-transparent hover:text-[#f0f2f8]'
          )}
        >
          {icon} {t('nav', labelKey)}
        </button>
      ))}
    </div>
  );
}
