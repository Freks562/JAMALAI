// src/lib/safetyKeywords.ts

export type SafetyAction = "allow" | "soft_block" | "block";

const blockMatchers: RegExp[] = [
  /\bkill myself\b/i,
  /\bcommit suicide\b/i,
  /\bend my life\b/i,
  /\boverdose\b/i,
  /\bi want to die\b/i,
];

const softMatchers: RegExp[] = [
  /\bhurt myself\b/i,
  /\bself[- ]?harm\b/i,
  /\bcutting\b/i,
  /\bi feel hopeless\b/i,
  /\bi can’t go on\b/i,
];

/** Classify the input text into allow | soft_block | block */
export function classifySafety(text: string): SafetyAction {
  const t = text ?? "";
  if (blockMatchers.some(rx => rx.test(t))) return "block";
  if (softMatchers.some(rx => rx.test(t))) return "soft_block";
  return "allow";
}

/** Crisis resources displayed in the banner / API */
export function getCrisisResources() {
  return {
    nationals: [
      { call: "988", text: "988", chat: "988lifeline.org/chat" },
    ],
    veterans: [
      { call: "988, then 1", text: "838255", chat: "veteranscrisisline.net/chat" },
    ],
    local: [
      { call: "911", url: "findahelpline.com" },
    ],
  };
}