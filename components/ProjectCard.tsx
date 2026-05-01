"use client";

import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: any;
  index: number;
  lang: string;
  t: any;
  categories: any[];
  isMobileStack?: boolean;
}

export default function ProjectCard({ 
  project, 
  index, 
  lang, 
  t, 
  categories,
  isMobileStack = true 
}: ProjectCardProps) {

  const getLocalized = (obj: any, fieldBase: string) => {
    if (!obj) return "";
    const key = `${fieldBase}${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    return obj[key] || obj[`${fieldBase}En`] || obj[`${fieldBase}Ar`] || "";
  };

  const variants: any = {
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
  };

  const animType = project.animationType || "slideUp";
  const categoryLabel = categories.find((c) => c.value === project.category)?.label || project.category;

  return (
    <motion.div
      layout
      variants={variants[animType] || variants.slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`
        relative group h-full
        ${isMobileStack ? 'sticky top-24 md:static mb-10 md:mb-0' : ''}
      `}
      style={isMobileStack ? { top: `calc(100px + ${index * 20}px)` } : {}}
    >
      <a
        href={project.liveUrl || '#'}
        target={project.liveUrl ? "_blank" : undefined}
        rel={project.liveUrl ? "noopener noreferrer" : undefined}
        className="block bg-[#bfac8e] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full shadow-xl md:shadow-none p-8 md:p-10 flex flex-col justify-between min-h-[220px]"
      >
        {/* Top: Category + Year */}
        <div className="flex items-center justify-between mb-6">
          <span className="bg-black text-[#bfac8e] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter">
            {categoryLabel}
          </span>
          {project.year && (
            <span className="font-display font-black text-black/50 text-sm tracking-wider">
              {project.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-black transition-colors leading-tight">
          {getLocalized(project, "title")}
        </h3>

        {/* Bottom: Client + Arrow */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/10">
          {project.client ? (
            <span className="text-xs text-black/60 font-bold">
              {project.client}
            </span>
          ) : (
            <span />
          )}
          <span className="text-black font-bold group-hover:translate-x-1 transition-transform duration-300 text-lg">
            ↗
          </span>
        </div>
      </a>
    </motion.div>
  );
}
