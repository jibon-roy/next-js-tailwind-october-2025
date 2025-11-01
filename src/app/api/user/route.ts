import { NextResponse } from "next/server";
import {
  getUserFromCookie,
  setUserCookie,
} from "@/src/lib/helpers/cookies/userCookie";

// GET /api/user -> returns the decrypted user from the encrypted HttpOnly cookie
export async function GET() {
  const user = await getUserFromCookie();
  return NextResponse.json({ user });
}

// POST /api/user -> sets/updates the encrypted user cookie with provided body
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  await setUserCookie(body ?? null);
  return NextResponse.json({ ok: true, saved: true });
}
