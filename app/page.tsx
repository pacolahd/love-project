"use client";

import { motion } from "framer-motion";
import ShareForm from "@/components/forms/ShareForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Image
              src="/images/flower.svg"
              alt="Valentine's Flower"
              width={100}
              height={100}
              className="animate-float"
            />
          </motion.div>

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
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-rose-light/50"
        >
          <ShareForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-foreground/50 text-sm mt-6"
        >
          Share meaningful messages of love, faith, and purity
        </motion.p>
      </div>
    </main>
  );
}
