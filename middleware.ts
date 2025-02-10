import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Apply caching only for images and videos
  if (url.startsWith("/video") || url.startsWith("/Image")) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return res;
  }

  return NextResponse.next();
}