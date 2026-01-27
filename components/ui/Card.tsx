"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-rose-light/50 overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      } ${hoverable ? "transition-shadow hover:shadow-xl" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
