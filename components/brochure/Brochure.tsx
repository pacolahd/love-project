"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useBrochure } from "@/hooks/useBrochure";
import BrochurePage from "./BrochurePage";
import CoverPage from "./CoverPage";
import GiftSelectionPage from "./GiftSelectionPage";
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
      case "cover":
        return (
          <CoverPage
            receiverName={receiverName}
            senderName={senderName}
            onOpenGift={() => goToPage("giftSelection", "forward")}
          />
        );
      case "giftSelection":
        return (
          <GiftSelectionPage
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

  return (
    <div className="w-full max-w-lg mx-auto perspective-1000">
      <AnimatePresence mode="wait" custom={direction}>
        <BrochurePage key={currentPage} direction={direction}>
          {renderPage()}
        </BrochurePage>
      </AnimatePresence>
    </div>
  );
}
