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
          Yale Vision is open to public submissions—in fact, we heavily
          encourage it. If you have a space you&apos;d like to submit for public
          archival, you will need two tools:
        </p>
        <ol>
          <li>
            A device with a LiDAR sensor, i.e. any of the following devices:
            iPhone 12 Pro / Pro Max, iPhone 13 Pro / Pro Max, iPad Pro 2020 /
            2021.
          </li>
          <li>
            The <a href="https://poly.cam">Polycam</a> app for performing the
            scan.
          </li>
        </ol>
        <p>
          You may also attempt to use Polycam with the photo scanning mode,
          available on any platform which the Polycam app allows. However, your
          mileage may vary, and all of the scans currently on the website were
          done with LiDAR.
        </p>
        <h2>1: Scan Your Space</h2>
        <p>
          Begin by opening up the Polycam app and accessing the scan interface.
          Using LiDAR mode, begin recording, and move the camera around a bit.
          You will begin to see the projected digital model of your real space.
          As you walk around and move the camera, the projection will reach new
          areas and gain definition. Once you have your desired level of detail
          and have reached all the areas you want included in your scan, end the
          recording. Now, by processing the model, the point cloud will be
          converted into a model made of triangles, readable by traditional
          modeling softwares.
        </p>
        <p>
          At this point, also remember to take a preview picture of the space
          you are scanning—you will need it to upload to our platform in step 3.
          Do this with your phone&apos;s regular camera!
        </p>
        <h2>2: Download Your Scan</h2>
        <p>
          You now need to download a .glb (Graphics Language Binary)
          representation of your scan, which packages together the scanned
          geometry and textures into a single compressed binary file. We
          recommend doing this by first clicking the little cloud icon in the
          Polycam app to upload the model to Polycam servers, and then
          downloading the .glb on your computer from Polycam&apos;s web
          platform.
        </p>
        <h2>3: Upload Your Scan</h2>
        <p>
          The last step is to upload the space to Yale Vision. Go to the{" "}
          <a href="/upload">upload</a> page of Yale Vision (after logging in
          with CAS) and fill in the form with as much infomration about your
          space as you deem shareable. Use the file upload fields to provide the
          .glb you downloaded previously, as well as the preview picture.
        </p>
        <p>
          Once you submit, your file will be uploaded to our servers, at which
          point we will review the space, add in physics collision boxes, and
          then release your space on Yale Vision. Thank you for participating!
        </p>
        <a href="/upload" className={s.nextStep}>
          Go to the Upload Page
        </a>
      </div>
    </article>
  );
}
