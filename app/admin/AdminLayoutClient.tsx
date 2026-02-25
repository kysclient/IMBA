"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import {
  LayoutDashboard,
  Users,
  FileText,
  ImageIcon,
  MessageSquare,
  BookOpen,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { name: "대시보드", href: "/admin", icon: LayoutDashboard },
  { name: "회원 관리", href: "/admin/users", icon: Users },
  { name: "교육과정 관리", href: "/admin/courses", icon: BookOpen },
  { name: "수강신청 관리", href: "/admin/applications", icon: FileText },
  { name: "갤러리 관리", href: "/admin/gallery", icon: ImageIcon },
  { name: "게시판 관리", href: "/admin/posts", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="w-8 h-8 border-3 border-[#0b57d0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA Logo"
              width={120}
              height={32}
              className="h-7 w-auto object-contain"
            />
            <span className="text-[11px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium mb-1 transition-colors ${
                  isActive
                    ? "bg-[#e8f0fe] text-[#0b57d0]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <link.icon
                  className={`w-[18px] h-[18px] ${
                    isActive ? "text-[#0b57d0]" : "text-gray-400"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="px-3 py-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-[18px] h-[18px]" />
            사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-5 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg mr-3"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-8 h-8 rounded-full bg-[#0b57d0] text-white flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user.name}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
