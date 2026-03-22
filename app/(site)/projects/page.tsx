import { getProjects } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";

export default async function ProjectsPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const projects = (await getProjects().catch(() => [])) as any[];

  const categories = [
    { value: "all",      label: t.all[lang] },
    { value: "website",  label: t.websites[lang] },
    { value: "webapp",   label: t.webapps[lang] },
    { value: "mobile",   label: t.mobile[lang] },
  ];

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">{t.projectsHeaderTitle[lang]}</h1>
          <p className="text-black/60 text-lg max-w-xl mx-auto">
            {t.projectsHeaderSubtitle[lang]}
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🗂️</div>
            <h3 className="font-display text-2xl font-semibold mb-3">{t.noProjects[lang]}</h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug?.current}`}
                className="group bg-[#bfac8e] rounded-2xl overflow-hidden border border-[#bfac8e] hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Card Image */}
                {project.mainImage ? (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={urlFor(project.mainImage).width(600).height(400).url()}
                      alt={getLocalized(project, "title")}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-medium bg-black px-3 py-1 rounded-full text-center block">
                        {t.viewProject[lang]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-[#bfac8e] to-[#bfac8e]/80 flex items-center justify-center">
                    <span className="text-6xl">
                      {project.category === "mobile"   ? "📱" : "🌐"}
                    </span>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-black uppercase tracking-wider font-semibold">
                      {categories.find((c) => c.value === project.category)?.label || project.category}
                    </span>
                    {project.year && (
                      <span className="text-xs text-black/40">{project.year}</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-black transition-colors text-black">
                    {getLocalized(project, "title")}
                  </h3>
                  {getLocalized(project, "description") && (
                    <p className="text-sm text-black/80 line-clamp-2 mb-4 leading-relaxed">
                      {getLocalized(project, "description")}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech: string) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
