import { NextResponse } from "next/server";
import { initUserCookie } from "@/src/lib/helpers/cookies/userCookie";

// GET /api/user/init -> initializes the encrypted cookie with null
export async function GET() {
  await initUserCookie();
  return NextResponse.json({ ok: true, initialized: true });
}
