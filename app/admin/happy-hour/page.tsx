import { SITE } from "@/lib/site";

export const metadata = { title: `Happy Hour — ${SITE.name}` };

export default function AdminHappyHourPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Happy Hour</h2>
      <p className="text-muted-foreground">
        Configuración global: días, horario, descripción de promo y productos elegibles (modelo{" "}
        <code className="rounded bg-muted px-1">HappyHourSettings</code>).
      </p>
    </div>
  );
}
