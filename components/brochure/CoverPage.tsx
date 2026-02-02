"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import Image from "next/image";

interface CoverPageProps {
  receiverName: string;
  senderName: string;
  onOpenGift: () => void;
}

export default function CoverPage({
  receiverName,
  senderName,
  onOpenGift,
}: CoverPageProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] p-8 text-center overflow-hidden">
      {/* Full-page rose background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/rose.png"
            alt=""
            fill
            className=""
            priority
          />
        </motion.div>
      </div>

      {/* Content overlay with frosted glass backdrop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg"
      >
        <div className="space-y-4">
          <p className="text-rose-dark text-lg font-medium tracking-wide text-shadow">
            A Special Valentine&apos;s Message
          </p>

          <h1 className="text-4xl md:text-5xl font-serif text-foreground text-shadow-strong">
            Dear {receiverName},
          </h1>

          <p className="text-foreground/80 text-lg max-w-md mx-auto text-shadow">
            You have received a heartfelt gift from{" "}
            <span className="text-rose-dark font-semibold">{senderName}</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="pt-6"
          >
            <Button size="lg" onClick={onOpenGift}>
              <span className="mr-2">
                <span role="img" aria-label="gift">
                  &#127873;
                </span>
              </span>
              Open Your Gift
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
