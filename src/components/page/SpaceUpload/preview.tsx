/*
 * preview.tsx
 * author: Evan Kirkiles
 * created on Sat Apr 06 2024
 * 2024 Yale CPSC 419
 */
"use client";

import Balancer from "react-wrap-balancer";
import s from "./SpaceUpload.module.scss";
import { UseFormWatch } from "react-hook-form";
import { UploadFormState } from "@/components/page/SpaceUpload/form";

interface SpacePreviewProps {
  watch: UseFormWatch<UploadFormState>;
  pictureUrl: string | null;
}

export default function SpacePreview({ watch, pictureUrl }: SpacePreviewProps) {
  return (
    <section aria-label="Preview" className={s.preview}>
      <h2>Preview</h2>
      <hgroup>
        <img src={pictureUrl || undefined} />
        <h3>
          <Balancer>{watch("name") || "Untitled"}</Balancer>
        </h3>
      </hgroup>
      <pre>{watch("description") || "No description provided."}</pre>
    </section>
  );
}
