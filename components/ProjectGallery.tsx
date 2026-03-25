"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

interface ProjectGalleryProps {
  images: any[];
  displayMode?: 'snap' | 'grid';
  titles?: {
    gallery: string;
    clickToEnlarge: string;
    close: string;
  };
}

export default function ProjectGallery({ images, titles, displayMode = 'snap' }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const viewMode = displayMode;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-display text-2xl font-semibold flex items-center gap-3 text-black">
          {titles?.gallery || "معرض الصور"}
          <span className="text-xs font-normal text-black/40 bg-black/5 px-2 py-1 rounded-md">
            {images.length}
          </span>
        </h3>
      </div>

      {viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img: any, i: number) => (
            <motion.div
              key={i}
              layoutId={`image-grid-${i}`}
              onClick={() => setSelectedIndex(i)}
              className={`group relative rounded-2xl overflow-hidden border border-[#bfac8e]/30 cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white ${
                i === 0 ? "md:col-span-2 md:row-span-2 h-[450px]" : "h-60"
              }`}
              whileHover={{ y: -5 }}
            >
              <Image
                src={urlFor(img).width(1200).url()}
                alt={`Project Screenshot ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="bg-white/90 text-black px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  {titles?.clickToEnlarge || "عرض الصورة"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Scroll Snap Gallery */
        <div className="relative group/gallery">
          <div 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img: any, i: number) => (
              <motion.div
                key={i}
                id={`gallery-item-${i}`}
                layoutId={`image-snap-${i}`}
                onClick={() => setSelectedIndex(i)}
                className="relative flex-none w-[85vw] md:w-[600px] h-80 md:h-[450px] rounded-3xl overflow-hidden border border-[#bfac8e]/20 snap-center cursor-pointer bg-white shadow-lg mx-auto first:ml-0 last:mr-0"
              >
                <Image
                  src={urlFor(img).width(1200).url()}
                  alt={`Project Screenshot ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-light tracking-widest opacity-0 group-hover/gallery:opacity-100 transition-opacity">
                  {i + 1} / {images.length}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nav Arrows for Snap Gallery */}
          {images.length > 1 && (
            <>
              <button 
                onClick={() => {
                  const container = document.querySelector('.snap-x');
                  if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-black p-3 rounded-full shadow-xl opacity-100 transition-all hover:scale-110 z-10 hidden md:flex"
              >
                <IoChevronBack className="text-2xl" />
              </button>
              <button 
                onClick={() => {
                  const container = document.querySelector('.snap-x');
                  if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-black p-3 rounded-full shadow-xl opacity-100 transition-all hover:scale-110 z-10 hidden md:flex"
              >
                <IoChevronForward className="text-2xl" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl z-[110] transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/* Navigation - Prev */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-10 text-white/50 hover:text-white text-5xl z-[110] transition-all bg-white/5 p-3 rounded-full hover:bg-white/10 hover:scale-110"
                aria-label="Previous"
              >
                <IoChevronBack />
              </button>
            )}

            {/* Image Container */}
            <motion.div 
              className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={urlFor(images[selectedIndex]).width(1600).url()}
                alt={`Full view ${selectedIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
              
              {/* Counter */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest font-light">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>

            {/* Navigation - Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-10 text-white/50 hover:text-white text-5xl z-[110] transition-all bg-white/5 p-3 rounded-full hover:bg-white/10 hover:scale-110"
                aria-label="Next"
              >
                <IoChevronForward />
              </button>
            )}

            {/* Tap outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setSelectedIndex(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
