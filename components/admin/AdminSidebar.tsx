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
} from "lucide-react";
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
  { href: "/admin/categories", label: "Categorías", icon: FolderTree },
  { href: "/admin/products", label: "Productos", icon: UtensilsCrossed },
  { href: "/admin/happy-hour", label: "Happy Hour", icon: Clock },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
          <QrCode className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-foreground">{SITE.name}</p>
          <p className="text-xs text-muted-foreground">Panel CMS</p>
        </div>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Administración">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-border p-3">
        <Link
          href="/carta"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Ver carta pública
        </Link>
      </div>
    </aside>
  );
}
