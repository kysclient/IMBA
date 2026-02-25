import { NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    return { error: NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 }), user: null };
  }
  if (!user.isAdmin) {
    return { error: NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 }), user: null };
  }
  return { error: null, user };
}
