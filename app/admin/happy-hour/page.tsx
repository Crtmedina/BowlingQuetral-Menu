import Link from "next/link";
import { HappyHourSettingsForm } from "@/components/admin/HappyHourSettingsForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HAPPY_HOUR_CATEGORY_SLUG } from "@/lib/menu/happy-hour";
import { getHappyHourSettings } from "@/lib/queries/happy-hour";
import { isDatabaseConnected, listAdminProducts } from "@/lib/queries/menu";
import { SITE } from "@/lib/site";

export const metadata = { title: `Happy Hour — ${SITE.name}` };

export default async function AdminHappyHourPage() {
  const connected = await isDatabaseConnected();
  const [settings, hhProducts] = await Promise.all([
    getHappyHourSettings(),
    connected ? listAdminProducts(HAPPY_HOUR_CATEGORY_SLUG) : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <AdminPageHeader
        title="Happy Hour"
        description="Horario global que aparece en el banner de la carta. El bloque 2×1 y los tragos se configuran en Menú y Productos."
        hint="La carta muestra el horario aunque la promo esté desactivada; «activo» indica si estamos dentro de la franja."
      />

      <HappyHourSettingsForm initial={settings} connected={connected} hhProducts={hhProducts} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">También en el panel</CardTitle>
          <CardDescription>Dos ajustes distintos en la carta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Destacado en carta</strong> (Menú → bloques): el bloque
            Happy Hour sale primero en la barra.
          </p>
          <p>
            <strong className="text-foreground">Plantilla 2×1</strong>: un solo bloque usa el banner grande
            y la lista especial de tragos.
          </p>
          <p>
            <strong className="text-foreground">Tragos 2×1</strong> (Productos): switch «Trago 2×1 en
            Happy Hour» y precio promo en cada producto.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="gold">
          <Link href="/admin/menu">Bloques y categorías</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/admin/products?sec=${HAPPY_HOUR_CATEGORY_SLUG}`}>Productos de Happy Hour</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/carta" target="_blank" rel="noopener noreferrer">
            Ver carta pública
          </Link>
        </Button>
      </div>
    </div>
  );
}
