import dynamic from "next/dynamic";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { isDatabaseConnected, listAdminSections } from "@/lib/queries/menu";
import { getMenuLayoutForAdmin } from "@/lib/menu/menu-layout";
import { formatHappyHourScheduleLabel } from "@/lib/menu/happy-hour-schedule";
import { getHappyHourSettings } from "@/lib/queries/happy-hour";
import { SITE } from "@/lib/site";

const MenuStructureEditor = dynamic(
  () =>
    import("@/components/admin/MenuStructureEditor").then((m) => ({
      default: m.MenuStructureEditor,
    })),
  { loading: () => <AdminPageSkeleton variant="menu" /> }
);

export const metadata = { title: `Menú — bloques y categorías — ${SITE.name}` };

export default async function AdminMenuStructurePage() {
  const [connected, sections, menuLayout, happyHourSettings] = await Promise.all([
    isDatabaseConnected(),
    listAdminSections(),
    getMenuLayoutForAdmin(),
    getHappyHourSettings(),
  ]);
  const happyHourScheduleLabel = formatHappyHourScheduleLabel(happyHourSettings);

  const sectionStats = sections.map((s) => ({
    slug: s.sectionId,
    productCount: s.productCount,
    defaultIntro: s.defaultIntro,
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <MenuStructureEditor
        menuLayout={menuLayout}
        connected={connected}
        sectionStats={sectionStats}
        happyHourScheduleLabel={happyHourScheduleLabel}
        happyHourLabel={happyHourSettings.label}
      />
    </div>
  );
}
