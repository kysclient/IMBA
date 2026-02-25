import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = 20;
    const offset = (page - 1) * limit;

    let posts;
    let total;

    if (category && search) {
      const searchPattern = `%${search}%`;
      posts = await sql`
        SELECT p.*,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
        FROM posts p
        WHERE p.category = ${category} AND (p.title ILIKE ${searchPattern} OR p.content ILIKE ${searchPattern} OR p.author_name ILIKE ${searchPattern})
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM posts WHERE category = ${category} AND (title ILIKE ${searchPattern} OR content ILIKE ${searchPattern} OR author_name ILIKE ${searchPattern})`;
    } else if (category) {
      posts = await sql`
        SELECT p.*,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
        FROM posts p
        WHERE p.category = ${category}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM posts WHERE category = ${category}`;
    } else if (search) {
      const searchPattern = `%${search}%`;
      posts = await sql`
        SELECT p.*,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
        FROM posts p
        WHERE p.title ILIKE ${searchPattern} OR p.content ILIKE ${searchPattern} OR p.author_name ILIKE ${searchPattern}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM posts WHERE title ILIKE ${searchPattern} OR content ILIKE ${searchPattern} OR author_name ILIKE ${searchPattern}`;
    } else {
      posts = await sql`
        SELECT p.*,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
        FROM posts p
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM posts`;
    }

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total: Number(total[0].count),
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    console.error("Admin posts GET error:", error);
    return NextResponse.json({ error: "게시글 목록을 불러올 수 없습니다." }, { status: 500 });
  }
}
