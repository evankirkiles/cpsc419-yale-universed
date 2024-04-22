/*
 * route.ts
 * author: Evan Kirkiles
 * created on Sun Apr 07 2024
 * 2024 Yale CPSC 419
 */

import { validateRequest } from "@/lib/auth/validateRequest";
import prisma from "@/lib/prisma";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { user } = await validateRequest();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const data = await req.json();
  const space = await prisma.space.update({
    where: { id: parseInt(id), AND: { userId: user.id } },
    data: {
      name: data.name,
      description: data.description,
      location: {
        connectOrCreate: {
          where: {
            slug: slugify(data.location.label),
          },
          create: {
            slug: slugify(data.location.label),
            name: data.location.label,
          },
        },
      },
    },
  });
  return new Response(JSON.stringify(space), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const { user } = await validateRequest();
  if (!user) return new Response("Unauthorized", { status: 401 });
  await prisma.space.delete({
    where: { id: parseInt(id), userId: user.id },
  });
  return new Response("Deleted", { status: 200 });
}
