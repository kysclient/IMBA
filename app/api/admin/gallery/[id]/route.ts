import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { id } = await params;
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

    let imageUrl: string | null = null;

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

      // Delete old local file if exists
      const old = await sql`SELECT image_url FROM gallery WHERE id = ${Number(id)}`;
      if (old.length > 0 && old[0].image_url.startsWith("/uploads/")) {
        try {
          await unlink(path.join(process.cwd(), "public", old[0].image_url));
        } catch { /* file may not exist */ }
      }

      const fileName = `${randomUUID()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, fileName), buffer);
      imageUrl = `/uploads/gallery/${fileName}`;
    } else {
      const externalUrl = formData.get("imageUrl") as string;
      if (externalUrl) {
        imageUrl = externalUrl;
      }
    }

    let result;
    if (imageUrl) {
      result = await sql`
        UPDATE gallery
        SET title = ${title}, category = ${category}, image_url = ${imageUrl},
            link_url = ${linkUrl}, link_label = ${linkLabel}, display_order = ${displayOrder}
        WHERE id = ${Number(id)}
        RETURNING id
      `;
    } else {
      result = await sql`
        UPDATE gallery
        SET title = ${title}, category = ${category},
            link_url = ${linkUrl}, link_label = ${linkLabel}, display_order = ${displayOrder}
        WHERE id = ${Number(id)}
        RETURNING id
      `;
    }

    if (result.length === 0) {
      return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin gallery update error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { id } = await params;

    const old = await sql`SELECT image_url FROM gallery WHERE id = ${Number(id)}`;
    if (old.length > 0 && old[0].image_url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(process.cwd(), "public", old[0].image_url));
      } catch { /* file may not exist */ }
    }

    const result = await sql`DELETE FROM gallery WHERE id = ${Number(id)} RETURNING id`;

    if (result.length === 0) {
      return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin gallery delete error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
