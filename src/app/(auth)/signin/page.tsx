import SignInPageContent from "@/components/auth/SignInPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Student Management System",
  description: "Sign in to the EduSys portal.",
};

export default function SignInPage() {
  return <SignInPageContent />;
}