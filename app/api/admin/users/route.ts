import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = 20;
    const offset = (page - 1) * limit;

    let users;
    let total;

    if (search) {
      const pattern = `%${search}%`;
      users = await sql`
        SELECT id, name, email, phone, is_admin, created_at
        FROM users
        WHERE name ILIKE ${pattern} OR email ILIKE ${pattern} OR phone ILIKE ${pattern}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`
        SELECT COUNT(*) as count FROM users
        WHERE name ILIKE ${pattern} OR email ILIKE ${pattern} OR phone ILIKE ${pattern}
      `;
    } else {
      users = await sql`
        SELECT id, name, email, phone, is_admin, created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM users`;
    }

    return NextResponse.json({
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        isAdmin: u.is_admin,
        createdAt: u.created_at,
      })),
      total: Number(total[0].count),
      page,
      totalPages: Math.ceil(Number(total[0].count) / limit),
    });
  } catch (error) {
    console.error("Admin users error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
