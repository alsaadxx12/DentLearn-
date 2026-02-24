import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('dentlearn-lang') || 'ar';
    });

    useEffect(() => {
        localStorage.setItem('dentlearn-lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    const toggleLanguage = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
    const t = (key) => translations[lang]?.[key] || translations['ar']?.[key] || key;
    const isRTL = lang === 'ar';

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
