import { getProjects } from "@/lib/queries";
import { cookies } from "next/headers";
import { dictionary } from "@/lib/dictionary";
import ProjectsList from "@/components/ProjectsList";

export const revalidate = 60;

export default async function ProjectsPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "ar") as "ar" | "en" | "fr";
  const t = dictionary;

  const projects = (await getProjects().catch(() => [])) as any[];

  const categories = [
    { value: "all",       label: t.all[lang] },
    { value: "website",   label: t.websites[lang] },
    { value: "webapp",    label: t.webapps[lang] },
    { value: "mobile",    label: t.mobile[lang] },
    { value: "ecommerce", label: t.ecommerce[lang] },
  ];

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">{t.projectsHeaderTitle[lang]}</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {t.projectsHeaderSubtitle[lang]}
          </p>
        </div>

        {/* Projects Filter & Grid (Client Component) */}
        <ProjectsList 
          initialProjects={projects} 
          categories={categories} 
          t={t} 
          lang={lang} 
        />
      </div>
    </div>
  );
}
