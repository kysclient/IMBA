import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { id } = await params;
    const body = await request.json();

    const { category, title, level, duration, price, imageUrl, features, isActive, displayOrder } = body;

    if (!category || !title || !level || !duration || !price || !imageUrl || !features?.length) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
    }

    const result = await sql`
      UPDATE courses
      SET category = ${category}, title = ${title}, level = ${level}, duration = ${duration},
          price = ${price}, image_url = ${imageUrl}, features = ${features},
          is_active = ${isActive !== false}, display_order = ${displayOrder || 0}, updated_at = NOW()
      WHERE id = ${Number(id)}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "과정을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin courses update error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { id } = await params;

    const result = await sql`DELETE FROM courses WHERE id = ${Number(id)} RETURNING id`;

    if (result.length === 0) {
      return NextResponse.json({ error: "과정을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin courses delete error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
