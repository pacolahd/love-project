"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LetterPageProps {
  children: ReactNode;
}

export default function LetterPage({ children }: LetterPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="letter-paper min-h-[600px] md:min-h-[700px]"
    >
      <div className="letter-margin py-6 md:py-8 pr-6 md:pr-8">
        {children}
      </div>
    </motion.div>
  );
}
