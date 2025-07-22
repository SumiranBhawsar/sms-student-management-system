"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-green-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg text-center border border-gray-200"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <AlertCircle className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          You do not have permission to view this page.<br />
          Please contact your administrator or try logging in with the correct role.
        </p>

        <Link href="/signin">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">
            Back to Sign In
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
