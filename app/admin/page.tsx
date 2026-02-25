"use client";

import React, { useEffect, useState } from "react";
import { Users, FileText, Clock, CheckCircle2, TrendingUp, UserPlus } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  newUsersThisWeek: number;
  newAppsThisWeek: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = stats
    ? [
        {
          label: "전체 회원",
          value: stats.totalUsers,
          icon: Users,
          color: "bg-blue-50 text-[#0b57d0]",
          iconColor: "text-[#0b57d0]",
        },
        {
          label: "전체 수강신청",
          value: stats.totalApplications,
          icon: FileText,
          color: "bg-green-50 text-emerald-700",
          iconColor: "text-emerald-600",
        },
        {
          label: "대기중 신청",
          value: stats.pendingApplications,
          icon: Clock,
          color: "bg-amber-50 text-amber-700",
          iconColor: "text-amber-600",
        },
        {
          label: "승인된 신청",
          value: stats.approvedApplications,
          icon: CheckCircle2,
          color: "bg-emerald-50 text-emerald-700",
          iconColor: "text-emerald-600",
        },
        {
          label: "이번 주 신규 회원",
          value: stats.newUsersThisWeek,
          icon: UserPlus,
          color: "bg-purple-50 text-purple-700",
          iconColor: "text-purple-600",
        },
        {
          label: "이번 주 신규 신청",
          value: stats.newAppsThisWeek,
          icon: TrendingUp,
          color: "bg-rose-50 text-rose-700",
          iconColor: "text-rose-600",
        },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">대시보드</h1>
        <p className="text-sm text-gray-500 mt-1">
          IMBA 관리자 대시보드에 오신 것을 환영합니다.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse"
            >
              <div className="h-4 bg-gray-100 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-100 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  {card.label}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
