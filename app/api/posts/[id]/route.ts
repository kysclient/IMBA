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

    await sql`UPDATE posts SET views = views + 1 WHERE id = ${postId}`;

    const posts = await sql`
      SELECT p.*,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
        (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
      FROM posts p WHERE p.id = ${postId}
    `;

    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    const user = await getCurrentUser();
    let userLiked = false;
    if (user) {
      const likes = await sql`SELECT id FROM post_likes WHERE post_id = ${postId} AND user_id = ${user.userId}`;
      userLiked = likes.length > 0;
    }

    return NextResponse.json({ post: { ...posts[0], user_liked: userLiked } });
  } catch (error) {
    console.error("Post GET error:", error);
    return NextResponse.json({ error: "게시글을 불러올 수 없습니다." }, { status: 500 });
  }
}

export async function PUT(
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

    const posts = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (posts[0].user_id !== user.userId && !user.isAdmin) {
      return NextResponse.json({ error: "수정 권한이 없습니다." }, { status: 403 });
    }

    const { category, title, content } = await request.json();

    if (category === "공지사항" && !user.isAdmin) {
      return NextResponse.json({ error: "공지사항은 관리자만 작성할 수 있습니다." }, { status: 403 });
    }

    const result = await sql`
      UPDATE posts SET category = ${category}, title = ${title}, content = ${content}, updated_at = NOW()
      WHERE id = ${postId} RETURNING *
    `;

    return NextResponse.json({ post: result[0] });
  } catch (error) {
    console.error("Post PUT error:", error);
    return NextResponse.json({ error: "게시글 수정에 실패했습니다." }, { status: 500 });
  }
}

export async function DELETE(
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

    const posts = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    if (posts.length === 0) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (posts[0].user_id !== user.userId && !user.isAdmin) {
      return NextResponse.json({ error: "삭제 권한이 없습니다." }, { status: 403 });
    }

    await sql`DELETE FROM posts WHERE id = ${postId}`;

    return NextResponse.json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    console.error("Post DELETE error:", error);
    return NextResponse.json({ error: "게시글 삭제에 실패했습니다." }, { status: 500 });
  }
}
