import { SITE } from "@/lib/site";

export const metadata = { title: `Categorías — ${SITE.name}` };

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Categorías</h2>
      <p className="text-muted-foreground">
        Aquí irá el listado y formulario (nombre, imagen de portada, orden). Conecta MongoDB y
        añadiremos Server Actions + Zod.
      </p>
    </div>
  );
}
