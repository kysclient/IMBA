"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans relative">
      <div
        className="w-full max-w-[1040px] bg-white rounded-[28px] md:flex overflow-hidden relative z-10 mx-auto mt-4 sm:mt-0 shadow-sm"
        style={{ minHeight: "520px" }}
      >
        {/* Left Side (Text / Branding) */}
        <div className="w-full md:w-[45%] p-10 sm:p-12 lg:px-14 lg:py-20 flex flex-col">
          <Link href="/" className="inline-flex items-center group mb-8 w-max">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA Logo"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>

          <h1 className="text-4xl sm:text-[2.75rem] font-normal tracking-tight text-[#1f1f1f] mb-4 font-sans leading-tight">
            계정 만들기
          </h1>
          <p className="text-[1.1rem] text-[#1f1f1f] mb-8 md:mb-0">
            새로운 여정을 시작하세요
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[55%] p-10 sm:p-12 lg:px-14 lg:py-20 flex flex-col justify-center">
          <form
            className="space-y-6 w-full max-w-[450px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              {/* Name Input */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                  placeholder="이름 성"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                >
                  이름 (실명)
                </label>
              </div>

              {/* Email Input */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                  placeholder="이메일 주소"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                >
                  이메일 주소
                </label>
                <div className="mt-2 text-sm text-[#444746] font-medium mx-1">
                  또는{" "}
                  <Link
                    href="/signup/phone"
                    className="text-[#0b57d0] hover:underline font-medium"
                  >
                    전화번호 사용
                  </Link>
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col sm:flex-row gap-5 pt-3">
                <div className="relative group w-full sm:w-1/2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 pr-10 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                    placeholder="비밀번호"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    비밀번호
                  </label>
                </div>

                <div className="relative group w-full sm:w-1/2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 pr-10 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                    placeholder="비밀번호 확인"
                    required
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    확인
                  </label>
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex flex-col gap-2 mt-2 px-1">
                <p className="text-[13px] text-[#444746]">
                  문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <input
                    type="checkbox"
                    id="showPasswordToggle"
                    className="w-[18px] h-[18px] rounded-sm border-[1.5px] border-[#444746] text-[#0b57d0] focus:ring-[#0b57d0] focus:ring-offset-0 cursor-pointer"
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                  <label
                    htmlFor="showPasswordToggle"
                    className="text-sm text-[#1f1f1f] cursor-pointer select-none"
                  >
                    비밀번호 표시
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/login"
                className="text-[#0b57d0] hover:bg-[#f3f7fe] px-3 py-2.5 rounded-md font-medium text-sm transition-colors w-full sm:w-auto text-center"
              >
                대신 로그인
              </Link>
              <button
                type="submit"
                className="bg-[#0b57d0] text-white hover:bg-[#004aba] px-6 py-2.5 rounded-full font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b57d0] w-full sm:w-auto min-w-[100px]"
              >
                다음
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer / Meta links */}
      <div className="w-full max-w-[1040px] px-2 sm:px-6 pt-6 pb-2 mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-[#444746]">
        <div className="mb-4 sm:mb-0">
          <select className="bg-transparent border-none text-xs text-[#444746] font-medium focus:ring-0 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded transition-colors outline-none cursor-pointer">
            <option>한국어</option>
            <option>English (United States)</option>
          </select>
        </div>
        <div className="flex gap-1">
          <Link
            href="/help"
            className="hover:bg-gray-200 px-3 py-2 rounded transition-colors font-medium"
          >
            도움말
          </Link>
          <Link
            href="/privacy"
            className="hover:bg-gray-200 px-3 py-2 rounded transition-colors font-medium"
          >
            개인정보처리방침
          </Link>
          <Link
            href="/terms"
            className="hover:bg-gray-200 px-3 py-2 rounded transition-colors font-medium"
          >
            약관
          </Link>
        </div>
      </div>
    </div>
  );
}
