import { getProjectBySlug, getProjects } from "@/lib/queries";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import Link from "next/link";
import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";
import { RevealAnimation } from "@/components/RevealAnimation";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = (await getProjects().catch(() => [])) as any[];
  return projects.map((p: any) => ({ slug: p.slug?.current })).filter(Boolean);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const project = (await getProjectBySlug(params.slug).catch(() => null)) as any;
  if (!project) notFound();

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  const allImages = project.mainImage 
    ? [project.mainImage, ...(project.images || [])] 
    : (project.images || []);

  const galleryTitles = {
    gallery: t.gallery[lang],
    clickToEnlarge: t.clickToEnlarge[lang],
    close: t.close[lang]
  };

  const animationType = project.animationType || 'slideUp';
  const displayMode = project.displayMode || 'snap';

  return (
    <div className="pt-28 pb-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <RevealAnimation type="fade">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#bfac8e] mb-10 hover:underline font-bold"
          >
            {lang === 'ar' ? '← العودة إلى المشاريع' : lang === 'fr' ? '← Retour aux projets' : '← Back to projects'}
          </Link>
        </RevealAnimation>

        {/* Title Section */}
        <RevealAnimation type={animationType}>
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {project.category && (
                <span className="bg-black text-[#bfac8e] text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-xl">
                  {project.category}
                </span>
              )}
              {project.year && (
                <span className="border border-black/10 text-xs px-4 py-1.5 rounded-full text-black font-bold">
                  {project.year}
                </span>
              )}
              {project.client && (
                <span className="text-[10px] text-black/40 font-bold uppercase tracking-wider">{t.client[lang]}: {project.client}</span>
              )}
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] mb-8 text-black">
              {getLocalized(project, "title")}
            </h1>
          </div>
        </RevealAnimation>

        {/* Description */}
        <RevealAnimation type={animationType} delay={0.2}>
          {getLocalized(project, "description") && (
            <div className="text-xl md:text-2xl text-black leading-tight mb-20 flex gap-6">
              <div className="w-1.5 bg-[#bfac8e] shrink-0 rounded-full" />
              <p className="italic font-medium">
                {getLocalized(project, "description")}
              </p>
            </div>
          )}
        </RevealAnimation>

        {/* Technologies */}
        <RevealAnimation type="fade" delay={0.3}>
          {project.technologies?.length > 0 && (
            <div className="mb-20">
              <h3 className="font-display text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-black/20">{t.technologies[lang]}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="bg-[#bfac8e]/10 border border-[#bfac8e]/30 px-6 py-2 rounded-full text-xs font-bold text-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </RevealAnimation>

        {/* Gallery */}
        <RevealAnimation type={animationType} delay={0.4}>
          <div className="mb-24">
             <ProjectGallery images={allImages} translations={galleryTitles} displayMode={displayMode} />
          </div>
        </RevealAnimation>

        {/* Action Buttons */}
        <RevealAnimation type="slideUp" delay={0.5}>
          <div className="flex flex-wrap gap-4 pt-12 border-t border-[#bfac8e]/20">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-10 py-5 rounded-[2rem] hover:bg-[#bfac8e] hover:text-black transition-all font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95"
              >
                🌐 {t.liveDemo[lang]}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-black px-10 py-5 rounded-[2rem] hover:bg-[#bfac8e] hover:border-[#bfac8e] hover:text-black transition-all font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95"
              >
                💻 {t.sourceCode[lang]}
              </a>
            )}
            <Link
              href="/contact"
              className="bg-[#bfac8e]/10 text-black px-10 py-5 rounded-[2rem] hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 text-center min-w-[200px]"
            >
              {t.similarProject[lang]}
            </Link>
          </div>
        </RevealAnimation>
      </div>
    </div>
  );
}
