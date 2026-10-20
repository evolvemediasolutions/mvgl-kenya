import { createContext, useContext, useEffect, type ReactNode } from 'react'
import translationsData from '../data/translations.json'

export type Locale = 'en'

interface LanguageContextType {
  locale: Locale
  dir: 'ltr'
  setLocale: (locale: Locale) => void
  t: (key: string, defaultValue?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<string, Record<string, string>> = translationsData

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale: Locale = 'en'
  const dir = 'ltr'

  const setLocale = (_newLocale: Locale) => {
    // English-only Kenya website
  }

  // Ensure document lang and dir attributes are clean English LTR
  useEffect(() => {
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    document.body.style.fontFamily = '"Inter", system-ui, sans-serif'
    
    // Clean up any residual Arabic locale key from localStorage
    try {
      localStorage.removeItem('3t_locale')
    } catch {
      // Ignore if localStorage is restricted
    }
  }, [])

  const t = (key: string, defaultValue?: string): string => {
    const dict = translations['en'] || {}
    return dict[key] || defaultValue || key
  }

  return (
    <LanguageContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
