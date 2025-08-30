// src/lib/crisis.ts
export type CrisisResources = {
  us988: { call: string; text: string; chat: string; note?: string };
  veterans: { call: string; text: string; chat: string; note?: string };
  local?: { call?: string; url?: string; note?: string };
};

export function getCrisisResources(): CrisisResources {
  const localPhone = process.env.CRISIS_LOCAL_PHONE ?? "800-854-7771"; // LA County ACCESS Line (safe default)
  const localUrl   = process.env.CRISIS_LOCAL_URL   ?? "https://dmh.lacounty.gov/";

  return {
    us988: {
      call: "988",
      text: "988",
      chat: "https://988lifeline.org/chat/",
      note: "24/7 Suicide & Crisis Lifeline (US)",
    },
    veterans: {
      call: "988, then press 1",
      text: "838255",
      chat: "https://www.veteranscrisisline.net/get-help-now/chat/",
      note: "Veterans Crisis Line",
    },
    local: {
      call: localPhone,
      url:  localUrl,
      note: "Local option",
    },
  };
}