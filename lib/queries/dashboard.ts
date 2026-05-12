import { connectDB } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import ProductModel from "@/models/Product";

export async function getDashboardCounts(): Promise<{
  categoryCount: number;
  productCount: number;
  connected: boolean;
}> {
  if (!process.env.MONGODB_URI) {
    return { categoryCount: 0, productCount: 0, connected: false };
  }
  try {
    await connectDB();
    const [categoryCount, productCount] = await Promise.all([
      CategoryModel.countDocuments({}),
      ProductModel.countDocuments({}),
    ]);
    return { categoryCount, productCount, connected: true };
  } catch {
    return { categoryCount: 0, productCount: 0, connected: false };
  }
}
