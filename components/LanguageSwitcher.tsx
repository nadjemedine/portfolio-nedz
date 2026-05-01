'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLanguageOutline, IoChevronDownOutline } from 'react-icons/io5';

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
  const [isOpen, setIsOpen] = useState(false);
  
  const getCurrentLabel = () => {
    const langObj = languages.find(l => l.id === currentLang);
    return langObj ? (currentLang === 'ar' ? 'AR' : langObj.label) : 'EN';
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/5 rounded-2xl shadow-sm text-[#bfac8e] hover:bg-white/20 transition-colors"
      >
        <IoLanguageOutline className="text-sm" />
        <span className="font-medium">{getCurrentLabel()}</span>
        <IoChevronDownOutline className={`text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-32 bg-white/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden z-50"
          >
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  onLangChange(l.id);
                  setIsOpen(false);
                }}
                className={`w-full text-right px-4 py-3 text-sm font-medium transition-colors ${
                  currentLang === l.id 
                    ? 'bg-[#bfac8e] text-black' 
                    : 'text-[#bfac8e] hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="font-bold">{l.id === 'ar' ? 'AR' : l.label}</span>
                {currentLang === l.id && (
                  <span className="ml-2 text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
