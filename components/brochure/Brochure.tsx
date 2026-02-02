"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useBrochure } from "@/hooks/useBrochure";
import BrochurePage from "./BrochurePage";
import EnvelopeLanding from "./EnvelopeLanding";
import GospelPage from "./GospelPage";
import PurityPage from "./PurityPage";
import SharePage from "./SharePage";

interface BrochureProps {
  senderName: string;
  receiverName: string;
}

export default function Brochure({ senderName, receiverName }: BrochureProps) {
  const {
    currentPage,
    direction,
    visitId,
    isFollowUpModalOpen,
    goToPage,
    selectOption,
    goToOtherOption,
    goToShare,
    goBack,
    initializeVisit,
    openFollowUpModal,
    closeFollowUpModal,
  } = useBrochure({ senderName, receiverName });

  useEffect(() => {
    initializeVisit();
  }, [initializeVisit]);

  const renderPage = () => {
    switch (currentPage) {
      case "envelope":
        return (
          <EnvelopeLanding
            senderName={senderName}
            receiverName={receiverName}
            onSelectOption={selectOption}
          />
        );
      case "gospel":
        return (
          <GospelPage
            receiverName={receiverName}
            visitId={visitId}
            isFollowUpModalOpen={isFollowUpModalOpen}
            onOpenFollowUp={openFollowUpModal}
            onCloseFollowUp={closeFollowUpModal}
            onSeeOther={goToOtherOption}
            onShare={goToShare}
          />
        );
      case "purity":
        return (
          <PurityPage
            receiverName={receiverName}
            visitId={visitId}
            isFollowUpModalOpen={isFollowUpModalOpen}
            onOpenFollowUp={openFollowUpModal}
            onCloseFollowUp={closeFollowUpModal}
            onSeeOther={goToOtherOption}
            onShare={goToShare}
          />
        );
      case "share":
        return <SharePage onBack={goBack} />;
      default:
        return null;
    }
  };

  const showBackgroundRose = currentPage !== "envelope";

  return (
    <div className="w-full max-w-lg mx-auto perspective-1000">
      <AnimatePresence mode="wait" custom={direction}>
        <BrochurePage
          key={currentPage}
          direction={direction}
          showBackgroundRose={showBackgroundRose}
        >
          {renderPage()}
        </BrochurePage>
      </AnimatePresence>
    </div>
  );
}
