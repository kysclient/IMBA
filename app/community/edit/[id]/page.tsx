"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../components/AuthProvider";
import { useToast } from "../../../components/Toast";

const CATEGORIES = ["Q&A", "수강후기"];
const ADMIN_CATEGORIES = ["공지사항", "Q&A", "수강후기"];

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { showToast } = useToast();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      showToast("로그인이 필요합니다.", "warning");
      router.push("/login");
      return;
    }

    if (!authLoading && user) {
      fetch(`/api/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.post) {
            showToast("게시글을 찾을 수 없습니다.", "error");
            router.push("/community");
            return;
          }
          if (data.post.user_id !== user.userId && !user.isAdmin) {
            showToast("수정 권한이 없습니다.", "error");
            router.push("/community");
            return;
          }
          setCategory(data.post.category);
          setTitle(data.post.title);
          setContent(data.post.content);
        })
        .catch(() => {
          showToast("게시글을 불러오는데 실패했습니다.", "error");
          router.push("/community");
        })
        .finally(() => setLoading(false));
    }
  }, [authLoading, user, postId, router, showToast]);

  const categories = user?.isAdmin ? ADMIN_CATEGORIES : CATEGORIES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast("제목과 내용을 모두 입력해주세요.", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, title: title.trim(), content: content.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("게시글이 수정되었습니다.", "success");
        router.push(`/community/${postId}`);
      } else {
        showToast(data.error || "게시글 수정에 실패했습니다.", "error");
      }
    } catch {
      showToast("게시글 수정에 실패했습니다.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4f7f9]">
        <div className="w-8 h-8 border-3 border-[#0b57d0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9] pt-24 sm:pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 w-full">
        <div className="mb-6">
          <Link
            href={`/community/${postId}`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0b57d0] transition-colors font-medium text-[15px] group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#0b57d0] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-8">
            글 수정
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                카테고리
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      category === cat
                        ? "bg-[#0b57d0] text-white shadow-md shadow-blue-500/30"
                        : "bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                maxLength={300}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-shadow placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                rows={15}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-shadow resize-none placeholder:text-gray-400 leading-relaxed"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-full text-sm font-medium text-slate-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-full text-sm font-medium text-white bg-[#0b57d0] hover:bg-[#004aba] transition-colors disabled:opacity-50 shadow-md shadow-blue-500/20"
              >
                {submitting ? "수정 중..." : "수정하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
