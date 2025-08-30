import { NextRequest, NextResponse } from "next/server";

/**
 * Global middleware (runs on the edge).
 * - Pass-through by default.
 * - If a client sends `X-Safety-Soft-Block: 1` we expose it to the app so UI can show the crisis banner.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // bubble a soft-block hint through to the app (no PII)
  const softBlock = req.headers.get("x-safety-soft-block");
  if (softBlock === "1") {
    res.headers.set("x-safety-soft-block", "1");
  }

  return res;
}

/**
 * Limit to API endpoints we may want to guard plus everything under /app routes by default.
 * Adjust as needed.
 */
export const config = {
  matcher: [
    "/api/chat/:path*",
    "/api/post/:path*",
    "/api/:path*generate:path*",
    // keep general pages too if you want header to propagate everywhere:
    "/((?!_next|.*\\.(?:css|js|png|jpg|jpeg|gif|svg|ico|map)).*)",
  ],
};