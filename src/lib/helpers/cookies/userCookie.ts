// Encrypted user cookie helpers (server-only)
// - Stores typed user data encrypted with AES-GCM
// - Uses HttpOnly cookies so client-side JS cannot access it
// - Key is derived from a server-only env secret (never expose to the client)

import "server-only";
import { cookies } from "next/headers";
import { createHash, webcrypto as nodeCrypto } from "crypto";

// Types
export type BaseUser = {
  id?: string;
  email?: string;
  name?: string | null;
  roles?: string[];
  // Allow extra fields but keep type-safety via generics
  [key: string]: unknown;
};

type Encryptable<T> = T | null;

// Config
const COOKIE_NAME = process.env.COOKIE_NAME || "app_user";
const isProd = process.env.NODE_ENV === "production";

// Use Web Crypto subtle API from either runtime
const subtle = globalThis.crypto?.subtle ?? nodeCrypto.subtle;

// Helpers
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function getSecretKeyBytes(): Uint8Array {
  const secret = process.env.COOKIE_SECRET;
  if (!secret) {
    throw new Error("Missing environment variable: COOKIE_SECRET");
  }

  // Prefer base64 32-byte secret; fallback to sha256 of utf-8 secret
  try {
    const buf = Buffer.from(secret, "base64");
    if (buf.length === 32) return new Uint8Array(buf);
  } catch {
    // ignore, fallback to hash
  }

  // Derive fixed 32-bytes using SHA-256 of the provided secret string
  const hash = createHash("sha256").update(secret, "utf8").digest();
  return new Uint8Array(hash);
}

async function getAesGcmKey(): Promise<CryptoKey> {
  const keyBytes = getSecretKeyBytes();
  return subtle.importKey(
    "raw",
    keyBytes as unknown as BufferSource,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

function toBase64(data: ArrayBuffer | Uint8Array): string {
  const buf =
    data instanceof Uint8Array ? Buffer.from(data) : Buffer.from(data);
  return buf.toString("base64");
}

function fromBase64(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}

// Encrypt a JSON-serializable payload with AES-GCM; returns iv.ciphertext (base64.base64)
async function encryptJson<T>(payload: Encryptable<T>): Promise<string> {
  const key = await getAesGcmKey();
  const iv = globalThis.crypto?.getRandomValues
    ? globalThis.crypto.getRandomValues(new Uint8Array(12))
    : nodeCrypto.getRandomValues(new Uint8Array(12));

  const plaintext = textEncoder.encode(JSON.stringify(payload));
  const ciphertext = await subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );
  return `${toBase64(iv)}.${toBase64(ciphertext)}`;
}

// Decrypt iv.ciphertext (base64.base64) back to JSON
async function decryptJson<T>(token: string): Promise<Encryptable<T>> {
  if (!token || !token.includes(".")) return null;
  const [ivB64, dataB64] = token.split(".", 2);
  const iv = fromBase64(ivB64);
  const data = fromBase64(dataB64);
  const key = await getAesGcmKey();
  try {
    const decrypted = await subtle.decrypt(
      { name: "AES-GCM", iv: iv as unknown as BufferSource },
      key,
      data as unknown as BufferSource
    );
    const text = textDecoder.decode(decrypted);
    return JSON.parse(text) as Encryptable<T>;
  } catch {
    // Bad auth tag, wrong key, or corrupted data
    return null;
  }
}

// Public API

export type CookieOptions = {
  // Cookie lifetime in seconds; default 30 days
  maxAge?: number;
  // Cookie path; default '/'
  path?: string;
  // SameSite; default 'lax'
  sameSite?: "lax" | "strict" | "none";
  // Custom name override; default from env/constant
  name?: string;
};

/**
 * Initializes the encrypted user cookie with a null payload.
 * Useful when you want to explicitly create the cookie shell on first visit.
 */
export async function initUserCookie(options?: CookieOptions): Promise<void> {
  await setUserCookie(null, options);
}

/**
 * Stores typed user data inside an encrypted, HttpOnly cookie.
 * Only server-side code can read/decrypt this (client JS cannot, by design).
 */
export async function setUserCookie<
  T extends BaseUser | Record<string, unknown> | null
>(user: Encryptable<T>, options?: CookieOptions): Promise<void> {
  const name = options?.name || COOKIE_NAME;
  const value = await encryptJson(user);
  type MutableCookieStore = {
    set: (
      name: string,
      value: string,
      options?: Record<string, unknown>
    ) => void;
  };
  const jar = (await cookies()) as unknown as Partial<MutableCookieStore>;
  if (typeof jar.set !== "function") {
    throw new Error(
      "setUserCookie must be called from a Route Handler or Server Action where cookies().set is available."
    );
  }
  jar.set(name, value, {
    httpOnly: true,
    secure: isProd, // Secure in production; in dev it may be plain HTTP
    sameSite: options?.sameSite ?? "lax",
    path: options?.path ?? "/",
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 30, // 30 days
  });
}

/**
 * Reads and decrypts the typed user data from the encrypted cookie.
 * Returns null if missing, expired, or decryption fails.
 */
export async function getUserFromCookie<
  T extends BaseUser = BaseUser
>(options?: { name?: string }): Promise<Encryptable<T>> {
  const name = options?.name || COOKIE_NAME;
  const jar = await cookies();
  const token = jar.get(name)?.value;
  if (!token) return null;
  return decryptJson<T>(token);
}

/**
 * Removes the encrypted user cookie.
 */
export async function removeUserCookie(options?: {
  name?: string;
  path?: string;
}): Promise<void> {
  const name = options?.name || COOKIE_NAME;
  type MutableCookieStore = {
    set: (
      name: string,
      value: string,
      options?: Record<string, unknown>
    ) => void;
  };
  const jar = (await cookies()) as unknown as Partial<MutableCookieStore>;
  if (typeof jar.set !== "function") return; // no-op if not in a mutating context
  jar.set(name, "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: options?.path ?? "/",
    maxAge: 0,
  });
}

// Small self-test helper (only runs on demand, not exported)
async function __selfTest() {
  const sample = {
    id: "1",
    email: "user@example.com",
    roles: ["user"],
  } satisfies BaseUser;
  const token = await encryptJson(sample);
  const out = await decryptJson<BaseUser>(token);
  if (!out || out.email !== sample.email) {
    throw new Error("Encryption self-test failed");
  }
}
void __selfTest;
