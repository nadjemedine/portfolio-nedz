import { getAboutData } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

export const revalidate = 60;

import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";

export default async function AboutPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const about = (await getAboutData().catch(() => null)) as any;

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">{t.aboutHeaderTitle[lang]}</h1>
          <p className="text-black/60 text-lg">{t.servicesSubtitle[lang]}</p>
        </div>

        {/* Bio + Photo */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex justify-center order-1 md:order-2">
            {about?.image ? (
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border-4 border-[#bfac8e] shadow-2xl">
                <Image
                  src={urlFor(about.image).width(800).url()}
                  alt="Dev Online"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-72 h-80 rounded-3xl bg-gradient-to-br from-[#bfac8e] to-[#bfac8e]/80 flex items-center justify-center border-4 border-[#bfac8e] shadow-2xl">
                <span className="font-display text-8xl font-bold text-white opacity-60"> Dev Online </span>
              </div>
            )}
          </div>
          <div className="order-2 md:order-1">
            <h2 className="font-display text-3xl font-bold mb-6">{t.helloIAm[lang]}</h2>
            <p className="text-black leading-relaxed text-base mb-6">
              {getLocalized(about, "whyMe") || t.whyMeFallback[lang]}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.location[lang], value: t.algeria[lang] },
                { label: t.specialization[lang], value: "Full Stack Developer" },
                { label: t.languages[lang], value: `${t.arabic[lang]}, ${t.french[lang]}, ${t.english[lang]}` },
                { label: t.availableForNewProjects[lang], value: "✓" },
              ].map((item) => (
                <div key={item.label} className="bg-[#bfac8e] border border-[#bfac8e] rounded-xl p-4">
                  <div className="text-xs text-black/60 font-medium mb-1">{item.label}</div>
                  <div className="text-sm font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        {about?.services?.length > 0 && (
          <div className="mb-24">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">{t.servicesTitle[lang]}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {about.services.map((service: any, i: number) => (
                <div
                  key={i}
                  className="bg-[#bfac8e] rounded-2xl p-8 border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <h3 className="font-display text-xl font-semibold mb-4 text-black">
                    {getLocalized(service, "title")}
                  </h3>
                  <p className="text-black/80 text-sm leading-relaxed">
                    {getLocalized(service, "description")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="mb-24">
          <h2 className="font-display text-4xl font-bold mb-12 text-center">{t.technologies[lang]}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(about?.skills?.length > 0 ? about.skills : [
              {
                category: "Frontend",
                items: ["React.js", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
              },
              {
                category: "Backend",
                items: ["Node.js", "Express", "NestJS", "REST API", "GraphQL"],
              },
              {
                category: "Desktop & Tools",
                items: ["Sanity CMS", "MongoDB", "PostgreSQL", "Git"],
              },
            ]).map((group: any) => (
              <div key={group.category} className="bg-[#bfac8e] rounded-2xl p-6 border border-[#bfac8e]">
                <h3 className="font-semibold text-black mb-5 pb-3 border-b border-black/10">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items?.map((item: string) => (
                    <span key={item} className="text-sm bg-white/20 border border-black/10 px-3 py-1 rounded-full text-black">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        {about?.experiences?.length > 0 && (
          <div className="mb-24">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">{t.experience[lang]}</h2>
            <div className="space-y-6">
              {about.experiences.map((exp: any, i: number) => (
                <div
                  key={i}
                  className="bg-[#bfac8e] rounded-2xl p-8 border border-[#bfac8e] border-r-4 border-r-black"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h3 className="font-display text-xl font-semibold text-black">
                      {getLocalized(exp, "role")}
                    </h3>
                    <span className="text-xs text-black/60 bg-white/20 border border-black/10 px-3 py-1 rounded-full">
                      {exp.startDate} — {exp.endDate || (lang === 'ar' ? 'الحاضر' : lang === 'fr' ? 'Présent' : 'Present')}
                    </span>
                  </div>
                  <p className="text-black font-bold mb-3">{exp.company}</p>
                  {getLocalized(exp, "description") && (
                    <p className="text-black/80 text-sm leading-relaxed">
                      {getLocalized(exp, "description")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {about?.education?.length > 0 && (
          <div>
            <h2 className="font-display text-4xl font-bold mb-12 text-center">{t.education[lang]}</h2>
            <div className="space-y-4">
              {about.education.map((edu: any, i: number) => (
                <div key={i} className="bg-[#bfac8e] rounded-2xl p-6 border border-[#bfac8e] flex justify-between items-center text-black">
                  <div>
                    <h3 className="font-semibold text-black">{getLocalized(edu, "degree")}</h3>
                    <p className="text-black/60 text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-black font-semibold">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
