import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/auth/session";

export const metadata = {
  robots: { index: false, follow: false },
};

/** Auth en middleware; el shell no bloquea con otra verificación HMAC. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();
  const username = session?.username ?? "Administrador";

  return <AdminShell username={username}>{children}</AdminShell>;
}
