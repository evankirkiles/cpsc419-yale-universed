/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 the nobot space
 */
import Balancer from "react-wrap-balancer";
import s from "./Page.module.scss";
import cx from "classnames";

export default function Home() {
  return (
    <article className={s.container}>
      <div className={cx(s.section, s.hero)}>
        <div className={s.links}>
          <hgroup>
            <h1>Yale Vision</h1>
            <Balancer>
              <p>
                Explore how other Yalies are effectively using their spaces
                through the capabilities of photogrammetry.
              </p>
            </Balancer>
          </hgroup>
          <ul className={s.linkrow}>
            <li>
              <p>Colleges</p>
              <ul>
                <li>Benjamin Franklin</li>
                <li>Jonathan Edwards</li>
                <li>Timothy Dwight</li>
                <li>Ezra Stiles</li>
                <li>Saybrook</li>
              </ul>
            </li>
            <li>
              <p>&nbsp;</p>
              <ul>
                <li>Grace Hopper</li>
                <li>Branford</li>
                <li>Berkeley</li>
                <li>Davenport</li>
              </ul>
            </li>
            <li>
              <p>&nbsp;</p>
              <ul>
                <li>Morse</li>
                <li>Pierson</li>
                <li>Silliman</li>
                <li>Trumbull</li>
              </ul>
            </li>
            <li>
              <p>Off-Campus</p>
              <ul>
                <li>Dwight St.</li>
                <li>Elm St.</li>
                <li>Orange St.</li>
              </ul>
            </li>
          </ul>
        </div>
        <figure className={s.featured}>
          <div>&nbsp;</div>
          <figcaption>
            <p>
              <strong>Featured Space</strong>
            </p>
            <p>
              Evan Kirkiles
              <br />
              Sim City Apartments
              <br />
              New Haven, CT 06511
            </p>
          </figcaption>
        </figure>
      </div>
      <section className={s.featureSection}>
        <hgroup>
          <h2>On-Campus</h2>
          <p>
            On campus, Yalies work within the framework of the dorm room—with
            standardized furniture, walls, and apartment layouts, students
            create unique spaces that reflect their personalities through
            posters, tapestries, and small decorations.
          </p>
        </hgroup>
        <ul>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
      </section>
      <section className={s.featureSection}>
        <hgroup>
          <h2>Off-Campus</h2>
          <p>
            Off campus, students grapple with both the freedoms and drawbacks of
            living outside of the Yale-provided ecosystem. With more space,
            kitchens, specialized rooms, and more, students are free to furnish
            and decorate their spaces as they wish.
          </p>
        </hgroup>
        <ul>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
      </section>
    </article>
  );
}
