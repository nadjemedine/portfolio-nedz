"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

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
        className="block bg-[#121212] border border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#bfac8e]/20 transition-all duration-700 h-full p-6 md:p-8 flex flex-col gap-6 group"
      >
        {/* Project Image Stage */}
        {project.mainImage && (
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-black/40 border border-white/5 shadow-inner group-hover:shadow-2xl transition-all duration-700">
            {/* Category Badge - Floating */}
            <div className="absolute top-4 left-4 z-10 backdrop-blur-xl bg-white/10 border border-white/10 px-4 py-1.5 rounded-full shadow-xl">
              <span className="text-white/90 text-[10px] font-black uppercase tracking-widest">
                {categoryLabel}
              </span>
            </div>

            {/* Image */}
            <Image
              src={urlFor(project.mainImage).width(1200).url()}
              alt={getLocalized(project, "title")}
              fill
              className="object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Year Badge - Floating Right */}
            {project.year && (
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/5">
                <span className="font-display font-black text-[#bfac8e] text-[10px] tracking-wider">
                  {project.year}
                </span>
              </div>
            )}
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col flex-grow text-center px-2">
          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-white transition-colors leading-tight tracking-tight group-hover:text-[#bfac8e]">
            {getLocalized(project, "title")}
          </h3>

          {/* Client */}
          {project.client && (
            <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-8">
              {project.client}
            </span>
          )}

          {/* Button - Centered */}
          <div className="mt-auto flex justify-center">
            <div className="bg-white text-black hover:bg-[#bfac8e] hover:text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 transform group-hover:-translate-y-1 shadow-[0_10px_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_15px_40px_rgba(191,172,142,0.3)] flex items-center gap-2">
              {t.viewProject[lang]}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
