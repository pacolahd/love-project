"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BrochurePageProps {
  children: ReactNode;
  direction: "forward" | "backward";
  showBackgroundRose?: boolean;
}

const pageVariants = {
  enter: (direction: "forward" | "backward") => ({
    rotateY: direction === "forward" ? 90 : -90,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    rotateY: direction === "forward" ? -90 : 90,
    opacity: 0,
    scale: 0.9,
  }),
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.6,
};

export default function BrochurePage({
  children,
  direction,
  showBackgroundRose = false,
}: BrochurePageProps) {
  return (
    <motion.div
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={pageTransition}
      className="relative w-full min-h-[600px] md:min-h-[700px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-rose-light/50 overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Full-width background rose for non-cover pages */}
      {showBackgroundRose && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/rose.png"
            alt=""
            fill
            className="opacity-[0.15]"
          />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
