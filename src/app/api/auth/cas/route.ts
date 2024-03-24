/*
 * route.ts
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 *
 * This function simply generates the requisite CAS URL for the user to log in
 * with their Yale credentials.
 */

import { SITE_URL } from "@/env";
import { redirects } from "@/lib/constants";
import { redirect } from "next/navigation";

const CAS_BASE = "https://secure.its.yale.edu/cas/login";

export async function GET(req: Request) {
  // Where we want the end user to end up
  const target = new URL(req.url).searchParams.get("redirect") || "/";
  // This is where CAS will redirect with credentials
  const serviceURL = new URL(SITE_URL);
  serviceURL.pathname = redirects.handleLogin;
  serviceURL.searchParams.set("redirect", target);
  // Build CAS URL providing both service for saving session and a target redirect
  const CASURL = new URL(CAS_BASE);
  CASURL.searchParams.set("service", serviceURL.toString());
  CASURL.searchParams.set("redirect", target);
  redirect(CASURL.toString());
}
