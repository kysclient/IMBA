"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Edit3,
  Lock,
  LogOut,
  ChevronRight,
  Check,
  X,
  Eye,
  EyeOff,
  MessageSquare,
  ShoppingCart,
  FileText,
  Settings,
} from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { useToast } from "../components/Toast";

type Tab = "profile" | "security" | "activity";

interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function MyPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout, refresh } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile edit
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [saving, setSaving] = useState(false);

  // Password change
  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      showToast("로그인이 필요한 페이지입니다.", "warning");
      router.replace("/login");
      return;
    }
    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, router, showToast, fetchProfile]);

  const startEditing = () => {
    if (!profile) return;
    setEditName(profile.name);
    setEditPhone(profile.phone);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const saveProfile = async () => {
    if (!editName.trim() || !editPhone.trim()) {
      showToast("이름과 휴대폰번호를 입력해주세요.", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, phone: editPhone }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error, "error");
        return;
      }
      showToast("프로필이 수정되었습니다.", "success");
      setEditing(false);
      await refresh();
      await fetchProfile();
    } catch {
      showToast("서버에 연결할 수 없습니다.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showToast("모든 필드를 입력해주세요.", "error");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showToast("새 비밀번호가 일치하지 않습니다.", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("새 비밀번호는 8자 이상이어야 합니다.", "error");
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error, "error");
        return;
      }
      showToast("비밀번호가 변경되었습니다.", "success");
      setChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      showToast("서버에 연결할 수 없습니다.", "error");
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast("로그아웃 되었습니다.", "success");
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f9]">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-8 animate-pulse">
              <div className="w-[96px] h-[96px] rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1 text-center sm:text-left">
                <div className="h-8 w-32 bg-gray-200 rounded-lg mb-2 mx-auto sm:mx-0" />
                <div className="h-4 w-48 bg-gray-100 rounded mb-1 mx-auto sm:mx-0" />
                <div className="h-3 w-32 bg-gray-100 rounded mx-auto sm:mx-0" />
              </div>
            </div>
            <div className="flex gap-0 -mb-px">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 w-20 bg-gray-100 rounded-t-lg mx-1 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
                <div className="h-5 w-24 bg-gray-100 rounded" />
              </div>
              <div className="divide-y divide-gray-50">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="px-6 sm:px-8 py-5 flex items-center gap-4">
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                    <div className="h-4 w-40 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
                <div className="h-5 w-24 bg-gray-100 rounded mb-5" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#f8fafc] rounded-xl p-4 h-24" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const createdDate = new Date(profile.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "프로필", icon: <User className="w-[18px] h-[18px]" /> },
    { id: "security", label: "보안", icon: <Lock className="w-[18px] h-[18px]" /> },
    { id: "activity", label: "활동", icon: <FileText className="w-[18px] h-[18px]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-0">
          {/* Profile Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-8">
            {/* Avatar */}
            <div className="w-[96px] h-[96px] rounded-full bg-gradient-to-br from-[#0b57d0] to-[#4285f4] flex items-center justify-center text-white text-4xl font-medium shadow-lg shadow-blue-500/20 flex-shrink-0">
              {profile.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f1f1f] tracking-tight">
                  {profile.name}
                </h1>
                {profile.isAdmin && (
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                    관리자
                  </span>
                )}
              </div>
              <p className="text-[15px] text-gray-500">{profile.email}</p>
              <p className="text-xs text-gray-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="w-3 h-3" />
                {createdDate} 가입
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 -mb-px overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-[14px] font-medium border-b-[3px] transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#0b57d0] text-[#0b57d0]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* ========== PROFILE TAB ========== */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Info Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100">
                <h2 className="text-[17px] font-semibold text-[#1f1f1f]">기본 정보</h2>
                {!editing ? (
                  <button
                    onClick={startEditing}
                    className="flex items-center gap-2 text-[#0b57d0] hover:bg-[#e8f0fe] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    수정
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-1.5 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      <X className="w-4 h-4" />
                      취소
                    </button>
                    <button
                      onClick={saveProfile}
                      disabled={saving}
                      className="flex items-center gap-1.5 bg-[#0b57d0] text-white hover:bg-[#004aba] px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      {saving ? "저장 중..." : "저장"}
                    </button>
                  </div>
                )}
              </div>

              <div className="divide-y divide-gray-50">
                {/* Name */}
                <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-center gap-3 sm:w-[180px] flex-shrink-0">
                    <User className="w-[18px] h-[18px] text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">이름</span>
                  </div>
                  {editing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 h-[44px] border border-gray-300 rounded-xl px-4 text-[15px] text-[#1f1f1f] focus:outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#0b57d0]/10 transition-all"
                    />
                  ) : (
                    <span className="text-[15px] text-[#1f1f1f] font-medium">{profile.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-center gap-3 sm:w-[180px] flex-shrink-0">
                    <Mail className="w-[18px] h-[18px] text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">이메일</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] text-[#1f1f1f] font-medium">{profile.email}</span>
                    <span className="text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">인증됨</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-center gap-3 sm:w-[180px] flex-shrink-0">
                    <Phone className="w-[18px] h-[18px] text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">휴대폰번호</span>
                  </div>
                  {editing ? (
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="flex-1 h-[44px] border border-gray-300 rounded-xl px-4 text-[15px] text-[#1f1f1f] focus:outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#0b57d0]/10 transition-all"
                    />
                  ) : (
                    <span className="text-[15px] text-[#1f1f1f] font-medium">{profile.phone}</span>
                  )}
                </div>

                {/* Role */}
                <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-center gap-3 sm:w-[180px] flex-shrink-0">
                    <Shield className="w-[18px] h-[18px] text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">계정 유형</span>
                  </div>
                  <span className="text-[15px] text-[#1f1f1f] font-medium">
                    {profile.isAdmin ? "관리자" : "일반 회원"}
                  </span>
                </div>

                {/* Joined */}
                <div className="px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <div className="flex items-center gap-3 sm:w-[180px] flex-shrink-0">
                    <Calendar className="w-[18px] h-[18px] text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">가입일</span>
                  </div>
                  <span className="text-[15px] text-[#1f1f1f] font-medium">{createdDate}</span>
                </div>
              </div>
            </div>

            {/* Side Cards */}
            <div className="flex flex-col gap-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-[15px] font-semibold text-[#1f1f1f] mb-5">나의 활동</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                    <MessageSquare className="w-5 h-5 text-[#1f1f1f] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1f1f1f]">0</p>
                    <p className="text-xs text-gray-500 mt-1">작성 글</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                    <MessageSquare className="w-5 h-5 text-gray-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1f1f1f]">0</p>
                    <p className="text-xs text-gray-500 mt-1">작성 댓글</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                    <ShoppingCart className="w-5 h-5 text-[#1f1f1f] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1f1f1f]">0</p>
                    <p className="text-xs text-gray-500 mt-1">주문 내역</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-xl p-4 text-center">
                    <FileText className="w-5 h-5 text-gray-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#1f1f1f]">0</p>
                    <p className="text-xs text-gray-500 mt-1">수강 과정</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-[15px] font-semibold text-[#1f1f1f] px-6 pt-5 pb-3">바로가기</h3>
                <div className="divide-y divide-gray-50">
                  <button
                    onClick={() => setActiveTab("security")}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-gray-400" />
                      비밀번호 변경
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      로그아웃
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SECURITY TAB ========== */}
        {activeTab === "security" && (
          <div className="max-w-[700px]">
            {/* Password Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#1f1f1f]">비밀번호</h2>
                  <p className="text-sm text-gray-500 mt-0.5">계정 보안을 위해 주기적으로 비밀번호를 변경해주세요</p>
                </div>
                {!changingPassword && (
                  <button
                    onClick={() => setChangingPassword(true)}
                    className="flex items-center gap-2 text-[#0b57d0] hover:bg-[#e8f0fe] px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0"
                  >
                    <Edit3 className="w-4 h-4" />
                    변경
                  </button>
                )}
              </div>

              {changingPassword ? (
                <div className="px-6 sm:px-8 py-6 space-y-5">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
                    <div className="relative">
                      <input
                        type={showCurrentPw ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-[48px] border border-gray-300 rounded-xl px-4 pr-12 text-[15px] text-[#1f1f1f] focus:outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#0b57d0]/10 transition-all"
                        placeholder="현재 비밀번호를 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                    <div className="relative">
                      <input
                        type={showNewPw ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full h-[48px] border border-gray-300 rounded-xl px-4 pr-12 text-[15px] text-[#1f1f1f] focus:outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#0b57d0]/10 transition-all"
                        placeholder="8자 이상, 문자/숫자/기호 조합"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPw(!showNewPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                    <input
                      type={showNewPw ? "text" : "password"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full h-[48px] border border-gray-300 rounded-xl px-4 text-[15px] text-[#1f1f1f] focus:outline-none focus:border-[#0b57d0] focus:ring-2 focus:ring-[#0b57d0]/10 transition-all"
                      placeholder="새 비밀번호를 한 번 더 입력하세요"
                    />
                  </div>

                  {/* Password strength indicator */}
                  {newPassword && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 flex-1">
                        <div className={`h-1 rounded-full flex-1 ${newPassword.length >= 8 ? "bg-green-400" : "bg-gray-200"}`} />
                        <div className={`h-1 rounded-full flex-1 ${/[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "bg-green-400" : "bg-gray-200"}`} />
                        <div className={`h-1 rounded-full flex-1 ${/[^A-Za-z0-9]/.test(newPassword) ? "bg-green-400" : "bg-gray-200"}`} />
                      </div>
                      <span className="text-xs text-gray-500">
                        {newPassword.length < 8
                          ? "약함"
                          : /[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword) && /[^A-Za-z0-9]/.test(newPassword)
                            ? "강함"
                            : "보통"}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setChangingPassword(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmNewPassword("");
                      }}
                      className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handlePasswordChange}
                      disabled={pwSaving}
                      className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#0b57d0] text-white hover:bg-[#004aba] transition-colors disabled:opacity-50"
                    >
                      {pwSaving ? "변경 중..." : "비밀번호 변경"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-6 sm:px-8 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1f1f1f]">비밀번호가 설정되어 있습니다</p>
                    <p className="text-xs text-gray-500 mt-0.5">마지막 변경: 알 수 없음</p>
                  </div>
                </div>
              )}
            </div>

            {/* Login Sessions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
                <h2 className="text-[17px] font-semibold text-[#1f1f1f]">로그인 세션</h2>
                <p className="text-sm text-gray-500 mt-0.5">현재 로그인된 기기 정보</p>
              </div>
              <div className="px-6 sm:px-8 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[#0b57d0]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1f1f1f]">현재 기기</p>
                  <p className="text-xs text-gray-500 mt-0.5">활성 세션</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-red-50">
                <h2 className="text-[17px] font-semibold text-red-600">계정 삭제</h2>
                <p className="text-sm text-gray-500 mt-0.5">계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다</p>
              </div>
              <div className="px-6 sm:px-8 py-5">
                <button className="px-5 py-2.5 rounded-full text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                  계정 삭제 요청
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========== ACTIVITY TAB ========== */}
        {activeTab === "activity" && (
          <div className="max-w-[800px]">
            {/* My Posts */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-[17px] font-semibold text-[#1f1f1f] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#1f1f1f]" />
                  내가 작성한 글
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <MessageSquare className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-sm">아직 작성한 글이 없습니다.</p>
                <button
                  onClick={() => router.push("/community")}
                  className="mt-4 text-[#0b57d0] hover:bg-[#e8f0fe] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  커뮤니티 둘러보기
                </button>
              </div>
            </div>

            {/* My Comments */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
                <h2 className="text-[17px] font-semibold text-[#1f1f1f] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  내가 작성한 댓글
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <MessageSquare className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-sm">아직 작성한 댓글이 없습니다.</p>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
                <h2 className="text-[17px] font-semibold text-[#1f1f1f] flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#1f1f1f]" />
                  주문 내역
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <ShoppingCart className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-sm">주문 내역이 없습니다.</p>
                <button
                  onClick={() => router.push("/store")}
                  className="mt-4 text-[#0b57d0] hover:bg-[#e8f0fe] px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  스토어 둘러보기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
