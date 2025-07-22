import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Management System",
  description: "A modern solution for managing students, faculty, and courses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>
          {/* The gradient classes have been added here, and the solid
            background class `bg-gray-50` has been removed.
          */}
          <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}