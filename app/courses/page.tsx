"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, Clock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["스킨케어", "메디컬 왁싱", "네일 아트", "스파 & 테라피"];

const COURSES_DATA = {
  스킨케어: [
    {
      id: "sc-1",
      title: "메디컬 스킨케어 마스터 클래스",
      level: "전문가 과정",
      duration: "12주 (주 2회, 총 72시간)",
      price: "1,500,000원",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop",
      features: [
        "초음파 기기 활용법",
        "문제성 피부 분석",
        "메디컬 필링 테크닉",
        "고객 상담 심리학",
      ],
    },
    {
      id: "sc-2",
      title: "에스테틱 기초 실무",
      level: "입문 과정",
      duration: "8주 (주 2회, 총 48시간)",
      price: "850,000원",
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop",
      features: [
        "피부 생리학 이해",
        "클렌징 & 딥클렌징",
        "기초 매뉴얼 테크닉",
        "위생 및 소독 관리",
      ],
    },
  ],
  "메디컬 왁싱": [
    {
      id: "mw-1",
      title: "슈가링 왁싱 마스터",
      level: "통합 과정",
      duration: "6주 (주 2회, 총 36시간)",
      price: "1,200,000원",
      image:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2669&auto=format&fit=crop",
      features: [
        "슈가링 페이스트 제조",
        "전신 왁싱 실무",
        "임산부 왁싱 특강",
        "사후 인그로운 케어",
      ],
    },
    {
      id: "mw-2",
      title: "페이스 왁싱 디자인",
      level: "단과 과정",
      duration: "3주 (주 1회, 총 12시간)",
      price: "450,000원",
      image:
        "https://images.unsplash.com/photo-1512496015851-a1c8db5dd1f5?q=80&w=2574&auto=format&fit=crop",
      features: [
        "황금비율 눈썹 디자인",
        "헤어라인 교정술",
        "페이스 솜털 제모",
        "피부 장벽 보호",
      ],
    },
  ],
  "네일 아트": [
    {
      id: "na-1",
      title: "프로페셔널 네일 아티스트",
      level: "전문가 과정",
      duration: "10주 (주 2회, 총 60시간)",
      price: "1,100,000원",
      image:
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
      features: [
        "드릴 케어 마스터",
        "아크릴 및 젤 연장",
        "트렌드 아트 워크",
        "살롱 실무 디자인",
      ],
    },
  ],
  "스파 & 테라피": [
    {
      id: "st-1",
      title: "홀리스틱 바디 테라피",
      level: "전문가 과정",
      duration: "8주 (주 2회, 총 48시간)",
      price: "1,350,000원",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop",
      features: [
        "근막 이완 테크닉",
        "아로마콜로지",
        "스톤 테라피 실무",
        "체형 불균형 분석",
      ],
    },
  ],
};

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const activeCourses =
    COURSES_DATA[activeTab as keyof typeof COURSES_DATA] || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* 1. Header Section */}
      <section className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 text-center border-b border-gray-100 px-6 relative overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e8f0fe] via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-[4rem] font-medium tracking-tight text-slate-900 leading-[1.2] lg:leading-[1.1] mb-6 font-sans"
          >
            당신의 완벽한 커리어를 위한 <br />
            <span className="text-[#0b57d0]">체계적인 커리큘럼</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            초보자부터 글로벌 탑 전문가까지, IMBA의 검증된 교육 시스템이
            여러분을 성공으로 이끕니다.
          </motion.p>
        </div>
      </section>

      {/* 2. Courses Content */}
      <section className="py-16 sm:py-24 max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 rounded-full text-[15px] sm:text-base font-medium transition-colors ${
                activeTab === tab
                  ? "text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-[#0b57d0] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            >
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#0b57d0] shadow-sm">
                      {course.level}
                    </div>
                  </div>

                  <div className="p-8 sm:p-10 flex flex-col flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                      {course.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500 mb-8 border-b border-gray-100 pb-8">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#0b57d0]" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#0b57d0]" />
                        <span>강의 특징 4가지</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {course.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-600"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="text-xl sm:text-2xl font-bold text-slate-900">
                        {course.price}
                      </div>
                      <button className="bg-white text-[#0b57d0] border border-gray-200 hover:bg-[#f3f7fe] hover:border-transparent px-5 py-2.5 rounded-full font-medium text-[15px] transition-all flex items-center gap-2">
                        상세보기 <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. CTA Section */}
      <section className="bg-slate-900 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0b57d0]/20 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Star className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl text-white font-medium mb-6">
            최고의 교육을 지금 시작하세요
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            과정 선택이 고민되시나요? 수강 목적과 진로에 맞는 최적의 플랜을
            1:1로 맞춤 설계해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-[#0b57d0] text-white hover:bg-[#004aba] px-8 py-4 rounded-full font-medium text-[1.1rem] transition-colors shadow-lg"
            >
              수강 신청하기
            </Link>
            <button className="bg-slate-800 text-white hover:bg-slate-700 px-8 py-4 rounded-full font-medium text-[1.1rem] transition-colors">
              1:1 무료 상담
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
