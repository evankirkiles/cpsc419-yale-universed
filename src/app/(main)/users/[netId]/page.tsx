/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import s from "./Users.module.scss";
import Link from "next/link";

interface UserPageProps {
  params: { netId: string };
}

export default async function UserPage({ params: { netId } }: UserPageProps) {
  const user = await prisma.user.findFirst({ where: { id: netId } });
  if (!user) return notFound();

  return (
    <article className={s.container}>
      <h1>{user.id}</h1>
      <figure className={s.mainspace}></figure>
      <h2>Other Spaces</h2>
      <p>No spaces found.</p>
      <div>
        <Link href={`/profile/${user.id}`}>Profile</Link>
      </div>
      <a href="/api/auth/logout">Logout</a>
    </article>
  );
}
