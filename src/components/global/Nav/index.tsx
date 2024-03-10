/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 the nobot space
 */
"use client";

import Link from "next/link";
import { TfiClose, TfiMenu } from "react-icons/tfi";
import s from "./Nav.module.scss";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={s.container} aria-label="Main">
      <ul className={s.head}>
        <li>
          <Link href="/">Yale Vision</Link>
        </li>
        <li>
          <Link href="/">Spaces</Link>
        </li>
        <li>
          <Link href="/">Contests</Link>
        </li>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/">Upload</Link>
        </li>
      </ul>
      <button
        aria-expanded={open}
        aria-label="Open the menu"
        onClick={() => setOpen(!open)}
        className={s.burger}
      >
        {!open ? <TfiMenu /> : <TfiClose />}
      </button>
    </nav>
  );
}
