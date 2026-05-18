"use client";

import { useMemo, useState, useTransition, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { useAdminActionDialog } from "@/components/admin/AdminActionDialog";
import { useProductListUrlState } from "@/components/admin/hooks/useProductListUrlState";
import { AdminMongoBanner } from "@/components/admin/AdminMongoBanner";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProductFormDialog } from "@/components/admin/products/ProductFormDialog";
import { ProductList } from "@/components/admin/products/ProductList";
import { ProductListEmpty } from "@/components/admin/products/ProductListEmpty";
import { Button } from "@/components/ui/button";
import { filterAdminProducts } from "@/lib/admin/filter-products";
import { emptyProductForm, type ProductFormValues } from "@/lib/admin/product-form";
import {
  allSectionSlugs,
  hubTitleForSlug,
  sectionLabel,
} from "@/lib/menu/menu-layout-lookup";
import { ProductListFilters, type ProductFilterPreset } from "@/components/admin/ProductListFilters";
import { deleteProductAction, saveProductAction } from "@/lib/actions/products";
import { PRODUCTS_BY_SECTION, type CartaProduct } from "@/lib/carta";
import {
  HAPPY_HOUR_BLOCK_SLUG,
  HAPPY_HOUR_CATEGORY_SLUG,
} from "@/lib/menu/happy-hour";
import type { MenuLayoutHubDTO } from "@/lib/menu/menu-layout-dto";
import type { AdminProduct } from "@/lib/queries/menu";

type ProductManagerProps = {
  initialProducts: AdminProduct[];
  menuLayout: MenuLayoutHubDTO[];
  connected: boolean;
};

function staticFallbackCountForSection(sectionSlug: string): number {
  return (PRODUCTS_BY_SECTION as Record<string, CartaProduct[] | undefined>)[sectionSlug]?.length ?? 0;
}

