'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Locale, LOCALES, messages } from '@/lib/i18n';

type LangCtx = {
  locale: Locale;
  t: (section: string, key: string, vars?: Record<string, string>) => string;
  setLocale: (l: Locale) => void;
};

const Ctx = createContext<LangCtx>({
  locale: 'en',
  t: (_s, k) => k,
  setLocale: () => {},
});

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('ck_locale') as Locale | null;
  if (saved && LOCALES.find(l => l.code === saved)) return saved;
  const lang = navigator.language.split('-')[0];
  const match = LOCALES.find(l => l.code === lang);
  return match ? match.code : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem('ck_locale', l);
  }

  function t(section: string, key: string, vars?: Record<string, string>): string {
    const m = messages[locale] as any;
    let val = m?.[section]?.[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        val = val.replace(`{${k}}`, v);
      });
    }
    return val;
  }

  return <Ctx.Provider value={{ locale, t, setLocale }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
