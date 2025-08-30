"use client";
import { CrisisProvider } from "@/components/CrisisContext";
import CrisisBanner from "@/components/CrisisBanner";

export default function CrisisClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <CrisisProvider>
      <CrisisBanner />
      {children}
    </CrisisProvider>
  );
}