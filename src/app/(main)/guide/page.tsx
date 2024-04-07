/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Sun Apr 07 2024
 * 2024 Yale CPSC 419
 */
import Balancer from "react-wrap-balancer";
import s from "./Guide.module.scss";

export default function GuidePage() {
  return (
    <article className={s.container}>
      <div className={s.body}>
        <hgroup>
          <h1>Guide</h1>
          <p>
            <Balancer>
              A tutorial on using Polycam to scan your own space!
            </Balancer>
          </p>
        </hgroup>
        <p>
          Lorem ipsum dolor sit amet consectetur. Scelerisque aliquet justo nisl
          tincidunt non lacus sed. Sodales tellus dignissim pellentesque ut.
          Scelerisque sollicitudin varius ornare dui adipiscing. Habitant mauris
          morbi morbi enim. Dui tortor amet tortor eget rhoncus.
        </p>
        <p>
          Augue ut sit egestas erat a risus. Orci neque augue cursus pharetra ut
          curabitur tincidunt. Dictum amet morbi pulvinar in. Nunc nunc amet
          integer pretium turpis pellentesque scelerisque. Aliquet lobortis
          mattis dui tortor. Luctus in arcu nulla molestie.
        </p>
      </div>
    </article>
  );
}
