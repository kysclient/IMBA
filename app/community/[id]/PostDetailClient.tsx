"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  Trash2,
  Edit3,
  Pin,
} from "lucide-react";
import { useAuth } from "../../components/AuthProvider";
import { useToast } from "../../components/Toast";

type Post = {
  id: number;
  user_id: number;
  category: string;
  title: string;
  content: string;
  author_name: string;
  views: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  comment_count: string;
  like_count: string;
  user_liked: boolean;
};

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  author_name: string;
  content: string;
  created_at: string;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function timeAgo(dateStr: string) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  return formatDate(dateStr);
}

export default function PostDetailClient() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) {
        showToast("게시글을 찾을 수 없습니다.", "error");
        router.push("/community");
        return;
      }
      const data = await res.json();
      setPost(data.post);
    } catch {
      showToast("게시글을 불러오는데 실패했습니다.", "error");
    }
  }, [id, router, showToast]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${id}/comments`);
      const data = await res.json();
      if (res.ok) setComments(data.comments);
    } catch {
      // silent
    }
  }, [id]);

  useEffect(() => {
    Promise.all([fetchPost(), fetchComments()]).finally(() => setLoading(false));
  }, [fetchPost, fetchComments]);

  const handleLike = async () => {
    if (!user) {
      showToast("좋아요는 로그인 후 이용할 수 있습니다.", "warning");
      router.push("/login");
      return;
    }
    setLikeLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok && post) {
        setPost({
          ...post,
          like_count: String(data.like_count),
          user_liked: data.liked,
        });
      }
    } catch {
      showToast("좋아요 처리에 실패했습니다.", "error");
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      showToast("댓글 작성은 로그인 후 이용할 수 있습니다.", "warning");
      router.push("/login");
      return;
    }
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });
      if (res.ok) {
        setCommentText("");
        fetchComments();
        if (post) {
          setPost({ ...post, comment_count: String(parseInt(post.comment_count) + 1) });
        }
        showToast("댓글이 등록되었습니다.", "success");
      } else {
        const data = await res.json();
        showToast(data.error || "댓글 작성에 실패했습니다.", "error");
      }
    } catch {
      showToast("댓글 작성에 실패했습니다.", "error");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/api/posts/${id}/comments/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchComments();
        if (post) {
          setPost({ ...post, comment_count: String(Math.max(0, parseInt(post.comment_count) - 1)) });
        }
        showToast("댓글이 삭제되었습니다.", "success");
      }
    } catch {
      showToast("댓글 삭제에 실패했습니다.", "error");
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("게시글이 삭제되었습니다.", "success");
        router.push("/community");
      } else {
        const data = await res.json();
        showToast(data.error || "삭제에 실패했습니다.", "error");
      }
    } catch {
      showToast("삭제에 실패했습니다.", "error");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("링크가 복사되었습니다.", "success");
    } catch {
      showToast("링크 복사에 실패했습니다.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f4f7f9] pt-24 sm:pt-32 pb-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 w-full">
          <div className="mb-6">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-7 w-16 bg-gray-100 rounded-full" />
              </div>
              <div className="h-9 bg-gray-100 rounded-xl w-3/4 mb-4" />
              <div className="h-7 bg-gray-100 rounded-xl w-1/2 mb-8" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100" />
                  <div>
                    <div className="h-4 w-20 bg-gray-100 rounded mb-1" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-8 w-32 bg-gray-100 rounded-xl" />
              </div>
            </div>
            <div className="px-6 sm:px-10 py-10 space-y-4">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="h-4 bg-gray-100 rounded w-4/6" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
          <div className="mt-8 bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-10 animate-pulse">
            <div className="h-6 w-24 bg-gray-100 rounded mb-8" />
            <div className="h-24 bg-gray-100 rounded-2xl mb-6" />
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                    <div className="h-4 w-20 bg-gray-100 rounded mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isAuthor = user && post.user_id === user.userId;
  const canModify = isAuthor || (user && user.isAdmin);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9] pt-24 sm:pt-32 pb-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 w-full">
        {/* Top actions */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0b57d0] transition-colors font-medium text-[15px] group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#0b57d0] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            목록으로
          </Link>

          {canModify && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push(`/community/edit/${post.id}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-slate-600 bg-white border border-gray-200 hover:border-[#0b57d0] hover:text-[#0b57d0] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                수정
              </button>
              <button
                onClick={handleDeletePost}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-red-500 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                삭제
              </button>
            </div>
          )}
        </div>

        {/* Post Container */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${
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
                <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                  <Pin className="w-3 h-3" /> 고정
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0b57d0] to-[#0b57d0]/80 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                  {post.author_name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {post.author_name}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {formatDate(post.created_at)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 text-sm font-medium text-slate-400 bg-gray-50 px-4 py-2 rounded-xl self-start sm:self-auto">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  {post.comment_count}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-10 py-10 min-h-[300px]">
            <div className="prose prose-slate max-w-none text-slate-700 leading-loose text-base sm:text-[17px] whitespace-pre-wrap">
              {post.content}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-50 flex items-center justify-center gap-4">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors border group ${
                  post.user_liked
                    ? "bg-[#e8f0fe] text-[#0b57d0] border-[#0b57d0]/30"
                    : "bg-gray-50 hover:bg-[#e8f0fe] text-slate-600 hover:text-[#0b57d0] border-gray-100 hover:border-[#0b57d0]/30"
                }`}
              >
                <ThumbsUp className={`w-5 h-5 group-hover:-rotate-12 transition-transform ${post.user_liked ? "fill-[#0b57d0]" : ""}`} />
                좋아요 {post.like_count}
              </button>
              <button
                onClick={handleShare}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-slate-500 transition-colors border border-gray-100"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.article>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-10 mb-20">
          <h3 className="text-xl font-semibold text-slate-900 mb-8 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0b57d0]" />
            댓글 <span className="text-[#0b57d0]">{post.comment_count}</span>
          </h3>

          {user ? (
            <div className="flex gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-[#0b57d0] flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 relative">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-24 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-shadow resize-none h-24"
                  placeholder="댓글을 남겨보세요..."
                ></textarea>
                <button
                  onClick={handleCommentSubmit}
                  disabled={commentLoading || !commentText.trim()}
                  className="absolute bottom-3 right-3 bg-[#0b57d0] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#004aba] transition-colors disabled:opacity-50"
                >
                  등록
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                showToast("댓글 작성은 로그인 후 이용할 수 있습니다.", "warning");
                router.push("/login");
              }}
              className="w-full mb-10 flex items-center justify-center gap-2 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-slate-500 hover:bg-gray-100 hover:text-[#0b57d0] hover:border-[#0b57d0]/30 transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              로그인하고 댓글을 남겨보세요
            </button>
          )}

          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const colors = [
                  "bg-emerald-100 text-emerald-700",
                  "bg-blue-100 text-blue-700",
                  "bg-purple-100 text-purple-700",
                  "bg-orange-100 text-orange-700",
                  "bg-pink-100 text-pink-700",
                ];
                const colorClass = colors[comment.id % colors.length];
                const canDeleteComment = user && (comment.user_id === user.userId || user.isAdmin);

                return (
                  <div key={comment.id} className="flex gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm ${colorClass}`}
                    >
                      {comment.author_name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-slate-900 text-sm">
                            {comment.author_name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400">
                              {timeAgo(comment.created_at)}
                            </span>
                            {canDeleteComment && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-slate-400 py-8">
                아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
