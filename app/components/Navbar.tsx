"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, Shield } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useToast } from "./Toast";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  // Close user menu on outside click
  useEffect(() => {
    if (!showUserMenu) return;
    const handleClick = () => setShowUserMenu(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showUserMenu]);

  const handleLogout = async () => {
    await logout();
    showToast("로그아웃 되었습니다.", "success");
    router.push("/");
  };

  const navLinks = [
    { name: "협회소개", href: "/about" },
    { name: "교육과정", href: "/courses" },
    { name: "갤러리", href: "/gallery" },
    { name: "커뮤니티", href: "/community" },
  ];

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/apply" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-white py-4 sm:py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA Logo"
              width={160}
              height={40}
              priority
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 lg:px-4 py-2 rounded-full text-[15px] font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#e8f0fe] text-[#0b57d0]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu((v) => !v);
                  }}
                  className="flex items-center gap-2.5 hover:bg-gray-50 pl-3 pr-4 py-2 rounded-full transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0b57d0] text-white flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-[14px] font-medium text-gray-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{user.email}</p>
                      {user.isAdmin && (
                        <span className="inline-block mt-1.5 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          관리자
                        </span>
                      )}
                    </div>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-gray-400" />
                        관리자 페이지
                      </Link>
                    )}
                    <Link
                      href="/mypage"
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      마이페이지
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-gray-400" />
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-[#0b57d0] hover:bg-[#f3f7fe] px-5 py-2.5 rounded-full font-medium text-[15px] transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#e8f0fe] text-[#0b57d0]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-px bg-gray-100 my-2"></div>

          <div className="flex flex-col gap-2 px-2 pt-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="w-9 h-9 rounded-full bg-[#0b57d0] text-white flex items-center justify-center text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    className="w-full text-center bg-amber-500 text-white hover:bg-amber-600 px-5 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    관리자 페이지
                  </Link>
                )}
                <Link
                  href="/mypage"
                  className="w-full text-center bg-[#0b57d0] text-white hover:bg-[#004aba] px-5 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center text-gray-700 hover:bg-gray-50 border border-gray-200 px-5 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="w-full text-center bg-[#0b57d0] text-white hover:bg-[#004aba] px-5 py-3 rounded-full font-medium transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
