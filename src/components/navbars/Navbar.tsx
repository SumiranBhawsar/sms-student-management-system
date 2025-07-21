"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; // Assuming you use NextAuth.js
import NavLink from "@/components/navbars/NavLink";
import { Button } from "../ui/button";

// Mock session hook for demonstration if you don't have next-auth setup yet
// import { useSession, signOut } from "@/mocks/next-auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const userRole = session?.user?.role; // e.g., 'ADMIN', 'FACULTY', 'STUDENT'

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="SMS Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-semibold text-xl text-gray-800">
            EduSys
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {/* Role-based navigation */}
          {userRole === 'ADMIN' && <NavLink href="/dashboard/admin">Admin Panel</NavLink>}
          {userRole === 'FACULTY' && <NavLink href="/dashboard/faculty">Faculty Portal</NavLink>}
          {userRole === 'STUDENT' && <NavLink href="/dashboard/student">Student Portal</NavLink>}
          
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/about">About Us</NavLink>

          <div className="flex items-center space-x-3">
            {session? (
              <Button
                onClick={() => signOut()}
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">
                    Sign In
                  </Button>
                </Link>
                {/* Sign Up can be an admin-only feature, so we hide it from the public navbar */}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Icon for menu/close */}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white mt-2 p-4 rounded-lg shadow-lg md:hidden z-50">
          {/* Mobile links here */}
        </div>
      )}
    </div>
  );
}