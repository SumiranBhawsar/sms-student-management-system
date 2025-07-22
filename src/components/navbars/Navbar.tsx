// src/components/Navbar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import NavLink from "@/components/navbars/NavLink";
import { Button } from "../ui/button";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const userRole = session?.user?.role;

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
                    {userRole === "ADMIN" && (
                        <NavLink href="/admin/dashboard">Admin Panel</NavLink>
                    )}
                    {userRole === "FACULTY" && (
                        <NavLink href="/dashboard/faculty">
                            Faculty Portal
                        </NavLink>
                    )}
                    {userRole === "STUDENT" && (
                        <NavLink href="/dashboard/student">
                            Student Portal
                        </NavLink>
                    )}

                    <NavLink href="/courses">Courses</NavLink>
                    <NavLink href="/about">About Us</NavLink>

                    {/* Render the Sign Out button only if a session exists */}
                    {session && (
                        <div className="flex items-center">
                            <Button
                                onClick={() => signOut()}
                                className="bg-gray-800 text-white hover:bg-gray-700"
                            >
                                Sign Out
                            </Button>
                        </div>
                    )}
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
