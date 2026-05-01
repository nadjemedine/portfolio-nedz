"use client";

import { motion } from "framer-motion";

export default function TechMarquee() {
  const row1 = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js",
    "Tailwind CSS", "Framer Motion", "Node.js"
  ];
  
  const row2 = [
    "PHP", "Laravel", "Sanity CMS", "WordPress", "Shopify", 
    "Figma", "Git", "REST API", "GraphQL"
  ];

  // We duplicate the array 4 times to create a seamless infinite loop out of 25% jumps
  const marquee1 = [...row1, ...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="w-full bg-[#bfac8e] py-10 overflow-hidden flex flex-col gap-4 border-y border-black/10 shadow-2xl relative" dir="ltr">
      
      {/* Decorative gradient overlay on edges for depth */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#bfac8e] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#bfac8e] to-transparent z-10 pointer-events-none" />

      {/* Row 1 - Left to Right */}
      <motion.div
        className="flex whitespace-nowrap w-fit pr-8"
        animate={{ x: ["0%", "-25%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {marquee1.map((tech, index) => (
          <div key={index} className="flex items-center">
            <span 
              className={`font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mix-blend-color-burn ${index % 2 === 0 ? 'text-black opacity-90' : 'text-transparent'}`} 
              style={index % 2 !== 0 ? { WebkitTextStroke: '2px rgba(0,0,0,0.6)' } : {}}
            >
              {tech}
            </span>
            <span className="text-black/30 mx-6 md:mx-10 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>

      {/* Row 2 - Right to Left */}
      <motion.div
        className="flex whitespace-nowrap w-fit pr-8"
        animate={{ x: ["-25%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {marquee2.map((tech, index) => (
          <div key={index} className="flex items-center">
            <span 
              className={`font-display text-4xl md:text-5xl font-black uppercase tracking-tighter mix-blend-color-burn ${index % 2 !== 0 ? 'text-black opacity-90' : 'text-transparent'}`} 
              style={index % 2 === 0 ? { WebkitTextStroke: '2px rgba(0,0,0,0.6)' } : {}}
            >
              {tech}
            </span>
            <span className="text-black/30 mx-6 md:mx-10 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
