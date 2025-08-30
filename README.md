## Safety Guardrails

This app includes lightweight safety features:

- **Crisis banner** (`src/components/CrisisBanner.tsx`): accessible, dismissible; 988 + Veterans Crisis Line CTAs.
- **Tripwire** (`src/hooks/useSafetyTripwire.ts` + `src/lib/safetyKeywords.ts`): flags risky phrases and opens the banner.
- **Moderation API** (`src/app/api/moderate/route.ts`): returns `{ action: "allow" | "soft_block" | "block", resources }` using heuristics (OpenAI can be added).
- **Context** (`src/context/CrisisContext.tsx`): global state to trigger/show the banner.
- **Footer/meta**: referrer policy and safety footer.

**Env vars:**