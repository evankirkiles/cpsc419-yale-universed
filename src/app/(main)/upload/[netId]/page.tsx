'use client'
import { useState, useEffect } from "react";
import styles from "./Upload.module.scss"

interface UploadPageProps {
  params: { netId: string };
}

interface User {
  id: string;
  fullName: string;
  bio: string;
  // other properties...
}

export default function UploadPage({params: { netId }}: UploadPageProps) {
  const [user, setUser] = useState<User | null>(null);;
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${netId}`);
      const userData = await res.json();
      setUser(userData);
    };
    fetchUser();
  }, [netId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSpaceSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("name", spaceName);
      formData.append("description", spaceDescription);
      formData.append("userId", user?.id as string);

      const res = await fetch("/api/space", {
        method: "POST",
        body: formData,
      });
      const newSpace = await res.json();
      console.log("New space created:", newSpace);
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  return (
    <article className={styles.container}>
      <h1>{user?.id}</h1>
      <form onSubmit={handleSpaceSubmit}>
        <label>
          Space Name:
          <input
            type="text"
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
          />
        </label>
        <label>
          Space Description:
          <input
            type="text"
            value={spaceDescription}
            onChange={(e) => setSpaceDescription(e.target.value)}
          />
        </label>
        <label>
          Choose File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Create Space</button>
      </form>
    </article>
  );
}