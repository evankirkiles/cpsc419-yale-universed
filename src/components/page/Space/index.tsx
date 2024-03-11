/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 Yale CPSC 419
 */
"use client";

import World from "web-worlding";
import { useEffect, useRef } from "react";
import s from "./Space.module.scss";

export default function Space() {
  // connect canvas to game
  const canvasRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<World | null>(null);

  // initialize the world immediately
  useEffect(() => {
    if (!canvasRef.current) return;

    // if there is a world, destroy it
    if (worldRef.current) {
      worldRef.current.destroy();
    }

    // now rebuild it with the better world
    worldRef.current = new World(
      canvasRef.current,
      "/glb/personspace.glb",
      "https://abitofpersonalspace.s3.amazonaws.com/spaces/Home2023_1ebb6/235dwight.glb"
    );

    // Prevent default space scroll behavior
    function keyListener(e: KeyboardEvent) {
      if (e.key === " ") {
        e.preventDefault();
      }
    }
    window?.addEventListener("keypress", keyListener, { passive: false });

    return () => {
      // worldRef.current?.destroy();
      window?.removeEventListener("keypress", keyListener);
    };
  }, []);

  return <section className={s.container} ref={canvasRef} />;
}
