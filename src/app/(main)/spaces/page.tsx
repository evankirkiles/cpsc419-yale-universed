/*
 * pages.tsx
 * author: Evan Kirkiles
 * created on Sat Apr 06 2024
 * 2024 Yale CPSC 419
 */

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import s from "./Spaces.module.scss";
import { VscClose, VscSearch } from "react-icons/vsc";
import { GrClear, GrClose } from "react-icons/gr";
import Balancer from "react-wrap-balancer";
import ImgixImage from "@/components/shared/Image";

export default async function SpacesPage() {
  const spaces = await prisma.space.findMany({
    include: { location: true, picture: true },
  });

  return (
    <article className={s.container}>
      <hgroup>
        <h1>Spaces</h1>
        <p>
          <Balancer>
            Explore Yale student locations and rooms across New Haven.
          </Balancer>
        </p>
      </hgroup>
      <form className={s.form}>
        <div className={s.searchBar}>
          <input type="search" placeholder="Search..." />
          <button type="submit">
            <VscSearch />
          </button>
          <button type="reset">
            <GrClose />
          </button>
        </div>
      </form>
      <section
        className={s.searchResults}
        aria-label="Search Results"
        aria-live="polite"
      >
        {spaces.map((space) => (
          <a key={space.id} href={`/spaces/${space.id}`} className={s.space}>
            <ImgixImage
              src={space.picture.key}
              width={space.picture.imageWidth}
              height={space.picture.imageHeight}
              alt={`Space`}
            />
            <h2>{space.name}</h2>
            <p>{space.location?.name}</p>
          </a>
        ))}
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </section>
    </article>
  );
}
