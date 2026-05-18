import { Suspense } from "react";
import { CartaClient } from "@/components/carta/CartaClient";
import { getPublicMenuCatalog } from "@/lib/menu/public-catalog";
import { getMenuLayoutForCarta } from "@/lib/menu/menu-layout";
import { getHappyHourForCarta } from "@/lib/queries/happy-hour";
import { SITE } from "@/lib/site";

export const revalidate = 30;

export const metadata = {
  title: `Carta — ${SITE.name}`,
  description: "Menú digital Bowling Quetral",
};

export default async function CartaPage() {
  const [{ productsBySection, sectionIntros }, menuLayout, happyHour] = await Promise.all([
    getPublicMenuCatalog(),
    getMenuLayoutForCarta(),
    getHappyHourForCarta(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="carta-page-shell flex min-h-[50vh] items-center justify-center px-4 text-sm text-zinc-400">
          Cargando carta…
        </div>
      }
    >
      <CartaClient
        menuLayout={menuLayout}
        productsBySection={productsBySection}
        sectionIntros={sectionIntros}
        happyHour={happyHour}
      />
    </Suspense>
  );
}
