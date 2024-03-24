/*
 * route.ts
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validateRequest";
import { redirects } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { session } = await validateRequest();
  if (!session) return new Response("No session found", { status: 401 });
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect(redirects.afterLogout);
}
