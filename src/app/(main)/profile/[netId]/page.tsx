"use client";
import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-hot-toast";
import Link from "next/link";

import styles from "./Profile.module.scss";

interface ProfilePageProps {
  params: { netId: string };
}

interface User {
  id: string;
  fullName: string;
  bio: string;
  // other properties...
}

export default function ProfilePage({ params: { netId } }: ProfilePageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${netId}`);
      const userData = await res.json();
      setUser(userData);
      setFullName(userData.fullName);
      setBio(userData.bio);
    };
    fetchUser();
  }, [netId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/${netId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, bio }),
      });
      const updatedUser = await res.json();
      setUser(updatedUser);
      toast.success("User updated!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!");
    }
  };
  return (
    <article className={styles.container}>
      <div>
        <section>
          <h4>Update Profile</h4>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label>netId:</label>
              <input id="fullName" type="text" value={user?.id} disabled />
            </div>
            <br />
            <div>
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Enter your your full name"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label>Bio:</label>
              <input
                type="textarea"
                placeholder="Enter your bio"
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <br />
            <button type="submit" disabled={pending}>
              Update
            </button>
            <Link href="/">Cancel</Link>
          </form>
        </section>
      </div>
    </article>
  );
}
