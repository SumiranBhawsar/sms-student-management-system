"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Simulated API call (replace with real one if available)
const getSystemStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    totalStudents: 1250,
    totalFaculty: 75,
    activeCourses: 150,
  };
};

export default function QuickStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["system-stats"], // ✅ MUST provide a key
    queryFn: getSystemStats,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-3xl p-8 text-white h-full"
    >
      <h2 className="text-3xl font-bold leading-tight mb-6">
        Institution at a Glance
      </h2>

      <div className="space-y-6">
        <StatItem
          isLoading={isLoading}
          label="Total Students"
          value={stats?.totalStudents}
        />
        <StatItem
          isLoading={isLoading}
          label="Active Faculty"
          value={stats?.totalFaculty}
        />
        <StatItem
          isLoading={isLoading}
          label="Active Courses"
          value={stats?.activeCourses}
        />
      </div>

      <p className="text-gray-400 text-sm mt-8">
        Real-time data to empower administrative decisions and planning.
      </p>
    </motion.div>
  );
}

const StatItem = ({
  isLoading,
  label,
  value,
}: {
  isLoading: boolean;
  label: string;
  value?: number;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-300">{label}</span>
    {isLoading ? (
      <div className="h-8 w-20 bg-gray-700 rounded-md animate-pulse" />
    ) : (
      <span className="text-2xl font-semibold text-blue-400">
        {value?.toLocaleString()}
      </span>
    )}
  </div>
);
