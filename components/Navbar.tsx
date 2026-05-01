'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

type Lang = 'ar' | 'fr' | 'en';

const navLinks = [
  { href: '/',         ar: 'الرئيسية', fr: 'Accueil',   en: 'Home'     },
  { href: '/projects', ar: 'مشاريعنا', fr: 'Nos Projets',   en: 'Our Projects' },
  { href: '/resume',   ar: 'السيرة الذاتية', fr: 'Resume',    en: 'Resume'   },
  { href: '/about',    ar: 'حولنا',      fr: 'À notre sujet',  en: 'About Us'    },
  { href: '/contact',  ar: 'تواصل معنا',    fr: 'Contactez-nous',   en: 'Contact Us'  },
];

export default function Navbar({ initialLang = 'ar', logoUrl, hideResume }: { initialLang?: string, logoUrl: string, hideResume?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang as Lang);

  const filteredLinks = hideResume 
    ? navLinks.filter(link => link.href !== '/resume')
    : navLinks;

  const setLang = (l: Lang) => {
    setLangState(l);
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
    router.refresh();
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center w-[150px] md:w-[180px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Developpement Online" className="w-full h-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group py-2 ${
                isActive(link.href) ? 'text-[#bfac8e]' : 'text-[#bfac8e] hover:text-white'
              }`}
            >
              {link[lang]}
              {isActive(link.href) && (
                <motion.span 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#bfac8e] rounded-full" 
                />
              )}
            </Link>
          ))}
        </div>

        {/* Language Switcher (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher currentLang={lang} onLangChange={setLang} />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher (Now next to Menu) */}
          <div className="md:hidden">
            <LanguageSwitcher currentLang={lang} onLangChange={setLang} />
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-[#bfac8e] text-xl p-2 h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#3a3d35] border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {filteredLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.href}
                >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block text-lg font-medium py-2 transition-colors ${
                        isActive(link.href) ? 'text-[#bfac8e]' : 'text-[#bfac8e]'
                      }`}
                    >
                    {link[lang]}
                  </Link>
                </motion.div>
              ))}
              {/* Old language switcher removed from mobile menu */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
