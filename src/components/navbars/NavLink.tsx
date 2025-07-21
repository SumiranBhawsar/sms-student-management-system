"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/tw";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "font-semibold text-blue-600",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-gray-600 hover:text-blue-600 transition-colors",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
};