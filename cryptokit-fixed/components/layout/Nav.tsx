'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

const LANG_LABELS: Record<Locale, string> = {
  en: '🌐 English',
  vi: '🇻🇳 Tiếng Việt',
  id: '🇮🇩 Indonesia',
  th: '🇹🇭 ภาษาไทย',
  pt: '🇧🇷 Português',
};

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // Replace current locale segment in path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-[#0f1117]/90 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[15px] font-semibold">
        <span className="text-[#F0B90B] text-lg">⬡</span>
        <span className="text-[#F0B90B]">Crypto</span>Kit
      </div>

      <div className="flex items-center gap-3">
        {/* Language switcher */}
        <select
          value={locale}
          onChange={(e) => switchLocale(e.target.value)}
          className="text-[13px] px-2.5 py-1.5 rounded-[7px] border border-white/[0.14] bg-[#181c27] text-[#f0f2f8] cursor-pointer font-sans outline-none"
        >
          {locales.map((l) => (
            <option key={l} value={l}>{LANG_LABELS[l]}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}
