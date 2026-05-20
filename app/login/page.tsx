import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Acceso — ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(43 58% 35% / 0.2), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, hsl(240 30% 20% / 0.25), transparent)",
        }}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md">
        <Suspense
          fallback={
            <div className="h-72 w-full animate-pulse rounded-2xl border border-border bg-card shadow-sm" />
          }
        >
          <LoginForm />
        </Suspense>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          ¿Buscas el menú?{" "}
          <Link href="/carta" className="font-medium text-primary underline-offset-2 hover:underline">
            Ver carta pública
          </Link>
        </p>
      </div>
    </div>
  );
}
