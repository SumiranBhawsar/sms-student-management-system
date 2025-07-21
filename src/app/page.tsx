import { Metadata } from "next";
import AppLayout from "@/components/layout/AppLayout";
import Hero from "@/components/home/Hero";
import QuickStats from "@/components/home/QuickStats";
import FeatureGrid from "@/components/home/FeatureGrid";

export const metadata: Metadata = {
  title: "Student Management System - Welcome",
  description: "Efficiently manage your educational institution with our all-in-one platform.",
};

export default function Home() {
  return (
    <AppLayout>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-6 sm:mt-8">
        <div className="flex flex-col justify-center">
          <Hero />
        </div>
        <div className="flex flex-col justify-center">
          <QuickStats />
        </div>
      </div>
      <div className="mt-16 sm:mt-24">
        <FeatureGrid />
      </div>
    </AppLayout>
  );
}