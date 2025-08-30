"use client";
import React, { createContext, useContext, useState } from "react";

type Ctx = {
  triggered: boolean;
  setTriggered: (b: boolean) => void;
};

const CrisisCtx = createContext<Ctx | null>(null);

export function CrisisProvider({ children }: { children: React.ReactNode }) {
  const [triggered, setTriggered] = useState(false);
  return (
    <CrisisCtx.Provider value={{ triggered, setTriggered }}>
      {children}
    </CrisisCtx.Provider>
  );
}

export function useCrisis() {
  const v = useContext(CrisisCtx);
  if (!v) throw new Error("useCrisis must be used within CrisisProvider");
  return v;
}