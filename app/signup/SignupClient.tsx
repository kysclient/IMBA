"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";
import { useToast } from "../components/Toast";

export default function SignupPage() {
  const router = useRouter();
  const { user, refresh } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "회원가입에 실패했습니다.");
        showToast(data.error || "회원가입에 실패했습니다.", "error");
        return;
      }

      await refresh();
      showToast("회원가입이 완료되었습니다! 환영합니다.", "success");
      router.push("/");
    } catch {
      setError("서버에 연결할 수 없습니다.");
      showToast("서버에 연결할 수 없습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans relative">
      <div
        className="w-full max-w-[1040px] bg-white rounded-[28px] md:flex overflow-hidden relative z-10 mx-auto mt-4 sm:mt-0 shadow-sm"
        style={{ minHeight: "520px" }}
      >
        {/* Left Side (Text / Branding) */}
        <div className="w-full md:w-[45%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col">
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
        <div className="w-full md:w-[55%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col justify-center">
          <form
            className="space-y-6 w-full max-w-[450px]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              </div>

              {/* Phone Input */}
              <div className="relative group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                  placeholder="휴대폰번호"
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                >
                  휴대폰번호
                </label>
              </div>

              {/* Password Input */}
              <div className="flex flex-col sm:flex-row gap-5 pt-3">
                <div className="relative group w-full sm:w-1/2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                disabled={loading}
                className="bg-[#0b57d0] text-white hover:bg-[#004aba] px-6 py-2.5 rounded-full font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0b57d0] w-full sm:w-auto min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "처리 중..." : "다음"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer / Meta links */}
      <div className="w-full max-w-[1040px] px-2 sm:px-6 pt-6 pb-2 mx-auto flex justify-end items-center text-xs text-[#444746]">
        <div className="flex gap-1">
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
