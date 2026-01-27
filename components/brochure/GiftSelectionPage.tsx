"use client";

import { motion } from "framer-motion";
import Card from "../ui/Card";

interface GiftSelectionPageProps {
  receiverName: string;
  onSelectOption: (option: 1 | 2) => void;
}

export default function GiftSelectionPage({
  receiverName,
  onSelectOption,
}: GiftSelectionPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
          Choose Your Gift, {receiverName}
        </h2>
        <p className="text-foreground/70 text-lg">
          Two special messages await you
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            hoverable
            onClick={() => onSelectOption(1)}
            className="p-6 h-full"
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">
                <span role="img" aria-label="cross">
                  &#10013;
                </span>
              </div>
              <h3 className="text-xl font-serif text-foreground">
                Option 1: God&apos;s Love
              </h3>
              <p className="text-foreground/70 text-sm">
                Discover the greatest love story ever told - a message about
                God&apos;s unfailing love for you.
              </p>
              <div className="pt-2">
                <span className="text-rose-dark font-medium text-sm">
                  Tap to explore &rarr;
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            hoverable
            onClick={() => onSelectOption(2)}
            className="p-6 h-full"
          >
            <div className="text-center space-y-4">
              <div className="text-5xl">
                <span role="img" aria-label="diamond">
                  &#128142;
                </span>
              </div>
              <h3 className="text-xl font-serif text-foreground">
                Option 2: Purity in Love
              </h3>
              <p className="text-foreground/70 text-sm">
                Explore the beauty of purity in relationships - honoring love
                the way it was designed.
              </p>
              <div className="pt-2">
                <span className="text-rose-dark font-medium text-sm">
                  Tap to explore &rarr;
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
