import { getProjectBySlug, getProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = (await getProjects().catch(() => [])) as any[];
  return projects.map((p: any) => ({ slug: p.slug?.current })).filter(Boolean);
}

import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";

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

  // Combine main image and gallery images for a complete view
  const allImages = project.mainImage 
    ? [project.mainImage, ...(project.images || [])] 
    : (project.images || []);

  const galleryTitles = {
    gallery: t.gallery[lang],
    clickToEnlarge: t.clickToEnlarge[lang],
    close: t.close[lang]
  };

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#bfac8e] mb-10 hover:underline"
        >
          {lang === 'ar' ? '← العودة إلى المشاريع' : lang === 'fr' ? '← Retour aux projets' : '← Back to projects'}
        </Link>

        {/* Title */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.category && (
              <span className="bg-[#bfac8e] text-black text-xs px-4 py-1.5 rounded-full font-medium">
                {project.category}
              </span>
            )}
            {project.year && (
              <span className="border border-black text-xs px-4 py-1.5 rounded-full text-black">
                {project.year}
              </span>
            )}
            {project.client && (
              <span className="text-xs text-black/40">{t.client[lang]}: {project.client}</span>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            {getLocalized(project, "title")}
          </h1>
        </div>

        {/* Description */}
        {getLocalized(project, "description") && (
          <p className="text-lg text-black leading-relaxed mb-10 border-r-4 border-[#bfac8e] pr-6">
            {getLocalized(project, "description")}
          </p>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold mb-5">{t.technologies[lang]}</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="bg-[#bfac8e] px-5 py-2 rounded-full text-sm font-medium text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery - Now includes everything in a premium grid */}
        <ProjectGallery images={allImages} titles={galleryTitles} />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-[#bfac8e]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#bfac8e] text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium"
            >
              🌐 {t.liveDemo[lang]}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-black px-8 py-3 rounded-full hover:bg-[#bfac8e] hover:text-black transition-colors font-medium"
            >
              💻 {t.sourceCode[lang]}
            </a>
          )}
          <Link
            href="/contact"
            className="border-2 border-[#bfac8e] text-[#bfac8e] px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium"
          >
            {t.similarProject[lang]}
          </Link>
        </div>
      </div>
    </div>
  );
}
