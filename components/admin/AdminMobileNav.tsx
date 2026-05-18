"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, FolderTree, LayoutDashboard, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const nav: NavItem[] = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Menú", icon: FolderTree },
  { href: "/admin/products", label: "Productos", shortLabel: "Prod.", icon: UtensilsCrossed },
  { href: "/admin/happy-hour", label: "Happy Hour", shortLabel: "HH", icon: Clock },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="admin-mobile-nav fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 shadow-[0_-4px_20px_rgb(0_0_0_/_0.06)] backdrop-blur-md"
      aria-label="Navegación rápida"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around gap-0.5 px-1 pt-1">
        {nav.map(({ href, label, shortLabel, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="min-w-0 flex-1">
              <Link
                href={href}
                prefetch
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-2.5 text-[0.65rem] font-medium transition-colors",
                  isActive
                    ? "admin-nav-item-active"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span className="max-w-full truncate sm:hidden">{shortLabel ?? label}</span>
                <span className="max-w-full truncate hidden sm:inline">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
