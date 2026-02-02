"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import FollowUpForm from "../forms/FollowUpForm";
import LetterPage from "./LetterPage";
import { Id } from "@/convex/_generated/dataModel";

interface PurityPageProps {
  receiverName: string;
  visitId: Id<"visits"> | null;
  isFollowUpModalOpen: boolean;
  onOpenFollowUp: () => void;
  onCloseFollowUp: () => void;
  onSeeOther: () => void;
  onShare: () => void;
}

export default function PurityPage({
  receiverName,
  visitId,
  isFollowUpModalOpen,
  onOpenFollowUp,
  onCloseFollowUp,
  onSeeOther,
  onShare,
}: PurityPageProps) {
  return (
    <>
      <LetterPage>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <div className="text-center mb-6">
            <span className="text-4xl" role="img" aria-label="diamond">
              &#128142;
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mt-2">
              The Beauty of Purity in Relationships
            </h2>
          </div>

          <div className="prose prose-rose max-w-none text-foreground/80 space-y-4">
            <p className="text-xl font-handwritten text-rose-dark">
              Dear {receiverName},
            </p>

            <p>
              In a world that often rushes love, there&apos;s something beautiful
              about waiting. True love isn&apos;t just an emotion - it&apos;s a choice, a
              commitment, and a precious gift worth protecting.
            </p>

            <p className="font-serif text-rose-dark italic text-lg">
              &quot;Above all else, guard your heart, for everything you do flows
              from it.&quot;
              <span className="text-sm not-italic block mt-1">
                - Proverbs 4:23
              </span>
            </p>

            <p>
              Purity in relationships isn&apos;t about restriction - it&apos;s about
              protection. It&apos;s about honoring yourself and the one you&apos;ll spend
              your life with by giving them the best version of you.
            </p>

            <p className="font-serif text-rose-dark italic text-lg">
              &quot;Love is patient, love is kind. It does not envy, it does not
              boast, it is not proud... It always protects, always trusts,
              always hopes, always perseveres.&quot;
              <span className="text-sm not-italic block mt-1">
                - 1 Corinthians 13:4-7
              </span>
            </p>

            <p>
              When love is built on patience, respect, and commitment, it creates
              a foundation that can weather any storm. This Valentine&apos;s Day,
              choose to honor love in its purest form.
            </p>

            <p className="text-center font-medium text-foreground">
              Would you like to learn more about building pure, lasting relationships?
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            <Button onClick={onOpenFollowUp} className="w-full">
              Yes, Tell Me More
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onSeeOther} className="flex-1">
                See Other Option
              </Button>
              <Button variant="secondary" onClick={onShare} className="flex-1">
                Share This
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </LetterPage>

      <Modal
        isOpen={isFollowUpModalOpen}
        onClose={onCloseFollowUp}
        title="Let's Connect"
      >
        <FollowUpForm visitId={visitId} onSuccess={onCloseFollowUp} />
      </Modal>
    </>
  );
}
