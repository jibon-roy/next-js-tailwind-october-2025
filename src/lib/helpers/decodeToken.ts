import { jwtDecode } from "jwt-decode";

export type JwtPayloadLike = {
  sub?: string;
  email?: string;
  name?: string;
  roles?: string[];
  [key: string]: unknown;
};

/**
 * Decode a JWT safely. Returns null on invalid/expired/malformed tokens.
 * Note: This does NOT verify the signature; use only for non-sensitive UI derivations.
 */
export function decodeUserFromToken<T extends JwtPayloadLike = JwtPayloadLike>(
  token?: string | null
): T | null {
  if (!token) return null;
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}
