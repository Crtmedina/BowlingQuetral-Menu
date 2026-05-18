"use server";

import { revalidateAfterAdminMutation } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import MenuSectionModel from "@/models/MenuSection";
import ProductModel from "@/models/Product";
import { requireAdminSession } from "@/lib/auth/guard";
import { productFormSchema, sectionIntroSchema } from "@/lib/validations/product";

type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

function requireDatabase(): ActionResult {
  if (!process.env.MONGODB_URI) {
    return {
      ok: false,
      error: "Falta configurar MONGODB_URI en .env.local para guardar cambios.",
    };
  }
  return { ok: true };
}

async function requireAdmin(): Promise<ActionResult | null> {
  return requireAdminSession();
}

export async function saveProductAction(
  input: unknown,
  productId?: string
): Promise<ActionResult<{ id: string }>> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbCheck = requireDatabase();
  if (!dbCheck.ok) return dbCheck;

  const parsed = productFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa el formulario." };
  }

  try {
    await connectDB();
    const payload = parsed.data;

    if (productId) {
      const updated = await ProductModel.findByIdAndUpdate(
        productId,
        {
          name: payload.name,
          description: payload.description,
          price: payload.price,
          deal: payload.deal || undefined,
          imageUrl: payload.imageUrl,
          sectionId: payload.sectionId,
          order: payload.order,
          active: payload.active,
          happyHour2x1: payload.happyHour2x1,
          isNovelty: payload.isNovelty,
          showOnHome: payload.showOnHome,
        },
        { new: true }
      );

      if (!updated) {
        return { ok: false, error: "No encontramos ese producto." };
      }

      revalidateAfterAdminMutation();
      return { ok: true, data: { id: String(updated._id) } };
    }

    const created = await ProductModel.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      deal: payload.deal || undefined,
      imageUrl: payload.imageUrl,
      sectionId: payload.sectionId,
      order: payload.order,
      active: payload.active,
      happyHour2x1: payload.happyHour2x1,
      isNovelty: payload.isNovelty,
      showOnHome: payload.showOnHome,
    });

    revalidateAfterAdminMutation();
    return { ok: true, data: { id: String(created._id) } };
  } catch {
    return { ok: false, error: "No pudimos guardar el producto. Intenta de nuevo." };
  }
}

export async function deleteProductAction(productId: string): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbCheck = requireDatabase();
  if (!dbCheck.ok) return dbCheck;

  try {
    await connectDB();
    const deleted = await ProductModel.findByIdAndDelete(productId);
    if (!deleted) {
      return { ok: false, error: "No encontramos ese producto." };
    }

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos eliminar el producto." };
  }
}

export async function saveSectionIntroAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbCheck = requireDatabase();
  if (!dbCheck.ok) return dbCheck;

  const parsed = sectionIntroSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa el texto." };
  }

  try {
    await connectDB();
    const { sectionId, intro, active } = parsed.data;

    const updated = await MenuSectionModel.findOneAndUpdate(
      { slug: sectionId },
      { $set: { intro, active } },
      { new: true }
    );
    if (!updated) {
      return { ok: false, error: "No encontramos esa categoría en la base." };
    }

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos guardar la categoría." };
  }
}

export async function listProductsForSectionAction(
  sectionId: string
): Promise<AdminProductListItem[]> {
  const auth = await requireAdmin();
  if (auth) return [];
  if (!process.env.MONGODB_URI) return [];

  try {
    await connectDB();
    const products = await ProductModel.find({ sectionId })
      .sort({ order: 1, name: 1 })
      .lean();

    return products.map((product) => ({
      id: String(product._id),
      name: product.name,
      price: product.price,
      active: product.active ?? true,
      sectionId: String(product.sectionId),
    }));
  } catch {
    return [];
  }
}

export type AdminProductListItem = {
  id: string;
  name: string;
  price: string;
  active: boolean;
  sectionId: string;
};
