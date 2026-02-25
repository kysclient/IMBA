"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Upload,
  Link as LinkIcon,
  GripVertical,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  linkUrl: string | null;
  linkLabel: string | null;
  displayOrder: number;
  createdAt: string;
}

const DEFAULT_CATEGORY = "";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?page=${page}`);
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
    setTitle("");
    setCategory(DEFAULT_CATEGORY);
    setLinkUrl("");
    setLinkLabel("");
    setDisplayOrder(0);
    setImageFile(null);
    setImageUrl("");
    setUploadMode("file");
    setPreviewUrl("");
    setEditItem(null);
  };

  const openCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setLinkUrl(item.linkUrl || "");
    setLinkLabel(item.linkLabel || "");
    setDisplayOrder(item.displayOrder);
    setImageFile(null);
    setImageUrl(item.imageUrl.startsWith("/uploads/") ? "" : item.imageUrl);
    setUploadMode(item.imageUrl.startsWith("/uploads/") ? "file" : "url");
    setPreviewUrl(item.imageUrl);
    setShowModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("linkUrl", linkUrl);
      formData.append("linkLabel", linkLabel);
      formData.append("displayOrder", String(displayOrder));

      if (uploadMode === "file" && imageFile) {
        formData.append("image", imageFile);
      } else if (uploadMode === "url" && imageUrl) {
        formData.append("imageUrl", imageUrl);
      } else if (!editItem) {
        alert("이미지를 업로드하거나 URL을 입력해주세요.");
        setSaving(false);
        return;
      }

      const url = editItem
        ? `/api/admin/gallery/${editItem.id}`
        : "/api/admin/gallery";
      const method = editItem ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
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
    if (!confirm("정말 이 항목을 삭제하시겠습니까?")) return;
    setActionLoading(id);
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
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
          <h1 className="text-2xl font-semibold text-gray-900">갤러리 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            전체 {total}개의 갤러리 항목
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b57d0] text-white text-sm font-medium rounded-xl hover:bg-[#004aba] transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 항목 추가
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-100"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">등록된 갤러리 항목이 없습니다.</p>
          <button
            onClick={openCreate}
            className="text-[#0b57d0] text-sm font-medium hover:underline"
          >
            첫 번째 항목 추가하기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2.5 bg-white rounded-xl text-gray-700 hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    disabled={actionLoading === item.id}
                    className="p-2.5 bg-white rounded-xl text-red-500 hover:bg-red-50 transition-colors shadow-lg disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {/* Order badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-500 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <GripVertical className="w-3 h-3" />
                  {item.displayOrder}
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] font-bold text-[#0b57d0] mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">
                  {item.title}
                </h3>
                {item.linkUrl && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <LinkIcon className="w-3 h-3" />
                    <span className="truncate">{item.linkLabel || item.linkUrl}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
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
                {editItem ? "항목 수정" : "새 항목 추가"}
              </h3>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이미지 *
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setUploadMode("file")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      uploadMode === "file"
                        ? "bg-[#0b57d0] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    파일 업로드
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode("url")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      uploadMode === "url"
                        ? "bg-[#0b57d0] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    URL 입력
                  </button>
                </div>

                {uploadMode === "file" ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#0b57d0]/40 hover:bg-blue-50/30 transition-colors"
                  >
                    {previewUrl ? (
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          클릭하여 이미지 선택
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          JPG, PNG, GIF, WebP (최대 10MB)
                        </p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                    />
                    {previewUrl && imageUrl && (
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mt-3">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  제목 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="갤러리 항목 제목"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

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
                  placeholder="예: 교육활동, 협회행사, 미용대회"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  링크 URL
                  <span className="text-gray-400 font-normal ml-1">(선택)</span>
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Link Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  링크 텍스트
                  <span className="text-gray-400 font-normal ml-1">(선택)</span>
                </label>
                <input
                  type="text"
                  value={linkLabel}
                  onChange={(e) => setLinkLabel(e.target.value)}
                  placeholder="자세히 보기"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  정렬 순서
                  <span className="text-gray-400 font-normal ml-1">(낮을수록 먼저 표시)</span>
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  min={0}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0]"
                />
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
