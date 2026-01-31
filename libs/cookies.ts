import { cookies } from "next/headers"

export const setCookies = async(key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
}

export const getCookies = async(key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

export const deleteCookies = async(key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}