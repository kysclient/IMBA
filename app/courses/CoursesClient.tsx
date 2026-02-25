"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Star, Clock, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Course {
  id: number;
  category: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  imageUrl: string;
  features: string[];
}

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const categories = Array.from(new Set(courses.map((c) => c.category)));
  const [activeTab, setActiveTab] = useState(categories[0] || "");

  const activeCourses = courses.filter((c) => c.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* 1. Header Section */}
      <section className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 text-center border-b border-gray-100 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#4285f4] opacity-[0.07] blur-[100px] animate-blob-drift" />
          <div className="absolute top-[-10%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#7c4dff] opacity-[0.05] blur-[80px] animate-blob-drift-reverse" />
          <div className="absolute bottom-[-30%] left-[40%] w-[500px] h-[500px] rounded-full bg-[#0b57d0] opacity-[0.04] blur-[120px] animate-blob-drift-slow" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #94a3b8 0.6px, transparent 0.6px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
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
        {categories.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            등록된 교육과정이 없습니다.
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-16">
              {categories.map((tab) => (
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
                          src={course.imageUrl}
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
                            <span>강의 특징 {course.features.length}가지</span>
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
                          <Link
                            href={`/apply?course=${encodeURIComponent(course.title.split(" ")[0])}`}
                            className="bg-white text-[#0b57d0] border border-gray-200 hover:bg-[#f3f7fe] hover:border-transparent px-5 py-2.5 rounded-full font-medium text-[15px] transition-all flex items-center gap-2"
                          >
                            수강신청 <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </section>

      {/* 3. CTA Section */}
      <section className="bg-slate-900 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#4285f4] opacity-[0.12] blur-[100px] animate-blob-drift" />
          <div className="absolute bottom-[-15%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#7c4dff] opacity-[0.1] blur-[90px] animate-blob-drift-reverse" />
        </div>
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
              href="/apply"
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
