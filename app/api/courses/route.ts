import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let items;
    if (category) {
      items = await sql`
        SELECT id, category, title, level, duration, price, image_url, features, display_order
        FROM courses
        WHERE is_active = true AND category = ${category}
        ORDER BY display_order ASC, created_at DESC
      `;
    } else {
      items = await sql`
        SELECT id, category, title, level, duration, price, image_url, features, display_order
        FROM courses
        WHERE is_active = true
        ORDER BY display_order ASC, created_at DESC
      `;
    }

    return NextResponse.json({
      courses: items.map((c) => ({
        id: c.id,
        category: c.category,
        title: c.title,
        level: c.level,
        duration: c.duration,
        price: c.price,
        imageUrl: c.image_url,
        features: c.features,
        displayOrder: c.display_order,
      })),
    });
  } catch (err) {
    console.error("Courses list error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
