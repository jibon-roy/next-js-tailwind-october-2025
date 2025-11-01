import type { BaseUser } from "@/src/lib/helpers/cookies/userCookie";
import { fetchData } from "@/src/lib/helpers/fetchData";

type GetUserResponse = { user: BaseUser | null };
type CommonOk = { ok: true };

/**
 * Fetch current user from encrypted cookie via API.
 */
export async function getCurrentUser(): Promise<BaseUser | null> {
  const res = await fetchData<GetUserResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
    {
      credentials: "include",
      // prevent caching when reading session-like data
      next: { revalidate: 0 },
    },
    "USERS"
  );
  return res.isSuccess ? res.data?.user ?? null : null;
}

/**
 * Initialize the user cookie with null via API.
 */
export async function initUserCookieRemote(): Promise<boolean> {
  const res = await fetchData<CommonOk & { initialized: boolean }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/init`,
    { credentials: "include" },
    "USERS"
  );
  return !!res.data?.ok;
}

/**
 * Set/replace the encrypted user cookie via API.
 */
export async function setUserRemote<
  T extends BaseUser | Record<string, unknown> | null
>(user: T): Promise<boolean> {
  const res = await fetchData<CommonOk & { saved?: boolean }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
    {
      method: "POST",
      body: JSON.stringify(user),
      credentials: "include",
    },
    "USERS"
  );
  return !!res.data?.ok;
}

/**
 * Remove the encrypted user cookie via API (logout).
 */
export async function logoutRemote(): Promise<boolean> {
  const res = await fetchData<CommonOk & { loggedOut?: boolean }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/logout`,
    { method: "POST", credentials: "include" },
    "USERS"
  );
  return !!res.data?.ok;
}
