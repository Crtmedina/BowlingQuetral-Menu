"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  UtensilsCrossed,
  Clock,
  QrCode,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const nav: NavItem[] = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Menú", icon: FolderTree },
  { href: "/admin/products", label: "Productos", icon: UtensilsCrossed },
  { href: "/admin/happy-hour", label: "Happy Hour", icon: Clock },
];

type AdminSidebarProps = {
  onNavigate?: () => void;
  showClose?: boolean;
  onClose?: () => void;
};

export function AdminSidebar({ onNavigate, showClose, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar sticky top-0 flex h-full min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-zinc-950 text-zinc-300 lg:h-screen">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
          <QrCode className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight text-white">{SITE.name}</p>
          <p className="text-xs text-zinc-500">Panel de administración</p>
        </div>
        {showClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-zinc-400 hover:bg-white/10 hover:text-white"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </Button>
        ) : null}
      </div>
      <Separator className="bg-white/10" />
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Administración">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              prefetch
              onClick={() => onNavigate?.()}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-zinc-950 shadow-md"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-1 border-t border-white/10 p-3">
        <Link
          href="/carta"
          prefetch
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Ver carta pública
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}

