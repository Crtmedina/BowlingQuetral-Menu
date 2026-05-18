import Link from "next/link";
import { LayoutDashboard, FolderTree, Plus, UtensilsCrossed } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getDashboardCounts } from "@/lib/queries/dashboard";
import { listAdminSections } from "@/lib/queries/menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Panel — ${SITE.name}`,
};

export default async function AdminDashboardPage() {
  const [{ categoryCount, productCount, connected }, sections] = await Promise.all([
    getDashboardCounts(),
    listAdminSections(),
  ]);

  const emptyVisibleSections = sections.filter((s) => s.active && s.productCount === 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <AdminPageHeader
        title="Resumen"
        description={`Vista general del menú digital de ${SITE.name}.`}
        hint={
          !connected
            ? "Sin conexión a la base de datos: define MONGODB_URI en .env.local para guardar productos."
            : undefined
        }
      />

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="gold" size="lg">
          <Link href="/admin/products">
            <Plus className="h-5 w-5" aria-hidden />
            Agregar producto
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/admin/menu">Bloques y categorías</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{productCount}</div>
            <CardDescription className="mt-1">Platos y bebidas cargados</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías del menú</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{categoryCount}</div>
            <CardDescription className="mt-1">Categorías bajo cada bloque (Tablas, Pizzas, etc.)</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-border bg-card sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado del panel</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={connected ? "gold" : "secondary"}>
                {connected ? "Base de datos conectada" : "Solo lectura de estructura"}
              </Badge>
            </div>
            <CardDescription>
              Usa Productos para cargar ítems. Ejecuta <code className="rounded bg-muted px-1">npm run seed:carta</code> para copiar el catálogo del archivo a la base.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {emptyVisibleSections.length > 0 && (
        <Card className="border-amber-500/35 bg-amber-500/[0.07]">
          <CardHeader>
            <CardTitle className="text-base">Categorías visibles sin productos</CardTitle>
            <CardDescription>
              Los clientes no verán ítems en estas categorías hasta que agregues productos (o desactives la
              categoría en Menú → bloques y categorías).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {emptyVisibleSections.map((s) => (
                <li key={s.sectionId}>
                  <Link
                    href={`/admin/products?sec=${encodeURIComponent(s.sectionId)}`}
                    className="font-medium text-gold underline-offset-4 hover:underline"
                  >
                    {s.hubLabel} · {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
