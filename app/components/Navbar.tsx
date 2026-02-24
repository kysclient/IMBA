"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      // eslint-disable-next-line
      setMobileMenuOpen(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const navLinks = [
    { name: "협회소개", href: "/about" },
    { name: "교육과정", href: "/courses" },
    { name: "갤러리", href: "/gallery" },
    { name: "커뮤니티", href: "/community" },
    { name: "스토어", href: "/store" },
  ];

  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/apply"
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
            <Link
              href="/login"
              className="text-[#0b57d0] hover:bg-[#f3f7fe] px-5 py-2.5 rounded-full font-medium text-[15px] transition-colors"
            >
              로그인
            </Link>
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
            <Link
              href="/login"
              className="w-full text-center bg-[#0b57d0] text-white hover:bg-[#004aba] px-5 py-3 rounded-full font-medium transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
