/*
 * layout.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 the nobot space
 */

import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/env";
import { YaleNew } from "@/assets/fonts";

import "@/styles/index.scss";
import s from "./Layout.module.scss";
import Nav from "@/components/global/Nav";
import Footer from "@/components/global/Footer";
import Providers from "@/components/global/Providers";
import { Suspense } from "react";
import UserAvatar, { UserAvatarLoader } from "@/components/global/UserAvatar";
import { Toaster } from "react-hot-toast";

// Base metadata for the entire app
export const metadata: Metadata = {
  title: "Yale Vision — Yale through 3D scanning.",
  description:
    "Yale vision utilizes photogrammetry technology to create 3D models of Yale's spaces, allowing for a new way to explore and understand the campus.",
  // metadataBase: new URL(SITE_URL || "http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: "#00356b",
  colorScheme: "light",
};

/**
 * A root layout in which both the main app and the sanity studio are wrapped.
 * Apply font classes here to keep your DOM clean of unnecessary <div />'s.
 * Here, you can also add information about your favicon. Use this tool always:
 *  - https://realfavicongenerator.net
 * Then paste the HTML code here, the files in /public, and close the closing carets.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      //  className={`${YaleNew.variable}`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
      </head>
      <body className={s.body}>
        <Providers>
          <Nav>
            <Suspense fallback={<UserAvatarLoader />}>
              <UserAvatar />
            </Suspense>
          </Nav>
          <main>{children}</main>
          <Footer />
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
