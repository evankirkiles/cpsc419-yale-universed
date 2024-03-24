/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */

import { validateRequest } from "@/lib/auth/validateRequest";
import Link from "next/link";
import s from "./UserAvatar.module.scss";

export const UserAvatarLoader = () => {
  return <div className={s.avatar}>&nbsp;</div>;
};

export default async function UserAvatar() {
  const { user } = await validateRequest();
  if (!user)
    return (
      <Link href="/login" className={s.login}>
        Login
      </Link>
    );
  return (
    <Link href={`/users/${user.id}`} className={s.avatar}>
      {user.id[0].toUpperCase()}
    </Link>
  );
}
