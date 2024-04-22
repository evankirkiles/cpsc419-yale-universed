import { validateRequest } from "@/lib/auth/validateRequest";
import { loginLink } from "@/lib/utils";
import Link from "next/link";
import s from "./EditSpace.module.scss";
import Balancer from "react-wrap-balancer";
import SpaceUploadForm from "@/components/page/SpaceUpload/form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditSpagePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    return (
      <article className={"noAuth"}>
        <div>
          <h1>401</h1>
          <p>Please log in with CAS to edit your space on the site.</p>
          <Link href={loginLink(`/spaces/${id}`)}>Log in with CAS</Link>
        </div>
      </article>
    );
  }

  const space = await prisma.space.findUnique({
    where: { id: parseInt(id) },
    include: { location: true, model: true, picture: true, user: true },
  });
  if (!space || space.userId !== user.id) return notFound();
  console.log(space);

  return (
    <article className={s.container}>
      <hgroup>
        <h1>Edit Space</h1>
        <p>
          <Balancer>
            Read the <Link href="/guide">guide</Link> and upload your space to{" "}
            <b>Yale Vision</b>!
          </Balancer>
        </p>
      </hgroup>
      <div className={s.formArea}>
        <SpaceUploadForm initialValue={space} />
      </div>
    </article>
  );
}
