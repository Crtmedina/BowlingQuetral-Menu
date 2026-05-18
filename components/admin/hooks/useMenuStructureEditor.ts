"use client";

import { useMemo, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  clearMenuHubPromoAction,
  deleteMenuHubAction,
  deleteMenuSectionAction,
  setMenuHubFeaturedRankAction,
  setMenuHubFeaturedToggleAction,
  setMenuHubPositionAction,
  setMenuHubPromoAction,
  setMenuSectionPositionAction,
  upsertMenuHubAction,
  upsertMenuSectionAction,
} from "@/lib/actions/menu-structure";
import type { MenuLayoutHubDTO, MenuLayoutSectionDTO } from "@/lib/menu/menu-layout-dto";
import { useAdminActionDialog } from "@/components/admin/AdminActionDialog";
import { useMenuStructureFilters } from "@/components/admin/hooks/useMenuStructureFilters";
import type { MenuSectionStat } from "@/lib/menu/menu-structure-rows";

export type UseMenuStructureEditorParams = {
  menuLayout: MenuLayoutHubDTO[];
  connected: boolean;
  sectionStats: MenuSectionStat[];
};

export function useMenuStructureEditor({ menuLayout, connected, sectionStats }: UseMenuStructureEditorParams) {
  const router = useRouter();
  const { confirm, alertSuccess, alertError } = useAdminActionDialog();
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  const filters = useMenuStructureFilters({ menuLayout });
  const [adminTab, setAdminTab] = useState<"structure" | "order">("structure");

  const [hubOpen, setHubOpen] = useState(false);
  const [promoConfirmHub, setPromoConfirmHub] = useState<MenuLayoutHubDTO | null>(null);
  const [hubEditingSlug, setHubEditingSlug] = useState<string | null>(null);
  const [hubForm, setHubForm] = useState({
    label: "",
    suffix: "",
    menuGroup: "comida" as "comida" | "barra",
    iconKey: "Sparkles",
    active: true,
    isFeatured: false,
  });

  const [sectionOpen, setSectionOpen] = useState(false);
  const [sectionHubSlug, setSectionHubSlug] = useState("");
  const [sectionEditingSlug, setSectionEditingSlug] = useState<string | null>(null);
  const [sectionForm, setSectionForm] = useState({
    label: "",
    slug: "",
    intro: "",
    active: true,
  });

  const productCountBySlug = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of sectionStats) m.set(s.slug, s.productCount);
    return m;
  }, [sectionStats]);

  const emptyVisibleSections = useMemo(
    () =>
      sectionStats.filter((s) => {
        const sec = menuLayout.flatMap((h) => h.sections).find((x) => x.slug === s.slug);
        return sec?.active && s.productCount === 0;
      }),
    [sectionStats, menuLayout]
  );

  function refresh() {
    router.refresh();
  }

  function openNewHub() {
    setHubEditingSlug(null);
    setHubForm({
      label: "",
      suffix: "",
      menuGroup: "comida",
      iconKey: "Sparkles",
      active: true,
      isFeatured: false,
    });
    setHubOpen(true);
    setErr(null);
  }

  function openEditHub(hub: MenuLayoutHubDTO) {
    setHubEditingSlug(hub.slug);
    setHubForm({
      label: hub.label,
      suffix: hub.suffix,
      menuGroup: hub.menuGroup,
      iconKey: hub.iconKey,
      active: hub.active,
      isFeatured: hub.isFeatured,
    });
    setHubOpen(true);
    setErr(null);
  }

  function openNewSection(hubSlug: string) {
    setSectionEditingSlug(null);
    setSectionHubSlug(hubSlug);
    setSectionForm({
      label: "",
      slug: "",
      intro: "",
      active: true,
    });
    filters.expandHub(hubSlug);
    setSectionOpen(true);
    setErr(null);
  }

  function openEditSection(hubSlug: string, section: MenuLayoutSectionDTO) {
    setSectionEditingSlug(section.slug);
    setSectionHubSlug(hubSlug);
    setSectionForm({
      label: section.label,
      slug: section.slug,
      intro: section.intro,
      active: section.active,
    });
    setSectionOpen(true);
    setErr(null);
  }

  function saveHub(e?: FormEvent) {
    e?.preventDefault();
    if (!hubForm.label.trim()) {
      setErr("El nombre del bloque es obligatorio.");
      return;
    }
    setErr(null);
    const order = hubEditingSlug
      ? (menuLayout.find((h) => h.slug === hubEditingSlug)?.order ?? menuLayout.length)
      : menuLayout.length;
    const wasFeatured = hubEditingSlug
      ? (menuLayout.find((h) => h.slug === hubEditingSlug)?.isFeatured ?? false)
      : false;
    startTransition(async () => {
      const { isFeatured, ...hubPayload } = hubForm;
      const res = await upsertMenuHubAction({ ...hubPayload, order }, hubEditingSlug ?? undefined);
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      const slug = hubEditingSlug ?? res.data?.slug;
      if (slug && isFeatured !== wasFeatured) {
        const featRes = await setMenuHubFeaturedToggleAction({ slug, isFeatured });
        if (!featRes.ok) {
          alertError(featRes.error);
          return;
        }
      }
      setHubOpen(false);
      alertSuccess(hubEditingSlug ? "Bloque actualizado correctamente." : "Bloque creado correctamente.");
      refresh();
    });
  }

  function saveSection() {
    setErr(null);
    const hub = menuLayout.find((h) => h.slug === sectionHubSlug);
    const order = sectionEditingSlug
      ? (hub?.sections.find((s) => s.slug === sectionEditingSlug)?.order ?? 0)
      : (hub?.sections.length ?? 0);
    startTransition(async () => {
      const res = await upsertMenuSectionAction(
        {
          slug: sectionEditingSlug ? undefined : sectionForm.slug || undefined,
          label: sectionForm.label,
          hubSlug: sectionHubSlug,
          intro: sectionForm.intro,
          order,
          active: sectionForm.active,
        },
        sectionEditingSlug ?? undefined
      );
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      setSectionOpen(false);
      alertSuccess(
        sectionEditingSlug ? "Categoría actualizada correctamente." : "Categoría creada correctamente."
      );
      refresh();
    });
  }

  function applyHubPosition(slug: string, oneBased: number) {
    setErr(null);
    startTransition(async () => {
      const res = await setMenuHubPositionAction({ slug, index: oneBased - 1 });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess("Orden actualizado.");
      refresh();
    });
  }

  function applyHubFeaturedRank(slug: string, oneBased: number) {
    startTransition(async () => {
      const res = await setMenuHubFeaturedRankAction({ slug, index: oneBased - 1 });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess("Orden actualizado.");
      refresh();
    });
  }

  function toggleHubFeatured(slug: string, next: boolean) {
    startTransition(async () => {
      const res = await setMenuHubFeaturedToggleAction({ slug, isFeatured: next });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess(
        next ? "Bloque marcado como destacado en la carta." : "Bloque quitado de destacados."
      );
      refresh();
    });
  }

  async function requestToggleHubFeatured(hub: MenuLayoutHubDTO, next: boolean) {
    const ok = await confirm({
      title: next ? "Destacar bloque" : "Quitar destacado",
      description: next
        ? `¿Marcar «${hub.label}» como destacado? Aparecerá al inicio de la carta.`
        : `¿Quitar «${hub.label}» de los destacados?`,
      confirmLabel: next ? "Destacar" : "Quitar",
    });
    if (!ok) return;
    toggleHubFeatured(hub.slug, next);
  }

  function applySectionPosition(hubSlug: string, slug: string, oneBased: number) {
    startTransition(async () => {
      const res = await setMenuSectionPositionAction({ hubSlug, slug, index: oneBased - 1 });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess("Orden de categorías actualizado.");
      refresh();
    });
  }

  async function removeHub(slug: string) {
    const hub = menuLayout.find((h) => h.slug === slug);
    const ok = await confirm({
      title: "Eliminar bloque",
      description: hub
        ? `¿Eliminar «${hub.label}»? Solo es posible si no tiene categorías.`
        : "¿Eliminar este bloque?",
      confirmLabel: "Eliminar",
      destructive: true,
    });
    if (!ok) return;
    startTransition(async () => {
      const res = await deleteMenuHubAction({ slug });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess("Bloque eliminado.");
      refresh();
    });
  }

  async function removeSection(slug: string) {
    const section = menuLayout.flatMap((h) => h.sections).find((s) => s.slug === slug);
    const ok = await confirm({
      title: "Eliminar categoría",
      description: section
        ? `¿Eliminar «${section.label}»? No debe tener productos asignados.`
        : "¿Eliminar esta categoría?",
      confirmLabel: "Eliminar",
      destructive: true,
    });
    if (!ok) return;
    startTransition(async () => {
      const res = await deleteMenuSectionAction({ slug });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess("Categoría eliminada.");
      refresh();
    });
  }

  function openPromoConfirm(hub: MenuLayoutHubDTO) {
    if (hub.isPromoHub) return;
    setPromoConfirmHub(hub);
    setErr(null);
  }

  function confirmSetPromoHub() {
    if (!promoConfirmHub) return;
    const label = promoConfirmHub.label;
    startTransition(async () => {
      const res = await setMenuHubPromoAction({ slug: promoConfirmHub.slug });
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      setPromoConfirmHub(null);
      alertSuccess(`Plantilla 2×1 asignada a «${label}».`);
      refresh();
    });
  }

  const promoHubReplacing = useMemo(() => {
    if (!promoConfirmHub) return null;
    return menuLayout.find((h) => h.isPromoHub && h.slug !== promoConfirmHub.slug) ?? null;
  }, [menuLayout, promoConfirmHub]);

  async function clearPromoHub() {
    const ok = await confirm({
      title: "Quitar plantilla 2×1",
      description:
        "¿Quitar la plantilla Happy Hour de la carta? Si existe un bloque Happy Hour por defecto, se usará ese.",
      confirmLabel: "Quitar plantilla",
      destructive: true,
    });
    if (!ok) return;
    startTransition(async () => {
      const res = await clearMenuHubPromoAction();
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess("Plantilla 2×1 desactivada.");
      refresh();
    });
  }

  function toggleHubActive(hub: MenuLayoutHubDTO, next: boolean) {
    startTransition(async () => {
      const res = await upsertMenuHubAction(
        {
          label: hub.label,
          suffix: hub.suffix,
          menuGroup: hub.menuGroup,
          iconKey: hub.iconKey,
          order: hub.order,
          active: next,
        },
        hub.slug
      );
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess(next ? "Bloque visible en la carta." : "Bloque oculto en la carta.");
      refresh();
    });
  }

  function toggleSectionActive(hubSlug: string, section: MenuLayoutSectionDTO, next: boolean) {
    startTransition(async () => {
      const res = await upsertMenuSectionAction(
        {
          label: section.label,
          hubSlug,
          intro: section.intro,
          order: section.order,
          active: next,
        },
        section.slug
      );
      if (!res.ok) {
        alertError(res.error);
        return;
      }
      alertSuccess(next ? "Categoría visible en la carta." : "Categoría oculta en la carta.");
      refresh();
    });
  }

  async function requestHubFormFeatured(next: boolean) {
    const ok = await confirm({
      title: next ? "Destacar bloque" : "Sin destacar",
      description: next
        ? "Este bloque aparecerá al inicio de la carta junto a otros destacados."
        : "El bloque dejará de mostrarse en la zona de destacados.",
      confirmLabel: next ? "Destacar" : "Confirmar",
    });
    if (!ok) return;
    setHubForm((f) => ({ ...f, isFeatured: next }));
  }

  const hasPromoInDb = menuLayout.some((h) => h.isPromoHub);
  const hubCanSave = hubForm.label.trim().length > 0;

  return {
    connected,
    menuLayout,
    isPending,
    err,
    setErr,
    adminTab,
    setAdminTab,
    ...filters,
    hubOpen,
    setHubOpen,
    promoConfirmHub,
    setPromoConfirmHub,
    hubEditingSlug,
    hubForm,
    setHubForm,
    sectionOpen,
    setSectionOpen,
    sectionEditingSlug,
    sectionForm,
    setSectionForm,
    productCountBySlug,
    emptyVisibleSections,
    hasPromoInDb,
    hubCanSave,
    promoHubReplacing,
    openNewHub,
    openEditHub,
    openNewSection,
    openEditSection,
    saveHub,
    saveSection,
    applyHubPosition,
    applyHubFeaturedRank,
    requestToggleHubFeatured,
    toggleHubActive,
    toggleSectionActive,
    applySectionPosition,
    removeHub,
    removeSection,
    openPromoConfirm,
    confirmSetPromoHub,
    clearPromoHub,
    requestHubFormFeatured,
  };
}
