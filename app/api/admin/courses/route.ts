import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = 20;
    const offset = (page - 1) * limit;

    const items = await sql`
      SELECT id, category, title, level, duration, price, image_url, features, is_active, display_order, created_at
      FROM courses
      ORDER BY display_order ASC, created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const total = await sql`SELECT COUNT(*) as count FROM courses`;

    return NextResponse.json({
      items: items.map((c) => ({
        id: c.id,
        category: c.category,
        title: c.title,
        level: c.level,
        duration: c.duration,
        price: c.price,
        imageUrl: c.image_url,
        features: c.features,
        isActive: c.is_active,
        displayOrder: c.display_order,
        createdAt: c.created_at,
      })),
      total: Number(total[0].count),
      page,
      totalPages: Math.ceil(Number(total[0].count) / limit),
    });
  } catch (err) {
    console.error("Admin courses list error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const body = await request.json();

    const { category, title, level, duration, price, imageUrl, features, isActive, displayOrder } = body;

    if (!category || !title || !level || !duration || !price || !imageUrl || !features?.length) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO courses (category, title, level, duration, price, image_url, features, is_active, display_order)
      VALUES (${category}, ${title}, ${level}, ${duration}, ${price}, ${imageUrl}, ${features}, ${isActive !== false}, ${displayOrder || 0})
      RETURNING id
    `;

    return NextResponse.json({ id: result[0].id });
  } catch (err) {
    console.error("Admin courses create error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
