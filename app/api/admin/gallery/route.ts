import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

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
      SELECT id, title, category, image_url, link_url, link_label, display_order, created_at
      FROM gallery
      ORDER BY display_order ASC, created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const total = await sql`SELECT COUNT(*) as count FROM gallery`;

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
      total: Number(total[0].count),
      page,
      totalPages: Math.ceil(Number(total[0].count) / limit),
    });
  } catch (err) {
    console.error("Admin gallery list error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const linkUrl = (formData.get("linkUrl") as string) || null;
    const linkLabel = (formData.get("linkLabel") as string) || null;
    const displayOrder = Number(formData.get("displayOrder") || 0);
    const file = formData.get("image") as File | null;

    if (!title || !category) {
      return NextResponse.json({ error: "제목과 카테고리는 필수입니다." }, { status: 400 });
    }

    let imageUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const allowed = ["jpg", "jpeg", "png", "gif", "webp"];
      if (!allowed.includes(ext)) {
        return NextResponse.json({ error: "지원하지 않는 이미지 형식입니다." }, { status: 400 });
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "파일 크기는 10MB 이하여야 합니다." }, { status: 400 });
      }

      const fileName = `${randomUUID()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, fileName), buffer);
      imageUrl = `/uploads/gallery/${fileName}`;
    } else {
      const externalUrl = formData.get("imageUrl") as string;
      if (!externalUrl) {
        return NextResponse.json({ error: "이미지를 업로드하거나 URL을 입력해주세요." }, { status: 400 });
      }
      imageUrl = externalUrl;
    }

    const result = await sql`
      INSERT INTO gallery (title, category, image_url, link_url, link_label, display_order)
      VALUES (${title}, ${category}, ${imageUrl}, ${linkUrl}, ${linkLabel}, ${displayOrder})
      RETURNING id
    `;

    return NextResponse.json({ id: result[0].id, imageUrl });
  } catch (err) {
    console.error("Admin gallery create error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
