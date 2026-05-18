import { cookies } from "next/headers";
import {
  createSessionValue,
  MAX_AGE_SEC,
  SESSION_COOKIE,
  verifySessionValue,
} from "@/lib/auth/session-token";

export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionValue(token);
}

export async function setSessionCookie(): Promise<void> {
  const value = await createSessionValue();
  cookies().set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearSessionCookie(): Promise<void> {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
