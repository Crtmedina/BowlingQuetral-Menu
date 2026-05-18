"use server";

import { revalidateAfterAdminMutation } from "@/lib/cache/admin-cache";
import { connectDB } from "@/lib/mongodb";
import MenuHubModel from "@/models/MenuHub";
import MenuSectionModel from "@/models/MenuSection";
import ProductModel from "@/models/Product";
import { slugifyLabel, uniqueSlug } from "@/lib/menu/slugify";
import { compareHubsCartaOrder } from "@/lib/menu/menu-layout-dto";
import {
  menuHubDeleteSchema,
  menuHubFeaturedToggleSchema,
  menuHubMoveSchema,
  menuHubPromoSchema,
  menuHubSetFeaturedRankSchema,
  menuHubSetPositionSchema,
  menuHubUpsertSchema,
  menuSectionDeleteSchema,
  menuSectionMoveSchema,
  menuSectionSetPositionSchema,
  menuSectionUpsertSchema,
} from "@/lib/validations/menu-structure";
import { requireAdminSession } from "@/lib/auth/guard";

type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

function requireDatabase(): ActionResult {
  if (!process.env.MONGODB_URI) {
    return { ok: false, error: "Falta MONGODB_URI en .env.local." };
  }
  return { ok: true };
}

async function requireAdmin(): Promise<ActionResult | null> {
  return requireAdminSession();
}

export async function upsertMenuHubAction(
  input: unknown,
  existingSlug?: string
): Promise<ActionResult<{ slug: string }>> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubUpsertSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const p = parsed.data;

    let slug: string;
    if (existingSlug) {
      slug = existingSlug;
    } else {
      const raw = p.slug?.trim();
      if (raw?.length) {
        const taken = await MenuHubModel.findOne({ slug: raw }).lean();
        if (taken) return { ok: false, error: "Ese identificador de bloque ya existe." };
        slug = raw;
      } else {
        const base = slugifyLabel(p.label, "bloque");
        slug = await uniqueSlug(async (s) => {
          const found = await MenuHubModel.findOne({ slug: s }).lean();
          return Boolean(found);
        }, base);
      }
    }

    await MenuHubModel.findOneAndUpdate(
      { slug },
      {
        slug,
        label: p.label,
        suffix: p.suffix ?? "",
        menuGroup: p.menuGroup,
        iconKey: p.iconKey,
        order: p.order,
        active: p.active,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    revalidateAfterAdminMutation();
    return { ok: true, data: { slug } };
  } catch {
    return { ok: false, error: "No pudimos guardar el bloque." };
  }
}

export async function setMenuHubPromoAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubPromoSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { slug } = parsed.data;
    const exists = await MenuHubModel.findOne({ slug }).lean();
    if (!exists) {
      return { ok: false, error: "No existe ese bloque." };
    }
    await MenuHubModel.updateMany({}, { $set: { isPromoHub: false } });
    await MenuHubModel.updateOne({ slug }, { $set: { isPromoHub: true } });

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos actualizar el bloque con vista promo." };
  }
}

export async function clearMenuHubPromoAction(): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  try {
    await connectDB();
    await MenuHubModel.updateMany({}, { $set: { isPromoHub: false } });
    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos quitar el bloque destacado." };
  }
}

export async function deleteMenuHubAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Slug inválido." };
  }

  try {
    await connectDB();
    const n = await MenuSectionModel.countDocuments({ hubSlug: parsed.data.slug });
    if (n > 0) {
      return {
        ok: false,
        error: `Este bloque tiene ${n} categoría(s). Elimínalas o muévelas antes.`,
      };
    }
    await MenuHubModel.deleteOne({ slug: parsed.data.slug });
    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos eliminar el bloque." };
  }
}

export async function upsertMenuSectionAction(
  input: unknown,
  existingSlug?: string
): Promise<ActionResult<{ slug: string }>> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuSectionUpsertSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const p = parsed.data;

    const hub = await MenuHubModel.findOne({ slug: p.hubSlug }).lean();
    if (!hub) {
      return { ok: false, error: "El bloque indicado no existe." };
    }

    let slug: string;
    if (existingSlug) {
      slug = existingSlug;
    } else {
      const raw = p.slug?.trim();
      if (raw?.length) {
        const taken = await MenuSectionModel.findOne({ slug: raw }).lean();
        if (taken) return { ok: false, error: "Ese identificador de categoría ya existe." };
        slug = raw;
      } else {
        const base = slugifyLabel(p.label, "categoria");
        slug = await uniqueSlug(async (s) => {
          const found = await MenuSectionModel.findOne({ slug: s }).lean();
          return Boolean(found);
        }, base);
      }
    }

    await MenuSectionModel.findOneAndUpdate(
      { slug },
      {
        slug,
        label: p.label,
        hubSlug: p.hubSlug,
        intro: p.intro ?? "",
        order: p.order,
        active: p.active,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    revalidateAfterAdminMutation();
    return { ok: true, data: { slug } };
  } catch {
    return { ok: false, error: "No pudimos guardar la categoría." };
  }
}

