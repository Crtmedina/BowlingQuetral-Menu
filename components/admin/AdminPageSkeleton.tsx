import { cn } from "@/lib/utils";

type AdminPageSkeletonProps = {
  variant?: "default" | "menu" | "products";
};

export function AdminPageSkeleton({ variant = "default" }: AdminPageSkeletonProps) {
  if (variant === "menu") {
    return (
      <div className="mx-auto max-w-7xl animate-pulse space-y-6 p-1">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-8 w-56 rounded-lg bg-muted" />
          <div className="h-4 w-full max-w-md rounded bg-muted/70" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-28 rounded-lg bg-muted/80" />
          <div className="h-9 w-24 rounded-lg bg-muted/60" />
        </div>
        <div className="hidden space-y-2 admin-menu-table-view">
          <div className="h-10 rounded-t-lg bg-muted" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3 border-b border-border/60 px-3 py-3">
              <div className="h-8 w-8 shrink-0 rounded bg-muted/80" />
              <div className="h-4 flex-1 rounded bg-muted/60" />
              <div className="h-8 w-24 shrink-0 rounded bg-muted/80" />
            </div>
          ))}
        </div>
        <div className="space-y-2 admin-menu-cards-view">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-36 rounded-xl border border-border bg-muted/40" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "products") {
    return (
      <div className="mx-auto max-w-6xl animate-pulse space-y-6 p-1">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-8 w-40 rounded-lg bg-muted" />
          <div className="h-4 w-48 rounded bg-muted/70" />
        </div>
        <div className="h-24 rounded-xl border border-border bg-muted/30" />
        <div className="hidden space-y-0 overflow-hidden rounded-xl border border-border admin-products-table-view">
          <div className="h-11 bg-muted/80" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3 border-t border-border/60 px-4 py-4">
              <div className="h-12 w-12 shrink-0 rounded-md bg-muted/70" />
              <div className="h-4 flex-1 rounded bg-muted/50" />
              <div className="h-8 w-20 shrink-0 rounded bg-muted/70" />
            </div>
          ))}
        </div>
        <div className="grid gap-3 admin-products-cards-view">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl border border-border bg-muted/40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-7xl animate-pulse space-y-6 p-1")}>
      <div className="h-8 w-48 rounded-lg bg-muted" />
      <div className="h-4 w-full max-w-xl rounded bg-muted/80" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-28 rounded-xl bg-muted/60" />
        <div className="h-28 rounded-xl bg-muted/50" />
        <div className="h-28 rounded-xl bg-muted/40" />
      </div>
    </div>
  );
}
