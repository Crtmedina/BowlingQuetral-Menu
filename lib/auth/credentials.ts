import { timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME?.trim() || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  if (!expectedPass) {
    return false;
  }

  return safeEqual(username.trim(), expectedUser) && safeEqual(password, expectedPass);
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.length && process.env.AUTH_SECRET?.length);
}
