"use client";

import { motion } from "framer-motion";
import ShareForm from "@/components/forms/ShareForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      {/* Full-page rose background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/rose.png"
          alt=""
          fill
          className="opacity-20"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
            Valentine&apos;s Day Digital Brochure
          </h1>
          <p className="text-foreground/70">
            Create a personalized Valentine&apos;s message and share the love
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-rose-light/50"
        >
          <ShareForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-foreground/50 text-sm mt-6"
        >
          Share meaningful messages of love, faith, and purity
        </motion.p>
      </div>
    </main>
  );
}
