import React from "react";
import Navbar from "@/components/navbars/Navbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen py-4 sm:py-6 md:py-8 px-4">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 md:p-8">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppLayout;