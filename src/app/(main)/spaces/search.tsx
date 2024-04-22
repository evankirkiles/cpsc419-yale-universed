/*
 * search.tsx
 * author: Evan Kirkiles
 * created on Mon Apr 22 2024
 * 2024 Yale CPSC 419
 */

"use client";

import { useRef } from "react";

export default function Search({ query }: { query?: string }) {
  return (
    <input
      type="search"
      name="q"
      placeholder="Search..."
      ref={(e) => e?.setAttribute("value", query || "")}
    />
  );
}
