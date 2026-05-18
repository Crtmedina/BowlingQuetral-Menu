import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  breadcrumb?: string;
  hint?: string;
  action?: ReactNode;
  className?: string;
};

export function AdminPageHeader({
  title,
  description,
  breadcrumb = "Admin",
  hint,
  action,
  className,
}: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="min-w-0">
        <nav className="mb-1 text-xs text-muted-foreground" aria-label="Migas de navegación">
          <Link href="/admin" className="hover:text-foreground">
            {breadcrumb}
          </Link>
          <span className="mx-1.5 text-muted-foreground/40">/</span>
          <span className="font-medium text-foreground">{title}</span>
        </nav>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        {hint ? (
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground">{hint}</p>
        ) : null}
      </div>
      {action ? <div className="w-full shrink-0 sm:w-auto">{action}</div> : null}
    </div>
  );
}
