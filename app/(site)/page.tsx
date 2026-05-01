import { getHeroData, getProjects, getAboutData } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import StaggeredText from "@/components/StaggeredText";
import ProjectCard from "@/components/ProjectCard";
import TechMarquee from "@/components/TechMarquee";

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
          <div className="order-2 md:order-1 flex flex-col items-start gap-4">
            <Reveal type="slideDown" delay={0.1}>
              <span className="inline-block text-xs font-bold tracking-widest text-black bg-[#bfac8e] uppercase mb-2 px-6 py-2 rounded-full shadow-lg">
                {getLocalized(hero, "title") || t.developer[lang]}
              </span>
            </Reveal>

            <Reveal type="skew" delay={0.3}>
              <h1 className="font-display text-6xl md:text-8xl font-black leading-tight text-white mb-4">
                {(hero as any)?.name || "Dev Online"}
              </h1>
            </Reveal>

            <Reveal type="blur" delay={0.5}>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mb-8 font-medium">
                {getLocalized(hero, "bio") || t.bioFallback[lang]}
              </p>
            </Reveal>

            <div className="flex flex-wrap gap-4">
              <Reveal type="bounce" delay={0.7}>
                <Link
                  href="/projects"
                  className="bg-[#bfac8e] text-black px-10 py-4 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all font-black"
                >
                  {lang === 'ar' ? 'مشاريعنا' : lang === 'fr' ? 'Nos Projets' : 'Our Projects'}
                </Link>
              </Reveal>
              <Reveal type="bounce" delay={0.8}>
                <Link
                  href="/contact"
                  className="border-2 border-white/20 text-white px-10 py-4 rounded-full hover:border-[#bfac8e] hover:bg-[#bfac8e]/10 hover:scale-105 active:scale-95 transition-all font-black"
                >
                  {lang === 'ar' ? 'تواصل معنا' : lang === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                </Link>
              </Reveal>
            </div>
          </div>

          <Reveal type="blur" delay={0.2} className="order-1 md:order-2 flex justify-center">
            {(hero as any)?.image ? (
              <div className="relative w-full max-w-3xl h-auto aspect-square md:aspect-video rounded-3xl overflow-hidden border-4 border-black/10 shadow-2xl">
                <Image
                  src={urlFor((hero as any).image).width(1000).url()}
                  alt="Developpement Online"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-full max-w-3xl h-auto aspect-square md:aspect-video rounded-3xl bg-white flex items-center justify-center border-4 border-black/10 shadow-2xl">
                <span className="font-display text-7xl font-bold text-black opacity-10">D</span>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── Tech Marquee ── */}
      <TechMarquee />

      {/* ── Stats ── */}
      <section className="text-white py-20 px-6 border-y border-white/5">
        <Reveal type="fade">
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
                <div className="text-sm text-white/60 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Services preview ── */}
      <section className="py-24 px-6">
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
                      className="bg-[#bfac8e] rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                      <div className="text-4xl mb-5">🌐</div>
                      <h3 className="font-display text-xl font-bold mb-3 text-black">
                        {getLocalized(s, "title")}
                      </h3>
                      <p className="text-black/80 text-sm leading-relaxed font-medium">
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
                    type="zoom"
                    delay={i * 0.1}
                    key={s.title}
                    className="bg-[#bfac8e] rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-5">{s.icon}</div>
                    <h3 className="font-display text-xl font-bold mb-3 text-black">{s.title}</h3>
                    <p className="text-black/80 text-sm leading-relaxed font-medium">{s.desc}</p>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {featured.map((project: any, i: number) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={i}
                    lang={lang}
                    t={t}
                    categories={[]} // passing empty array as category labels are not needed here if not used
                    isMobileStack={true}
                  />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="border-2 border-white text-white px-10 py-3 rounded-full hover:bg-white hover:text-black transition-colors font-medium"
                >
                  {t.viewAllProjects[lang]}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── Why Me ── */}
      <section className="py-24 px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold mb-6">{t.whyChooseMe[lang]}</h2>
            <p className="text-lg text-white leading-relaxed max-w-2xl mx-auto">
              {getLocalized(about, "whyMe") || t.whyMeFallback[lang]}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-14">
              {[
                { icon: "🎯", title: t.qualityTitle[lang], desc: t.qualityDesc[lang] },
                { icon: "⏱️", title: t.deadlineTitle[lang], desc: t.deadlineDesc[lang] },
                { icon: "🔄", title: t.communicationTitle[lang], desc: t.communicationDesc[lang] },
              ].map((item, i) => (
                <Reveal type="zoom" delay={i * 0.1} key={item.title} className="bg-[#bfac8e] rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-black">{item.title}</h3>
                  <p className="text-black/80 font-medium text-sm">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="text-white py-24 px-6 text-center border-t border-white/5">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            {t.haveProjectInMind[lang]}
          </h2>
          <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto">
            {t.translateIdea[lang]}
          </p>
          <Link
            href="/contact"
            className="bg-[#bfac8e] text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-colors"
          >
            {t.startProjectNow[lang]}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
