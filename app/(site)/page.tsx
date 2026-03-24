import { getHeroData, getProjects, getAboutData } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const revalidate = 60;

import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";

export default async function HomePage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const [hero, projects, about] = await Promise.all([
    getHeroData(),
    getProjects(),
    getAboutData(),
  ]).catch(() => [null, [], null]);

  const featured =
    (projects as any[])?.filter((p: any) => p.featured).slice(0, 3) || [];

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-24">
          <Reveal className="order-2 md:order-1">
            <span className="inline-block text-xs tracking-widest text-[#bfac8e] uppercase mb-4 border border-[#bfac8e] px-3 py-1 rounded-full">
              {getLocalized(hero, "title") || t.developer[lang]}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              {(hero as any)?.name || "Nedjem Eddine"}
            </h1>
            <p className="text-lg text-black leading-relaxed mb-8 max-w-lg">
              {getLocalized(hero, "bio") || t.bioFallback[lang]}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="bg-[#bfac8e] text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium"
              >
                {t.myProjects[lang]}
              </Link>
              <Link
                href="/contact"
                className="border-2 border-black px-8 py-3 rounded-full hover:bg-[#bfac8e] hover:text-black transition-colors font-medium"
              >
                {t.contactMe[lang]}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="order-1 md:order-2 flex justify-center">
            {(hero as any)?.image ? (
              <div className="relative w-72 h-[450px] md:w-[400px] md:h-[550px] rounded-3xl overflow-hidden border-4 border-[#bfac8e] shadow-2xl">
                <Image
                  src={urlFor((hero as any).image).width(1000).url()}
                  alt="Nedjem Eddine"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-72 h-[450px] md:w-[400px] md:h-[550px] rounded-3xl bg-gradient-to-br from-[#bfac8e] to-[#bfac8e]/80 flex items-center justify-center border-4 border-[#bfac8e] shadow-2xl">
                <span className="font-display text-7xl font-bold text-white opacity-60">N</span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white text-black py-20 px-6 border-y border-gray-100">
        <Reveal>
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
            {[
              { value: (hero as any)?.yearsOfExperience ? `+${(hero as any).yearsOfExperience}` : "+5", label: t.experienceYears[lang] },
              { value: (hero as any)?.projectsCount ? `+${(hero as any).projectsCount}` : "+7",     label: t.projectsDone[lang] },
              { value: (hero as any)?.clientsCount  ? `+${(hero as any).clientsCount}` : "+7",      label: t.happyClients[lang] },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-5xl md:text-6xl font-bold text-[#bfac8e] mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-black/60 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Services preview ── */}
      <section className="py-24 px-6 bg-white">
        <Reveal>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl font-bold mb-4 text-center">{t.servicesTitle[lang]}</h2>
            <p className="text-center text-[#666] mb-14">{t.servicesSubtitle[lang]}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {(about as any)?.services?.length > 0 ? (
                (about as any).services.slice(0, 3).map((s: any, i: number) => (
                  <Reveal
                    delay={i * 0.1}
                    key={s.titleAr}
                    className="bg-[#bfac8e] rounded-2xl p-8 border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-5">🌐</div>
                    <h3 className="font-display text-xl font-semibold mb-3 text-black">
                      {getLocalized(s, "title")}
                    </h3>
                    <p className="text-black/80 text-sm leading-relaxed">
                      {getLocalized(s, "description")}
                    </p>
                  </Reveal>
                ))
              ) : (
                [
                  {
                    icon: "🌐",
                    title: t.websites[lang],
                    desc: lang === 'ar' ? "تصميم وتطوير مواقع احترافية سريعة ومتجاوبة مع جميع الأجهزة." : lang === 'fr' ? "Conception et développement de sites professionnels rapides et réactifs sur tous les appareils." : "Design and development of fast and responsive professional websites on all devices.",
                  },
                  {
                    icon: "⚡",
                    title: t.webapps[lang],
                    desc: lang === 'ar' ? "بناء تطبيقات ويب تفاعلية باستخدام أحدث التقنيات." : lang === 'fr' ? "Construction d'applications web interactives avec les dernières technologies." : "Building interactive web apps with the latest technologies.",
                  },
                  {
                    icon: "📱",
                    title: t.mobile[lang],
                    desc: lang === 'ar' ? "تطوير تطبيقات الهواتف الذكية بواجهات جذابة وتجربة مستخدم ممتازة." : lang === 'fr' ? "Développement d'applications mobiles avec des interfaces attrayantes et une excellente expérience utilisateur." : "Development of mobile apps with attractive interfaces and excellent user experience.",
                  },
                ].map((s, i) => (
                  <Reveal
                    delay={i * 0.1}
                    key={s.title}
                    className="bg-[#bfac8e] rounded-2xl p-8 border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-5">{s.icon}</div>
                    <h3 className="font-display text-xl font-semibold mb-3 text-black">{s.title}</h3>
                    <p className="text-black/80 text-sm leading-relaxed">{s.desc}</p>
                  </Reveal>
                ))
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Featured Projects ── */}
      {featured.length > 0 && (
        <section className="py-24 px-6">
          <Reveal>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-4xl font-bold mb-4 text-center">
                {t.featuredProjectsTitle[lang]}
              </h2>
              <p className="text-center text-[#666] mb-14">{t.featuredProjectsSubtitle[lang]}</p>
              <div className="grid md:grid-cols-3 gap-8">
                {featured.map((project: any, i: number) => (
                  <Reveal delay={i * 0.1} key={project._id}>
                    <Link
                      href={`/projects/${project.slug?.current}`}
                      className="group block bg-[#bfac8e] rounded-2xl overflow-hidden border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                      {project.mainImage ? (
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={urlFor(project.mainImage).width(600).url()}
                            alt={getLocalized(project, "title")}
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
                        <span className="text-xs text-black uppercase tracking-wider font-semibold">
                          {project.category}
                        </span>
                        <h3 className="font-display text-xl font-semibold mt-2 mb-3 text-black">
                          {getLocalized(project, "title")}
                        </h3>
                        <p className="text-sm text-black/80 line-clamp-2">
                          {getLocalized(project, "description")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies?.slice(0, 3).map((tech: string) => (
                            <span
                              key={tech}
                              className="text-xs bg-white/20 border border-black/10 px-2 py-1 rounded-full text-black"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="border-2 border-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium"
                >
                  {t.viewAllProjects[lang]}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Why Me ── */}
      <section className="bg-white py-24 px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold mb-6">{t.whyChooseMe[lang]}</h2>
            <p className="text-lg text-black leading-relaxed max-w-2xl mx-auto">
              {getLocalized(about, "whyMe") || t.whyMeFallback[lang]}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-14">
              {[
                { icon: "🎯", title: t.qualityTitle[lang], desc: t.qualityDesc[lang] },
                { icon: "⏱️", title: t.deadlineTitle[lang], desc: t.deadlineDesc[lang] },
                { icon: "🔄", title: t.communicationTitle[lang], desc: t.communicationDesc[lang] },
              ].map((item, i) => (
                <Reveal delay={i * 0.1} key={item.title} className="bg-[#bfac8e] rounded-2xl p-8 border border-[#bfac8e]">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-black">{item.title}</h3>
                  <p className="text-black/80 text-sm">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white text-black py-24 px-6 text-center border-t border-gray-100">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            {t.haveProjectInMind[lang]}
          </h2>
          <p className="text-black/60 mb-10 text-lg max-w-xl mx-auto">
            {t.translateIdea[lang]}
          </p>
          <Link
            href="/contact"
            className="bg-[#bfac8e] text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-colors"
          >
            {t.startProjectNow[lang]}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
