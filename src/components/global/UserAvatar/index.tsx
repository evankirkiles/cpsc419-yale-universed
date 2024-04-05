/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */
"use client"
import { useEffect, useState } from 'react';
import { validateRequest } from "@/lib/auth/validateRequest";
import Link from "next/link";
import styles from './UserAvatar.module.scss';

export const UserAvatarLoader  = () => {
  return <div className="avatarLoader">&nbsp;</div>;
};

interface User {
  id: string;
  fullName: string;
  bio: string;
  // other properties...
}

export default function UserAvatar() {

  const [user, setUser] = useState<User | null>(null);;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchUser = async () => {
      const userData = await validateRequest();
      setUser(userData.user);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) return <UserAvatarLoader />;
  if (!user)
    return (
      <Link href="/login" className="login">
        Login
      </Link>
    );
    return (
      <div className={styles.avatarDropdown}>
        <div className={styles.avatar} onClick={toggleDropdown}>
          {user.id[0].toUpperCase()}
        </div>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <a href={`/profile/${user.id}`}>Profile</a>
            <a href="/api/auth/logout">Logout</a>
          </div>
        )}
      </div>
    );
  };
