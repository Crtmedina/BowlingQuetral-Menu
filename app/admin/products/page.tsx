import { SITE } from "@/lib/site";

export const metadata = { title: `Productos — ${SITE.name}` };

export default function AdminProductsPage() {
  return (
    <div className="max-w-2xl space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Productos</h2>
      <p className="text-muted-foreground">
        Formulario con categoría (dropdown), switches para inicio / Happy Hour 2x1 / agotado, precio
        normal vs oferta, etiquetas y subida con Cloudinary.
      </p>
    </div>
  );
}
