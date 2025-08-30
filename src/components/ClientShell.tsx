"use client";

import React from "react";
import { CrisisProvider } from "@/components/CrisisContext";
import CrisisBanner from "@/components/CrisisBanner";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <CrisisProvider>
      <CrisisBanner />
      {children}
    </CrisisProvider>
  );
}