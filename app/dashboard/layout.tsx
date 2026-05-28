"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BottomNavbar from "@/components/BottomNavbar";
import { readSession } from "@/lib/sessions";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (!readSession()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen pb-20">
      {children}
      <BottomNavbar />
    </div>
  );
}
