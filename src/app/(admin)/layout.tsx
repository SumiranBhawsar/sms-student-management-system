import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";

export default function AdminSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout wraps all pages inside the (admin) route group
  // with the main dashboard shell (sidebar, header, etc.).
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}