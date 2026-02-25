import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = Number(id);
    const sql = getDb();

    const comments = await sql`
      SELECT * FROM comments WHERE post_id = ${postId} ORDER BY created_at ASC
    `;

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Comments GET error:", error);
    return NextResponse.json({ error: "댓글을 불러올 수 없습니다." }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { id } = await params;
    const postId = Number(id);
    const { content } = await request.json();

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "댓글 내용을 입력해주세요." }, { status: 400 });
    }

    const sql = getDb();

    const posts = await sql`SELECT id FROM posts WHERE id = ${postId}`;
    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    const trimmedContent = content.trim();
    const result = await sql`
      INSERT INTO comments (post_id, user_id, author_name, content)
      VALUES (${postId}, ${user.userId}, ${user.name}, ${trimmedContent})
      RETURNING *
    `;

    return NextResponse.json({ comment: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Comments POST error:", error);
    return NextResponse.json({ error: "댓글 작성에 실패했습니다." }, { status: 500 });
  }
}
