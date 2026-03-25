import { getResumeData } from "@/lib/queries";
import { dictionary } from "@/lib/dictionary";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";

export const revalidate = 60;

export default async function ResumePage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const resume = (await getResumeData().catch(() => null)) as any;

  if (resume?.hidden) {
    return notFound();
  }

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  const title = getLocalized(resume, "title");
  const summary = getLocalized(resume, "summary");

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
              {t.resumeTitle[lang]}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-black/60 text-lg">
              {t.resumeSubtitle[lang]}
            </p>
          </Reveal>
          
          {resume?.resumeFileUrl && (
            <Reveal delay={0.2}>
              <div className="mt-8">
                <a
                  href={resume.resumeFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-black/80 transition-all shadow-xl hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {t.downloadResume[lang]}
                </a>
              </div>
            </Reveal>
          )}
        </div>

        <div className="grid gap-12">
          {/* Summary Section */}
          {summary && (
            <Reveal>
              <section className="bg-[#bfac8e]/10 border border-[#bfac8e]/20 rounded-3xl p-8 md:p-12">
                <h2 className="font-display text-2xl font-bold mb-6 border-b border-[#bfac8e]/30 pb-4">
                  {lang === 'ar' ? 'نبذة مهنية' : lang === 'fr' ? 'Résumé Professionnel' : 'Professional Summary'}
                </h2>
                <div className="text-black/80 leading-relaxed text-lg whitespace-pre-line">
                  {summary}
                </div>
              </section>
            </Reveal>
          )}

          {/* Experience Section */}
          {resume?.experiences?.length > 0 && (
            <Reveal delay={0.1}>
              <section>
                <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm">01</span>
                  {t.experience[lang]}
                </h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-black/10 before:to-transparent">
                  {resume.experiences.map((exp: any, i: number) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-black text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <svg className="fill-current" viewBox="0 0 12 12" width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V1Z" />
                        </svg>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-[#bfac8e]/30 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                          <time className="font-display font-bold text-xs text-[#bfac8e]">
                            {exp.startDate} — {exp.endDate || (lang === 'ar' ? 'الحاضر' : lang === 'fr' ? 'Présent' : 'Present')}
                          </time>
                        </div>
                        <div className="text-xl font-bold text-black mb-1">{getLocalized(exp, "role")}</div>
                        <div className="text-black/60 font-medium mb-4">{exp.company}</div>
                        <div className="text-black/70 text-sm leading-relaxed">
                          {getLocalized(exp, "description")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Education Section */}
          {resume?.education?.length > 0 && (
            <Reveal delay={0.2}>
              <section>
                <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm">02</span>
                  {t.education[lang]}
                </h2>
                <div className="grid gap-6">
                  {resume.education.map((edu: any, i: number) => (
                    <div key={i} className="flex gap-6 p-6 rounded-2xl border border-[#bfac8e]/30 bg-white group hover:border-[#bfac8e] transition-colors">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-xl text-black leading-tight">
                            {getLocalized(edu, "degree")}
                          </h3>
                          <span className="text-sm font-display font-bold text-[#bfac8e] shrink-0">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-black/60">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          {/* Skills Section */}
          {resume?.skills?.length > 0 && (
            <Reveal delay={0.3}>
              <section>
                <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm">03</span>
                  {t.technologies[lang]}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resume.skills.map((group: any) => (
                    <div key={group.category} className="p-6 rounded-3xl bg-black text-white">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#bfac8e] mb-4">
                        {group.category}
                      </h3>
                      <ul className="space-y-2">
                        {group.items?.map((item: string) => (
                          <li key={item} className="flex items-center gap-2 text-sm font-medium opacity-80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#bfac8e]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          )}
        </div>

        {/* Footer info */}
        {resume?.lastUpdated && (
          <div className="mt-24 text-center text-black/40 text-xs">
            {lang === 'ar' ? 'آخر تحديث:' : lang === 'fr' ? 'Dernière mise à jour :' : 'Last updated:'} {resume.lastUpdated}
          </div>
        )}
      </div>
    </div>
  );
}
