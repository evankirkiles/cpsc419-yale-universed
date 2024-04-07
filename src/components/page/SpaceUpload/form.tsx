/*
 * form.tsx
 * author: Evan Kirkiles
 * created on Sat Apr 06 2024
 * 2024 Yale CPSC 419
 */
"use client";

import { FormEventHandler, useState } from "react";
import s from "./SpaceUpload.module.scss";
import Dropzone from "react-dropzone";
import SpacePreview from "@/components/page/SpaceUpload/preview";
import AsyncSelect from "react-select";
import { VscCheck } from "react-icons/vsc";
import { useForm, Controller } from "react-hook-form";
import { FaRegFile } from "react-icons/fa";
import { formatBytes } from "@/lib/utils";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";

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

  // Submission of the form, if everything's valid
  const onSubmit = handleSubmit(async () => {
    // 1. Begin uploading
  });

  console.log(watch("description"));

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
        <button type="submit">Create Space</button>
      </form>
      {withPreview && <SpacePreview watch={watch} pictureUrl={pictureUrl} />}
    </>
  );
}
