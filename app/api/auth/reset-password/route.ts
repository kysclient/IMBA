import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    // Verify reset token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    let payload;
    try {
      const result = await jwtVerify(token, secret);
      payload = result.payload as { userId: number; email: string; purpose: string };
    } catch {
      return NextResponse.json(
        { error: "링크가 만료되었거나 유효하지 않습니다. 다시 요청해주세요." },
        { status: 401 }
      );
    }

    if (payload.purpose !== "password-reset") {
      return NextResponse.json(
        { error: "유효하지 않은 토큰입니다." },
        { status: 401 }
      );
    }

    const sql = getDb();
    const newHash = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password_hash = ${newHash} WHERE id = ${payload.userId}`;

    return NextResponse.json({
      message: "비밀번호가 성공적으로 변경되었습니다.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
