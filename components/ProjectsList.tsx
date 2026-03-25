"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity";

interface ProjectsListProps {
  initialProjects: any[];
  categories: { value: string; label: string }[];
  t: any;
  lang: "ar" | "en" | "fr";
}

export default function ProjectsList({ initialProjects, categories, t, lang }: ProjectsListProps) {
  const [filter, setFilter] = useState("all");

  const filteredProjects = filter === "all" 
    ? initialProjects 
    : initialProjects.filter(p => p.category === filter);

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {[{ value: "all", label: t.all[lang] }, ...categories.slice(1)].map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all transform active:scale-95 ${
              filter === cat.value
                ? "bg-black text-white shadow-lg"
                : "bg-[#bfac8e]/20 text-black hover:bg-[#bfac8e]/40"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="text-6xl mb-6 text-black/20 font-black">∅</div>
          <h3 className="font-display text-2xl font-semibold mb-3">{t.noProjects[lang]}</h3>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={`/projects/${project.slug?.current}`}
                  className="group block bg-white rounded-[2.5rem] overflow-hidden border border-[#bfac8e]/20 hover:border-[#bfac8e] hover:shadow-2xl transition-all duration-500 h-full"
                >
                  {/* Card Image */}
                  <div className="relative h-64 overflow-hidden">
                    {project.mainImage ? (
                      <Image
                        src={urlFor(project.mainImage).width(800).height(600).url()}
                        alt={getLocalized(project, "title")}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#bfac8e]/10 flex items-center justify-center">
                        <span className="text-6xl opacity-20">
                          {project.category === "mobile" ? "📱" : "🌐"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        {t.viewProject[lang].replace(' ←', '')}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <p className="text-white/80 text-xs line-clamp-2">
                         {getLocalized(project, "description")}
                       </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-black text-[#bfac8e] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                        {categories.find((c) => c.value === project.category)?.label || project.category}
                      </span>
                      {project.year && (
                        <span className="font-display font-black italic text-black/10 text-2xl">{project.year}</span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-6 text-black group-hover:text-[#bfac8e] transition-colors leading-tight">
                      {getLocalized(project, "title")}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="text-[10px] font-bold border border-black/10 px-3 py-1 rounded-md text-black/60 group-hover:border-black/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="text-[10px] font-bold text-black/30 flex items-center px-1">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
