import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();

    const [usersResult, appsResult, appsPendingResult, appsApprovedResult, recentUsersResult, recentAppsResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM users`,
      sql`SELECT COUNT(*) as count FROM applications`,
      sql`SELECT COUNT(*) as count FROM applications WHERE status = 'pending'`,
      sql`SELECT COUNT(*) as count FROM applications WHERE status = 'approved'`,
      sql`SELECT COUNT(*) as count FROM users WHERE created_at > NOW() - INTERVAL '7 days'`,
      sql`SELECT COUNT(*) as count FROM applications WHERE created_at > NOW() - INTERVAL '7 days'`,
    ]);

    return NextResponse.json({
      totalUsers: Number(usersResult[0].count),
      totalApplications: Number(appsResult[0].count),
      pendingApplications: Number(appsPendingResult[0].count),
      approvedApplications: Number(appsApprovedResult[0].count),
      newUsersThisWeek: Number(recentUsersResult[0].count),
      newAppsThisWeek: Number(recentAppsResult[0].count),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
