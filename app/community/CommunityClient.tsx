"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Search,
  Eye,
  Calendar,
  Edit3,
  ChevronRight,
  ChevronLeft,
  Pin,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../components/AuthProvider";
import { useToast } from "../components/Toast";

type Post = {
  id: number;
  category: string;
  title: string;
  author_name: string;
  content: string;
  views: number;
  is_pinned: boolean;
  created_at: string;
  comment_count: string;
  like_count: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const CATEGORIES = ["전체", "공지사항", "Q&A", "수강후기"];

function isNew(dateStr: string) {
  const created = new Date(dateStr);
  const now = new Date();
  return now.getTime() - created.getTime() < 24 * 60 * 60 * 1000;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function CommunitySkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9]">
      <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 text-center px-6 border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <div className="h-10 bg-gray-100 rounded-xl w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-gray-100 rounded-lg w-80 mx-auto animate-pulse" />
        </div>
      </section>
      <section className="py-12 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6 w-full -mt-8 sm:-mt-12">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-pulse">
          <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-20 bg-gray-100 rounded-full" />
            ))}
          </div>
          <div className="h-10 bg-gray-100 rounded-full w-full max-w-xs" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-100 rounded-full" />
              </div>
              <div className="h-7 bg-gray-100 rounded-lg w-3/4 mb-3" />
              <div className="h-4 bg-gray-100 rounded-lg w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded-lg w-2/3 mb-6" />
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100" />
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-3 w-8 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function CommunityClientWrapper() {
  return (
    <Suspense fallback={<CommunitySkeleton />}>
      <CommunityPage />
    </Suspense>
  );
}

function CommunityPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("category") || "전체");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== "전체") params.set("category", activeTab);
      if (searchQuery) params.set("search", searchQuery);
      params.set("page", String(currentPage));

      const res = await fetch(`/api/posts?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setPagination(data.pagination);
      }
    } catch {
      showToast("게시글을 불러오는데 실패했습니다.", "error");
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery, currentPage, showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleWrite = () => {
    if (!user) {
      showToast("글쓰기는 로그인 후 이용할 수 있습니다.", "warning");
      router.push("/login");
      return;
    }
    router.push("/community/write");
  };

  const handleCategoryChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams();
    if (tab !== "전체") params.set("category", tab);
    if (searchQuery) params.set("search", searchQuery);
    router.push(`/community?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    const params = new URLSearchParams();
    if (activeTab !== "전체") params.set("category", activeTab);
    if (searchInput) params.set("search", searchInput);
    router.push(`/community?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    if (activeTab !== "전체") params.set("category", activeTab);
    if (searchQuery) params.set("search", searchQuery);
    if (page > 1) params.set("page", String(page));
    router.push(`/community?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9]">
      {/* Header Section */}
      <section className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 text-center px-6 relative border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#4285f4] opacity-[0.06] blur-[100px] animate-blob-drift" />
          <div className="absolute top-[0%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#34a853] opacity-[0.05] blur-[90px] animate-blob-drift-reverse" />
          <div className="absolute bottom-[-30%] left-[50%] w-[400px] h-[400px] rounded-full bg-[#fbbc04] opacity-[0.04] blur-[100px] animate-blob-drift-slow" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #94a3b8 0.6px, transparent 0.6px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
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

      {/* Board Content */}
      <section className="py-12 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6 w-full relative z-10 -mt-8 sm:-mt-12">
        {/* Actions & Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {CATEGORIES.map((tab) => (
              <button
                key={tab}
                onClick={() => handleCategoryChange(tab)}
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
            <form onSubmit={handleSearch} className="relative w-full lg:w-64 flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-colors placeholder:text-gray-400"
              />
            </form>
            <button
              onClick={handleWrite}
              className="bg-[#1f1f1f] text-white hover:bg-black px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 flex-shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              글쓰기
            </button>
          </div>
        </div>

        {/* Board List */}
        <div className="min-h-[500px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 animate-pulse">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-100 rounded-full" />
                  </div>
                  <div className="h-7 bg-gray-100 rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-gray-100 rounded-lg w-full mb-2" />
                  <div className="h-4 bg-gray-100 rounded-lg w-2/3 mb-6" />
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100" />
                      <div className="h-4 w-16 bg-gray-100 rounded" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-20 bg-gray-100 rounded" />
                      <div className="h-3 w-8 bg-gray-100 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {posts.length > 0 ? (
                  posts.map((post) => (
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
                            {post.is_pinned && (
                              <Pin className="w-3.5 h-3.5 text-amber-500" />
                            )}
                            {isNew(post.created_at) && (
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

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                          {post.content.replace(/\n/g, " ").substring(0, 100)}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0b57d0]/20 to-[#0b57d0]/5 flex items-center justify-center text-[#0b57d0] font-bold text-sm">
                              {post.author_name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {post.author_name}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5" />
                              {post.comment_count}
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
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2 items-center">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="w-10 h-10 rounded-full bg-white text-slate-500 font-medium border border-gray-200 text-sm hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(p => Math.abs(p - currentPage) <= 2 || p === 1 || p === pagination.totalPages)
              .map((page, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && page - prev > 1;
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className="text-slate-400 px-1">...</span>}
                    <button
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-full font-medium text-sm transition-all ${
                        currentPage === page
                          ? "bg-[#0b57d0] text-white shadow-md shadow-blue-500/20 hover:scale-105"
                          : "bg-white text-slate-500 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="w-10 h-10 rounded-full bg-white text-slate-500 font-medium border border-gray-200 text-sm hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
