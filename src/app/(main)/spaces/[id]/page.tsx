/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Mon Apr 08 2024
 * 2024 Yale CPSC 419
 */

import prisma from "@/lib/prisma";
import s from "./Space.module.scss";
import Balancer from "react-wrap-balancer";
import { notFound } from "next/navigation";
// import Space from "@/components/page/Space";
import dynamic from "next/dynamic";

const Space = dynamic(() => import("@/components/page/Space"));

interface SpacePageProps {
  params: { id: string };
}

export default async function SpacePage({ params: { id } }: SpacePageProps) {
  const space = await prisma.space.findUnique({
    where: { id: parseInt(id) },
    include: { location: true, model: true, picture: true },
  });
  if (!space) return notFound();

  return (
    <article className={s.container}>
      <Space
        className={s.space}
        spaceKey={space.model.key}
        background={space.picture}
      >
        <h1>
          <Balancer>{space.name}</Balancer>
        </h1>
        <p>Uploaded by Evan Kirkiles</p>
      </Space>
      <pre>{space.description || "No description provided."}</pre>
    </article>
  );
}
