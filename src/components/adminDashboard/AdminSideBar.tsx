"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils/tw";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

// Using the styled NavItem from Sidebar 1
const NavItem = ({ href, label }: { href: string; label: string; }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center py-2 text-[#6C7894] hover:text-blue-600 transition-colors", // Using blue for hover to match your theme
          isActive && "text-blue-600 font-semibold" // Using blue for active state
        )}
      >
        <span className="font-normal text-lg">{label}</span>
      </Link>
    </li>
  );
};

// Using the styled NavSection from Sidebar 1
const NavSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h4 className="text-blue-600 font-normal text-lg px-5">{title}</h4>
    <nav>
      <ul className="space-y-4 px-5">{children}</ul>
    </nav>
  </div>
);


const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  // This navLinks structure uses the new components but keeps the links from Sidebar 2
  const navLinks = (
      <div className="flex flex-col gap-8 mt-10">
        <NavSection title="Menu">
            <NavItem href="/admin/dashboard" label="Dashboard" />
            <NavItem href="/admin/users" label="User Management" />
            <NavItem href="/admin/academics/departments" label="Departments" />
            <NavItem href="/admin/academics/courses" label="Courses" />
            <NavItem href="/admin/academics/subjects" label="Subjects" />
            <NavItem href="/admin/sections" label="Sections" />
            <NavItem href="/admin/settings" label="Settings" />
        </NavSection>
      </div>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
      )}

      {/* Desktop Sidebar */}
      <div className="p-4 sm:p-6 pl-0 sm:pl-0 lg:pl-6 hidden lg:block">
        <aside
          className={cn(
            "h-full bg-white shadow-sm rounded-2xl",
            "w-64"
          )}
        >
          <div className="flex-1 py-6">
            {navLinks}
          </div>
        </aside>
      </div>

       {/* Mobile Sidebar */}
       <aside
          className={cn(
            "fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-50",
            "w-64",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex-1 py-6">
            {navLinks}
          </div>
        </aside>
    </>
  );
};

export default AdminSideBar;