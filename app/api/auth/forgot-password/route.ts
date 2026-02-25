import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getDb } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    const sql = getDb();
    const users = await sql`SELECT id, name, email FROM users WHERE email = ${email}`;

    if (users.length === 0) {
      // Don't reveal whether the email exists
      return NextResponse.json({
        message: "해당 이메일로 비밀번호 재설정 링크를 발송했습니다.",
      });
    }

    const user = users[0];

    // Create a short-lived JWT for password reset (15 min)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const resetToken = await new SignJWT({
      userId: user.id,
      email: user.email,
      purpose: "password-reset",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(secret);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail({
      to: user.email as string,
      name: user.name as string,
      resetUrl,
    });

    return NextResponse.json({
      message: "해당 이메일로 비밀번호 재설정 링크를 발송했습니다.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
