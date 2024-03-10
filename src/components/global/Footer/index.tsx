/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 Yale CPSC 419
 */
import FooterBg from "@/assets/svg/FooterBg";
import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <FooterBg />
      <div className={s.inner}>
        <h2>Yale Vision</h2>
      </div>
    </footer>
  );
}
