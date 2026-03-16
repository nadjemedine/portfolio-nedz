import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#fdf8f0] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-2xl font-bold mb-4 inline-block">
              Nedjem<span className="text-[#c8883a]">.</span>
            </Link>
            <p className="text-[#888] text-sm leading-relaxed mt-3">
              مطور مواقع وتطبيقات ويب وإلكترون، أسعى لبناء حلول رقمية احترافية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-[#aaa]">الصفحات</h4>
            <ul className="space-y-2">
              {[
                { href: '/',         label: 'الرئيسية' },
                { href: '/projects', label: 'المشاريع' },
                { href: '/about',    label: 'حول'      },
                { href: '/contact',  label: 'تواصل'    },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#888] hover:text-[#c8883a] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-widest uppercase text-[#aaa]">التقنيات</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Electron', 'Sanity CMS', 'Tailwind'].map((tech) => (
                <span key={tech} className="text-xs border border-[#333] text-[#888] px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666] text-sm">
            © {new Date().getFullYear()} Nedjem Eddine. جميع الحقوق محفوظة.
          </p>
          <Link
            href="/studio"
            className="text-xs text-[#555] hover:text-[#c8883a] transition-colors"
          >
            لوحة التحكم ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
