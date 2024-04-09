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

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const {
    name,
    description,
    location,
    model,
    picture,
    pictureWidth,
    pictureHeight,
  } = await req.json();
  const newSpace = await prisma.space.create({
    data: {
      name: name,
      description: description,
      user: {
        connect: { id: user.id },
      },
      location: {
        connectOrCreate: {
          where: { slug: slugify(location.label) },
          create: {
            slug: slugify(location.label),
            name: location.label,
          },
        },
      },
      model: {
        create: {
          key: model,
          owner: {
            connect: { id: user.id },
          },
        },
      },
      picture: {
        create: {
          key: picture,
          imageWidth: pictureWidth,
          imageHeight: pictureHeight,
          owner: {
            connect: { id: user.id },
          },
        },
      },
    },
  });
  return new Response(JSON.stringify(newSpace), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
