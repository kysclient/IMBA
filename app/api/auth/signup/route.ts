import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Check duplicate email
    const existingEmail = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingEmail.length > 0) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 409 }
      );
    }

    // Check duplicate phone
    const existingPhone = await sql`SELECT id FROM users WHERE phone = ${phone}`;
    if (existingPhone.length > 0) {
      return NextResponse.json(
        { error: "이미 사용 중인 휴대폰번호입니다." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await sql`INSERT INTO users (name, email, phone, password_hash) VALUES (${name}, ${email}, ${phone}, ${passwordHash}) RETURNING id, name, email, is_admin`;

    const user = result[0];
    const token = await createToken({
      userId: user.id as number,
      email: user.email as string,
      name: user.name as string,
      isAdmin: user.is_admin as boolean,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      message: "회원가입이 완료되었습니다.",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
