import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "잘못된 상태값입니다." }, { status: 400 });
    }

    const result = await sql`
      UPDATE applications SET status = ${status} WHERE id = ${Number(id)}
      RETURNING id, user_id, course_type, name, phone, email, motivation, status, created_at
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "신청을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ application: result[0] });
  } catch (err) {
    console.error("Admin application update error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const sql = getDb();
    const { id } = await params;

    const result = await sql`DELETE FROM applications WHERE id = ${Number(id)} RETURNING id`;

    if (result.length === 0) {
      return NextResponse.json({ error: "신청을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin application delete error:", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
