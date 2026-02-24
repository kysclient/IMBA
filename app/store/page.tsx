"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Star } from "lucide-react";

const PRODUCTS = [
  {
    id: "p1",
    name: "프리미엄 슈가링 페이스트 세트",
    category: "왁싱 재료",
    price: "85,000원",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2670&auto=format&fit=crop",
    badge: "BEST",
  },
  {
    id: "p2",
    name: "메디컬 스킨케어 앰플 패키지 (10ea)",
    category: "스킨케어",
    price: "120,000원",
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2668&auto=format&fit=crop",
    badge: "NEW",
  },
  {
    id: "p3",
    name: "프로페셔널 네일 드릴 머신 V2",
    category: "네일아트 기기",
    price: "245,000원",
    rating: 4.7,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=2669&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "아로마콜로지 릴렉싱 에센셜 오일",
    category: "테라피 용품",
    price: "45,000원",
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2553&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "IMBA 마스터 실습 가운",
    category: "유니폼",
    price: "55,000원",
    rating: 4.6,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1610486687483-20058b73b50c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "고주파 피부 리프팅 기기",
    category: "스킨케어 기기",
    price: "450,000원",
    rating: 5.0,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop",
    badge: "HOT",
  },
];

const CATEGORIES = [
  "전체",
  "스킨케어",
  "왁싱 재료",
  "네일아트 기기",
  "테라피 용품",
  "유니폼",
];

export default function StorePage() {
  const [activeTab, setActiveTab] = React.useState("전체");

  const filteredProducts =
    activeTab === "전체"
      ? PRODUCTS
      : PRODUCTS.filter(
          (item) =>
            item.category === activeTab || item.category.includes(activeTab),
        );

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* 1. Header Section */}
      <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 text-center px-6 relative border-b border-gray-100">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e8f0fe] via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-[3.5rem] font-medium tracking-tight text-slate-900 leading-[1.2] mb-4 sm:mb-6 font-sans"
          >
            IMBA 스토어
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500"
          >
            전문가들이 엄선한 최상급 뷰티 제품과 기기를 만나보세요.
          </motion.p>
        </div>
      </section>

      {/* 2. Store Content */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        {/* Search & Categories */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-[14px] sm:text-[15px] font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#0b57d0] text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="상품 검색"
              className="w-full bg-white border border-gray-200 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-shadow placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[500px]">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-md hover:text-[#0b57d0] hover:scale-110 transition-all z-10">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-[#0b57d0] mb-2 block">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#0b57d0] transition-colors line-clamp-2 min-h-[56px]">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1.5 mb-4 text-slate-500 text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-slate-700">
                      {product.rating}
                    </span>
                    <span>({product.reviews})</span>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900">
                      {product.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <ShoppingCart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              해당 카테고리에 상품이 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
