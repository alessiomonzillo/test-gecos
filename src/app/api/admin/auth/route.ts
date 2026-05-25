import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));

  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.json({ error: "ADMIN_SECRET non configurato" }, { status: 500 });
  }

  if (password !== adminSecret) {
    return NextResponse.json({ error: "Password non corretta" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_token", adminSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 ore
  });

  return NextResponse.json({ ok: true });
}
