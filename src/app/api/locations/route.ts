/*
 * route.ts
 * author: Evan Kirkiles
 * created on Sun Apr 07 2024
 * 2024 Yale CPSC 419
 */

import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const query = params.get("q");
  const results = await prisma.location.findMany({
    select: { id: true, name: true },
    ...(query && { where: { name: { contains: query } } }),
  });
  return new Response(JSON.stringify(results));
}
