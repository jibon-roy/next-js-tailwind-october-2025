"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, SunIcon } from "lucide-react";

const ThemeSwitch = ({
  variant = "select",
}: {
  variant: "select" | "toggle";
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [toggle, setToggle] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // schedule the update to the next tick to avoid a synchronous setState during the effect
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return null;
  }

  if (variant === "toggle") {
    // use resolvedTheme (if provided) so `system` can be resolved to 'light'|'dark'
    const current = resolvedTheme ?? theme;
    const isDark = current === "dark";

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        onClick={() => {
          setTheme(isDark ? "light" : "dark");
          setToggle(!toggle);
        }}
        className={`
      relative inline-flex outline-none items-center h-8 w-14 rounded-full
      transition-all duration-500 ease-in-out
      shadow-inner bg-linear-to-r
      ${
        toggle
          ? " from-indigo-700 to-purple-600"
          : "from-yellow-400 to-orange-400"
      }
      hover:scale-105 hover:shadow-lg
    `}
      >
        <span className="sr-only">Toggle theme</span>
        <span
          className={`
        inline-flex h-6 w-6 items-center justify-center rounded-full shadow-md
        transform transition-all duration-500 ease-in-out
        ${
          isDark
            ? "translate-x-7 rotate-360 bg-gray-900"
            : "translate-x-1 rotate-0 bg-white"
        }
      `}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-yellow-400 fill-yellow-400 stroke-0 transition-transform duration-500 ease-in-out animate-[spin_1s_ease-in-out]" />
          ) : (
            <SunIcon className="w-5 h-5 text-yellow-500 fill-yellow-500 transition-transform duration-500 ease-in-out animate-[spin_1s_ease-in-out]" />
          )}
        </span>
      </button>
    );
  }

  return (
    <select
      className="text-black dark:text-white"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default ThemeSwitch;
