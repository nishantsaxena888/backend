import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../mock/data';

interface LanguageContextType {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('pos-language');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return LANGUAGES.find(l => l.code === parsed.code) || LANGUAGES[0];
            } catch {
                return LANGUAGES[0];
            }
        }
        return LANGUAGES[0];
    });

    const setLanguage = (lang: Language) => {
        setCurrentLanguage(lang);
        localStorage.setItem('pos-language', JSON.stringify(lang));
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
