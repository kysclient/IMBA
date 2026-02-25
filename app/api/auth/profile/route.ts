import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCurrentUser, createToken, setAuthCookie } from "@/lib/auth";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const sql = getDb();
    const users = await sql`SELECT id, name, email, phone, is_admin, created_at FROM users WHERE id = ${currentUser.userId}`;

    if (users.length === 0) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
    }

    const user = users[0];
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.is_admin,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { name, phone } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "이름과 휴대폰번호를 입력해주세요." }, { status: 400 });
    }

    const sql = getDb();

    // Check phone duplicate (excluding current user)
    const existing = await sql`SELECT id FROM users WHERE phone = ${phone} AND id != ${currentUser.userId}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "이미 사용 중인 휴대폰번호입니다." }, { status: 409 });
    }

    const result = await sql`UPDATE users SET name = ${name}, phone = ${phone} WHERE id = ${currentUser.userId} RETURNING id, name, email, is_admin`;

    const user = result[0];

    // Refresh JWT with updated name
    const token = await createToken({
      userId: user.id as number,
      email: user.email as string,
      name: user.name as string,
      isAdmin: user.is_admin as boolean,
    });
    await setAuthCookie(token);

    return NextResponse.json({ message: "프로필이 수정되었습니다." });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
