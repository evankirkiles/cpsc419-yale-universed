/*
 * utils.ts
 * author: Evan Kirkiles
 * created on Sat Apr 06 2024
 * 2024 Yale CPSC 419
 */

export function loginLink(redirectUrl?: string) {
  return `/api/auth/cas?redirect=${redirectUrl || "/"}`;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function uploadFile(file: File) {
  const contentType =
    file.name.split(".").pop() === "glb" ? "model/gltf-binary" : file.type;
  const { key, url, fields } = await fetch(`/api/upload`, {
    method: "POST",
    body: JSON.stringify({
      filename: file.name,
      contentType,
    }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
  // Have to put the file into a FormData object
  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    formData.append(k, v as string);
  });
  formData.append("file", file);
  // Upload using pre-signed URL
  await fetch(url, {
    method: "POST",
    body: formData,
  });
  // Return the key uploaded
  return key as string;
}
