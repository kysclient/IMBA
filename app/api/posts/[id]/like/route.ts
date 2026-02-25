import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

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
    const sql = getDb();

    const posts = await sql`SELECT id FROM posts WHERE id = ${postId}`;
    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    const existing = await sql`
      SELECT id FROM post_likes WHERE post_id = ${postId} AND user_id = ${user.userId}
    `;

    if (existing.length > 0) {
      await sql`DELETE FROM post_likes WHERE post_id = ${postId} AND user_id = ${user.userId}`;
    } else {
      await sql`INSERT INTO post_likes (post_id, user_id) VALUES (${postId}, ${user.userId})`;
    }

    const likeCount = await sql`SELECT COUNT(*) as count FROM post_likes WHERE post_id = ${postId}`;

    return NextResponse.json({
      liked: existing.length === 0,
      like_count: Number(likeCount[0].count),
    });
  } catch (error) {
    console.error("Like POST error:", error);
    return NextResponse.json({ error: "좋아요 처리에 실패했습니다." }, { status: 500 });
  }
}
