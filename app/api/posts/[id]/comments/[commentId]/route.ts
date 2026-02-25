import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { commentId } = await params;
    const cId = Number(commentId);
    const sql = getDb();

    const comments = await sql`SELECT * FROM comments WHERE id = ${cId}`;
    if (comments.length === 0) {
      return NextResponse.json({ error: "댓글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (comments[0].user_id !== user.userId && !user.isAdmin) {
      return NextResponse.json({ error: "삭제 권한이 없습니다." }, { status: 403 });
    }

    await sql`DELETE FROM comments WHERE id = ${cId}`;

    return NextResponse.json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error("Comment DELETE error:", error);
    return NextResponse.json({ error: "댓글 삭제에 실패했습니다." }, { status: 500 });
  }
}
