import { envConfig } from "./envConfig";

/**
 * Extended Fetch Options supporting Next.js 16 caching/revalidation
 */
export interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number; // ISR support for App Router
    tags?: string[]; // Cache invalidation tags
  };
  params?: Record<string, string | number | boolean>; // Query params support
  timeout?: number; // Request timeout (ms)
}

/**
 * Generic Fetch Response Wrapper
 */
export interface FetchResponse<T> {
  isSuccess: boolean;
  data?: T;
  message?: string;
  status?: number;
  loading: boolean;
}

/**
 * Builds a complete query string safely
 */
const buildQueryString = (
  params?: Record<string, string | number | boolean>
): string => {
  if (!params) return "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    query.append(key, String(value));
  });
  return `?${query.toString()}`;
};

/**
 *  Ultimate Fetch Function for Next.js 16
 * Features:
 * - ISR + SSR + CSR support
 * - Auto error classification
 * - JSON fallback parsing
 * - Timeout + abort handling
 * - Fully TypeScript-safe
 */
export async function fetchData<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  const loading = { loading: true };
  const controller = new AbortController();
  const timeoutId = options.timeout
    ? setTimeout(() => controller.abort(), options.timeout)
    : null;

  try {
    // Construct full URL safely
    const baseUrl = envConfig?.baseApi ?? "";
    const queryString = buildQueryString(options.params);
    const finalUrl = `${baseUrl}/${endpoint}${queryString}`;

    // Build final fetch options
    const fetchOptions: FetchOptions = {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      next: options.next, // Enable Next.js revalidation support
    };

    const res = await fetch(finalUrl, fetchOptions);

    // Handle non-OK response
    if (!res.ok) {
      let errMsg = `HTTP ${res.status} - ${res.statusText}`;
      try {
        const errorBody = await res.json();
        errMsg = errorBody?.message ?? errMsg;
      } catch {
        // fallback
      }
      throw new Error(errMsg);
    }

    // Safely parse JSON
    let data: T | undefined;
    try {
      data = (await res.json()) as T;
    } catch {
      console.warn(`⚠️ Response not JSON: ${finalUrl}`);
    }

    return {
      isSuccess: true,
      data,
      status: res.status,
      loading: false,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.name === "AbortError"
          ? "Request timed out"
          : err.message
        : "Unknown error occurred";

    return {
      isSuccess: false,
      message: errorMessage,
      loading: false,
    };
  } finally {
    loading.loading = false;
    if (timeoutId) clearTimeout(timeoutId);
  }
}
