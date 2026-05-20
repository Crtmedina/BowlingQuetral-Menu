import { cookies } from "next/headers";
import {
  createSessionValue,
  MAX_AGE_SEC,
  readSessionPayload,
  SESSION_COOKIE,
  verifySessionValue,
} from "@/lib/auth/session-token";

export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionValue(token);
}

/** Usuario de la sesión actual (para mostrar en el panel). */
export async function getAdminSession(): Promise<{ username: string } | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const data = await readSessionPayload(token);
  if (!data) return null;
  const username =
    data.u?.trim() || process.env.ADMIN_USERNAME?.trim() || "Administrador";
  return { username };
}

export async function setSessionCookie(username: string): Promise<void> {
  const value = await createSessionValue(username);
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
