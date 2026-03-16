import { getProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = (await getProjects().catch(() => [])) as any[];

  const categories = [
    { value: "all",      label: "الكل" },
    { value: "website",  label: "مواقع ويب" },
    { value: "webapp",   label: "تطبيقات ويب" },
    { value: "electron", label: "Electron" },
    { value: "mobile",   label: "موبايل" },
  ];

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">المشاريع</h1>
          <p className="text-[#666] text-lg max-w-xl mx-auto">
            مجموعة من أبرز الأعمال والمشاريع التي أنجزتها
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🗂️</div>
            <h3 className="font-display text-2xl font-semibold mb-3">لا توجد مشاريع بعد</h3>
            <p className="text-[#666]">
              أضف مشاريعك عبر{" "}
              <Link href="/studio" className="text-[#c8883a] underline">
                لوحة التحكم
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug?.current}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Card Image */}
                {project.mainImage ? (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={urlFor(project.mainImage).width(600).height(400).url()}
                      alt={project.titleAr || project.titleEn || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-medium bg-[#c8883a] px-3 py-1 rounded-full">
                        عرض المشروع ←
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-[#f2d9ac] to-[#c8883a] flex items-center justify-center">
                    <span className="text-6xl">
                      {project.category === "electron" ? "🖥️" :
                       project.category === "mobile"   ? "📱" : "🌐"}
                    </span>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#c8883a] uppercase tracking-wider font-medium">
                      {categories.find((c) => c.value === project.category)?.label || project.category}
                    </span>
                    {project.year && (
                      <span className="text-xs text-[#999]">{project.year}</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-[#c8883a] transition-colors">
                    {project.titleAr}
                  </h3>
                  {project.descriptionAr && (
                    <p className="text-sm text-[#666] line-clamp-2 mb-4 leading-relaxed">
                      {project.descriptionAr}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs bg-[#fdf8f0] border border-[#f2d9ac] px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="text-xs text-[#999] px-2 py-1">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
