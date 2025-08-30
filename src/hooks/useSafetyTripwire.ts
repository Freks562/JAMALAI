"use client";

import { useEffect } from "react";
import { useCrisis } from "@/components/CrisisContext";

/**
 * Lightweight client-side tripwire.
 * If the user types risky phrases, it just raises the crisis banner.
 * (It never blocks typing or calls the API.)
 */
export function useSafetyTripwire(text?: string | null) {
  const { setTriggered } = useCrisis();

  useEffect(() => {
    if (!text) return;

    const s = String(text).toLowerCase();

    // Keep this simple; the server/API does the real moderation.
    const risky =
      s.includes("kill myself") ||
      s.includes("suicide") ||
      s.includes("end my life");

    if (risky) setTriggered(true);
  }, [text, setTriggered]);
}