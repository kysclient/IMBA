import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import PostDetailClient from "./PostDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const sql = getDb();
    const rows = await sql`
      SELECT title, content, category FROM posts WHERE id = ${id} LIMIT 1
    `;

    if (rows.length === 0) {
      return { title: "게시글을 찾을 수 없습니다" };
    }

    const post = rows[0];
    const description = post.content.replace(/\n/g, " ").substring(0, 120);

    return {
      title: post.title,
      description,
      openGraph: {
        title: `${post.title} | IMBA 커뮤니티`,
        description,
      },
    };
  } catch {
    return { title: "커뮤니티" };
  }
}

export default function PostDetailPage() {
  return <PostDetailClient />;
}
