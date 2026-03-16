'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Lang = 'ar' | 'fr' | 'en';

const navLinks = [
  { href: '/',         ar: 'الرئيسية', fr: 'Accueil',   en: 'Home'     },
  { href: '/projects', ar: 'المشاريع', fr: 'Projets',   en: 'Projects' },
  { href: '/about',    ar: 'حول',      fr: 'À propos',  en: 'About'    },
  { href: '/contact',  ar: 'تواصل',    fr: 'Contact',   en: 'Contact'  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>('ar');
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fdf8f0]/95 backdrop-blur-sm border-b border-[#f2d9ac]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold tracking-tight">
          Nedjem<span className="text-[#c8883a]">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                isActive(link.href) ? 'text-[#c8883a]' : 'text-[#0a0a0a] hover:text-[#c8883a]'
              }`}
            >
              {link[lang]}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c8883a] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex border border-[#0a0a0a]/20 rounded-full overflow-hidden">
            {(['ar', 'fr', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l
                    ? 'bg-[#0a0a0a] text-[#fdf8f0]'
                    : 'text-[#0a0a0a] hover:bg-[#f2d9ac]'
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
        <div className="md:hidden bg-[#fdf8f0] border-t border-[#f2d9ac] px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium py-2 transition-colors ${
                isActive(link.href) ? 'text-[#c8883a]' : 'text-[#0a0a0a]'
              }`}
            >
              {link[lang]}
            </Link>
          ))}
          <div className="flex border border-[#0a0a0a]/20 rounded-full overflow-hidden w-fit mt-4">
            {(['ar', 'fr', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === l ? 'bg-[#0a0a0a] text-[#fdf8f0]' : 'hover:bg-[#f2d9ac]'
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
