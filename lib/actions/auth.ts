"use server";

import { redirect } from "next/navigation";
import { isAdminAuthConfigured, verifyAdminCredentials } from "@/lib/auth/credentials";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth/session";

type LoginResult = { ok: true } | { ok: false; error: string };

export async function loginAction(username: string, password: string): Promise<LoginResult> {
  if (!isAdminAuthConfigured()) {
    return {
      ok: false,
      error:
        "Faltan ADMIN_PASSWORD y AUTH_SECRET en .env.local. Pide al desarrollador que los configure.",
    };
  }

  if (!verifyAdminCredentials(username, password)) {
    return { ok: false, error: "Usuario o contraseña incorrectos." };
  }

  await setSessionCookie();
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/login");
}
