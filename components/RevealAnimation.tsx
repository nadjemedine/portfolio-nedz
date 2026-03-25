"use client";

import { motion } from "framer-motion";

interface RevealAnimationProps {
  children: React.ReactNode;
  type?: "fade" | "slideUp" | "zoom" | "skew";
  delay?: number;
  duration?: number;
  className?: string;
}

export const RevealAnimation = ({
  children,
  type = "slideUp",
  delay = 0,
  duration = 0.6,
  className = "",
}: RevealAnimationProps) => {
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    zoomOut: {
      hidden: { opacity: 0, scale: 1.2 },
      visible: { opacity: 1, scale: 1 },
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
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[type]}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
