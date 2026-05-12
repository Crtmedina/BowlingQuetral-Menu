import { LayoutDashboard, FolderTree, UtensilsCrossed } from "lucide-react";
import { getDashboardCounts } from "@/lib/queries/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Panel — ${SITE.name}`,
};

export default async function AdminDashboardPage() {
  const { categoryCount, productCount, connected } = await getDashboardCounts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Resumen</h2>
        <p className="text-muted-foreground">
          Vista general de tu menú digital <span className="text-gold">{SITE.name}</span>.
        </p>
        {!connected && (
          <p className="mt-2 text-sm text-amber-200/90">
            Sin conexión a MongoDB: define <code className="rounded bg-muted px-1">MONGODB_URI</code> en{" "}
            <code className="rounded bg-muted px-1">.env.local</code> para ver conteos reales.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{productCount}</div>
            <CardDescription className="mt-1">Platos y bebidas en catálogo</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums">{categoryCount}</div>
            <CardDescription className="mt-1">Tabs y secciones de la carta</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-border bg-card sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado CMS</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant={connected ? "gold" : "secondary"}>
                {connected ? "MongoDB conectado" : "Modo demo (sin DB)"}
              </Badge>
              <Badge variant="outline">Next.js 14 · App Router</Badge>
            </div>
            <CardDescription>
              Próximos pasos: CRUD de productos con Cloudinary, tabs sticky en la carta y carrusel de
              novedades.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
