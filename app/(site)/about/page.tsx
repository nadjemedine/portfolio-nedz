import { getAboutData } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

export const revalidate = 60;

export default async function AboutPage() {
  const about = (await getAboutData().catch(() => null)) as any;

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">حول</h1>
          <p className="text-[#666] text-lg">من أنا وماذا أقدم</p>
        </div>

        {/* Bio + Photo */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="flex justify-center order-1 md:order-2">
            {about?.image ? (
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border-4 border-[#f2d9ac] shadow-2xl">
                <Image
                  src={urlFor(about.image).width(800).url()}
                  alt="Nedjem Eddine"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-72 h-80 rounded-3xl bg-gradient-to-br from-[#f2d9ac] to-[#c8883a] flex items-center justify-center border-4 border-[#f2d9ac] shadow-2xl">
                <span className="font-display text-8xl font-bold text-white opacity-60">N</span>
              </div>
            )}
          </div>
          <div className="order-2 md:order-1">
            <h2 className="font-display text-3xl font-bold mb-6">مرحباً، أنا نجم الدين</h2>
            <p className="text-[#555] leading-relaxed text-base mb-6">
              {about?.whyMeAr ||
                "مطور ويب متخصص في بناء تجارب رقمية استثنائية. أعمل على مواقع وتطبيقات الويب وتطبيقات سطح المكتب باستخدام Electron، وأسعى دائماً لتقديم أفضل جودة بأحدث التقنيات."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "الموقع", value: "الجزائر" },
                { label: "التخصص", value: "Full Stack & Electron" },
                { label: "اللغات", value: "العربية, الفرنسية, الإنجليزية" },
                { label: "متاح", value: "للمشاريع الجديدة ✓" },
              ].map((item) => (
                <div key={item.label} className="bg-[#fdf8f0] border border-[#f2d9ac] rounded-xl p-4">
                  <div className="text-xs text-[#c8883a] font-medium mb-1">{item.label}</div>
                  <div className="text-sm font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        {about?.services?.length > 0 && (
          <div className="mb-24">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">خدماتي</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {about.services.map((service: any, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-[#f2d9ac] hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <h3 className="font-display text-xl font-semibold mb-4 text-[#0a0a0a]">
                    {service.titleAr}
                  </h3>
                  <p className="text-[#666] text-sm leading-relaxed">{service.descriptionAr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {about?.skills?.length > 0 && (
          <div className="mb-24">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">المهارات التقنية</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {about.skills.map((group: any) => (
                <div
                  key={group.category}
                  className="bg-white rounded-2xl p-6 border border-[#f2d9ac]"
                >
                  <h3 className="font-semibold text-[#c8883a] mb-5 pb-3 border-b border-[#f2d9ac]">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items?.map((item: string) => (
                      <span
                        key={item}
                        className="text-sm bg-[#fdf8f0] border border-[#f2d9ac] px-3 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Default skills if none in Sanity */}
        {!about?.skills?.length && (
          <div className="mb-24">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">المهارات التقنية</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
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
                  items: ["Electron.js", "Sanity CMS", "MongoDB", "PostgreSQL", "Git"],
                },
              ].map((group) => (
                <div key={group.category} className="bg-white rounded-2xl p-6 border border-[#f2d9ac]">
                  <h3 className="font-semibold text-[#c8883a] mb-5 pb-3 border-b border-[#f2d9ac]">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-sm bg-[#fdf8f0] border border-[#f2d9ac] px-3 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {about?.experiences?.length > 0 && (
          <div className="mb-24">
            <h2 className="font-display text-4xl font-bold mb-12 text-center">الخبرة المهنية</h2>
            <div className="space-y-6">
              {about.experiences.map((exp: any, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-[#f2d9ac] border-r-4 border-r-[#c8883a]"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h3 className="font-display text-xl font-semibold">{exp.roleAr}</h3>
                    <span className="text-xs text-[#999] bg-[#fdf8f0] border border-[#f2d9ac] px-3 py-1 rounded-full">
                      {exp.startDate} — {exp.endDate || "الحاضر"}
                    </span>
                  </div>
                  <p className="text-[#c8883a] font-medium mb-3">{exp.company}</p>
                  {exp.descriptionAr && (
                    <p className="text-[#666] text-sm leading-relaxed">{exp.descriptionAr}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {about?.education?.length > 0 && (
          <div>
            <h2 className="font-display text-4xl font-bold mb-12 text-center">التعليم</h2>
            <div className="space-y-4">
              {about.education.map((edu: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-[#f2d9ac] flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{edu.degreeAr}</h3>
                    <p className="text-[#666] text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-[#c8883a] font-medium">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
