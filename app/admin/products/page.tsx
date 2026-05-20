import { Suspense } from "react";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { ProductManager } from "@/components/admin/ProductManager";
import { isDatabaseConnected, listAdminProducts } from "@/lib/queries/menu";
import { getMenuLayoutForAdmin } from "@/lib/menu/menu-layout";
import { SITE } from "@/lib/site";

export const metadata = { title: `Productos — ${SITE.name}` };

async function AdminProductsContent() {
  const [connected, products, menuLayout] = await Promise.all([
    isDatabaseConnected(),
    listAdminProducts(),
    getMenuLayoutForAdmin(),
  ]);

  return (
    <ProductManager initialProducts={products} menuLayout={menuLayout} connected={connected} />
  );
}

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <Suspense fallback={<AdminPageSkeleton variant="products" />}>
        <AdminProductsContent />
      </Suspense>
    </div>
  );
}
