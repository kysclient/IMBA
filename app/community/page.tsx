"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Search,
  Eye,
  Calendar,
  User,
  Edit3,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

type Post = {
  id: string;
  category: "공지사항" | "Q&A" | "수강후기";
  title: string;
  author: string;
  date: string;
  views: number;
  isNew?: boolean;
  contentSnippet?: string;
  comments?: number;
};

const CATEGORIES = ["전체", "공지사항", "Q&A", "수강후기"];

const POSTS: Post[] = [
  {
    id: "1",
    category: "공지사항",
    title: "제 5회 아시아 뷰티 마스터 어워즈 심사위원 위촉 안내",
    author: "관리자",
    date: "2026.02.24",
    views: 245,
    isNew: true,
    contentSnippet:
      "아시아 뷰티 마스터 어워즈의 공정하고 전문적인 심사를 위해 각 분야별 최고를 모시는 심사위원을 위촉합니다...",
    comments: 12,
  },
  {
    id: "2",
    category: "공지사항",
    title: "2026년도 상반기 지부 설립 신청 접수",
    author: "관리자",
    date: "2026.02.15",
    views: 512,
    contentSnippet:
      "IMBA와 함께 메디컬 뷰티 교육의 새로운 기준을 세워갈 2026년도 상반기 신규 지부를 모집합니다.",
    comments: 5,
  },
  {
    id: "3",
    category: "수강후기",
    title: "메디컬 스킨케어 전문가 과정 수료 후기입니다!",
    author: "김지민",
    date: "2026.02.22",
    views: 89,
    isNew: true,
    contentSnippet:
      "처음엔 막막했지만 짜임새 있는 커리큘럼 덕분에 실무에 자신감이 붙었습니다. 강사님들의 세심한 코칭이 큰 도움이 되었어요.",
    comments: 24,
  },
  {
    id: "4",
    category: "Q&A",
    title: "해외 자격증 취득시 온라인 수강도 가능한가요?",
    author: "박상현",
    date: "2026.02.21",
    views: 32,
    contentSnippet:
      "지방에 거주 중이라 오프라인 수업 참석이 어려운데, 해외 글로벌 자격증 취득을 위한 온라인 코스가 따로 있는지 궁금합니다.",
    comments: 3,
  },
  {
    id: "5",
    category: "수강후기",
    title: "왁싱 마스터 과정 덕분에 창업 성공했습니다.",
    author: "이유미",
    date: "2026.02.10",
    views: 211,
    contentSnippet:
      "슈가링 왁싱 기법부터 실전 마케팅까지 탄탄히 배워서 최근 개인 샵을 오픈했습니다! IMBA에 정말 감사드립니다.",
    comments: 42,
  },
  {
    id: "6",
    category: "공지사항",
    title: "협회 공식 사무국 이전 및 연락처 변경 안내",
    author: "관리자",
    date: "2026.01.30",
    views: 1024,
    contentSnippet:
      "업무 환경 및 서비스 질 향상을 위해 협회 본사 사무국이 이전하게 되었습니다. 새로운 주소와 연락처를 참고 부탁드립니다.",
    comments: 0,
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  const filteredPosts =
    activeTab === "전체"
      ? POSTS
      : POSTS.filter((post) => post.category === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9]">
      {/* 1. Header Section */}
      <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 text-center px-6 relative border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e8f0fe] via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[3.5rem] font-medium tracking-tight text-slate-900 leading-[1.2] mb-4 sm:mb-6 font-sans"
          >
            커뮤니티 소식
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500"
          >
            IMBA 가족들의 생생한 이야기와 유용한 정보,{" "}
            <br className="hidden sm:block" />
            최신 소식들을 확인해보세요.
          </motion.p>
        </div>
      </section>

      {/* 2. Board Content */}
      <section className="py-12 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6 w-full relative z-10 -mt-8 sm:-mt-12">
        {/* Actions & Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#0b57d0] text-white shadow-md shadow-blue-500/30 scale-105"
                    : "bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex w-full lg:w-auto gap-4 items-center">
            <div className="relative w-full lg:w-64 flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-colors placeholder:text-gray-400"
              />
            </div>
            <button className="bg-[#1f1f1f] text-white hover:bg-black px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 flex-shrink-0">
              <Edit3 className="w-4 h-4" />
              글쓰기
            </button>
          </div>
        </div>

        {/* Board List (Cards Layout) */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/community/${post.id}`}
                      className="group flex flex-col h-full bg-white p-6 sm:p-8 rounded-[24px] shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              post.category === "공지사항"
                                ? "bg-amber-100 text-amber-700"
                                : post.category === "Q&A"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-[#e8f0fe] text-[#0b57d0]"
                            }`}
                          >
                            {post.category}
                          </span>
                          {post.isNew && (
                            <span className="w-5 h-5 rounded-full bg-[#1f1f1f] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                              N
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-slate-400 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          자세히 보기 <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 group-hover:text-[#0b57d0] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {post.contentSnippet && (
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                          {post.contentSnippet}
                        </p>
                      )}

                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0b57d0]/20 to-[#0b57d0]/5 flex items-center justify-center text-[#0b57d0] font-bold text-sm">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {post.author}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-32 text-slate-400 gap-4 bg-white rounded-[24px] border border-gray-100 border-dashed">
                  <MessageSquare className="w-12 h-12 text-slate-200" />
                  <p className="text-lg">등록된 게시글이 없습니다.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination placeholder */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-10 h-10 rounded-full bg-[#0b57d0] text-white font-medium shadow-md shadow-blue-500/20 text-sm hover:scale-105 transition-transform">
              1
            </button>
            <button className="w-10 h-10 rounded-full bg-white text-slate-500 font-medium border border-gray-200 text-sm hover:bg-gray-50 transition-colors">
              2
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
