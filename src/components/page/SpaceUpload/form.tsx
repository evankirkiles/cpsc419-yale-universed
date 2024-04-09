/*
 * form.tsx
 * author: Evan Kirkiles
 * created on Sat Apr 06 2024
 * 2024 Yale CPSC 419
 */
"use client";

import { useEffect, useState } from "react";
import s from "./SpaceUpload.module.scss";
import Dropzone from "react-dropzone";
import SpacePreview from "@/components/page/SpaceUpload/preview";
import AsyncSelect from "react-select/async-creatable";
import { VscCheck } from "react-icons/vsc";
import { useForm, Controller } from "react-hook-form";
import { FaRegFile } from "react-icons/fa";
import { formatBytes, uploadFile } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { type Location } from "@prisma/client";

interface SpaceUploadFormProps {
  withPreview?: boolean;
}

export interface UploadFormState {
  name: string | undefined;
  description: string | undefined;
  location: string | undefined;
  model: File | undefined;
  picture: File | undefined;
  pictureUrl: string | undefined;
}

enum UploadState {
  IDLE,
  UPLOADING_SPACE,
  UPLOADING_PICTURE,
  FINALIZING,
  SUCCESS,
  ERROR,
}

export default function SpaceUploadForm({
  withPreview = true,
}: SpaceUploadFormProps) {
  const { register, control, handleSubmit, watch } = useForm<UploadFormState>({
    defaultValues: {
      name: "",
      description: "",
      location: undefined,
    },
  });
  // State for the picture URL
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Submission of the form, if everything's valid
  const router = useRouter();
  const [uploadState, setUploadState] = useState(UploadState.IDLE);
  const onSubmit = handleSubmit(
    async ({ model, picture, name, description, location }) => {
      // 0. Ensure everything exists
      if (!model || !picture) return;

      // 1. Upload the space model
      setUploadState(UploadState.UPLOADING_SPACE);
      const spaceKey = await uploadFile(model);

      // 2. Upload the cover image
      setUploadState(UploadState.UPLOADING_PICTURE);
      const coverKey = await uploadFile(picture);
      const [coverWidth, coverHeight] = await new Promise<[number, number]>(
        (resolve) => {
          const img = new Image();
          img.onload = () => resolve([img.width, img.height]);
          img.src = URL.createObjectURL(picture);
        }
      );

      // 3. Create the space in the database
      setUploadState(UploadState.FINALIZING);
      await fetch("/api/spaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          location,
          model: spaceKey,
          picture: coverKey,
          pictureWidth: coverWidth,
          pictureHeight: coverHeight,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          const { id } = res;
          setUploadState(UploadState.SUCCESS);
          router.replace(`/spaces/${id}`);
        });
    }
  );

  return (
    <>
      <form onSubmit={onSubmit} className={s.uploadForm}>
        <div>
          <label htmlFor="upload_Picture" data-is-valid={!!watch("picture")}>
            <span>
              <VscCheck />
            </span>
            Cover Image
          </label>
          <small>A cover image to use for your space across the site.</small>
          <Controller
            control={control}
            name="picture"
            render={({ field }) => (
              <Dropzone
                onDrop={(files) => {
                  const file = files[0];
                  setPictureUrl(URL.createObjectURL(file));
                  field.onChange(files[0]);
                }}
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <section
                    className={s.dropzone}
                    data-filled={!!acceptedFiles?.length}
                  >
                    <div {...getRootProps()}>
                      <input
                        id="upload_Picture"
                        {...getInputProps()}
                        required
                      />
                      {acceptedFiles?.length ? (
                        <p>
                          <FaRegFile />
                          {acceptedFiles[0].name} (
                          {formatBytes(acceptedFiles[0].size)})
                        </p>
                      ) : (
                        <p>Upload a cover image for the space (.png, .jpeg)</p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            )}
          />
        </div>
        <div>
          <label htmlFor="upload_Name" data-is-valid={!!watch("name")}>
            <span>
              <VscCheck />
            </span>
            Space Name
          </label>
          <input
            type="text"
            id="upload_Name"
            placeholder="Room 210, JE"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="upload_Desc" data-is-valid={!!watch("description")}>
            <span>
              <VscCheck />
            </span>
            Space Description
          </label>
          <small>Give a small description of your space.</small>
          <textarea
            id="upload_Desc"
            rows={10}
            placeholder="Our space is..."
            {...register("description", { required: true })}
          />
        </div>
        <div>
          <label htmlFor={"upload_File"} data-is-valid={!!watch("model")}>
            <span>
              <VscCheck />
            </span>
            Space File
          </label>
          <small>
            Provide your space file exported from Polycam, as per the guide.
          </small>
          <Controller
            control={control}
            name="model"
            render={({ field }) => (
              <Dropzone
                onDrop={(files) => field.onChange(files[0])}
                accept={{
                  "model/gltf-binary": [".glb"],
                }}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <section
                    className={s.dropzone}
                    data-filled={!!acceptedFiles?.length}
                  >
                    <div {...getRootProps()}>
                      <input id="upload_File" {...getInputProps()} required />
                      {acceptedFiles?.length ? (
                        <p>
                          <FaRegFile />
                          {acceptedFiles[0].name} (
                          {formatBytes(acceptedFiles[0].size)})
                        </p>
                      ) : (
                        <p>Upload a .glb file</p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            )}
          />
        </div>
        {mounted && (
          <div>
            <label>
              <span>
                <VscCheck />
              </span>
              Location Tag
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <AsyncSelect
                  loadOptions={async (inputValue) =>
                    fetch(`/api/locations?q=${inputValue}`)
                      .then((res) => res.json())
                      .then((data) =>
                        data.map((location: Location) => ({
                          label: location.name,
                          value: location.id,
                        }))
                      )
                  }
                  instanceId="location"
                  onChange={(val) => field.onChange(val)}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      marginBlock: "0.5rem",
                      borderRadius: "0",
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-fg)",
                      border: "1px solid var(--color-fg2)",
                      padding: "0.25rem",
                      cursor: "pointer",
                    }),
                    menu: (styles) => ({
                      ...styles,
                      border: "1px solid var(--color-fg2)",
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-fg)",
                      padding: "0.25rem",
                      cursor: "pointer",
                    }),
                    input: (styles) => ({
                      ...styles,
                      color: "var(--color-fg)",
                    }),
                  }}
                  required
                />
              )}
            />
          </div>
        )}
        <button type="submit">Create Space</button>
      </form>
      {withPreview && <SpacePreview watch={watch} pictureUrl={pictureUrl} />}
    </>
  );
}
