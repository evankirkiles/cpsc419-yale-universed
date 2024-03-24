/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 Yale CPSC 419
 */
"use client";

import FooterBg from "@/assets/svg/FooterBg";
import s from "./Footer.module.scss";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        document.documentElement.style.overscrollBehavior = isIntersecting
          ? "none"
          : "auto";
      },
      { rootMargin: "0px 0px 100px 0px" }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className={s.footer} ref={footerRef}>
      <FooterBg />
      <div className={s.inner}>
        <div className={s.inner2}>
          <section>
            <h2>Yale Vision</h2>
            <p>
              Yale CPSC 419: Full Stack Web Programming
              <br />
              By Evan Kirkiles, Shan Ali, and Ngoc Bui
            </p>
          </section>
          <section className={s.renav}>
            <ul>
              <li>
                <Link href="/">Spaces</Link>
              </li>
              <li>
                <Link href="/">Users</Link>
              </li>
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/">Upload</Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  );
}
