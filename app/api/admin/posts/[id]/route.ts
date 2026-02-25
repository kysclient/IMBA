import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const postId = Number(id);
    const sql = getDb();
    const body = await request.json();

    const posts = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    // Toggle is_pinned only
    if (body.is_pinned !== undefined && Object.keys(body).length === 1) {
      const pinned = body.is_pinned;
      const result = await sql`
        UPDATE posts SET is_pinned = ${pinned}, updated_at = NOW()
        WHERE id = ${postId} RETURNING *
      `;
      return NextResponse.json({ post: result[0] });
    }

    // Full update
    const category = body.category || posts[0].category;
    const title = body.title || posts[0].title;
    const content = body.content || posts[0].content;
    const isPinned = body.is_pinned !== undefined ? body.is_pinned : posts[0].is_pinned;

    const result = await sql`
      UPDATE posts SET category = ${category}, title = ${title}, content = ${content}, is_pinned = ${isPinned}, updated_at = NOW()
      WHERE id = ${postId} RETURNING *
    `;

    return NextResponse.json({ post: result[0] });
  } catch (error) {
    console.error("Admin post PUT error:", error);
    return NextResponse.json({ error: "게시글 수정에 실패했습니다." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const postId = Number(id);
    const sql = getDb();

    const posts = await sql`SELECT id FROM posts WHERE id = ${postId}`;
    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    await sql`DELETE FROM posts WHERE id = ${postId}`;

    return NextResponse.json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    console.error("Admin post DELETE error:", error);
    return NextResponse.json({ error: "게시글 삭제에 실패했습니다." }, { status: 500 });
  }
}
