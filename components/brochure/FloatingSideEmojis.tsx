"use client";

import { motion } from "framer-motion";

const emojis = ["❤️", "🌹", "✨", "💕", "💗", "🌸", "💖", "🌷"];

interface OrbitingEmoji {
  id: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
}

// Generate emojis that orbit around the container border
const generateEmojis = (): OrbitingEmoji[] => {
  return emojis.map((emoji, i) => ({
    id: i,
    emoji,
    size: 20 + (i % 3) * 3,
    duration: 16, // seconds for full orbit
    delay: (i / emojis.length) * 16, // stagger start positions
  }));
};

const orbitingEmojis = generateEmojis();

export default function FloatingSideEmojis() {
  // Path traces the border: right side up → top → left side down → bottom
  // Using calc to stay on the edges
  const pathKeyframes = {
    // right(100%) → top-right → top-left → left(0%) → bottom-left → bottom-right → back
    left: [
      "calc(100% - 25px)", // right edge
      "calc(100% - 25px)", // right edge (moving up)
      "calc(100% - 25px)", // top-right corner
      "50%",               // top center
      "10px",              // top-left corner
      "10px",              // left edge (moving down)
      "10px",              // bottom-left corner
      "50%",               // bottom center
      "calc(100% - 25px)", // bottom-right (back to start)
    ],
    top: [
      "calc(100% - 30px)", // bottom-right start
      "50%",               // right edge middle
      "10px",              // top-right corner
      "10px",              // top center
      "10px",              // top-left corner
      "50%",               // left edge middle
      "calc(100% - 30px)", // bottom-left corner
      "calc(100% - 30px)", // bottom center
      "calc(100% - 30px)", // bottom-right (back to start)
    ],
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {orbitingEmojis.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            fontSize: `${item.size}px`,
            zIndex: 50,
          }}
          animate={{
            left: pathKeyframes.left,
            top: pathKeyframes.top,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear" as const,
            delay: item.delay,
            times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
