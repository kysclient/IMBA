"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Search, Shield, ShieldOff, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const toggleAdmin = async (userId: number, currentAdmin: boolean) => {
    if (!confirm(currentAdmin ? "관리자 권한을 해제하시겠습니까?" : "관리자 권한을 부여하시겠습니까?")) return;
    setActionLoading(userId);
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: !currentAdmin }),
      });
      fetchUsers();
    } catch {
      /* ignore */
    }
    setActionLoading(null);
  };

  const deleteUser = async (userId: number) => {
    if (!confirm("정말 이 회원을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) return;
    setActionLoading(userId);
    try {
      await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      fetchUsers();
    } catch {
      /* ignore */
    }
    setActionLoading(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">회원 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            전체 {total.toLocaleString()}명의 회원
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 이메일, 휴대폰 검색"
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b57d0]/20 focus:border-[#0b57d0] w-full sm:w-[280px] bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#0b57d0] text-white text-sm font-medium rounded-xl hover:bg-[#004aba] transition-colors"
          >
            검색
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left py-3.5 px-5 font-medium text-gray-500">이름</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500">이메일</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500 hidden sm:table-cell">휴대폰</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500 hidden md:table-cell">가입일</th>
                <th className="text-left py-3.5 px-5 font-medium text-gray-500">권한</th>
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
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    회원이 없습니다.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0b57d0] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600">{u.email}</td>
                    <td className="py-3.5 px-5 text-gray-600 hidden sm:table-cell">{u.phone}</td>
                    <td className="py-3.5 px-5 text-gray-400 hidden md:table-cell">
                      {new Date(u.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="py-3.5 px-5">
                      {u.isAdmin ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          <Shield className="w-3 h-3" />
                          관리자
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">일반회원</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleAdmin(u.id, u.isAdmin)}
                          disabled={actionLoading === u.id}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                          title={u.isAdmin ? "관리자 해제" : "관리자 지정"}
                        >
                          {u.isAdmin ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id)}
                          disabled={actionLoading === u.id}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                          title="회원 삭제"
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
    </div>
  );
}
