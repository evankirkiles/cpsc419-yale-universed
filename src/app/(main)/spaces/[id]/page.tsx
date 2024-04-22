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
import dynamic from "next/dynamic";
import { validateRequest } from "@/lib/auth/validateRequest";
import Link from "next/link";
import { loginLink } from "@/lib/utils";

const Space = dynamic(() => import("@/components/page/Space"));

interface SpacePageProps {
  params: { id: string };
}

export default async function SpacePage({ params: { id } }: SpacePageProps) {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <article className={"noAuth"}>
        <div>
          <h1>401</h1>
          <p>Please log in with CAS to view spaces on the site.</p>
          <Link href={loginLink(`/spaces/${id}`)}>Log in with CAS</Link>
        </div>
      </article>
    );
  }

  const space = await prisma.space.findUnique({
    where: { id: parseInt(id) },
    include: { location: true, model: true, picture: true, user: true },
  });
  if (!space) return notFound();

  return (
    <>
      <Space
        className={s.space}
        spaceKey={space.model.key}
        background={space.picture}
      >
        <h1>
          <Balancer>{space.name}</Balancer>
        </h1>
        <p>Uploaded by {space.userId}</p>
      </Space>
      <article className={s.container}>
        <section className="actions">
          <p>Uploaded On: {space.createdAt.toString()}</p>
          <p>
            Uploaded By:{" "}
            <Link href={`/users/${space.user.id}`}>
              {space.user.fullName || space.user.id}
            </Link>
          </p>
          {space.userId === user.id && (
            <Link href={`/spaces/${space.id}/edit`}>Edit Space</Link>
          )}
        </section>
        <pre>{space.description || "No description provided."}</pre>
      </article>
    </>
  );
}
