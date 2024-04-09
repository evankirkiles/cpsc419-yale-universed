/*
 * imgix.ts
 * author: Evan Kirkiles
 * created on Tue Apr 09 2024
 * 2024 Yale CPSC 419
 */

import { ImageLoader } from "next/image";

const imgixLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(`https://yalevision.imgix.net/${src}`);
  const params = url.searchParams;
  params.set("auto", params.getAll("auto").join(",") || "format");
  params.set("fit", params.get("fit") || "max");
  params.set("w", params.get("w") || width.toString());
  params.set("q", (quality || 50).toString());
  return url.href;
};

export default imgixLoader;
