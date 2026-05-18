import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Acceso — ${SITE.name}`,
};

export default function LoginPage() {
  return (
    <div className="admin-app-shell flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="h-56 w-full animate-pulse rounded-2xl border border-border bg-card shadow-sm" />
          }
        >
          <LoginForm />
        </Suspense>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          La{" "}
          <Link href="/carta" className="font-medium text-primary underline-offset-2 hover:underline">
            carta pública
          </Link>{" "}
          no requiere inicio de sesión.
        </p>
      </div>
    </div>
  );
}
