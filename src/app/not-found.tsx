// src/app/not-found.tsx

"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

// A new, more aesthetic animated SVG component
const AnimatedNotFoundIllustration = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 600 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="subtle-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <motion.g
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <g filter="url(#subtle-glow)" opacity="0.7">
        <circle cx="300" cy="200" r="100" fill="#EFF6FF" />
        <path d="M280 160 Q300 120 320 160" stroke="#3B82F6" strokeWidth="12" fill="none" strokeLinecap="round" />
        <circle cx="300" cy="250" r="8" fill="#3B82F6" />
      </g>
      <motion.g
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M380 280 L450 350" stroke="#93C5FD" strokeWidth="16" strokeLinecap="round" />
        <circle cx="350" cy="250" r="50" fill="none" stroke="#60A5FA" strokeWidth="16" />
      </motion.g>
    </motion.g>
  </svg>
);

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-10"
      >
        {/* Animated Illustration */}
        <AnimatedNotFoundIllustration className="w-full max-w-sm mx-auto" />
        
        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            It seems we couldn't find the page you were looking for. Let's get you back to safety.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-500/40 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          Go to Homepage
        </Link>
      </motion.div>
    </main>
  );
}