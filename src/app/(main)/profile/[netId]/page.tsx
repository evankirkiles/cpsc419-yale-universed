'use client'
import { useState, useEffect } from "react";
import { useFormStatus } from 'react-dom'
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'; 
import Link from 'next/link';

import styles from "./Profile.module.scss"

interface ProfilePageProps {
  params: { netId: string };
}

interface User {
  id: string;
  fullName: string;
  bio: string;
  // other properties...
}

export default function ProfilePage({params: { netId }}: ProfilePageProps) {
  const [user, setUser] = useState<User | null>(null);;
  const [fullName, setFullName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const { pending } = useFormStatus()

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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
      <Container>
        <h4 >Update Profile</h4>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>netId:</Form.Label>
            <Form.Control id="fullName" type="text" value={user?.id} disabled />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your your full name"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Bio:</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Enter your bio"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button type="submit" disabled={pending}>
            Update
          </Button>
          <Link href="/">
            <Button variant="secondary" className="ml-3">
              Cancel
            </Button>
          </Link>
        </Form>
      </Container>
    </div>
    </article>
  );
}