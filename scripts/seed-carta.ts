/**
 * Importa el catálogo estático (lib/carta/products.ts) a MongoDB.
 * Uso: npx tsx scripts/seed-carta.ts
 * Requiere MONGODB_URI en .env.local
 */
import { config } from "dotenv";
import { resolve } from "node:path";
import mongoose from "mongoose";

config({ path: resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Define MONGODB_URI en .env.local");
  process.exit(1);
}

const MONGODB_URI = uri;

async function main() {
  const { PRODUCTS_BY_SECTION, SECTION_INTROS } = await import("../lib/carta/products");
  const { SECTION_IDS } = await import("../lib/carta/section-ids");
  const { default: ProductModel } = await import("../models/Product");
  const { default: MenuSectionModel } = await import("../models/MenuSection");
  const { bootstrapMenuStructureIfEmpty } = await import("../lib/menu/menu-layout");
  const { HAPPY_HOUR_CATEGORY_SLUG } = await import("../lib/menu/happy-hour");

  await mongoose.connect(MONGODB_URI);
  console.log("Conectado a MongoDB");
  await bootstrapMenuStructureIfEmpty();

  let productRows = 0;
  let categoriesUpserted = 0;

  for (const sectionId of SECTION_IDS) {
    const items = PRODUCTS_BY_SECTION[sectionId] ?? [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const happyHour2x1 = sectionId === HAPPY_HOUR_CATEGORY_SLUG && Boolean(item.deal);

      await ProductModel.updateOne(
        { sectionId, name: item.name },
        {
          $set: {
            name: item.name,
            description: item.description ?? "",
            price: item.price,
            deal: item.deal,
            imageUrl: item.image,
            sectionId,
            order: i,
            active: true,
            happyHour2x1,
            tags: [],
            showOnHome: false,
            isDailyOffer: false,
            isNovelty: false,
          },
        },
        { upsert: true }
      );
      productRows += 1;
    }

    const intro = SECTION_INTROS[sectionId];
    if (intro) {
      await MenuSectionModel.updateOne(
        { slug: sectionId },
        { $set: { intro, active: true } }
      );
      categoriesUpserted += 1;
    }
  }

  console.log(`Productos procesados: ${productRows}`);
  console.log(`Categorías del menú (intros): ${categoriesUpserted}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
