// src/components/auth/SignInForm.tsx

"use client";

import React, { useState } from "react"; // Import useState
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

export default function SignInForm() {
    const router = useRouter();
    // State to manage password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rememberMe = formData.get("remember-me") === "on";

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            rememberMe,
        });

        if (result?.ok) {
            router.push("/dashboard");
        } else {
            alert(result?.error || "Invalid email or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Password
                </label>
                {/* Wrap input and button in a relative container */}
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        // Dynamically set the input type
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 pr-10"
                    />
                    {/* Position the toggle button inside the input field */}
                    <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                        {isPasswordVisible ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <Link
                        href="/auth/forgot-password"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}
