/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 Yale CPSC 419
 */

import dynamic from "next/dynamic";

const Space = dynamic(() => import("@/components/page/Space"), { ssr: false });

export default function SpaceTest() {
  return (
    <article>
      <Space />
    </article>
  );
}
