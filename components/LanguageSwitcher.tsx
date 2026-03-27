'use client';
import { motion } from 'framer-motion';
import { IoLanguageOutline } from 'react-icons/io5';

type Lang = 'ar' | 'fr' | 'en';

interface LanguageSwitcherProps {
  currentLang: Lang;
  onLangChange: (lang: Lang) => void;
  className?: string;
}

const languages: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
  { id: 'ar', label: 'العربية' },
];

export default function LanguageSwitcher({ currentLang, onLangChange, className = "" }: LanguageSwitcherProps) {
  return (
    <div className={`flex items-center bg-gray-200/50 backdrop-blur-xl border border-black/5 p-1 rounded-2xl shadow-sm ${className}`}>
      <div className="flex items-center px-2 text-black/40">
        <IoLanguageOutline className="text-sm" />
      </div>
      <div className="flex gap-1">
        {languages.map((l) => (
          <button
            key={l.id}
            onClick={() => onLangChange(l.id)}
            className={`relative px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all duration-500 z-10 rounded-xl ${
              currentLang === l.id ? 'text-black' : 'text-black/40 hover:text-black hover:bg-black/5'
            }`}
          >
            {currentLang === l.id && (
              <motion.div
                layoutId="nav-lang-pill"
                className="absolute inset-0 bg-[#bfac8e] rounded-xl -z-10 shadow-sm"
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
              />
            )}
            {l.id === 'ar' ? 'AR' : l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
