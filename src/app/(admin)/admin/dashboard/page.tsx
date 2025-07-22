"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Library, School, ArrowUpRight } from "lucide-react";
import { useState } from "react";

// A reusable, aesthetic component for the stat cards with colorful icons
const StatCard = ({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: string | number;
    icon: React.ElementType;
}) => {
    // Determine icon colors based on the title for variety
    let iconColorClass = "text-gray-500";
    let bgColorClass = "bg-gray-100";

    if (
        title.includes("Students") ||
        title.includes("Faculty") ||
        title.includes("Signups")
    ) {
        iconColorClass = "text-indigo-500";
        bgColorClass = "bg-indigo-100";
    } else if (
        title.includes("Courses") ||
        title.includes("Sections") ||
        title.includes("Enrollments")
    ) {
        iconColorClass = "text-sky-500";
        bgColorClass = "bg-sky-100";
    }

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xl font-bold">{value}</p>
                        <p className="text-sm text-muted-foreground">{title}</p>
                    </div>
                    <div className={`p-3 rounded-md ${bgColorClass}`}>
                        <Icon className={`h-5 w-5 ${iconColorClass}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function AdminDashboardPage() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Placeholder data
    const stats = {
        totalStudents: 1250,
        totalFaculty: 75,
        newSignups: 58,
        totalCourses: 150,
        totalEnrollments: "4.5k", // Using string for abbreviation
        activeSections: 210,
    };

    return (
        <div className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
            {/* Header with Date Filters */}
            <div className="flex flex-wrap items-center justify-end gap-4">
                <div>
                    <label
                        htmlFor="from-date"
                        className="font-medium mr-2 text-sm"
                    >
                        From:
                    </label>
                    <input
                        id="from-date"
                        type="date"
                        className="border rounded px-3 text-sm py-1 focus:outline-none"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="to-date"
                        className="font-medium mr-2 text-sm"
                    >
                        To:
                    </label>
                    <input
                        id="to-date"
                        type="date"
                        className="border rounded px-3 text-sm py-1 focus:outline-none"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <button
                    className="ml-2 px-4 py-1 rounded-sm bg-blue-600 text-white"
                    onClick={() => {
                        setFromDate("");
                        setToDate("");
                    }}
                >
                    Reset
                </button>
            </div>

            {/* Course & Enrollment Activity Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Course & Enrollment Activity
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        title="Total Courses"
                        value={stats.totalCourses}
                        icon={BookOpen}
                    />
                    <StatCard
                        title="Total Enrollments"
                        value={stats.totalEnrollments}
                        icon={Library}
                    />
                    <StatCard
                        title="Active Sections"
                        value={stats.activeSections}
                        icon={School}
                    />
                </div>
            </div>

            {/* Total Users Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        title="Active Students"
                        value={stats.totalStudents}
                        icon={Users}
                    />
                    <StatCard
                        title="Active Faculty"
                        value={stats.totalFaculty}
                        icon={Users}
                    />
                    <StatCard
                        title="New Signups"
                        value={stats.newSignups}
                        icon={ArrowUpRight}
                    />
                </div>
            </div>
        </div>
    );
}
