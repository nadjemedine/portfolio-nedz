"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor } from "@/lib/sanity";

interface ProjectCardProps {
  project: any;
  index: number;
  lang: string;
  t: any;
  categories: any[];
  isMobileStack?: boolean; // toggle for mobile stacking
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
    slideDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    zoomOut: {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
    skew: {
      hidden: { opacity: 0, skewY: 10, y: 100 },
      visible: { opacity: 1, skewY: 0, y: 0 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -45, scale: 0.8 },
      visible: { opacity: 1, rotate: 0, scale: 1 },
    },
    flip: {
      hidden: { opacity: 0, rotateX: 90 },
      visible: { opacity: 1, rotateX: 0 },
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.3 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 20 }
      },
    },
  };

  const animType = project.animationType || "slideUp";

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
      <Link
        href={`/projects/${project.slug?.current}`}
        className="block bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-black/5 hover:border-black hover:shadow-2xl transition-all duration-500 h-full shadow-lg md:shadow-none"
      >
        {/* Card Image */}
        <div className="relative h-64 md:h-72 overflow-hidden">
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
          
          {/* View Badge */}
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
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-black text-[#bfac8e] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
              {categories.find((c) => c.value === project.category)?.label || project.category}
            </span>
            {project.year && (
              <span className="font-display font-black italic text-black/10 text-2xl">{project.year}</span>
            )}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black group-hover:text-[#bfac8e] transition-colors leading-tight">
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
  );
}
