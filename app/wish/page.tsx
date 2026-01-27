"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Brochure from "@/components/brochure/Brochure";

function WishContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "Someone Special";
  const to = searchParams.get("to") || "You";

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <Brochure senderName={from} receiverName={to} />
    </main>
  );
}

function LoadingFallback() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="animate-pulse text-center">
        <div className="text-5xl mb-4">
          <span role="img" aria-label="heart">
            &#10084;
          </span>
        </div>
        <p className="text-foreground/70">Loading your special message...</p>
      </div>
    </main>
  );
}

export default function WishPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WishContent />
    </Suspense>
  );
}
