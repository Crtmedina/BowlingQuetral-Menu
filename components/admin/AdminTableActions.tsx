import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const adminTableIconClass =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

export function AdminTableIconLink({
  href,
  label,
  external,
  children,
  className,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(adminTableIconClass, className)}
      title={label}
      aria-label={label}
    >
      {children}
    </Link>
  );
}

export function AdminTableIconButton({
  label,
  onClick,
  disabled,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(adminTableIconClass, className)}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export function AdminTableActionsCell({ children }: { children: ReactNode }) {
  return (
    <td className="admin-table-sticky-actions w-[9.25rem] px-2 py-2 align-top">
      <div
        className="ml-auto inline-flex rounded-lg border border-border/80 bg-muted/45 p-0.5 shadow-sm"
        role="toolbar"
        aria-label="Acciones de fila"
      >
        <div className="grid grid-cols-4 gap-px">{children}</div>
      </div>
    </td>
  );
}
