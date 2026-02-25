import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "이메일/휴대폰과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const sql = getDb();

    const users = await sql`SELECT id, name, email, password_hash, is_admin FROM users WHERE email = ${identifier} OR phone = ${identifier}`;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "등록되지 않은 계정입니다." },
        { status: 401 }
      );
    }

    const user = users[0];
    const passwordValid = await bcrypt.compare(
      password,
      user.password_hash as string
    );

    if (!passwordValid) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    const token = await createToken({
      userId: user.id as number,
      email: user.email as string,
      name: user.name as string,
      isAdmin: user.is_admin as boolean,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      message: "로그인 성공",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
