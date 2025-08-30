// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "JamalAI VetRights",
  description: "Tools and resources for Veterans",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}