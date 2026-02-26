"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "../components/Toast";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1f1f1f] mb-2">유효하지 않은 링크</h2>
        <p className="text-sm text-gray-500 mb-8">비밀번호 재설정 링크가 올바르지 않습니다.</p>
        <Link
          href="/login"
          className="inline-flex bg-[#0b57d0] text-white hover:bg-[#004aba] px-6 py-2.5 rounded-full font-medium text-sm transition-colors"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1f1f1f] mb-2">비밀번호가 변경되었습니다</h2>
        <p className="text-sm text-gray-500 mb-8">새로운 비밀번호로 로그인해주세요.</p>
        <Link
          href="/login"
          className="inline-flex bg-[#0b57d0] text-white hover:bg-[#004aba] px-6 py-2.5 rounded-full font-medium text-sm transition-colors"
        >
          로그인하기
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        showToast(data.error, "error");
        return;
      }

      setSuccess(true);
      showToast("비밀번호가 변경되었습니다!", "success");
    } catch {
      setError("서버에 연결할 수 없습니다.");
      showToast("서버에 연결할 수 없습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[400px] mx-auto">
      <div className="text-center mb-2">
        <div className="w-14 h-14 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b57d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-1">새 비밀번호 설정</h2>
        <p className="text-sm text-gray-500">안전한 비밀번호를 입력해주세요</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* New Password */}
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 pr-12 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
            placeholder="새 비밀번호"
            required
            autoFocus
          />
          <label
            htmlFor="newPassword"
            className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
          >
            새 비밀번호
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmNewPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
            placeholder="새 비밀번호 확인"
            required
          />
          <label
            htmlFor="confirmNewPassword"
            className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
          >
            새 비밀번호 확인
          </label>
        </div>

        {/* Password strength */}
        {newPassword && (
          <div className="flex items-center gap-2 px-1">
            <div className="flex gap-1 flex-1">
              <div className={`h-1 rounded-full flex-1 transition-colors ${newPassword.length >= 8 ? "bg-green-400" : "bg-gray-200"}`} />
              <div className={`h-1 rounded-full flex-1 transition-colors ${/[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "bg-green-400" : "bg-gray-200"}`} />
              <div className={`h-1 rounded-full flex-1 transition-colors ${/[^A-Za-z0-9]/.test(newPassword) ? "bg-green-400" : "bg-gray-200"}`} />
            </div>
            <span className="text-xs text-gray-500">
              {newPassword.length < 8
                ? "약함"
                : /[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword)
                  ? "강함"
                  : "보통"}
            </span>
          </div>
        )}

        {/* Show password */}
        <div className="flex items-center gap-3 px-1">
          <input
            type="checkbox"
            id="showPwToggle"
            className="w-[18px] h-[18px] rounded-sm border-[1.5px] border-[#444746] text-[#0b57d0] focus:ring-[#0b57d0] focus:ring-offset-0 cursor-pointer"
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showPwToggle" className="text-sm text-[#1f1f1f] cursor-pointer select-none">
            비밀번호 표시
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Link
          href="/login"
          className="text-[#0b57d0] hover:bg-[#f3f7fe] px-3 py-2.5 rounded-md font-medium text-sm transition-colors"
        >
          로그인으로 돌아가기
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0b57d0] text-white hover:bg-[#004aba] px-6 py-2.5 rounded-full font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "변경 중..." : "비밀번호 변경"}
        </button>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans">
      <div
        className="w-full max-w-[540px] bg-white rounded-[28px] overflow-hidden relative z-10 mx-auto shadow-sm p-6 sm:p-10 md:p-14"
      >
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA Logo"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <Suspense fallback={
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-[#0b57d0] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="w-full max-w-[540px] px-2 sm:px-6 pt-6 pb-2 mx-auto flex justify-end items-center text-xs text-[#444746]">
        <div className="flex gap-1">
          <Link href="/privacy" className="hover:bg-gray-200 px-3 py-2 rounded transition-colors font-medium">개인정보처리방침</Link>
          <Link href="/terms" className="hover:bg-gray-200 px-3 py-2 rounded transition-colors font-medium">약관</Link>
        </div>
      </div>
    </div>
  );
}
