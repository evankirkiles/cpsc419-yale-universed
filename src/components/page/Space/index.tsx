/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 Yale CPSC 419
 */
"use client";

import World from "@/lib/web-worlding/src";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import s from "./Space.module.scss";
import { type ImageFile } from "@prisma/client";
import cn from "classnames";
import ImgixImage from "@/components/shared/Image";
import { AWS_BUCKET_NAME } from "@/env";

interface SpaceProps extends PropsWithChildren {
  className?: string;
  spaceKey: string;
  background: ImageFile;
}

export default function Space({
  className,
  spaceKey,
  background,
  children,
}: SpaceProps) {
  // connect canvas to game
  const canvasRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<World | null>(null);
  const [playing, setPlaying] = useState(false);

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
      `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${spaceKey}`
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
  }, [playing, spaceKey]);

  return (
    <section className={cn(s.container, className)} ref={canvasRef}>
      <ImgixImage
        src={background.key}
        width={background.imageWidth}
        height={background.imageHeight}
        alt={`Space`}
      />
      <hgroup className={cn(!playing && "spaceOff")}>{children}</hgroup>
      <button onClick={() => setPlaying(!playing)}></button>
    </section>
  );
}
