"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister(): null {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Register at root scope. `sw.js` lives in /public so available at /sw.js
    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        // Optional: listen for updates
        if (reg.waiting) {
          // there is an updated SW waiting
        }
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            // states: installing -> installed -> activating -> activated
          });
        });
      } catch {
        // swallow registration errors to avoid build/runtime issues
      }
    };

    // register on load to avoid blocking
    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
      return () => window.removeEventListener("load", registerSW);
    }
  }, []);

  return null;
}
