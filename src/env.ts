/*
 * env.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * A file to declare required .env variables for your app. Some standard ones
 * (for using Sanity with Next.js) have been defined already for you.
 */

export const NODE_ENV = process.env.NODE_ENV!;

// Should be the domain you want to host your site at, for generating metadata
// as well as sitemaps.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:3000";

export const AWS_REGION = "us-east-1";
export const AWS_BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;
