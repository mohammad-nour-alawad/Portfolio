"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      applyTheme(stored);
      return;
    }
    setTheme("light");
    applyTheme("light");
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2"
      style={{
        borderColor: "var(--stroke)",
        color: "var(--text)",
        background: "color-mix(in oklab, var(--bg-elev) 80%, transparent)",
        boxShadow: "0 0 0 2px transparent"
      }}
      onClick={() => {
        setTheme(nextTheme);
        applyTheme(nextTheme);
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      }}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
