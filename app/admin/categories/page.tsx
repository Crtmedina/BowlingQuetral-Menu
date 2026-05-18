import { redirect } from "next/navigation";

/** Ruta histórica: el menú se administra en `/admin/menu`. */
export default function AdminCategoriesRedirectPage() {
  redirect("/admin/menu");
}
