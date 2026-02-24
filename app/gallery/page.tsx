"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["전체", "교육활동", "협회행사", "미용대회"];

const GALLERY_DATA = [
  {
    id: "g1",
    category: "교육활동",
    title: "메디컬 스킨케어 실습 1기",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "g2",
    category: "협회행사",
    title: "2025 IMBA 글로벌 뷰티 컨퍼런스",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "g3",
    category: "미용대회",
    title: "제 5회 아시아 뷰티 마스터 어워즈",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop",
  },
  {
    id: "g4",
    category: "교육활동",
    title: "글로벌 마스터 강사진 세미나",
    image:
      "https://images.unsplash.com/photo-1512496015851-a1c8db5dd1f5?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: "g5",
    category: "협회행사",
    title: "베트남 지부 설립 조인식",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop",
  },
  {
    id: "g6",
    category: "미용대회",
    title: "K-Beauty 올림피아드 현장",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop",
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("전체");

  const filteredData =
    activeTab === "전체"
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Header Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 text-center px-6 relative">
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-[3.5rem] font-medium tracking-tight text-slate-900 leading-[1.2] mb-4 sm:mb-6 font-sans"
          >
            IMBA 갤러리
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500"
          >
            국제메디컬뷰티협회의 열정 넘치는 활동 현장을 만나보세요.
          </motion.p>
        </div>
      </section>

      {/* 2. Gallery Content */}
      <section className="pb-24 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#0b57d0] text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-sm border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="px-1">
                    <span className="text-xs font-bold text-[#0b57d0] mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-medium text-slate-900 group-hover:text-[#0b57d0] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredData.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              해당 카테고리에 등록된 사진이 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
