import envConfig from "@/src/utils/envConfig";

/**
 * Centralized Constant Tags — not overridable anywhere else
 * Define all your cache tags here (one place only)
 */
export const CacheTags = Object.freeze({
  USERS: "USERS",
  POSTS: "POSTS",
  PRODUCTS: "PRODUCTS",
  ORDERS: "ORDERS",
  SETTINGS: "SETTINGS",
});

/**
 * Extended Fetch Options supporting Next.js 16 caching/revalidation
 * (No `providesTags` or `invalidatesTags` here — tags are internal only)
 */
export interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number; // ISR support for App Router
    tags?: string[]; // optional Next.js-level cache tag
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
  providedTags?: string[];
  invalidatedTags?: string[];
  refetch: () => Promise<FetchResponse<T>>;
}

/**
 * Build a query string safely
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
 * - SSR + ISR + CSR support
 * - Timeout + Abort handling
 * - Auto JSON-safe parsing
 * - RTK-style tag system (fixed constants)
 * - Built-in `refetch()` method
 */
export async function fetchData<T>(
  endpoint: string,
  options: FetchOptions = {},
  tag: keyof typeof CacheTags = "USERS" // default tag for categorization
): Promise<FetchResponse<T>> {
  const controller = new AbortController();
  const timeoutId = options.timeout
    ? setTimeout(() => controller.abort(), options.timeout)
    : null;

  const executeRequest = async (): Promise<FetchResponse<T>> => {
    try {
      const queryString = buildQueryString(options.params);
      const isAbsolute = /^https?:\/\//i.test(endpoint);
      const isRooted = endpoint.startsWith("/");
      const apiBase = envConfig?.API_URL ?? "";
      const appBase =
        (envConfig as unknown as { BASE_URL?: string })?.BASE_URL ?? "";

      const finalUrl = isAbsolute
        ? `${endpoint}${queryString}`
        : isRooted
        ? `${appBase}${endpoint}${queryString}`
        : `${apiBase}/${endpoint}${queryString}`;

      const fetchOptions: FetchOptions = {
        ...options,
        method: options.method ?? "GET",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers ?? {}),
        },
        next: {
          ...options.next,
          tags: [CacheTags[tag]], // tag is fixed internally
        },
      };

      const res = await fetch(finalUrl, fetchOptions);

      if (!res.ok) {
        let errMsg = `HTTP ${res.status} - ${res.statusText}`;
        try {
          const errorBody = await res.json();
          errMsg = errorBody?.message ?? errMsg;
        } catch {
          /* ignore */
        }
        throw new Error(errMsg);
      }

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
        providedTags: [CacheTags[tag]],
        invalidatedTags: [],
        refetch: () => fetchData<T>(endpoint, options, tag),
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
        providedTags: [CacheTags[tag]],
        invalidatedTags: [],
        refetch: () => fetchData<T>(endpoint, options, tag),
      };
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  return executeRequest();
}

/**
 * Mutation Function (RTK-style but with fixed internal tags)
 * Handles POST, PUT, PATCH, DELETE automatically
 */
export async function dataMutation<T>(
  endpoint: string,
  data: unknown = {},
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  tag: keyof typeof CacheTags = "USERS"
): Promise<FetchResponse<T>> {
  const options: FetchOptions = {
    method,
    body: JSON.stringify(data),
  };

  const result = await fetchData<T>(endpoint, options, tag);

  // Automatically mark this tag as invalidated
  result.invalidatedTags = [CacheTags[tag]];
  return result;
}
