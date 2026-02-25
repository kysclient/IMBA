import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { courseType, name, phone, email, motivation } = await request.json();

    if (!courseType || !name || !phone || !email) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const sql = getDb();
    const currentUser = await getCurrentUser();
    const userId = currentUser?.userId ?? null;

    // Check for duplicate application (same email + same course within 30 days)
    const existing = await sql`
      SELECT id FROM applications
      WHERE email = ${email} AND course_type = ${courseType}
      AND created_at > NOW() - INTERVAL '30 days'
    `;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "이미 동일한 과정에 신청 이력이 있습니다. (30일 이내)" },
        { status: 409 }
      );
    }

    await sql`
      INSERT INTO applications (user_id, course_type, name, phone, email, motivation)
      VALUES (${userId}, ${courseType}, ${name}, ${phone}, ${email}, ${motivation || ""})
    `;

    return NextResponse.json({
      message: "수강 신청이 접수되었습니다.",
    });
  } catch (error) {
    console.error("Application submit error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
