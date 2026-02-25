"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CourseItem {
  id: number;
  category: string;
  title: string;
  level: string;
  duration: string;
  price: string;
  imageUrl: string;
  features: string[];
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

const LEVEL_OPTIONS = ["입문 과정", "전문가 과정", "통합 과정", "단과 과정"];

export default function AdminCoursesPage() {
  const [items, setItems] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<CourseItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Form state
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(LEVEL_OPTIONS[0]);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses?page=${page}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setCategory("");
    setTitle("");
    setLevel(LEVEL_OPTIONS[0]);
    setDuration("");
    setPrice("");
    setImageUrl("");
    setFeaturesText("");
    setIsActive(true);
    setDisplayOrder(0);
    setEditItem(null);
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (item: CourseItem) => {
    setEditItem(item);
    setCategory(item.category);
    setTitle(item.title);
    setLevel(item.level);
    setDuration(item.duration);
    setPrice(item.price);
    setImageUrl(item.imageUrl);
    setFeaturesText(item.features.join("\n"));
    setIsActive(item.isActive);
    setDisplayOrder(item.displayOrder);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const features = featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);

      if (features.length === 0) {
        alert("강의 특징을 최소 1개 이상 입력해주세요.");
        setSaving(false);
        return;
      }

      const body = {
        category,
        title,
        level,
        duration,
        price,
        imageUrl,
        features,
        isActive,
        displayOrder,
      };

      const url = editItem
        ? `/api/admin/courses/${editItem.id}`
        : "/api/admin/courses";
      const method = editItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "오류가 발생했습니다.");
      } else {
        setShowModal(false);
        resetForm();
        fetchItems();
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    }
    setSaving(false);
  };

  const deleteItem = async (id: number) => {
    if (!confirm("정말 이 과정을 삭제하시겠습니까?")) return;
    setActionLoading(id);
    try {
      await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      fetchItems();
    } catch {
      /* ignore */
    }
    setActionLoading(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">교육과정 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            전체 {total}개의 교육과정
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b57d0] text-white text-sm font-medium rounded-xl hover:bg-[#004aba] transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 과정 추가
        </button>
      </div>

      {/* Course Table */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 animate-pulse">
              <div className="w-16 h-12 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">등록된 교육과정이 없습니다.</p>
          <button
            onClick={openCreate}
            className="text-[#0b57d0] text-sm font-medium hover:underline"
          >
            첫 번째 과정 추가하기
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">카테고리</th>
                  <th className="px-6 py-3 font-medium">제목</th>
                  <th className="px-6 py-3 font-medium">레벨</th>
                  <th className="px-6 py-3 font-medium">기간</th>
                  <th className="px-6 py-3 font-medium">가격</th>
                  <th className="px-6 py-3 font-medium">상태</th>
                  <th className="px-6 py-3 font-medium">관리</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-gray-400">{item.id}</td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-[#0b57d0] bg-[#e8f0fe] px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.level}</td>
                    <td className="px-6 py-4 text-gray-600 text-xs">{item.duration}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{item.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                          item.isActive
                            ? "text-emerald-700 bg-emerald-50"
                            : "text-gray-500 bg-gray-100"
                        }`}
                      >
                        {item.isActive ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          disabled={actionLoading === item.id}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <span className="text-sm text-gray-500">
            {page} / {totalPages} 페이지
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => { setShowModal(false); resetForm(); }}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editItem ? "과정 수정" : "새 과정 추가"}
              </h3>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  카테고리 *
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  placeholder="예: 스킨케어, 메디컬 왁싱, 네일 아트"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  과정명 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="메디컬 스킨케어 마스터 클래스"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  레벨 *
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] bg-white"
                >
                  {LEVEL_OPTIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  기간 *
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  placeholder="12주 (주 2회, 총 72시간)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  가격 *
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="1,500,000원"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  이미지 URL *
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  강의 특징 * <span className="text-gray-400 font-normal">(줄바꿈으로 구분)</span>
                </label>
                <textarea
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  required
                  rows={4}
                  placeholder={"초음파 기기 활용법\n문제성 피부 분석\n메디컬 필링 테크닉\n고객 상담 심리학"}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] resize-none"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  정렬 순서 <span className="text-gray-400 font-normal">(낮을수록 먼저 표시)</span>
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  min={0}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  활성 상태
                </label>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isActive ? "bg-[#0b57d0]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                      isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-[#0b57d0] text-white text-sm font-medium hover:bg-[#004aba] transition-colors disabled:opacity-50"
                >
                  {saving ? "저장 중..." : editItem ? "수정" : "추가"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
