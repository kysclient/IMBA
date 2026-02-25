import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = 20;
    const offset = (page - 1) * limit;

    let apps;
    let total;

    if (status && status !== "all") {
      apps = await sql`
        SELECT id, user_id, course_type, name, phone, email, motivation, status, created_at
        FROM applications
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM applications WHERE status = ${status}`;
    } else {
      apps = await sql`
        SELECT id, user_id, course_type, name, phone, email, motivation, status, created_at
        FROM applications
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM applications`;
    }

    return NextResponse.json({
      applications: apps.map((a) => ({
        id: a.id,
        userId: a.user_id,
        courseType: a.course_type,
        name: a.name,
        phone: a.phone,
        email: a.email,
        motivation: a.motivation,
        status: a.status,
        createdAt: a.created_at,
      })),
      total: Number(total[0].count),
      page,
      totalPages: Math.ceil(Number(total[0].count) / limit),
    });
  } catch (error) {
    console.error("Admin applications error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
