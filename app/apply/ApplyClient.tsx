"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Upload, Check } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { useToast } from "../components/Toast";

function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    courseType: "",
    name: "",
    phone: "",
    email: "",
    motivation: "",
  });

  // Fetch course options from DB
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        const titles = (data.courses || []).map((c: { title: string }) => c.title);
        setCourseOptions([...titles, "아직 잘 모르겠습니다 (상담 후 결정)"]);
      } catch {
        setCourseOptions(["아직 잘 모르겠습니다 (상담 후 결정)"]);
      }
    }
    fetchCourses();
  }, []);

  // Pre-fill from query param (course name from courses page)
  useEffect(() => {
    const course = searchParams.get("course");
    if (course && courseOptions.length > 0) {
      const matched = courseOptions.find((c) => c.includes(course));
      if (matched) {
        setFormData((prev) => ({ ...prev, courseType: matched }));
      }
    }
  }, [searchParams, courseOptions]);

  // Pre-fill from logged in user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Step 3: Submit
    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "신청에 실패했습니다.", "error");
        return;
      }

      setSubmitted(true);
      showToast("수강 신청이 접수되었습니다!", "success");
    } catch {
      showToast("서버에 연결할 수 없습니다.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans">
        <div className="w-full max-w-[540px] bg-white rounded-[28px] shadow-sm p-6 sm:p-10 md:p-14 text-center">
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

          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-2xl font-semibold text-[#1f1f1f] mb-3">
            신청이 완료되었습니다
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-2">
            <strong className="text-[#1f1f1f]">{formData.courseType}</strong> 과정에
            <br />수강 신청이 접수되었습니다.
          </p>
          <p className="text-xs text-gray-400 mb-10">
            담당자가 확인 후 빠르게 연락드리겠습니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-[#0b57d0] text-white hover:bg-[#004aba] px-6 py-2.5 rounded-full font-medium text-sm transition-colors"
            >
              메인으로 돌아가기
            </Link>
            <Link
              href="/courses"
              className="text-[#0b57d0] hover:bg-[#f3f7fe] px-6 py-2.5 rounded-full font-medium text-sm transition-colors border border-gray-200"
            >
              다른 과정 둘러보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6 font-sans relative">
      <div
        className="w-full max-w-[1040px] bg-white rounded-[28px] md:flex overflow-hidden relative z-10 mx-auto mt-4 sm:mt-0 shadow-sm"
        style={{ minHeight: "600px" }}
      >
        {/* Left Side (Text / Branding) */}
        <div className="w-full md:w-[45%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col bg-[#f0f4f9] md:bg-transparent">
          <Link href="/" className="inline-flex items-center group mb-12 w-max">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA Logo"
              width={160}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain mix-blend-multiply"
            />
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-[#1f1f1f] mb-6 font-sans leading-tight">
            수강 신청서 작성
          </h1>
          <p className="text-base sm:text-lg text-[#444746] mb-12 max-w-sm leading-relaxed">
            당신의 새로운 여정을 환영합니다.
            <br className="hidden sm:block" />
            간단한 정보를 입력하고 교육 상담을 받아보세요.
          </p>

          {/* Progress Indicator */}
          <div className="mt-auto hidden md:flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? "bg-[#0b57d0] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                1
              </div>
              <span
                className={`font-medium ${step >= 1 ? "text-[#1f1f1f]" : "text-gray-400"}`}
              >
                과정 선택
              </span>
            </div>
            <div className="w-0.5 h-6 bg-gray-200 ml-4">
              <div
                className={`w-full bg-[#0b57d0] transition-all duration-300 ${step >= 2 ? "h-full" : "h-0"}`}
              ></div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? "bg-[#0b57d0] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                2
              </div>
              <span
                className={`font-medium ${step >= 2 ? "text-[#1f1f1f]" : "text-gray-400"}`}
              >
                기본 정보 입력
              </span>
            </div>
            <div className="w-0.5 h-6 bg-gray-200 ml-4">
              <div
                className={`w-full bg-[#0b57d0] transition-all duration-300 ${step >= 3 ? "h-full" : "h-0"}`}
              ></div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? "bg-[#0b57d0] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                3
              </div>
              <span
                className={`font-medium ${step >= 3 ? "text-[#1f1f1f]" : "text-gray-400"}`}
              >
                추가 내용 및 완료
              </span>
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[55%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col justify-center relative bg-white">
          <form
            className="space-y-6 w-full max-w-[450px]"
            onSubmit={handleNext}
          >
            {/* Mobile Progress Bar */}
            <div className="md:hidden flex gap-2 mb-8">
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-[#0b57d0]" : "bg-gray-200"}`}
              ></div>
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-[#0b57d0]" : "bg-gray-200"}`}
              ></div>
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? "bg-[#0b57d0]" : "bg-gray-200"}`}
              ></div>
            </div>

            {/* Step 1: Course Selection */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-medium text-[#1f1f1f] mb-6">
                  어떤 과정을 수강하고 싶으신가요?
                </h2>
                <div className="space-y-3">
                  {courseOptions.map((course) => (
                    <label
                      key={course}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.courseType === course
                          ? "border-[#0b57d0] bg-[#f3f7fe]"
                          : "border-gray-200 hover:border-[#0b57d0]/30"
                      }`}
                    >
                      <span
                        className={`font-medium ${formData.courseType === course ? "text-[#0b57d0]" : "text-[#444746]"}`}
                      >
                        {course}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.courseType === course
                            ? "border-[#0b57d0]"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.courseType === course && (
                          <div className="w-2.5 h-2.5 bg-[#0b57d0] rounded-full"></div>
                        )}
                      </div>
                      <input
                        type="radio"
                        name="course"
                        value={course}
                        className="hidden"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            courseType: e.target.value,
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-medium text-[#1f1f1f] mb-6">
                  기본 정보를 입력해주세요
                </h2>

                {user && (
                  <div className="flex items-center gap-3 bg-[#f3f7fe] border border-[#0b57d0]/10 rounded-xl px-4 py-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#0b57d0] text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm text-[#0b57d0] font-medium">
                      로그인 정보로 자동 입력되었습니다
                    </span>
                  </div>
                )}

                <div className="relative group">
                  <input
                    type="text"
                    id="apply-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                    placeholder="이름"
                  />
                  <label
                    htmlFor="apply-name"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    이름 (실명)
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="apply-phone"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                    placeholder="연락처"
                  />
                  <label
                    htmlFor="apply-phone"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    연락처 (&apos;-&apos; 제외)
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="apply-email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="peer w-full h-[56px] border border-[#747775] rounded-[4px] bg-transparent px-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all"
                    placeholder="이메일"
                  />
                  <label
                    htmlFor="apply-email"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    이메일 주소
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Motivation and File Upload */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-medium text-[#1f1f1f] mb-6">
                  마지막 단계입니다
                </h2>
                <div className="relative group">
                  <textarea
                    id="apply-motivation"
                    value={formData.motivation}
                    onChange={(e) =>
                      setFormData({ ...formData, motivation: e.target.value })
                    }
                    className="peer w-full h-32 border border-[#747775] rounded-[4px] bg-transparent p-4 text-base text-[#1f1f1f] placeholder-transparent focus:outline-none focus:border-[#0b57d0] focus:border-2 transition-all resize-none"
                    placeholder="지원 동기 또는 문의사항"
                  ></textarea>
                  <label
                    htmlFor="apply-motivation"
                    className="absolute left-3 top-[-9px] bg-white px-1 text-xs text-[#444746] transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746] peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#0b57d0] peer-focus:font-medium pointer-events-none"
                  >
                    지원 동기 또는 문의사항 (선택)
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group/upload">
                  <div className="w-12 h-12 bg-blue-50 text-[#0b57d0] rounded-full flex items-center justify-center mx-auto mb-3 group-hover/upload:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="font-medium text-[#1f1f1f] mb-1">
                    포트폴리오 업로드
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, 이미지 파일 지원 (최대 10MB)
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-3">신청 요약</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">과정</span>
                      <span className="text-[#1f1f1f] font-medium">{formData.courseType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">이름</span>
                      <span className="text-[#1f1f1f] font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">이메일</span>
                      <span className="text-[#1f1f1f] font-medium">{formData.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-[#0b57d0] hover:bg-[#f3f7fe] px-4 py-2.5 rounded-full font-medium text-[15px] transition-colors w-full sm:w-auto text-center"
                >
                  이전 단계
                </button>
              ) : (
                <div className="flex-1"></div>
              )}

              <button
                type="submit"
                disabled={(step === 1 && !formData.courseType) || loading}
                className={`bg-[#0b57d0] text-white hover:bg-[#004aba] px-8 py-3 rounded-full font-medium text-[15px] transition-all shadow-md shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading
                  ? "제출 중..."
                  : step === 3
                    ? "신청서 제출하기"
                    : "다음으로 가기"}
                {step < 3 && !loading && <ChevronRight className="w-4 h-4 mt-0.5" />}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Links */}
      <div className="w-full max-w-[1040px] px-4 pt-6 pb-2 mx-auto flex justify-center text-sm text-[#444746]">
        제출 버튼을 클릭함으로써{" "}
        <Link href="/terms" className="text-[#0b57d0] hover:underline mx-1">
          이용약관
        </Link>{" "}
        및{" "}
        <Link href="/privacy" className="text-[#0b57d0] hover:underline mx-1">
          개인정보처리방침
        </Link>
        에 동의하게 됩니다.
      </div>
    </div>
  );
}

function ApplySkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 sm:p-6">
      <div
        className="w-full max-w-[1040px] bg-white rounded-[28px] md:flex overflow-hidden shadow-sm mx-auto animate-pulse"
        style={{ minHeight: "600px" }}
      >
        <div className="w-full md:w-[45%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col">
          <div className="h-10 w-32 bg-gray-100 rounded mb-12" />
          <div className="h-10 bg-gray-100 rounded-xl w-3/4 mb-4" />
          <div className="h-5 bg-gray-100 rounded-lg w-full max-w-sm mb-2" />
          <div className="h-5 bg-gray-100 rounded-lg w-2/3 max-w-sm" />
        </div>
        <div className="w-full md:w-[55%] p-6 sm:p-10 md:p-12 lg:px-14 lg:py-20 flex flex-col justify-center bg-white">
          <div className="space-y-6 w-full max-w-[450px]">
            <div className="h-7 bg-gray-100 rounded-lg w-2/3 mb-6" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-xl w-full" />
            ))}
            <div className="pt-8 flex justify-end">
              <div className="h-12 w-36 bg-gray-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplyClient() {
  return (
    <React.Suspense fallback={<ApplySkeleton />}>
      <ApplyForm />
    </React.Suspense>
  );
}
