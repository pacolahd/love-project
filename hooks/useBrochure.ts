"use client";

import { useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export type BrochurePage =
  | "cover"
  | "giftSelection"
  | "gospel"
  | "purity"
  | "share";

interface UseBrochureProps {
  senderName: string;
  receiverName: string;
}

export function useBrochure({ senderName, receiverName }: UseBrochureProps) {
  const [currentPage, setCurrentPage] = useState<BrochurePage>("cover");
  const [visitId, setVisitId] = useState<Id<"visits"> | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);

  const createVisit = useMutation(api.visits.create);
  const markOptionViewed = useMutation(api.visits.markOptionViewed);

  const initializeVisit = useCallback(async () => {
    if (!visitId && senderName && receiverName) {
      const id = await createVisit({ senderName, receiverName });
      setVisitId(id);
      return id;
    }
    return visitId;
  }, [visitId, senderName, receiverName, createVisit]);

  const goToPage = useCallback(
    (page: BrochurePage, dir: "forward" | "backward" = "forward") => {
      setDirection(dir);
      setCurrentPage(page);
    },
    []
  );

  const selectOption = useCallback(
    async (option: 1 | 2) => {
      let currentVisitId = visitId;
      if (!currentVisitId) {
        currentVisitId = await initializeVisit();
      }
      if (currentVisitId) {
        await markOptionViewed({ visitId: currentVisitId, option });
      }
      goToPage(option === 1 ? "gospel" : "purity", "forward");
    },
    [visitId, initializeVisit, markOptionViewed, goToPage]
  );

  const openFollowUpModal = useCallback(() => {
    setIsFollowUpModalOpen(true);
  }, []);

  const closeFollowUpModal = useCallback(() => {
    setIsFollowUpModalOpen(false);
  }, []);

  const goToOtherOption = useCallback(() => {
    if (currentPage === "gospel") {
      selectOption(2);
    } else if (currentPage === "purity") {
      selectOption(1);
    }
  }, [currentPage, selectOption]);

  const goToShare = useCallback(() => {
    goToPage("share", "forward");
  }, [goToPage]);

  const goBack = useCallback(() => {
    if (currentPage === "gospel" || currentPage === "purity") {
      goToPage("giftSelection", "backward");
    } else if (currentPage === "giftSelection") {
      goToPage("cover", "backward");
    } else if (currentPage === "share") {
      goToPage("giftSelection", "backward");
    }
  }, [currentPage, goToPage]);

  return {
    currentPage,
    direction,
    visitId,
    senderName,
    receiverName,
    isFollowUpModalOpen,
    goToPage,
    selectOption,
    goToOtherOption,
    goToShare,
    goBack,
    initializeVisit,
    openFollowUpModal,
    closeFollowUpModal,
  };
}
