import { getHeroData, getProjects, getAboutData } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const [hero, projects, about] = await Promise.all([
    getHeroData(),
    getProjects(),
    getAboutData(),
  ]).catch(() => [null, [], null]);

  const featured =
    (projects as any[])?.filter((p: any) => p.featured).slice(0, 3) || [];

  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-24">
          <div className="fade-up order-2 md:order-1">
            <span className="inline-block text-xs tracking-widest text-[#c8883a] uppercase mb-4 border border-[#c8883a] px-3 py-1 rounded-full">
              {(hero as any)?.titleAr || "مطور مواقع وتطبيقات ويب وإلكترون"}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              {(hero as any)?.name || "Nedjem Eddine"}
            </h1>
            <p className="text-lg text-[#555] leading-relaxed mb-8 max-w-lg">
              {(hero as any)?.bioAr ||
                "مطور متخصص في بناء مواقع وتطبيقات ويب وتطبيقات سطح المكتب باستخدام Electron، أسعى دائماً لتقديم حلول رقمية بجودة عالية وتجربة مستخدم استثنائية."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-[#0a0a0a] text-[#fdf8f0] px-8 py-3 rounded-full hover:bg-[#c8883a] transition-colors font-medium"
              >
                مشاريعي
              </Link>
              <Link
                href="/contact"
                className="border-2 border-[#0a0a0a] px-8 py-3 rounded-full hover:bg-[#0a0a0a] hover:text-[#fdf8f0] transition-colors font-medium"
              >
                تواصل معي
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            {(hero as any)?.image ? (
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden border-4 border-[#f2d9ac] shadow-2xl">
                <Image
                  src={urlFor((hero as any).image).width(800).url()}
                  alt="Nedjem Eddine"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-[#f2d9ac] to-[#c8883a] flex items-center justify-center border-4 border-[#f2d9ac] shadow-2xl">
                <span className="font-display text-7xl font-bold text-white opacity-60">N</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#0a0a0a] text-[#fdf8f0] py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: (hero as any)?.yearsOfExperience ?? "5+", label: "سنوات خبرة" },
            { value: (hero as any)?.projectsCount ?? "30+",    label: "مشروع منجز" },
            { value: (hero as any)?.clientsCount  ?? "20+",    label: "عميل راضٍ" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl md:text-6xl font-bold text-[#c8883a] mb-2">
                {s.value}
              </div>
              <div className="text-sm text-[#aaa] tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services preview ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl font-bold mb-4 text-center">خدماتي</h2>
          <p className="text-center text-[#666] mb-14">ما الذي يمكنني تقديمه لك؟</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌐",
                title: "مواقع الويب",
                desc: "تصميم وتطوير مواقع احترافية سريعة ومتجاوبة مع جميع الأجهزة.",
              },
              {
                icon: "⚡",
                title: "تطبيقات الويب",
                desc: "بناء تطبيقات ويب تفاعلية معقدة باستخدام أحدث التقنيات.",
              },
              {
                icon: "🖥️",
                title: "تطبيقات Electron",
                desc: "تطوير تطبيقات سطح المكتب متعددة المنصات باستخدام Electron.js.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="bg-[#fdf8f0] rounded-2xl p-8 border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      {featured.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-4 text-center">
              أبرز المشاريع
            </h2>
            <p className="text-center text-[#666] mb-14">نماذج من أحدث أعمالي</p>
            <div className="grid md:grid-cols-3 gap-8">
              {featured.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug?.current}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {project.mainImage ? (
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={urlFor(project.mainImage).width(600).url()}
                        alt={project.titleAr || project.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-52 bg-gradient-to-br from-[#f2d9ac] to-[#c8883a] flex items-center justify-center">
                      <span className="text-5xl">🖥️</span>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs text-[#c8883a] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-2 mb-3">
                      {project.titleAr}
                    </h3>
                    <p className="text-sm text-[#666] line-clamp-2">
                      {project.descriptionAr}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="text-xs bg-[#fdf8f0] border border-[#f2d9ac] px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="border-2 border-[#0a0a0a] px-10 py-3 rounded-full hover:bg-[#0a0a0a] hover:text-[#fdf8f0] transition-colors font-medium"
              >
                عرض جميع المشاريع
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Why Me ── */}
      <section className="bg-[#f2d9ac]/30 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-6">لماذا تختارني؟</h2>
          <p className="text-lg text-[#555] leading-relaxed max-w-2xl mx-auto">
            {(about as any)?.whyMeAr ||
              "أقدم حلولاً رقمية متكاملة تجمع بين الجودة التقنية والتصميم الإبداعي، مع الالتزام بالمواعيد والتواصل المستمر طوال فترة العمل."}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              { icon: "🎯", title: "دقة واحترافية", desc: "كل مشروع يُنجز بأعلى معايير الجودة" },
              { icon: "⏱️", title: "التزام بالمواعيد", desc: "أحترم وقتك وأسلم في الموعد المحدد" },
              { icon: "🔄", title: "تواصل مستمر", desc: "متابعة دورية وتحديثات منتظمة طوال المشروع" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-[#f2d9ac]">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-[#666] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0a0a0a] text-[#fdf8f0] py-24 px-6 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          هل لديك مشروع في ذهنك؟
        </h2>
        <p className="text-[#aaa] mb-10 text-lg max-w-xl mx-auto">
          دعنا نتحدث ونحول فكرتك إلى واقع رقمي احترافي.
        </p>
        <Link
          href="/contact"
          className="bg-[#c8883a] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#b5762e] transition-colors"
        >
          ابدأ مشروعك الآن
        </Link>
      </section>
    </div>
  );
}
