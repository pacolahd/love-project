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
    <div className="flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] p-8 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1, delay: 0.2 }}
        className="mb-6"
      >
        <Image
          src="/images/flower.svg"
          alt="Valentine's Flower"
          width={150}
          height={150}
          className="animate-float"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <p className="text-rose-dark text-lg">A Special Valentine&apos;s Message</p>

        <h1 className="text-4xl md:text-5xl font-serif text-foreground">
          Dear {receiverName},
        </h1>

        <p className="text-foreground/70 text-lg max-w-md mx-auto">
          You have received a heartfelt gift from{" "}
          <span className="text-rose-dark font-medium">{senderName}</span>
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-0 right-0 flex justify-center"
      >
        <Image
          src="/images/heart.svg"
          alt=""
          width={24}
          height={24}
          className="animate-pulse-heart opacity-50"
        />
      </motion.div>
    </div>
  );
}
