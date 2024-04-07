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

export default async function SpacesPage() {
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
        <div>&nbsp;</div>
      </section>
    </article>
  );
}