export async function moveMenuHubOrderAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubMoveSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { slug, direction } = parsed.data;
    const hubs = await MenuHubModel.find({}).lean();
    const keys = hubs.map((h) => {
      const raw = h as { isFeatured?: boolean; featuredOrder?: number };
      return {
        slug: h.slug,
        order: h.order ?? 0,
        featuredOrder: raw.featuredOrder ?? 0,
        isFeatured: raw.isFeatured === true,
        menuGroup: h.menuGroup as "comida" | "barra",
      };
    });
    const sorted = [...keys].sort(compareHubsCartaOrder);
    const idx = sorted.findIndex((h) => h.slug === slug);
    if (idx < 0) return { ok: false, error: "No encontramos ese bloque." };
    const j = direction === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= sorted.length) {
      return { ok: false, error: direction === "up" ? "Ya es el primero." : "Ya es el último." };
    }
    const ka = sorted[idx];
    const kb = sorted[j];
    if (ka.isFeatured !== kb.isFeatured) {
      return {
        ok: false,
        error:
          "No se puede cruzar destacado y normal con las flechas. Usa “Destacado en carta” o el desplegable de posición.",
      };
    }
    if (!ka.isFeatured && ka.menuGroup !== kb.menuGroup) {
      return {
        ok: false,
        error: "No se puede mezclar comida y barra: ordénalos en la pestaña Orden.",
      };
    }
    const docA = hubs.find((x) => x.slug === ka.slug)!;
    const docB = hubs.find((x) => x.slug === kb.slug)!;
    if (ka.isFeatured) {
      const fa = (docA as { featuredOrder?: number }).featuredOrder ?? 0;
      const fb = (docB as { featuredOrder?: number }).featuredOrder ?? 0;
      await MenuHubModel.updateOne({ slug: ka.slug }, { $set: { featuredOrder: fb } });
      await MenuHubModel.updateOne({ slug: kb.slug }, { $set: { featuredOrder: fa } });
    } else {
      const orderA = docA.order ?? 0;
      const orderB = docB.order ?? 0;
      await MenuHubModel.updateOne({ slug: ka.slug }, { $set: { order: orderB } });
      await MenuHubModel.updateOne({ slug: kb.slug }, { $set: { order: orderA } });
    }

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos reordenar el bloque." };
  }
}

export async function setMenuHubPositionAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubSetPositionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { slug, index } = parsed.data;
    const hubDoc = await MenuHubModel.findOne({ slug }).lean();
    if (!hubDoc) return { ok: false, error: "No encontramos ese bloque." };
    if (hubDoc.isFeatured) {
      return {
        ok: false,
        error: "Ese bloque está en destacados: ordénalo en la sección Destacados.",
      };
    }
    const group = hubDoc.menuGroup as "comida" | "barra";
    const hubs = await MenuHubModel.find({
      menuGroup: group,
      $or: [{ isFeatured: false }, { isFeatured: { $exists: false } }],
    })
      .sort({ order: 1, slug: 1 })
      .lean();
    const from = hubs.findIndex((h) => h.slug === slug);
    if (from < 0) {
      return { ok: false, error: "No encontramos ese bloque en su grupo." };
    }
    const item = hubs[from];
    const rest = hubs.filter((h) => h.slug !== slug);
    const target = Math.min(Math.max(0, index), rest.length);
    const ordered = [...rest.slice(0, target), item, ...rest.slice(target)];

    await Promise.all(
      ordered.map((h, i) => MenuHubModel.updateOne({ slug: h.slug }, { $set: { order: i } }))
    );

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos cambiar la posición del bloque." };
  }
}

export async function setMenuHubFeaturedRankAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubSetFeaturedRankSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { slug, index } = parsed.data;
    const hubDoc = await MenuHubModel.findOne({ slug }).lean();
    if (!hubDoc?.isFeatured) {
      return { ok: false, error: "Ese bloque no está marcado como destacado en carta." };
    }
    const group = hubDoc.menuGroup as "comida" | "barra";
    const hubs = await MenuHubModel.find({ isFeatured: true, menuGroup: group })
      .sort({ featuredOrder: 1, slug: 1 })
      .lean();
    const from = hubs.findIndex((h) => h.slug === slug);
    if (from < 0) {
      return { ok: false, error: "No encontramos ese bloque destacado en su grupo." };
    }
    const item = hubs[from];
    const rest = hubs.filter((h) => h.slug !== slug);
    const target = Math.min(Math.max(0, index), rest.length);
    const ordered = [...rest.slice(0, target), item, ...rest.slice(target)];

    await Promise.all(
      ordered.map((h, i) => MenuHubModel.updateOne({ slug: h.slug }, { $set: { featuredOrder: i } }))
    );

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos cambiar el orden entre destacados." };
  }
}

export async function setMenuHubFeaturedToggleAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuHubFeaturedToggleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { slug, isFeatured: want } = parsed.data;
    const hub = await MenuHubModel.findOne({ slug }).lean();
    if (!hub) return { ok: false, error: "No existe ese bloque." };

    const raw = hub as { isFeatured?: boolean };
    const currently = raw.isFeatured === true;
    if (want === currently) {
      revalidateAfterAdminMutation();
      return { ok: true };
    }

    if (want) {
      const n = await MenuHubModel.countDocuments({ isFeatured: true });
      await MenuHubModel.updateOne({ slug }, { $set: { isFeatured: true, featuredOrder: n } });
    } else {
      const tops = await MenuHubModel.find({
        slug: { $ne: slug },
        $or: [{ isFeatured: false }, { isFeatured: { $exists: false } }],
      })
        .sort({ order: -1 })
        .limit(1)
        .lean();
      const nextOrder = (tops[0]?.order ?? -1) + 1;
      await MenuHubModel.updateOne(
        { slug },
        { $set: { isFeatured: false, featuredOrder: 0, order: nextOrder } }
      );
      const featured = await MenuHubModel.find({ isFeatured: true })
        .sort({ featuredOrder: 1, slug: 1 })
        .lean();
      await Promise.all(
        featured.map((h, i) =>
          MenuHubModel.updateOne({ slug: h.slug }, { $set: { featuredOrder: i } })
        )
      );
    }

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos actualizar el destacado en carta." };
  }
}

export async function moveMenuSectionOrderAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuSectionMoveSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { hubSlug, slug, direction } = parsed.data;
    const sections = await MenuSectionModel.find({ hubSlug }).sort({ order: 1, slug: 1 }).lean();
    const idx = sections.findIndex((s) => s.slug === slug);
    if (idx < 0) return { ok: false, error: "No encontramos esa categoría." };
    const j = direction === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= sections.length) {
      return { ok: false, error: direction === "up" ? "Ya es la primera." : "Ya es la última." };
    }
    const a = sections[idx];
    const b = sections[j];
    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;
    await MenuSectionModel.updateOne({ slug: a.slug }, { $set: { order: orderB } });
    await MenuSectionModel.updateOne({ slug: b.slug }, { $set: { order: orderA } });

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos reordenar la categoría." };
  }
}

export async function setMenuSectionPositionAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuSectionSetPositionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  try {
    await connectDB();
    const { hubSlug, slug, index } = parsed.data;
    const sections = await MenuSectionModel.find({ hubSlug }).sort({ order: 1, slug: 1 }).lean();
    const from = sections.findIndex((s) => s.slug === slug);
    if (from < 0) return { ok: false, error: "No encontramos esa categoría." };
    const item = sections[from];
    const rest = sections.filter((s) => s.slug !== slug);
    const target = Math.min(Math.max(0, index), rest.length);
    const ordered = [...rest.slice(0, target), item, ...rest.slice(target)];

    await Promise.all(
      ordered.map((s, i) => MenuSectionModel.updateOne({ slug: s.slug }, { $set: { order: i } }))
    );

    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos cambiar la posición de la categoría." };
  }
}

export async function deleteMenuSectionAction(input: unknown): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (auth) return auth;
  const db = requireDatabase();
  if (!db.ok) return db;

  const parsed = menuSectionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Slug inválido." };
  }

  try {
    await connectDB();
    const n = await ProductModel.countDocuments({ sectionId: parsed.data.slug });
    if (n > 0) {
      return {
        ok: false,
        error: `Hay ${n} producto(s) en esta categoría. Muévelos o elimínalos antes.`,
      };
    }
    await MenuSectionModel.deleteOne({ slug: parsed.data.slug });
    revalidateAfterAdminMutation();
    return { ok: true };
  } catch {
    return { ok: false, error: "No pudimos eliminar la categoría." };
  }
}
