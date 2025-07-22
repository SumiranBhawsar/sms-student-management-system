"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/tw";

const AcademicsNavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link 
            href={href}
            className={cn(
                "pb-2 border-b-2 transition-colors",
                isActive ? "border-blue-600 text-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
        >
            {children}
        </Link>
    );
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Academics</h1>
        <p className="text-muted-foreground">Manage departments, courses, and subjects.</p>
      </div>
      <div className="flex items-center space-x-6 border-b">
        <AcademicsNavLink href="/admin/academics/departments">Departments</AcademicsNavLink>
        <AcademicsNavLink href="/admin/academics/courses">Courses</AcademicsNavLink>
        <AcademicsNavLink href="/admin/academics/subjects">Subjects</AcademicsNavLink>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}