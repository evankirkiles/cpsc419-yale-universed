/*
 * index.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * A place to define + export next/localFonts. Place the actual font files in
 * subdirectories here. Read more here:
 * https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
 *
 * Example implementation:
 * ```
 * import localFont from 'next/font/local';
 *
 * export const ArialNarrow = localFont({
 * variable: '--font-arialnarrow',
 * src: [
 *    {
 *      path: './Arial-Narrow-Bold.ttf',
 *      weight: '700',
 *      style: 'normal',
 *    },
 *   ],
 * });
 * ```
 */
import localFont from "next/font/local";

export const YaleNew = localFont({
  variable: "--font-yale",
  src: [
    {
      path: "./Yale_typeface/YaleNew-Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Yale_typeface/YaleNew-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Yale_typeface/YaleNew-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Yale_typeface/YaleNew-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});
