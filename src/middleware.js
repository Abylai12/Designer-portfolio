// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const protectedRoutes = ["/api/get-me", "/api/user", "/api/project"];

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);

  const userId = payload.id;

  const isProtectedRoute = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  if (token) {
    try {
      if (!userId) {
        return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
          status: 401,
        });
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("user-id", userId);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      return response;
    } catch (error) {
      console.error("Token verification failed:", error);
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }
  }

  // Allow non-protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/get-me", "/api/user", "/api/project/(.*)"],
};
