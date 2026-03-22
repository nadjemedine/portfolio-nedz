import Link from 'next/link';
import Image from 'next/image';
import { dictionary } from '@/lib/dictionary';

export default function Footer({ lang = 'ar', logoUrl }: { lang?: 'ar' | 'en' | 'fr', logoUrl: string }) {
  const t = dictionary;

  return (
    <footer className="bg-white text-black py-16 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="relative flex items-center w-[100px] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Nedjem Eddine" className="w-full h-auto object-contain object-right" />
            </Link>
            <p className="text-black/60 text-sm leading-relaxed mt-3">
              {t.developer[lang]}, {t.bioFallback[lang]}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-black/40">{t.pages[lang]}</h4>
            <ul className="space-y-2">
              {[
                { href: '/',         label: t.home[lang] },
                { href: '/projects', label: t.projects[lang] },
                { href: '/about',    label: t.about[lang]      },
                { href: '/contact',  label: t.contact[lang]    },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-black/60 hover:text-[#bfac8e] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-black/40">{t.technologies[lang]}</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Sanity CMS', 'Tailwind'].map((tech) => (
                <span key={tech} className="text-xs border border-gray-200 text-black/60 px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex justify-center text-center">
          <p className="text-black/40 text-sm">
            © {new Date().getFullYear()} Nedjem Eddine. {t.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
