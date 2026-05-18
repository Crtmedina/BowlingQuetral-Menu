type AuthFail = { ok: false; error: string };

/** Devuelve error si no hay sesión admin válida (para server actions). */
import { isAuthenticated } from "@/lib/auth/session";

export async function requireAdminSession(): Promise<AuthFail | null> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Sesión no válida. Vuelve a iniciar sesión." };
  }
  return null;
}
