import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "휴대폰번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const sql = getDb();
    const users = await sql`SELECT name, email FROM users WHERE phone = ${phone}`;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "해당 휴대폰번호로 등록된 계정이 없습니다." },
        { status: 404 }
      );
    }

    const user = users[0];
    // Mask email for privacy: show first 2 chars + *** + @domain
    const emailStr = user.email as string;
    const [local, domain] = emailStr.split("@");
    const masked = local.slice(0, 2) + "***@" + domain;

    return NextResponse.json({
      name: user.name,
      email: emailStr,
      maskedEmail: masked,
    });
  } catch (error) {
    console.error("Find email error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
