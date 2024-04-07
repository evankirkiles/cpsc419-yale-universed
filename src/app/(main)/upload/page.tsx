import s from "./Upload.module.scss";
import { validateRequest } from "@/lib/auth/validateRequest";
import SpaceUploadForm from "@/components/page/SpaceUpload/form";
import { loginLink } from "@/lib/utils";
import Balancer from "react-wrap-balancer";
import Link from "next/link";

interface UploadPageProps {
  params: { netId: string };
}

interface User {
  id: string;
  fullName: string;
  bio: string;
  // other properties...
}

export default async function UploadPage({
  params: { netId },
}: UploadPageProps) {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <article className={s.noAuth}>
        <div>
          <h1>Upload</h1>
          <p>Please log in with CAS to upload your space.</p>
          <Link href={loginLink("/upload")}>Log in with CAS</Link>
        </div>
      </article>
    );
  }

  return (
    <article className={s.container}>
      <hgroup>
        <h1>Upload</h1>
        <p>
          <Balancer>
            Read the <Link href="/guide">guide</Link> and upload your space to{" "}
            <b>Yale Vision</b>!
          </Balancer>
        </p>
      </hgroup>
      <div className={s.formArea}>
        <SpaceUploadForm />
      </div>
    </article>
  );
}