export function ProductManager({ initialProducts, menuLayout, connected }: ProductManagerProps) {
  const { confirm, alertSuccess, alertError } = useAdminActionDialog();
  const defaults = useMemo(() => {
    const h = menuLayout[0];
    return { hubId: h?.slug ?? "", sectionId: h?.sections[0]?.slug ?? "" };
  }, [menuLayout]);

  const {
    search,
    setSearch,
    filterHubSlug,
    setFilterHubSlug,
    selectedSectionSlugs,
    setSelectedSectionSlugs,
    visibility,
    setVisibility,
  } = useProductListUrlState();

  const [products, setProducts] = useState(initialProducts);
  const [hubId, setHubId] = useState(defaults.hubId);
  const [sectionId, setSectionId] = useState(defaults.sectionId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormValues>(emptyProductForm);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const knownSlugs = useMemo(() => new Set(allSectionSlugs(menuLayout)), [menuLayout]);

  const countBySection = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      map.set(p.sectionId, (map.get(p.sectionId) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      filterAdminProducts(products, filterHubSlug, selectedSectionSlugs, search, visibility),
    [products, filterHubSlug, search, selectedSectionSlugs, visibility]
  );

  const seedHintForSingleSection = useMemo(() => {
    if (search.trim()) return null;
    if (!connected || selectedSectionSlugs.length !== 1) return null;
    const slug = selectedSectionSlugs[0];
    const dbCount = products.filter((p) => p.sectionId === slug).length;
    const staticCount = staticFallbackCountForSection(slug);
    if (dbCount > 0 || staticCount === 0) return null;
    return { slug, staticCount };
  }, [connected, products, search, selectedSectionSlugs]);

  function toggleSectionSlug(slug: string) {
    setSelectedSectionSlugs((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
    );
  }

  function clearSectionFilters() {
    setSelectedSectionSlugs([]);
  }

  function clearAllFilters() {
    setFilterHubSlug("");
    clearSectionFilters();
    setSearch("");
    setVisibility("all");
  }

  function handleFilterHubChange(hubSlug: string) {
    setFilterHubSlug(hubSlug);
    if (!hubSlug.trim()) return;
    const hub = menuLayout.find((h) => h.slug === hubSlug);
    if (!hub) return;
    const allowed = new Set(hub.sections.map((s) => s.slug));
    setSelectedSectionSlugs((current) => current.filter((s) => allowed.has(s)));
  }

  function applyFilterPreset(preset: ProductFilterPreset) {
    if (preset === "all") {
      clearAllFilters();
      return;
    }
    if (preset === "happy-hour") {
      setSearch("");
      setVisibility("all");
      setFilterHubSlug(HAPPY_HOUR_BLOCK_SLUG);
      setSelectedSectionSlugs([HAPPY_HOUR_CATEGORY_SLUG]);
      return;
    }
    setSearch("");
    setFilterHubSlug("");
    setSelectedSectionSlugs([]);
    setVisibility("hidden");
  }

  function openCreate(options?: { prefilledName?: string }) {
    setEditingId(null);
    setForm({
      ...emptyProductForm,
      name: options?.prefilledName?.trim() ? options.prefilledName.trim() : "",
    });
    setError(null);
    if (filterHubSlug.trim()) {
      const hub = menuLayout.find((h) => h.slug === filterHubSlug.trim());
      if (hub) {
        setHubId(hub.slug);
        setSectionId(hub.sections[0]?.slug ?? defaults.sectionId);
      } else {
        setHubId(defaults.hubId);
        setSectionId(defaults.sectionId);
      }
    } else if (selectedSectionSlugs.length >= 1) {
      const slug = selectedSectionSlugs[0];
      const hub = menuLayout.find((h) => h.sections.some((s) => s.slug === slug));
      if (hub) {
        setHubId(hub.slug);
        setSectionId(slug);
      } else {
        setHubId(defaults.hubId);
        setSectionId(defaults.sectionId);
      }
    } else {
      setHubId(defaults.hubId);
      setSectionId(defaults.sectionId);
    }
    setDialogOpen(true);
  }

  function openEdit(product: AdminProduct) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      deal: product.deal ?? "",
      imageUrl: product.imageUrl,
      order: product.order,
      active: product.active,
      happyHour2x1: product.happyHour2x1,
      isNovelty: product.isNovelty,
      showOnHome: product.showOnHome,
    });
    setHubId(product.hubId);
    setSectionId(product.sectionId);
    setError(null);
    setDialogOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await saveProductAction({ ...form, sectionId }, editingId ?? undefined);

      if (!result.ok) {
        alertError(result.error);
        return;
      }

      const nextProduct: AdminProduct = {
        id: result.data?.id ?? editingId ?? crypto.randomUUID(),
        name: form.name,
        description: form.description,
        price: form.price,
        deal: form.deal || undefined,
        imageUrl: form.imageUrl,
        sectionId,
        hubId,
        order: form.order,
        active: form.active,
        happyHour2x1: form.happyHour2x1,
        isNovelty: form.isNovelty,
        showOnHome: form.showOnHome,
      };

      setProducts((current) =>
        editingId ? current.map((item) => (item.id === editingId ? nextProduct : item)) : [...current, nextProduct]
      );

      setDialogOpen(false);
      setEditingId(null);
      setForm(emptyProductForm);
      alertSuccess(
        editingId ? "Producto actualizado correctamente." : "Producto creado correctamente."
      );
    });
  }

  async function handleDelete(productId: string) {
    const product = products.find((p) => p.id === productId);
    const ok = await confirm({
      title: "Eliminar producto",
      description: product
        ? `¿Eliminar «${product.name}» de la carta? Esta acción no se puede deshacer.`
        : "¿Eliminar este producto de la carta?",
      confirmLabel: "Eliminar",
      destructive: true,
    });
    if (!ok) return;

    startTransition(async () => {
      const result = await deleteProductAction(productId);
      if (!result.ok) {
        alertError(result.error);
        return;
      }
      setProducts((current) => current.filter((item) => item.id !== productId));
      alertSuccess("Producto eliminado.");
    });
  }

  const hasActiveHubFilter = filterHubSlug.trim().length > 0;

  const listSubtitle = useMemo(() => {
    const n = filteredProducts.length;
    const unit = n === 1 ? "producto" : "productos";
    if (hasActiveHubFilter) {
      return `${n} ${unit} en ${hubTitleForSlug(menuLayout, filterHubSlug.trim())}`;
    }
    return `${n} ${unit} en el catálogo`;
  }, [filteredProducts.length, filterHubSlug, hasActiveHubFilter, menuLayout]);

  return (
    <div className="space-y-8">
      {!connected && (
        <AdminMongoBanner>
          Conecta MongoDB en <code className="rounded bg-amber-100/80 px-1">.env.local</code> para guardar
          productos. Mientras tanto puedes revisar la estructura de la carta.
        </AdminMongoBanner>
      )}

      <section className="space-y-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <AdminPageHeader
          title="Productos"
          description={listSubtitle}
          hint="Filtra por bloque o categoría, edita precios y fotos, y controla qué se ve en la carta pública."
          action={
            <Button
              variant="gold"
              size="lg"
              className="w-full gap-2 shadow-md sm:w-auto"
              onClick={() => openCreate()}
              disabled={!connected || isPending}
            >
              <Plus className="h-5 w-5" aria-hidden />
              Agregar producto
            </Button>
          }
        />

        <ProductListFilters
          menuLayout={menuLayout}
          search={search}
          onSearchChange={setSearch}
          filterHubSlug={filterHubSlug}
          onFilterHubChange={handleFilterHubChange}
          selectedSectionSlugs={selectedSectionSlugs}
          onToggleSection={toggleSectionSlug}
          onClearSections={clearSectionFilters}
          visibility={visibility}
          onVisibilityChange={setVisibility}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          countBySection={countBySection}
          onClearAllFilters={clearAllFilters}
          onApplyPreset={applyFilterPreset}
          sectionLabel={(slug) => sectionLabel(menuLayout, slug)}
          hubTitleForSlug={(slug) => hubTitleForSlug(menuLayout, slug)}
        />
      </section>

      {error && !dialogOpen ? <p className="text-sm text-red-600">{error}</p> : null}

      {filteredProducts.length > 0 ? (
        <p id="lista-productos" className="scroll-mt-4 text-sm font-medium text-foreground">
          Lista de productos
          <span className="ml-2 font-normal text-muted-foreground">
            ({filteredProducts.length} {filteredProducts.length === 1 ? "fila" : "filas"})
          </span>
        </p>
      ) : null}

      {filteredProducts.length === 0 ? (
        <ProductListEmpty
          totalProducts={products.length}
          search={search}
          connected={connected}
          isPending={isPending}
          onClearFilters={clearAllFilters}
          onCreate={() => openCreate()}
          onCreateWithName={(name) => openCreate({ prefilledName: name })}
          seedHint={seedHintForSingleSection}
        />
      ) : (
        <ProductList
          products={filteredProducts}
          menuLayout={menuLayout}
          knownSectionSlugs={knownSlugs}
          connected={connected}
          isPending={isPending}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingId={editingId}
        form={form}
        setForm={setForm}
        hubId={hubId}
        sectionId={sectionId}
        onHubChange={setHubId}
        onSectionChange={setSectionId}
        menuLayout={menuLayout}
        connected={connected}
        isPending={isPending}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
