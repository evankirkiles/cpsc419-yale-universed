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
          <div className={styles.formbold_main_wrapper}>
            <div className={styles.profile_user}>
              <h2>Profile {user?.id}</h2>
            </div>
          </div>
          <div className={styles.formbold_main_wrapper}>
            <div className={styles.formbold_form_wrapper}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formbold_input_flex}>
                  <div>
                    <input className={styles.formbold_form_input} id="fullName" type="text" value={user?.id} disabled />
                    <label htmlFor="fullName" className={styles.formbold_form_label}>netId:</label>
                  </div>
                </div>
                <div className={styles.formbold_input_flex}>
                  <div>
                    <input
                       className={styles.formbold_form_input}
                      type="text"
                      placeholder="Enter your your full name"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label htmlFor="fullName" className={styles.formbold_form_label}>Full Name:</label>
                  </div>
                </div>
                <div className={styles.formbold_input_flex}>
                  <div>
                    <input
                       className={styles.formbold_form_input}
                      type="textarea"
                      placeholder="Enter your bio"
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <label htmlFor="bio" className={styles.formbold_form_label}>Bio:</label>
                  </div>
                </div>
                <div>
                  <button className={styles.formbold_btn}type="submit" disabled={pending}>Update</button>
                  <Link className={styles.formbold_btn_cancel} href={`/users/${user?.id}`}>Cancel</Link>
                </div>                
              </form>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
