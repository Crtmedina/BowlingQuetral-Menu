import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

type AdminSessionBarProps = {
  username: string;
  variant?: "header" | "sidebar";
};

function userInitial(username: string): string {
  const ch = username.trim().charAt(0);
  return ch ? ch.toUpperCase() : "?";
}

export function AdminSessionBar({ username, variant = "header" }: AdminSessionBarProps) {
  const initial = userInitial(username);

  if (variant === "sidebar") {
    return (
      <div className="px-1">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/25 text-sm font-semibold text-gold"
            aria-hidden
          >
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-zinc-500">Sesión activa</p>
            <p className="truncate text-sm font-medium text-zinc-100">{username}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <div
        className="hidden items-center gap-2 rounded-full border border-border bg-muted/50 py-1 pl-1 pr-3 sm:flex"
        title={`Conectado como ${username}`}
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold"
          aria-hidden
        >
          {initial}
        </span>
        <span className="max-w-[7rem] truncate text-xs font-medium text-foreground md:max-w-[9rem]">
          {username}
        </span>
      </div>
      <Button type="button" variant="ghost" size="icon" className="shrink-0" asChild>
        <Link href="/carta" target="_blank" rel="noopener noreferrer" aria-label="Ver carta pública">
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
      <form action={logoutAction}>
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
