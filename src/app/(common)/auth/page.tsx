"use client";

import { useEffect, useState } from "react";
import type { BaseUser } from "@/src/lib/helpers/cookies/userCookie";
import {
  getCurrentUser,
  setUserRemote,
  logoutRemote,
  initUserCookieRemote,
} from "@/src/lib/helpers/userCookieClient";

type Status = {
  loading: boolean;
  message?: string;
  error?: string;
};

const dummyUser: BaseUser = {
  id: "u_12345",
  email: "jane.doe@example.com",
  name: "Jane Doe",
  roles: ["user"],
};

export default function AuthDemoPage() {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [status, setStatus] = useState<Status>({ loading: false });

  const refreshUser = async () => {
    setStatus({ loading: true });
    const u = await getCurrentUser();
    setUser(u);
    setStatus({ loading: false });
  };

  useEffect(() => {
    // Ensure the cookie exists (null) on first visit; ignore failures silently
    initUserCookieRemote().finally(() => {
      refreshUser();
    });
  }, []);

  const handleLogin = async () => {
    setStatus({ loading: true, message: "Setting dummy user..." });
    const ok = await setUserRemote(dummyUser);
    await refreshUser();
    setStatus({
      loading: false,
      message: ok ? "User set" : "Failed to set user",
    });
  };

  const handleLogout = async () => {
    setStatus({ loading: true, message: "Logging out..." });
    const ok = await logoutRemote();
    await refreshUser();
    setStatus({
      loading: false,
      message: ok ? "Logged out" : "Failed to logout",
    });
  };

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Auth demo (encrypted cookie)</h1>
        <p className="text-sm text-muted-foreground">
          Login sets a dummy user into an encrypted HttpOnly cookie. Logout
          removes it.
        </p>
      </header>

      <section className="flex flex-wrap gap-3">
        <button
          className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white hover:bg-black/90 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
          onClick={handleLogin}
          disabled={status.loading}
        >
          {status.loading ? "Working..." : "Login (set dummy user)"}
        </button>

        <button
          className="inline-flex items-center rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={refreshUser}
          disabled={status.loading}
        >
          Refresh
        </button>

        <button
          className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-500 disabled:opacity-50"
          onClick={handleLogout}
          disabled={status.loading}
        >
          Logout
        </button>
      </section>

      {status.message && (
        <p className="text-sm text-muted-foreground">{status.message}</p>
      )}

      <section className="rounded-md border p-4">
        <h2 className="mb-2 font-medium">Current user</h2>
        <pre className="overflow-auto whitespace-pre-wrap wrap-break-word text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </section>

      <section className="rounded-md border p-4 bg-gray-50 dark:bg-gray-900/30">
        <h3 className="mb-1 font-medium">Dummy user used on login</h3>
        <pre className="overflow-auto whitespace-pre-wrap wrap-break-word text-sm">
          {JSON.stringify(dummyUser, null, 2)}
        </pre>
      </section>
    </main>
  );
}
