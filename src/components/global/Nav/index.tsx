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
import { PropsWithChildren, useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { validateRequest } from "@/lib/auth/validateRequest";

interface User {
  id: string;
  fullName: string;
  bio: string;
  // other properties...
}

export default function Nav({ children }: PropsWithChildren) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className={s.container} aria-label="Main" data-expanded={open} id={id}>
      <Link href="/" className={s.wordmark}>
        Yale Vision
      </Link>
      <ul className={s.head}>
        <li>
          <Link href="/spaces">Spaces</Link>
        </li>
        <li>
          <Link href="/guide">Guide</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <div className={s.control}>
        {children}
        <button
          aria-expanded={open}
          aria-controls={id}
          aria-label="Open the menu"
          onClick={() => setOpen(!open)}
          className={s.burger}
        >
          {!open ? <TfiMenu /> : <TfiClose />}
        </button>
      </div>
    </nav>
  );
}
