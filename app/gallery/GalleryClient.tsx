"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  linkUrl: string | null;
  linkLabel: string | null;
  displayOrder: number;
}

export default function GalleryClient() {
  const [activeTab, setActiveTab] = useState("전체");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const params = activeTab !== "전체" ? `?category=${encodeURIComponent(activeTab)}` : "";
      const res = await fetch(`/api/gallery${params}`);
      const data = await res.json();
      setItems(data.items || []);
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const tabs = ["전체", ...categories];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#e040fb] opacity-[0.05] blur-[100px] animate-blob-drift" />
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#4285f4] opacity-[0.06] blur-[90px] animate-blob-drift-reverse" />
          <div className="absolute bottom-[-20%] right-[30%] w-[350px] h-[350px] rounded-full bg-[#00bcd4] opacity-[0.05] blur-[80px] animate-blob-drift-slow" />
        </div>
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

      {/* Gallery Content */}
      <section className="pb-24 max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] rounded-2xl bg-gray-100 mb-4"></div>
                  <div className="px-1">
                    <div className="h-3 bg-gray-100 rounded w-16 mb-3"></div>
                    <div className="h-5 bg-gray-100 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {items.map((item) => {
                  const content = (
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
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {item.linkUrl && (
                          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <ExternalLink className="w-4 h-4 text-[#0b57d0]" />
                          </div>
                        )}
                      </div>
                      <div className="px-1">
                        <span className="text-xs font-bold text-[#0b57d0] mb-2 block">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-medium text-slate-900 group-hover:text-[#0b57d0] transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        {item.linkLabel && (
                          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                            {item.linkLabel}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );

                  if (item.linkUrl) {
                    return (
                      <Link
                        key={item.id}
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {content}
                      </Link>
                    );
                  }

                  return content;
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && items.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              해당 카테고리에 등록된 사진이 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
