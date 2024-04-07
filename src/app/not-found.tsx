/*
 * 404.tsx
 * author: Evan Kirkiles
 * created on Sat Apr 06 2024
 * 2024 Yale CPSC 419
 */
import s from "./NotFound.module.scss";

export default function Page404() {
  return (
    <article className={s.container}>
      <h1>404</h1>
      <p>Page not found.</p>
      <a href="/">Return home?</a>
    </article>
  );
}
