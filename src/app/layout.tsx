// src/app/layout.tsx
import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = { title: "JamaIA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}