/*
 * constants.ts
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */

export const redirects = {
  toLogin: "/login",
  handleLogin: "/api/auth/cas/handle",
  afterLogin: "/",
  afterLogout: "/",
} as const;
