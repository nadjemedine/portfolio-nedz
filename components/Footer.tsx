import Link from 'next/link';
import Image from 'next/image';
import { dictionary } from '@/lib/dictionary';

export default function Footer({ lang = 'ar', logoUrl }: { lang?: 'ar' | 'en' | 'fr', logoUrl: string }) {
  const t = dictionary;

  return (
    <footer className="bg-white text-black py-16 px-6 border-t border-black/10 font-bold">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="relative flex items-center w-[100px] mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Developpement Online" className="w-full h-auto object-contain object-right" />
            </Link>
            <p className="text-black text-sm leading-relaxed mt-3 font-bold">
              {t.developer[lang]}, {t.bioFallback[lang]}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-black font-bold">{t.pages[lang]}</h4>
            <ul className="space-y-2">
              {[
                { href: '/',         label: t.home[lang] },
                { href: '/projects', label: t.projects[lang] },
                { href: '/about',    label: t.about[lang]      },
                { href: '/contact',  label: t.contact[lang]    },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-black hover:text-[#bfac8e] transition-colors text-sm font-bold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-black font-bold">{t.technologies[lang]}</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Sanity CMS', 'Tailwind'].map((tech) => (
                <span key={tech} className="text-xs border border-black/10 text-black px-2 py-1 rounded-full font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex justify-center text-center">
          <p className="text-black text-sm font-bold">
            © {new Date().getFullYear()} Developpement Online. {t.rights[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
