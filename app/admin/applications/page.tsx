"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Eye,
  X,
} from "lucide-react";

interface ApplicationItem {
  id: number;
  userId: number | null;
  courseType: string;
  name: string;
  phone: string;
  email: string;
  motivation: string;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "pending", label: "대기중" },
  { value: "approved", label: "승인" },
  { value: "rejected", label: "거절" },
];

const statusStyle: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabel: Record<string, string> = {
  pending: "대기중",
  approved: "승인",
  rejected: "거절",
};

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [detail, setDetail] = useState<ApplicationItem | null>(null);

  const fetchApps = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), status: statusFilter });
      const res = await fetch(`/api/admin/applications?${params}`);
      const data = await res.json();
      setApps(data.applications || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const updateStatus = async (appId: number, status: string) => {
    setActionLoading(appId);
    try {
      await fetch(`/api/admin/applications/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchApps();
      if (detail?.id === appId) setDetail(null);
    } catch {
      /* ignore */
    }
    setActionLoading(null);
  };

  const deleteApp = async (appId: number) => {
    if (!confirm("정말 이 신청을 삭제하시겠습니까?")) return;
    setActionLoading(appId);
    try {
      await fetch(`/api/admin/applications/${appId}`, { method: "DELETE" });
      fetchApps();
      if (detail?.id === appId) setDetail(null);
    } catch {
      /* ignore */
    }
    setActionLoading(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">수강신청 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            전체 {total.toLocaleString()}건의 신청
          </p>
        </div>

        <div className="flex gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setStatusFilter(opt.value);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === opt.value
                  ? "bg-[#0b57d0] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3.5 px-5 font-medium text-gray-500">신청자</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500 hidden sm:table-cell">과정</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500 hidden md:table-cell">연락처</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500 hidden lg:table-cell">신청일</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500">상태</th>
                <th className="text-right py-3.5 px-5 font-medium text-gray-500">관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-4 px-5" colSpan={6}>
                      <div className="h-5 bg-gray-100 rounded animate-pulse w-full"></div>
                    </td>
                  </tr>
                ))
              ) : apps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    신청 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                apps.map((app) => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{app.email}</p>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600 hidden sm:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                        {app.courseType}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600 hidden md:table-cell">{app.phone}</td>
                    <td className="py-3.5 px-5 text-gray-400 hidden lg:table-cell">
                      {new Date(app.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          statusStyle[app.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {statusLabel[app.status] || app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDetail(app)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                          title="상세보기"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(app.id, "approved")}
                              disabled={actionLoading === app.id}
                              className="p-2 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors disabled:opacity-50"
                              title="승인"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(app.id, "rejected")}
                              disabled={actionLoading === app.id}
                              className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                              title="거절"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteApp(app.id)}
                          disabled={actionLoading === app.id}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {page} / {totalPages} 페이지
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">신청 상세</h3>
              <button onClick={() => setDetail(null)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">이름</p>
                  <p className="text-sm font-medium text-gray-900">{detail.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">상태</p>
                  <span className={`inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full ${statusStyle[detail.status]}`}>
                    {statusLabel[detail.status]}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">이메일</p>
                  <p className="text-sm text-gray-700">{detail.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">연락처</p>
                  <p className="text-sm text-gray-700">{detail.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 mb-1">과정</p>
                  <p className="text-sm text-gray-700">{detail.courseType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 mb-1">신청일</p>
                  <p className="text-sm text-gray-700">
                    {new Date(detail.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
              </div>
              {detail.motivation && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">지원 동기</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 leading-relaxed whitespace-pre-wrap">
                    {detail.motivation}
                  </p>
                </div>
              )}
            </div>
            {detail.status === "pending" && (
              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={() => updateStatus(detail.id, "approved")}
                  disabled={actionLoading === detail.id}
                  className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  승인
                </button>
                <button
                  onClick={() => updateStatus(detail.id, "rejected")}
                  disabled={actionLoading === detail.id}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  거절
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
