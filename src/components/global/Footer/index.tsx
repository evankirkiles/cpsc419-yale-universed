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
        <h2>Yale Vision</h2>
      </div>
    </footer>
  );
}
