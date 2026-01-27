"use client";

import { motion } from "framer-motion";
import ShareForm from "../forms/ShareForm";
import Button from "../ui/Button";

interface SharePageProps {
  onBack: () => void;
}

export default function SharePage({ onBack }: SharePageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">
            <span role="img" aria-label="hearts">
              &#128149;
            </span>
          </div>
          <h2 className="text-3xl font-serif text-foreground mb-2">
            Spread the Love
          </h2>
          <p className="text-foreground/70">
            Create a personalized Valentine&apos;s message for someone you care about
          </p>
        </div>

        <div className="bg-white/50 rounded-2xl p-6 shadow-lg">
          <ShareForm />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <Button variant="outline" onClick={onBack}>
            &larr; Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
