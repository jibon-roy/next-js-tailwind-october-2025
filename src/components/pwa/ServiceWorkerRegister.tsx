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
        console.info("ServiceWorker registered:", reg);

        // If there's already a waiting worker, it's an update
        if (reg.waiting) {
          console.info("ServiceWorker update waiting to activate");
        }

        // Listen for updates and state changes to surface useful debug info
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          console.info("ServiceWorker update found, installing...");
          newWorker.addEventListener("statechange", () => {
            console.info("ServiceWorker state:", newWorker.state);
            // Example: when `installed` and page already controlled, a new SW is available
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.info(
                "New ServiceWorker installed and waiting — consider prompting user to refresh."
              );
            }
          });
        });
      } catch (err) {
        // log errors so we don't silently fail to register (helps debugging)
        // In some environments (blocked by CSP, HTTPS missing, or 404 for /sw.js)
        // registration can fail — surfacing the error is helpful.
        console.error("ServiceWorker registration failed:", err);
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
