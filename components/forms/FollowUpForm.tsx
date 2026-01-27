"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface FollowUpFormProps {
  visitId: Id<"visits"> | null;
  onSuccess: () => void;
}

export default function FollowUpForm({ visitId, onSuccess }: FollowUpFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createFollowup = useMutation(api.followups.create);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setError("Please provide either a phone number or email");
      return;
    }

    if (!visitId) {
      setError("Session error. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createFollowup({
        visitId,
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
      });
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-foreground/80 text-sm mb-4">
        We&apos;d love to connect with you! Please share your contact info.
      </p>

      <Input
        label="Your Name *"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Your phone number"
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
      />

      <p className="text-xs text-foreground/60">
        * Name is required. Please provide at least one contact method (phone or email).
      </p>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Stay Connected"}
      </Button>
    </form>
  );
}
