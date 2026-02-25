"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Trash2,
  Pin,
  PinOff,
  Eye,
  MessageSquare,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/app/components/Toast";

type Post = {
  id: number;
  category: string;
  title: string;
  author_name: string;
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function AdminPostsPage() {
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("전체");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== "전체") params.set("category", category);
      if (search) params.set("search", search);
      params.set("page", String(page));

      const res = await fetch(`/api/admin/posts?${params.toString()}`);
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
  }, [category, search, page, showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleTogglePin = async (postId: number, currentPinned: boolean) => {
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_pinned: !currentPinned }),
      });
      if (res.ok) {
        showToast(currentPinned ? "고정이 해제되었습니다." : "상단에 고정되었습니다.", "success");
        fetchPosts();
      }
    } catch {
      showToast("처리에 실패했습니다.", "error");
    }
  };

  const handleDelete = async (postId: number) => {
    if (!confirm("이 게시글을 삭제하시겠습니까? 댓글도 함께 삭제됩니다.")) return;
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      if (res.ok) {
        showToast("게시글이 삭제되었습니다.", "success");
        fetchPosts();
      }
    } catch {
      showToast("삭제에 실패했습니다.", "error");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">게시판 관리</h1>
          <p className="text-sm text-gray-500 mt-1">커뮤니티 게시글을 관리합니다.</p>
        </div>
        <Link
          href="/community/write"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0b57d0] text-white rounded-lg text-sm font-medium hover:bg-[#004aba] transition-colors"
        >
          <Plus className="w-4 h-4" />
          글쓰기
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-[#0b57d0] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="제목, 내용, 작성자 검색"
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
          >
            검색
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#0b57d0] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            게시글이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500 w-12">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 w-28 whitespace-nowrap">카테고리</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 min-w-[200px]">제목</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 w-24">작성자</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-500 w-16">
                    <Eye className="w-4 h-4 mx-auto" />
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-gray-500 w-16">
                    <MessageSquare className="w-4 h-4 mx-auto" />
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-gray-500 w-16">
                    <ThumbsUp className="w-4 h-4 mx-auto" />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">작성일</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-500 w-24">관리</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className={`border-b border-gray-50 hover:bg-gray-50/50 ${post.is_pinned ? "bg-amber-50/30" : ""}`}>
                    <td className="px-4 py-3 text-gray-400">{post.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                        post.category === "공지사항"
                          ? "bg-amber-100 text-amber-700"
                          : post.category === "Q&A"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                      }`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {post.is_pinned && <Pin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                        <span className="text-gray-900 font-medium truncate max-w-[300px]">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{post.author_name}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{post.views}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{post.comment_count}</td>
                    <td className="px-4 py-3 text-center text-gray-500">{post.like_count}</td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(post.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/community/${post.id}`}
                          target="_blank"
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                          title="게시글 보기"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleTogglePin(post.id, post.is_pinned)}
                          className={`p-1.5 hover:bg-gray-100 rounded-lg transition-colors ${
                            post.is_pinned ? "text-amber-500 hover:text-amber-600" : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={post.is_pinned ? "고정 해제" : "상단 고정"}
                        >
                          {post.is_pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              총 {pagination.total}개 중 {(page - 1) * pagination.limit + 1}-{Math.min(page * pagination.limit, pagination.total)}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= pagination.totalPages}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
