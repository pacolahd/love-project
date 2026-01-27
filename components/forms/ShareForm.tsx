"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function ShareForm() {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const createShare = useMutation(api.shares.create);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!senderName.trim() || !receiverName.trim()) {
      setError("Please fill in both names");
      return;
    }

    setIsSubmitting(true);

    try {
      await createShare({
        senderName: senderName.trim(),
        receiverName: receiverName.trim(),
      });

      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const link = `${baseUrl}/wish?from=${encodeURIComponent(senderName.trim())}&to=${encodeURIComponent(receiverName.trim())}`;
      setGeneratedLink(link);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy. Please copy the link manually.");
    }
  };

  if (generatedLink) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">
            <span role="img" aria-label="gift">
              &#127873;
            </span>
          </div>
          <h3 className="text-xl font-serif text-foreground mb-2">
            Your Valentine&apos;s Link is Ready!
          </h3>
          <p className="text-foreground/70 text-sm">
            Share this special link with {receiverName}
          </p>
        </div>

        <div className="bg-rose-light/50 rounded-lg p-3 break-all text-sm text-foreground/80">
          {generatedLink}
        </div>

        <Button onClick={copyToClipboard} className="w-full">
          {copied ? "Copied!" : "Copy Link"}
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            setGeneratedLink("");
            setSenderName("");
            setReceiverName("");
          }}
          className="w-full"
        >
          Create Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-serif text-foreground mb-2">
          Share the Love
        </h3>
        <p className="text-foreground/70 text-sm">
          Create a personalized Valentine&apos;s message for someone special
        </p>
      </div>

      <Input
        label="Your Name"
        name="senderName"
        value={senderName}
        onChange={(e) => setSenderName(e.target.value)}
        placeholder="Who is this from?"
        required
      />

      <Input
        label="Recipient's Name"
        name="receiverName"
        value={receiverName}
        onChange={(e) => setReceiverName(e.target.value)}
        placeholder="Who is this for?"
        required
      />

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Valentine's Link"}
      </Button>
    </form>
  );
}
