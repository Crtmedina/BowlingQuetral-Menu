import dynamic from "next/dynamic";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { isDatabaseConnected, listAdminProducts } from "@/lib/queries/menu";
import { getMenuLayoutForAdmin } from "@/lib/menu/menu-layout";
import { SITE } from "@/lib/site";

const ProductManager = dynamic(
  () =>
    import("@/components/admin/ProductManager").then((m) => ({
      default: m.ProductManager,
    })),
  { loading: () => <AdminPageSkeleton variant="products" /> }
);

export const metadata = { title: `Productos — ${SITE.name}` };

export default async function AdminProductsPage() {
  const [connected, products, menuLayout] = await Promise.all([
    isDatabaseConnected(),
    listAdminProducts(),
    getMenuLayoutForAdmin(),
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <ProductManager initialProducts={products} menuLayout={menuLayout} connected={connected} />
    </div>
  );
}
