"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import FloatingArtifact from "./FloatingArtifact";
import FloatingSideEmojis from "./FloatingSideEmojis";

type AnimationPhase = "idle" | "opening" | "revealing" | "complete";

interface EnvelopeLandingProps {
  senderName: string;
  receiverName: string;
  onSelectOption: (option: 1 | 2) => void;
}

export default function EnvelopeLanding({
  senderName,
  receiverName,
  onSelectOption,
}: EnvelopeLandingProps) {
  const [phase, setPhase] = useState<AnimationPhase>("idle");

  const handleOpen = useCallback(() => {
    setPhase("opening");

    // Flap fully open at 0.7s
    setTimeout(() => {
      setPhase("revealing");
    }, 700);

    // Cards fully revealed at 1.7s
    setTimeout(() => {
      setPhase("complete");
    }, 1700);
  }, []);

  const flapOpen = phase !== "idle";
  const showArtifacts = phase === "revealing" || phase === "complete";
  const showButton = phase === "idle";

  return (
    <div className="envelope-container relative">
      {/* Circling emojis around the container */}
      <FloatingSideEmojis />

      {/* Header text - animates up when flap opens */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: flapOpen ? -40 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <p className="font-handwritten text-3xl md:text-4xl text-rose-dark">
          Someone sent you love!
        </p>
      </motion.div>

      {/* Envelope wrapper with perspective */}
      <div
        className="relative"
        style={{ perspective: "1000px" }}
      >
        {/* Floating artifacts - positioned ABOVE envelope, emerge from opening */}
        <FloatingArtifact
          option={1}
          isVisible={showArtifacts}
          onClick={() => onSelectOption(1)}
          delay={0}
          position="left"
        />
        <FloatingArtifact
          option={2}
          isVisible={showArtifacts}
          onClick={() => onSelectOption(2)}
          delay={0.3}
          position="right"
        />

        {/* Envelope body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="envelope-body"
        >
          {/* Inner shadow/fold */}
          <div className="envelope-inner" />

          {/* Handwritten text ON the envelope - centered and larger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <p className="font-handwritten text-3xl md:text-4xl text-rose-dark text-shadow">
              For {receiverName}
            </p>
            <p className="font-handwritten text-xl md:text-2xl text-foreground/70 mt-2 text-shadow">
              with love, from {senderName}
            </p>
          </motion.div>
        </motion.div>

        {/* Envelope flap - rotates open */}
        <motion.div
          className="envelope-flap"
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: flapOpen ? -160 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "visible",
          }}
        />

        {/* Heart seal - pulses when idle, bursts when opening */}
        <AnimatePresence>
          {!flapOpen && (
            <motion.div
              className="envelope-seal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: [1, 1.1, 1],
              }}
              exit={{
                opacity: 0,
                scale: 2,
                y: -30,
                transition: { duration: 0.4 },
              }}
              transition={{
                opacity: { duration: 0.3 },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src="/images/teddy.png"
                alt="Teddy bear seal"
                width={60}
                height={60}
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Open button - visible only when idle */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-8"
          >
            <Button onClick={handleOpen} size="lg">
              Open Your Gift
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction text - appears after artifacts are revealed */}
      <AnimatePresence>
        {phase === "complete" && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-foreground/80 text-center text-lg md:text-xl font-medium"
          >
            Tap the 🌹 or 💎 to chose your surprise
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
