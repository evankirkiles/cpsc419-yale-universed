/*
 * Image.tsx
 * author: Evan Kirkiles
 * created on Tue Apr 09 2024
 * 2024 Yale CPSC 419
 */
"use client";

import imgixLoader from "@/lib/imgix";
import Image, { ImageProps } from "next/image";

interface ImgixImageProps extends ImageProps {}

export default function ImgixImage(props: ImgixImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image loader={imgixLoader} {...props} />;
}
