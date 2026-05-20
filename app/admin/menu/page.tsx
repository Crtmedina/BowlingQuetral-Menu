import { Suspense } from "react";
import { AdminPageSkeleton } from "@/components/admin/AdminPageSkeleton";
import { MenuStructureEditor } from "@/components/admin/MenuStructureEditor";
import { isDatabaseConnected, listAdminSections } from "@/lib/queries/menu";
import { getMenuLayoutForAdmin } from "@/lib/menu/menu-layout";
import { formatHappyHourScheduleLabel } from "@/lib/menu/happy-hour-schedule";
import { getHappyHourSettings } from "@/lib/queries/happy-hour";
import { SITE } from "@/lib/site";

export const metadata = { title: `Menú — bloques y categorías — ${SITE.name}` };

async function AdminMenuContent() {
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
    <MenuStructureEditor
      menuLayout={menuLayout}
      connected={connected}
      sectionStats={sectionStats}
      happyHourScheduleLabel={happyHourScheduleLabel}
      happyHourLabel={happyHourSettings.label}
    />
  );
}

export default function AdminMenuStructurePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <Suspense fallback={<AdminPageSkeleton variant="menu" />}>
        <AdminMenuContent />
      </Suspense>
    </div>
  );
}
