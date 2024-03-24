/*
 * actions.ts
 * author: Evan Kirkiles
 * created on Sun Mar 24 2024
 * 2024 Yale CPSC 419
 */

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function login(
  _: any,
  formData: FormData
): Promise<ActionResponse<{ username: string; password: string }>> {
  return { fieldError: { username: "Invalid username or password" } };
}
