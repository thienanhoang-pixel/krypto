'use client'
// components/layout/LangProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { Lang, BROWSER_LANG_MAP, TRANSLATIONS } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const Ctx = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    // 1. Check localStorage (user previously set preference)
    const saved = localStorage.getItem('ck_lang') as Lang | null
    if (saved && TRANSLATIONS[saved]) {
      setLangState(saved)
      return
    }
    // 2. Auto-detect from browser language
    const bl = navigator.language.toLowerCase().split('-')[0]
    const detected = BROWSER_LANG_MAP[bl]
    if (detected) setLangState(detected)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('ck_lang', l)
  }

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let s = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        s = s.replace(`{${k}}`, String(v))
      })
    }
    return s
  }

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
