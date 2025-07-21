// src/components/auth/SignInPageContent.tsx

"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box } from "lucide-react";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPageContent() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    const userRole = session?.user?.role;
    router.push(`/dashboard/${userRole?.toLowerCase() || ''}`);
  }, [session, router]);

  return (
    // The background gradient classes have been removed from this line
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 lg:p-12">
        {/* Header Section */}
        <header className="flex flex-wrap items-center justify-between gap-y-4 gap-x-8 mb-12">
          <Link href="/" className="flex items-center space-x-3">
            <Box className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">EduSys</span>
          </Link>

          <nav className="flex items-center space-x-6 text-gray-600 font-medium">
            <Link href="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center">
            <Link href="/auth/signin">
              <button className="px-5 py-2.5 font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        </header>

        {/* Sign-In Form Section */}
        <main className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to EduSys</h1>
            <p className="text-gray-500 mt-2">Sign in to access your portal</p>
          </div>
          <SignInForm />
        </main>
      </div>
    </div>
  );
}