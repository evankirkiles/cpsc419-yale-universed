/*
 * route.ts
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 *
 * In this route handler, we use the ticket from the CAS server to validate the user's
 * session. If it is valid, then create a session for the user with Lucia.
 */

import { SITE_URL } from "@/env";
import { lucia } from "@/lib/auth";
import { redirects } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CAS_VALIDATE = "https://secure.its.yale.edu/cas/validate";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const target = url.searchParams.get("redirect") || "/";
  const ticket = url.searchParams.get("ticket");
  if (!ticket) return redirect(redirects.toLogin);
  // This is where CAS will redirect with credentials
  const serviceURL = new URL(SITE_URL);
  serviceURL.pathname = redirects.handleLogin;
  serviceURL.searchParams.set("redirect", target);
  // Validate the ticket with the CAS server
  const CASURL = new URL(CAS_VALIDATE);
  CASURL.searchParams.set("ticket", ticket);
  CASURL.searchParams.set("service", serviceURL.toString());
  const resp = await fetch(CASURL);

  // Parse success from returned credentials
  const body = await resp.text();
  if (body.startsWith("no")) return redirect(redirects.toLogin);
  const [_, netId] = body.split("\n");
  console.log(`User login: ${netId}`);

  // Create the user if it doesn't exist
  await prisma.user.upsert({
    where: { id: netId },
    create: { id: netId },
    update: {},
  });

  // Create a session for the user
  const session = await lucia.createSession(netId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect(redirects.afterLogin);
}
