"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center group mb-6">
              <Image
                src="/main_logo_v2.png"
                alt="IMBA Logo"
                width={160}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              국제메디컬뷰티협회(IMBA)는 글로벌 기준의 체계적인 뷰티 교육과
              전문가 양성을 통해 메디컬 뷰티 산업의 새로운 표준을 만들어갑니다.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0b57d0] hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0b57d0] hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0b57d0] hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">
              빠른 메뉴
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  협회 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  교육 과정
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  갤러리
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">
              고객 지원
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/community?category=Q%26A"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  href="/community?category=공지사항"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  공지사항
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all font-medium text-[#0b57d0]"
                >
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">
              문의하기
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <span>
                  서울특별시 강남구 테헤란로 123
                  <br />
                  뷰티타워 15층
                </span>
              </li>
              <li className="flex gap-3 text-slate-400 items-center">
                <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                <span>
                  <a
                    href="tel:02-1234-5678"
                    className="hover:text-white transition-colors"
                  >
                    02-1234-5678
                  </a>
                </span>
              </li>
              <li className="flex gap-3 text-slate-400 items-center">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <span>
                  <a
                    href="mailto:jyun_beauty@naver.com"
                    className="hover:text-white transition-colors"
                  >
                    jyun_beauty@naver.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} International Medical Beauty Association. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <span>사업자등록번호: 123-45-67890</span>
            <span>대표: 이자윤</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
