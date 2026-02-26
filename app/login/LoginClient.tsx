"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";
import { useToast } from "../components/Toast";

interface FoundAccount {
  name: string;
  email: string;
  maskedEmail: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, refresh } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [emailEntered, setEmailEntered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Find email modal
  const [showFindModal, setShowFindModal] = useState(false);
  const [findPhone, setFindPhone] = useState("");
  const [findLoading, setFindLoading] = useState(false);
  const [findError, setFindError] = useState("");
  const [foundAccount, setFoundAccount] = useState<FoundAccount | null>(null);

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailEntered && email) {
      setEmailEntered(true);
      return;
    }

    if (!password) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "로그인에 실패했습니다.");
        showToast(data.error || "로그인에 실패했습니다.", "error");
        return;
      }

      await refresh();
      showToast(`${data.user.name}님, 환영합니다!`, "success");
      router.push("/");
    } catch {
      setError("서버에 연결할 수 없습니다.");
      showToast("서버에 연결할 수 없습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  const openFindModal = () => {
    setShowFindModal(true);
    setFindPhone("");
    setFindError("");
    setFoundAccount(null);
  };

  const closeFindModal = () => {
    setShowFindModal(false);
    setFindPhone("");
    setFindError("");
    setFoundAccount(null);
  };

  const handleFindEmail = async () => {
    if (!findPhone.trim()) {
      setFindError("휴대폰번호를 입력해주세요.");
      return;
    }

    setFindLoading(true);
    setFindError("");

    try {
      const res = await fetch("/api/auth/find-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: findPhone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFindError(data.error);
        setFoundAccount(null);
        return;
      }

      setFoundAccount(data);
    } catch {
      setFindError("서버에 연결할 수 없습니다.");
    } finally {
      setFindLoading(false);
    }
  };

  const selectFoundEmail = () => {
    if (!foundAccount) return;
    setEmail(foundAccount.email);
    closeFindModal();
    showToast("이메일이 입력되었습니다.", "success");
  };

  const openForgotModal = () => {
    setShowForgotModal(true);
    setForgotEmail(email || "");
    setForgotError("");
    setForgotSent(false);
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setForgotError("");
    setForgotSent(false);
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) {
      setForgotError("이메일을 입력해주세요.");
      return;
    }
    setForgotLoading(true);
    setForgotError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setForgotError(data.error);
        return;
      }
      setForgotSent(true);
    } catch {
      setForgotError("서버에 연결할 수 없습니다.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans relative">
      <div
        className="w-full max-w-[1040px] bg-white rounded-[28px] md:flex overflow-hidden relative z-10 mx-auto mt-4 sm:mt-0 shadow-sm"
        style={{ minHeight: "520px" }}
      >
        {/* Left Side (Text / Branding) */}
        <div className="w-full md:w-[45%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col justify-center">
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
        <div className="w-full md:w-[55%] p-6 sm:p-10 md:p-12 lg:px-14 flex flex-col justify-center relative">
          <form
            className="space-y-6 w-full max-w-[400px] mt-4 md:mt-0"
            onSubmit={handleNext}
          >
            <div className="space-y-5 min-h-[110px]">
              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              {/* Email Step */}
              {!emailEntered ? (
                <div className="relative group animate-in fade-in zoom-in-95 duration-300">
                  <input
                    type="text"
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
                      onClick={openFindModal}
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
                      onClick={() => {
                        setEmailEntered(false);
                        setError("");
                        setPassword("");
                      }}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  onClick={openForgotModal}
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

      {/* ===== Forgot Password Modal ===== */}
      {showForgotModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeForgotModal}
        >
          <div className="absolute inset-0 bg-black/40 animate-in fade-in duration-200" />

          <div
            className="relative bg-white rounded-[28px] w-full max-w-[480px] shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b57d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#1f1f1f]">비밀번호 찾기</h2>
                  <p className="text-sm text-gray-500">가입한 이메일로 재설정 링크를 보내드립니다</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-4">
              {!forgotSent ? (
                <>
                  <div className="relative group mb-4">
                    <input
                      type="email"
                      id="forgotEmail"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setForgotError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleForgotPassword();
                        }
                      }}
                      className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                      placeholder="이메일 주소"
                      autoFocus
                    />
                    <label
                      htmlFor="forgotEmail"
                      className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                    >
                      이메일 주소
                    </label>
                  </div>

                  {forgotError && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      {forgotError}
                    </div>
                  )}
                </>
              ) : (
                /* Success state */
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1f1f] mb-2">이메일을 확인해주세요</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    <strong className="text-[#1f1f1f]">{forgotEmail}</strong> 으로<br />
                    비밀번호 재설정 링크를 보내드렸습니다.
                  </p>
                  <p className="text-xs text-gray-400 mt-4">
                    이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForgotModal}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {forgotSent ? "닫기" : "취소"}
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={forgotLoading || !forgotEmail.trim()}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#0b57d0] text-white hover:bg-[#004aba] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {forgotLoading ? "발송 중..." : "재설정 링크 보내기"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== Find Email Modal ===== */}
      {showFindModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeFindModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 animate-in fade-in duration-200" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-[28px] w-full max-w-[480px] shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b57d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#1f1f1f]">이메일 찾기</h2>
                  <p className="text-sm text-gray-500">가입 시 등록한 휴대폰번호로 조회합니다</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-4">
              {/* Phone Input */}
              <div className="relative group mb-4">
                <input
                  type="tel"
                  id="findPhone"
                  value={findPhone}
                  onChange={(e) => {
                    setFindPhone(e.target.value);
                    setFindError("");
                    setFoundAccount(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleFindEmail();
                    }
                  }}
                  className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                  placeholder="휴대폰번호"
                  autoFocus
                />
                <label
                  htmlFor="findPhone"
                  className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                >
                  휴대폰번호
                </label>
              </div>

              {/* Error */}
              {findError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  {findError}
                </div>
              )}

              {/* Found Account Result */}
              {foundAccount && (
                <button
                  type="button"
                  onClick={selectFoundEmail}
                  className="w-full flex items-center gap-4 p-4 bg-[#f8fafc] hover:bg-[#e8f0fe] border border-gray-200 hover:border-[#0b57d0]/30 rounded-2xl transition-all group cursor-pointer text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0b57d0] to-[#4285f4] text-white flex items-center justify-center text-lg font-semibold flex-shrink-0 shadow-sm">
                    {(foundAccount.name as string).charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-[#1f1f1f] group-hover:text-[#0b57d0] transition-colors">
                      {foundAccount.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {foundAccount.maskedEmail}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 group-hover:border-[#0b57d0] group-hover:bg-[#0b57d0] flex items-center justify-center transition-all">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 group-hover:text-white transition-colors"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeFindModal}
                className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                닫기
              </button>
              {!foundAccount && (
                <button
                  type="button"
                  onClick={handleFindEmail}
                  disabled={findLoading || !findPhone.trim()}
                  className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#0b57d0] text-white hover:bg-[#004aba] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {findLoading ? "조회 중..." : "조회"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
