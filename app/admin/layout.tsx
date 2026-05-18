import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

/** Auth en middleware; el shell no bloquea con otra verificación HMAC. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
