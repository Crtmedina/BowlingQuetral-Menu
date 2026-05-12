import Link from "next/link";
import { ArrowRight, QrCode } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(43 58% 35% / 0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, hsl(240 30% 20% / 0.4), transparent)",
        }}
      />
      <div className="relative z-10 max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
          <QrCode className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-bone md:text-5xl">
          {SITE.name}
        </h1>
        <p className="mt-4 text-balance text-lg text-bone-muted">{SITE.tagline}</p>
        <p className="mt-2 text-sm text-muted-foreground">{SITE.description}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="gold" size="lg" asChild>
            <Link href="/carta">
              Ver carta
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/admin">Panel admin</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
