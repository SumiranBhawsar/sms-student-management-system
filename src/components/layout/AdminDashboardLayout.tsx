"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import AdminSideBar from "@/components/adminDashboard/AdminSideBar";
import { Bell, LogOut, User as UserIcon } from "lucide-react";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  // const firstName = session?.user?.name?.split(' ')[0] || 'Admin';

  return (
    // Removed padding and adjusted gap for a full-screen layout
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col p-4 sm:p-6 gap-6">
        {/* Header */}
        <header className="flex h-16 items-center justify-between rounded-lg bg-white/80 backdrop-blur-sm px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
                {session?.user?.name?.slice(0, 2).toUpperCase() || <UserIcon size={16} />}
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="font-semibold text-sm">{session?.user?.name}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })} 
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;