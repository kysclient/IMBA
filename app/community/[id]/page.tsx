"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Calendar,
  Eye,
  MessageSquare,
  Share2,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react";

// Same mock data as community page
const POSTS = [
  {
    id: "1",
    category: "공지사항",
    title: "제 5회 아시아 뷰티 마스터 어워즈 심사위원 위촉 안내",
    author: "관리자",
    date: "2026.02.24",
    views: 245,
    isNew: true,
    content:
      "아시아 뷰티 마스터 어워즈의 공정하고 전문적인 심사를 위해 각 분야별 최고를 모시는 심사위원을 위촉합니다. 이번 대회에서는 더욱 엄격해진 기준과 국제적인 뷰티 스탠다드 트렌드를 반영하여 심사할 예정입니다. 각 분야별 마스터 전문가 분들의 많은 지원과 관심 부탁드립니다.\n\n[선발 기준]\n- 해당 분야 실무 경력 10년 이상\n- 국제 미용 대회 수상 경력 보유자 우대\n- 본 협회 교육 이수자 가산점 부여\n\n[접수 방법]\n협회 공식 이메일을 통한 서류 지원",
    comments: 12,
  },
  {
    id: "2",
    category: "공지사항",
    title: "2026년도 상반기 지부 설립 신청 접수",
    author: "관리자",
    date: "2026.02.15",
    views: 512,
    content:
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
    content:
      "처음엔 막막했지만 짜임새 있는 커리큘럼 덕분에 실무에 자신감이 붙었습니다. 강사님들의 세심한 코칭이 큰 도움이 되었어요.",
    comments: 24,
  },
];

export default function PostDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const post = POSTS.find((p) => p.id === id) || POSTS[0];

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

          <button className="w-8 h-8 rounded-full hover:bg-white border border-transparent hover:border-gray-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
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
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0b57d0] to-[#0b57d0]/80 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {post.author}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {post.date}
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
                  {post.comments}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-10 py-10 min-h-[300px]">
            <div className="prose prose-slate max-w-none text-slate-700 leading-loose text-base sm:text-[17px] whitespace-pre-wrap">
              {post.content || "등록된 본문 내용이 없습니다."}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-50 flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 hover:bg-[#e8f0fe] text-slate-600 hover:text-[#0b57d0] font-medium transition-colors border border-gray-100 hover:border-[#0b57d0]/30 group">
                <ThumbsUp className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                좋아요 12
              </button>
              <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-slate-500 transition-colors border border-gray-100">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.article>

        {/* Comments Section */}
        <div className="mt-8 bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 sm:p-10 mb-20">
          <h3 className="text-xl font-semibold text-slate-900 mb-8 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#0b57d0]" />
            댓글 <span className="text-[#0b57d0]">{post.comments}</span>
          </h3>

          <div className="flex gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 relative">
              <textarea
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-24 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] transition-shadow resize-none h-24"
                placeholder="댓글을 남겨보세요..."
              ></textarea>
              <button className="absolute bottom-3 right-3 bg-[#0b57d0] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#004aba] transition-colors">
                등록
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 flex items-center justify-center font-bold text-sm">
                박
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-slate-900 text-sm">
                      박유진
                    </span>
                    <span className="text-xs text-slate-400">10분 전</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    좋은 정보 감사합니다! 이번 심사위원 기준이 확실히 더
                    높아졌네요. 미리 준비해야겠습니다.
                  </p>
                </div>
                <button className="text-xs text-slate-400 font-medium hover:text-[#0b57d0] mt-2 ml-2 transition-colors">
                  답글 달기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
