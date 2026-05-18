import type { ReactNode } from "react";

type AdminMongoBannerProps = {
  children: ReactNode;
};

export function AdminMongoBanner({ children }: AdminMongoBannerProps) {
  return (
    <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      {children}
    </p>
  );
}
