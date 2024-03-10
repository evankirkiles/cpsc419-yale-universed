/*
 * Providers.tsx
 * author: Evan Kirkiles
 * created on Sun Mar 10 2024
 * 2024 Yale CPSC 419
 */

"use client";

import { Provider } from "react-wrap-balancer";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
