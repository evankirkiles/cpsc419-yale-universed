/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */

import { validateRequest } from "@/lib/auth/validateRequest";
import { redirects } from "@/lib/constants";
import { redirect } from "next/navigation";
import s from "./Login.module.scss";
import { loginLink } from "@/lib/utils";

export const metadata = {
  title: "Login",
  description: "Login Page",
};

export default async function LoginPage() {
  const { user } = await validateRequest();
  if (user) redirect(redirects.afterLogin);
  return (
    <section className={s.container}>
      <h1>Login with CAS</h1>
      <p>Yale Vision requires authentication with your Yale credentials.</p>
      <a href={loginLink(redirects.afterLogin)}>Login with CAS</a>
    </section>
  );
}
