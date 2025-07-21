/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-3">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Streamline Your
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 leading-tight">
          Institution's Success
        </h1>
      </div>

      <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
        An all-in-one platform to manage students, faculty, courses, attendance, and assignments with ease and efficiency.
      </p>

      <div className="pt-4">
        <Link href="/signin">
          <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
            Get Started
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}