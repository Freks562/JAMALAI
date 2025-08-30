"use client";
import React, { useState } from "react";
import { useCrisis } from "@/components/CrisisContext";

type ModerationAction = "allow" | "soft_block" | "block";
type ModerationResult = { action?: ModerationAction; resources?: any } | null;

export default function ChatInput() {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { setTriggered } = useCrisis();

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);

    const msg = text.trim();
    if (!msg || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/moderate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: msg }),
      });

      let data: ModerationResult = null;
      try { data = (await res.json()) as ModerationResult; } catch {}

      if (data?.action === "block" || data?.action === "soft_block") {
        setTriggered(true);
        return; // keep message visible; do not clear
      }

      // normal flow — hook up your bot here
      setText("");
    } catch {
      setErrMsg("Could not send right now. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSend} className="flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message…"
        aria-label="Message"
        disabled={sending}
      />
      <button type="submit" className="border rounded px-3 py-2" disabled={sending}>
        {sending ? "Send…" : "Send"}
      </button>
      {errMsg && <span className="text-red-600 text-sm">{errMsg}</span>}
    </form>
  );
}