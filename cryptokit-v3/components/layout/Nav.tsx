'use client';
import { useLang } from '@/components/layout/LangProvider';
import { LOCALES, type Locale } from '@/lib/i18n';

export default function Nav() {
  const { locale, setLocale } = useLang();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-[#0f1117]/90 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[15px] font-semibold">
        <span className="text-[#F0B90B] text-lg">⬡</span>
        <span className="text-[#F0B90B]">Crypto</span>Kit
      </div>
      <select
        value={locale}
        onChange={e => setLocale(e.target.value as Locale)}
        className="text-[13px] px-2.5 py-1.5 rounded-[7px] border border-white/[0.14] bg-[#181c27] text-[#f0f2f8] cursor-pointer outline-none"
      >
        {LOCALES.map(l => (
          <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
        ))}
      </select>
    </nav>
  );
}
