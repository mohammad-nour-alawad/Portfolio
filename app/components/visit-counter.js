"use client";

import { useEffect, useState } from "react";

const namespace = process.env.NEXT_PUBLIC_COUNTER_NAMESPACE || "mohammad-portfolio";

export function VisitCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const key = `${window.location.hostname.replace(/\./g, "-")}-home`;
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.value === "number") {
          setCount(data.value);
        }
      })
      .catch(() => {
        setCount(null);
      });
  }, []);

  return (
    <p className="mt-3 text-sm text-muted" aria-live="polite">
      {count === null ? "Visits loading..." : `${count.toLocaleString()} visits`}
    </p>
  );
}
