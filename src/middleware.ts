import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (accept.includes("text/markdown")) {
    const pathname = request.nextUrl.pathname;

    // Do not rewrite internal API, next.js internals, studio, or asset files
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/studio") ||
      pathname.startsWith("/.well-known") ||
      pathname.endsWith(".ico") ||
      pathname.endsWith(".png") ||
      pathname.endsWith(".jpg") ||
      pathname.endsWith(".svg") ||
      pathname.endsWith(".txt") ||
      pathname.endsWith(".xml") ||
      pathname.endsWith(".json")
    ) {
      return NextResponse.next();
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/api/markdown";
    rewriteUrl.searchParams.set("path", pathname);
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and next internals
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

