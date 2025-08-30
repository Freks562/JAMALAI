"use client";
import React from "react";
import { useCrisis } from "@/components/CrisisContext";

export default function CrisisBanner() {
  const { triggered, setTriggered } = useCrisis();
  if (!triggered) return null;

  return (
    <div style={{
      background: "#fff8e1",
      border: "1px solid #f6c163",
      padding: "12px 14px",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <strong>Resources — Crisis &amp; Immediate Help:</strong>{" "}
      <a href="tel:988">Call 988</a>,{" "}
      <a href="https://988lifeline.org/chat/" target="_blank" rel="noreferrer">Chat</a>,{" "}
      Veterans: <a href="tel:988,,1">988 then 1</a>.{" "}
      <a href="https://findahelpline.com" target="_blank" rel="noreferrer">Find local help</a>
      <button
        onClick={() => setTriggered(false)}
        style={{ marginLeft: 12, padding: "4px 10px", border: "1px solid #333", borderRadius: 6 }}
      >
        Dismiss
      </button>
    </div>
  );
}