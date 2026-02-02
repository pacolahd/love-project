"use client";

import { motion } from "framer-motion";

interface FloatingArtifactProps {
  option: 1 | 2;
  isVisible: boolean;
  onClick: () => void;
  delay?: number;
  position: "left" | "right";
}

export default function FloatingArtifact({
  option,
  isVisible,
  onClick,
  delay = 0,
  position,
}: FloatingArtifactProps) {
  const isGospel = option === 1;

  const containerVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      scale: 0.5,
      x: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      x: position === "left" ? -130 : 70,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      },
    },
  };

  const floatAnimation = {
    y: [0, -12, 0],
    rotate: [-3, 3, -3],
    scale: [1, 1.05, 1],
    transition: {
      y: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotate: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.button
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="absolute cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-dark focus:ring-offset-2 rounded-full"
      style={{
        top: "-40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
      }}
      aria-label={isGospel ? "Rose gift option" : "Diamond gift option"}
    >
      <motion.div
        animate={isVisible ? floatAnimation : {}}
        className="relative"
      >
        {isGospel ? (
          // Glowing Rose
          <div className="relative">
            <motion.div
              className="text-6xl md:text-7xl"
              style={{
                filter: "drop-shadow(0 0 12px rgba(225, 29, 72, 0.7))",
              }}
              whileHover={{
                filter: "drop-shadow(0 0 20px rgba(225, 29, 72, 1))",
              }}
            >
              🌹
            </motion.div>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 text-6xl md:text-7xl pointer-events-none"
              style={{
                filter: "blur(8px)",
                opacity: 0.5,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🌹
            </motion.div>
          </div>
        ) : (
          // Shimmering Diamond
          <div className="relative">
            <motion.div
              className="text-6xl md:text-7xl"
              style={{
                filter: "drop-shadow(0 0 12px rgba(147, 197, 253, 0.7))",
              }}
              whileHover={{
                filter: "drop-shadow(0 0 20px rgba(147, 197, 253, 1))",
              }}
            >
              &#128142;
            </motion.div>
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 text-xl pointer-events-none"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              &#10022;
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 text-lg pointer-events-none"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.75,
              }}
            >
              &#10022;
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.button>
  );
}
