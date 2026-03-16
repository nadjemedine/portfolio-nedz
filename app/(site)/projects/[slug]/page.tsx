import { getProjectBySlug, getProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  const project = (await getProjectBySlug(params.slug).catch(() => null)) as any;
  if (!project) notFound();

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#c8883a] mb-10 hover:underline"
        >
          ← العودة إلى المشاريع
        </Link>

        {/* Title */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.category && (
              <span className="bg-[#0a0a0a] text-[#fdf8f0] text-xs px-4 py-1.5 rounded-full font-medium">
                {project.category}
              </span>
            )}
            {project.year && (
              <span className="border border-[#0a0a0a] text-xs px-4 py-1.5 rounded-full">
                {project.year}
              </span>
            )}
            {project.client && (
              <span className="text-xs text-[#999]">العميل: {project.client}</span>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            {project.titleAr}
          </h1>
        </div>

        {/* Main Image */}
        {project.mainImage && (
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden mb-12 border border-[#f2d9ac] shadow-lg">
            <Image
              src={urlFor(project.mainImage).width(1200).url()}
              alt={project.titleAr || project.titleEn || ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        {project.descriptionAr && (
          <p className="text-lg text-[#555] leading-relaxed mb-10 border-r-4 border-[#c8883a] pr-6">
            {project.descriptionAr}
          </p>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold mb-5">التقنيات المستخدمة</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="bg-[#f2d9ac] px-5 py-2 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.images?.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl font-semibold mb-6">معرض الصور</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.images.map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative h-56 md:h-72 rounded-xl overflow-hidden border border-[#f2d9ac] hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={urlFor(img).width(800).url()}
                    alt={`لقطة شاشة ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-[#f2d9ac]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0a0a0a] text-[#fdf8f0] px-8 py-3 rounded-full hover:bg-[#c8883a] transition-colors font-medium"
            >
              🌐 عرض المشروع المباشر
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#0a0a0a] px-8 py-3 rounded-full hover:bg-[#0a0a0a] hover:text-[#fdf8f0] transition-colors font-medium"
            >
              💻 الكود على GitHub
            </a>
          )}
          <Link
            href="/contact"
            className="border-2 border-[#c8883a] text-[#c8883a] px-8 py-3 rounded-full hover:bg-[#c8883a] hover:text-white transition-colors font-medium"
          >
            طلب مشروع مماثل
          </Link>
        </div>
      </div>
    </div>
  );
}
