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
      <div className="flex flex-wrap justify-center gap-3 relative py-2 px-4 rounded-full border border-white/5">
        {[{ value: "all", label: t.all[lang] }, ...categories.slice(1)].map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all transform active:scale-95 ${
              filter === cat.value
                ? "bg-[#bfac8e] text-black shadow-lg scale-105"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
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
          <div className="text-6xl mb-6 text-white/10 font-black">∅</div>
          <h3 className="font-display text-2xl font-semibold mb-3 text-white">{t.noProjects[lang]}</h3>
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
                isMobileStack={false}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
