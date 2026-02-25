import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
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
        WHERE p.category = ${category} AND (p.title ILIKE ${searchPattern} OR p.content ILIKE ${searchPattern})
        ORDER BY p.is_pinned DESC, p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM posts WHERE category = ${category} AND (title ILIKE ${searchPattern} OR content ILIKE ${searchPattern})`;
    } else if (category) {
      posts = await sql`
        SELECT p.*,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
        FROM posts p
        WHERE p.category = ${category}
        ORDER BY p.is_pinned DESC, p.created_at DESC
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
        WHERE p.title ILIKE ${searchPattern} OR p.content ILIKE ${searchPattern}
        ORDER BY p.is_pinned DESC, p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;
      total = await sql`SELECT COUNT(*) as count FROM posts WHERE title ILIKE ${searchPattern} OR content ILIKE ${searchPattern}`;
    } else {
      posts = await sql`
        SELECT p.*,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) as comment_count,
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as like_count
        FROM posts p
        ORDER BY p.is_pinned DESC, p.created_at DESC
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
    console.error("Posts GET error:", error);
    return NextResponse.json({ error: "게시글 목록을 불러올 수 없습니다." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { category, title, content } = await request.json();

    if (!category || !title || !content) {
      return NextResponse.json({ error: "카테고리, 제목, 내용을 모두 입력해주세요." }, { status: 400 });
    }

    if (category === "공지사항" && !user.isAdmin) {
      return NextResponse.json({ error: "공지사항은 관리자만 작성할 수 있습니다." }, { status: 403 });
    }

    const sql = getDb();
    const result = await sql`
      INSERT INTO posts (user_id, category, title, content, author_name)
      VALUES (${user.userId}, ${category}, ${title}, ${content}, ${user.name})
      RETURNING *
    `;

    return NextResponse.json({ post: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Posts POST error:", error);
    return NextResponse.json({ error: "게시글 작성에 실패했습니다." }, { status: 500 });
  }
}
