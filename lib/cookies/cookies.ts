"use server";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

type CookieOptions = {
  maxAge?: number;
  secure?: boolean;
  path?: string;
  sameSite?: "strict" | "lax" | "none";
};

// Original synchronous functions
function setCookie(
  key: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    maxAge = 60 * 60 * 24 * 7,
    secure = true,
    path = "/",
    sameSite = "strict",
  } = options;
  const cookieStore = cookies();
  cookieStore.set({
    name: key,
    value: value,
    maxAge,
    secure,
    path,
    sameSite,
  });
}

function getCookie(key: string): string | undefined {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key);
  return cookie?.value;
}

function deleteCookie(key: string): ResponseCookies {
  const cookieStore = cookies();
  return cookieStore.delete(key);
}

function hasCookie(key: string): boolean {
  return cookies().has(key);
}

// Async versions of the functions
export async function setCookieAsync(
  key: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  setCookie(key, value, options);
}

export async function getCookieAsync(key: string): Promise<string | undefined> {
  return getCookie(key);
}

export async function deleteCookieAsync(key: string): Promise<ResponseCookies> {
  return deleteCookie(key);
}

export async function hasCookieAsync(key: string): Promise<boolean> {
  return hasCookie(key);
}
