// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const role = token?.role;
    const path = req.nextUrl.pathname;

    // Redirect /dashboard to respective role dashboard
    if (path === "/dashboard") {
      if (role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      if (role === "HOD") return NextResponse.redirect(new URL("/hod/dashboard", req.url));
      if (role === "FACULTY") return NextResponse.redirect(new URL("/faculty/dashboard", req.url));
      if (role === "STUDENT") return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    // Role-based protection
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/hod") && role !== "HOD") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/faculty") && role !== "FACULTY") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/student") && role !== "STUDENT") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // Protect all matched routes — must be logged in
      },
    },
    pages: {
      signIn: "/signin", // Custom sign-in page
    },
  }
);

// Protect only the necessary routes
export const config = {
  matcher: [
    "/dashboard",
    "/admin/:path*",
    "/hod/:path*",
    "/faculty/:path*",
    "/student/:path*",
  ],
};
