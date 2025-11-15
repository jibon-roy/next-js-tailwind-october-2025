import { NextResponse } from "next/server";
import { removeUserCookie } from "@/lib/helpers/cookies/userCookie";

// POST /api/user/logout -> removes the encrypted user cookie (logout)
export async function POST() {
  await removeUserCookie();
  return NextResponse.json({ ok: true, loggedOut: true });
}
