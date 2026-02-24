"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailEntered, setEmailEntered] = useState(false);
  const [email, setEmail] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailEntered && email) {
      setEmailEntered(true);
    } else {
      // Handle login submission
      console.log("Login attempted");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans relative">
      <div
        className="w-full max-w-[1040px] bg-white rounded-[28px] md:flex overflow-hidden relative z-10 mx-auto mt-4 sm:mt-0 shadow-sm"
        style={{ minHeight: "520px" }}
      >
        {/* Left Side (Text / Branding) */}
        <div className="w-full md:w-[45%] p-10 sm:p-12 lg:px-14 lg:py-20 flex flex-col justify-center">
          <Link href="/" className="inline-flex items-center group mb-4 w-max">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA Logo"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>

          <h1 className="text-4xl sm:text-[2.75rem] font-normal tracking-tight text-[#1f1f1f] mb-4 font-sans leading-tight">
            로그인
          </h1>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[55%] p-10 sm:p-12 lg:px-14 flex flex-col justify-center relative">
          <form
            className="space-y-6 w-full max-w-[400px] mt-4 md:mt-0"
            onSubmit={handleNext}
          >
            <div className="space-y-5 min-h-[110px]">
              {/* Email Step */}
              {!emailEntered ? (
                <div className="relative group animate-in fade-in zoom-in-95 duration-300">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                    placeholder="이메일 또는 휴대전화"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    이메일 또는 휴대전화
                  </label>
                  <div className="mt-3 text-sm text-[#444746] font-medium mx-1">
                    <button
                      type="button"
                      className="text-[#0b57d0] hover:underline font-medium text-[14px]"
                    >
                      이메일을 잊으셨나요?
                    </button>
                  </div>
                </div>
              ) : (
                /* Password Step */
                <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="mb-6 flex items-center justify-between border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm inline-flex">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#0b57d0] text-white flex items-center justify-center text-xs font-bold">
                        {email[0]?.toUpperCase() || "U"}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {email}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailEntered(false)}
                      className="ml-4 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500"
                      >
                        <path d="m19 12-7-7-7 7" />
                        <path d="M12 19V5" />
                      </svg>
                    </button>
                  </div>

                  <div className="relative group mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 pr-10 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                      placeholder="비밀번호 입력"
                      required
                      autoFocus
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                    >
                      비밀번호 입력
                    </label>
                  </div>

                  <div className="flex items-center gap-3 mt-1 px-1">
                    <input
                      type="checkbox"
                      id="showPasswordToggleLogin"
                      className="w-[18px] h-[18px] rounded-sm border-[1.5px] border-[#444746] text-[#0b57d0] focus:ring-[#0b57d0] focus:ring-offset-0 cursor-pointer"
                      onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <label
                      htmlFor="showPasswordToggleLogin"
                      className="text-sm text-[#1f1f1f] cursor-pointer select-none"
                    >
                      비밀번호 표시
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              {emailEntered ? (
                <button
                  type="button"
                  className="text-[#0b57d0] hover:bg-[#f3f7fe] px-3 py-2.5 rounded-md font-medium text-sm transition-colors w-full sm:w-auto text-center"
                >
                  비밀번호 찾기
                </button>
              ) : (
                <Link
                  href="/signup"
                  className="text-[#0b57d0] hover:bg-[#f3f7fe] px-3 py-2.5 rounded-md font-medium text-sm transition-colors w-full sm:w-auto text-center"
                >
                  계정 만들기
                </Link>
              )}

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
