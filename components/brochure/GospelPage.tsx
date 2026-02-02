"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import FollowUpForm from "../forms/FollowUpForm";
import LetterPage from "./LetterPage";
import { Id } from "@/convex/_generated/dataModel";

interface GospelPageProps {
  receiverName: string;
  visitId: Id<"visits"> | null;
  isFollowUpModalOpen: boolean;
  onOpenFollowUp: () => void;
  onCloseFollowUp: () => void;
  onSeeOther: () => void;
  onShare: () => void;
}

export default function GospelPage({
  receiverName,
  visitId,
  isFollowUpModalOpen,
  onOpenFollowUp,
  onCloseFollowUp,
  onSeeOther,
  onShare,
}: GospelPageProps) {
  return (
    <>
      <LetterPage>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1"
        >
          <div className="text-center mb-6">
            <span className="text-4xl" role="img" aria-label="cross" style={{ color: "#d4a574" }}>
              &#10013;
            </span>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mt-2">
              God&apos;s Love For You
            </h2>
          </div>

          <div className="prose prose-rose max-w-none text-foreground/80 space-y-4">
            <p className="text-xl font-handwritten text-rose-dark">
              Dear {receiverName},
            </p>

            <p>
              This Valentine&apos;s Day, we want to share with you the greatest love
              story ever told. It&apos;s not about roses that fade or chocolates that
              melt - it&apos;s about a love that lasts forever.
            </p>

            <p className="font-serif text-rose-dark italic text-lg">
              &quot;For God so loved the world that He gave His one and only Son, that
              whoever believes in Him shall not perish but have eternal life.&quot;
              <span className="text-sm not-italic block mt-1">- John 3:16</span>
            </p>

            <p>
              Before you were born, God knew you. He crafted every detail of who
              you are with love and purpose. You are not an accident - you are
              His masterpiece, created to be loved and to love.
            </p>

            <p className="font-serif text-rose-dark italic text-lg">
              &quot;See what great love the Father has lavished on us, that we should
              be called children of God! And that is what we are!&quot;
              <span className="text-sm not-italic block mt-1">- 1 John 3:1</span>
            </p>

            <p>
              No matter what you&apos;ve done, where you&apos;ve been, or what you&apos;re going
              through - God&apos;s love for you never changes. His arms are always
              open, waiting to embrace you.
            </p>

            <p className="text-center font-medium text-foreground">
              Would you like to know more about this incredible love?
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            <Button onClick={onOpenFollowUp} className="w-full">
              Yes, I Want to Know More
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
