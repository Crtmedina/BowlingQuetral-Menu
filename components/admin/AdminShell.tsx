"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AdminActionDialogProvider } from "@/components/admin/AdminActionDialog";
import { AdminSessionBar } from "@/components/admin/AdminSessionBar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminRoutePrefetch } from "@/components/admin/AdminRoutePrefetch";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { adminPageTitle } from "@/components/admin/admin-page-titles";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

type AdminShellProps = {
  children: ReactNode;
  username: string;
};

export function AdminShell({ children, username }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = adminPageTitle(pathname);

  return (
    <AdminActionDialogProvider>
      <AdminRoutePrefetch />
      <div className="admin-app-shell flex min-h-screen">
        {sidebarOpen ? (
          <div className="fixed inset-0 z-40">
            <button
              type="button"
              className="admin-drawer-backdrop absolute inset-0 bg-black/60"
              aria-label="Cerrar menú"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="admin-drawer-panel relative z-10 flex h-full w-[min(18rem,92vw)] flex-col shadow-2xl">
              <AdminSidebar
                username={username}
                onNavigate={() => setSidebarOpen(false)}
                showClose
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        ) : null}

        <div className="admin-main-surface flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 shrink-0 border-b border-border bg-card/90 px-3 py-3 backdrop-blur-md sm:px-5">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menú de navegación"
                aria-expanded={sidebarOpen}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{pageTitle}</p>
                <p className="truncate text-xs text-muted-foreground sm:hidden">{username}</p>
                <p className="hidden truncate text-xs text-muted-foreground sm:block">{SITE.name}</p>
              </div>
              <AdminSessionBar username={username} />
            </div>
          </header>
          <main className="admin-main-content admin-main-with-bottom-nav min-w-0 flex-1 p-3 sm:p-5 md:p-6 lg:p-8">
            {children}
          </main>
          <AdminMobileNav />
        </div>
      </div>
    </AdminActionDialogProvider>
  );
}
