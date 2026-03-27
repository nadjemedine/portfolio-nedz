"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

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

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 sticky top-24 z-30 bg-white/90 backdrop-blur-md py-2 px-4 rounded-full border border-gray-200 shadow-sm">
        {[{ value: "all", label: t.all[lang] }, ...categories.slice(1)].map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all transform active:scale-95 ${
              filter === cat.value
                ? "bg-black text-white shadow-lg scale-105"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={i}
                lang={lang}
                t={t}
                categories={categories}
                isMobileStack={filter === "all"} // Only stack when showing all to avoid layout jumping when filtering
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
