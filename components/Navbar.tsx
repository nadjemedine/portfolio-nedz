'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Lang = 'ar' | 'fr' | 'en';

const navLinks = [
  { href: '/',         ar: 'الرئيسية', fr: 'Accueil',   en: 'Home'     },
  { href: '/projects', ar: 'المشاريع', fr: 'Projets',   en: 'Projects' },
  { href: '/about',    ar: 'حول',      fr: 'À propos',  en: 'About'    },
  { href: '/contact',  ar: 'تواصل',    fr: 'Contact',   en: 'Contact'  },
];

export default function Navbar({ initialLang = 'ar', logoUrl }: { initialLang?: string, logoUrl: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang as Lang);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
    router.refresh();
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-[#bfac8e]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center w-[100px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Nedjem Eddine" className="w-full h-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                isActive(link.href) ? 'text-[#bfac8e]' : 'text-black hover:text-[#bfac8e]'
              }`}
            >
              {link[lang]}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#bfac8e] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex border border-black/20 rounded-full overflow-hidden">
            {(['ar', 'fr', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l
                    ? 'bg-[#bfac8e] text-black'
                    : 'text-black hover:bg-[#bfac8e]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Burger */}
        <button
          className="md:hidden text-xl p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#bfac8e] px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium py-2 transition-colors ${
                isActive(link.href) ? 'text-[#bfac8e]' : 'text-black'
              }`}
            >
              {link[lang]}
            </Link>
          ))}
          <div className="flex border border-black/20 rounded-full overflow-hidden w-fit mt-4">
            {(['ar', 'fr', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l ? 'bg-[#bfac8e] text-black' : 'hover:bg-[#bfac8e]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
