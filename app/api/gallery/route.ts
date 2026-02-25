import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";

    let items;

    if (category && category !== "전체") {
      items = await sql`
        SELECT id, title, category, image_url, link_url, link_label, display_order, created_at
        FROM gallery
        WHERE category = ${category}
        ORDER BY display_order ASC, created_at DESC
      `;
    } else {
      items = await sql`
        SELECT id, title, category, image_url, link_url, link_label, display_order, created_at
        FROM gallery
        ORDER BY display_order ASC, created_at DESC
      `;
    }

    const categories = await sql`SELECT DISTINCT category FROM gallery ORDER BY category`;

    return NextResponse.json({
      items: items.map((g) => ({
        id: g.id,
        title: g.title,
        category: g.category,
        imageUrl: g.image_url,
        linkUrl: g.link_url,
        linkLabel: g.link_label,
        displayOrder: g.display_order,
        createdAt: g.created_at,
      })),
      categories: categories.map((c) => c.category),
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
