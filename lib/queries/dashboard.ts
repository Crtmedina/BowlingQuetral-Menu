import { connectDB } from "@/lib/mongodb";
import MenuSectionModel from "@/models/MenuSection";
import ProductModel from "@/models/Product";
import { MENU_HUBS } from "@/lib/carta/navigation";

export async function getDashboardCounts(): Promise<{
  categoryCount: number;
  productCount: number;
  connected: boolean;
}> {
  const staticSectionCount = MENU_HUBS.reduce((total, hub) => total + hub.sections.length, 0);

  if (!process.env.MONGODB_URI) {
    return { categoryCount: staticSectionCount, productCount: 0, connected: false };
  }

  try {
    await connectDB();
    const [productCount, sectionConfigured] = await Promise.all([
      ProductModel.countDocuments({}),
      MenuSectionModel.countDocuments({}),
    ]);
    return {
      categoryCount: Math.max(staticSectionCount, sectionConfigured),
      productCount,
      connected: true,
    };
  } catch {
    return { categoryCount: staticSectionCount, productCount: 0, connected: false };
  }
}
