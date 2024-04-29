/*
 * page.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */
import { Balancer } from "react-wrap-balancer";
import s from "./About.module.scss";

export default async function AboutPage() {
  return (
    <article className={s.container}>
      <div className={s.body}>
        <hgroup>
          <h1>About</h1>
          <p>
            <Balancer>How YaleVision was created and functions today.</Balancer>
          </p>
        </hgroup>
        <p>
          YaleVision is the final project for CPSC419 — Full Stack Web
          Programming by Evan Kirkiles, Ngoc Bui, and Shan Ali. Inspired by
          previous work in photogrammetry by some of our group members, we
          decided to augment the standard CRUD app with a novel presentation of
          web-based media.
        </p>
        <h2>Background</h2>
        <p>
          Photogrammetry is, generally, the process of creating 3D models from
          2D images. In our case, however, we take photogrammetry to be the
          LiDAR version provided by Polycam, using not pictures but rather a
          depth map to create a 3D model. At set iterations while doing a
          Polycam scan, your phone takes a depth-informed picture with its LiDAR
          sensor to create a point cloud of the space. Once a basic point cloud
          is built, the app then uses a meshing algorithm to create a 3D model,
          with the actual pictures taken projected onto the geometry as
          textures.
        </p>
        <p>
          The result is a (fairly large) textured 3D model of any object. While
          these models are not perfect and often suffer from a large amount of
          artifacting when a space does not receive a lot of coverage or light,
          they communicate the idea of a space. The models also have a huge
          number of polygons, making them only truly usable for static
          backgrounds and unmoving environments—else calculations would run
          slowly and the process of rigging or animating the mesh would be
          painstaking on the side of the 3D modeler.
        </p>
        <h2>Tech Stack</h2>
        <p>
          YaleVision is built with Next.js on Vercel, chosen for ease-of-use and
          the low price point, especially at this scale. For storage, we use AWS
          S3, with our images being served through Imgix—allowing for image
          resizing for responsive images and faster load times. We use Prisma to
          manage our Vercel Postgres DB, and Lucia to manage our user sessions
          which are authenticated through CAS.
        </p>
        <p>
          On the frontend, we use Three.js to build all of the photogrammetry
          scenes, powered by a fork of Evan&apos;s <code>web-worlding</code>{" "}
          library which manages downloading of GLTF models for a space and the
          character.
        </p>
      </div>
    </article>
  );
}
