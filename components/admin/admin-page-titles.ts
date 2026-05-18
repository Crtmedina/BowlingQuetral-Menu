export function adminPageTitle(pathname: string): string {
  if (pathname === "/admin" || pathname === "/admin/") return "Resumen";
  if (pathname.startsWith("/admin/menu")) return "Menú";
  if (pathname.startsWith("/admin/products")) return "Productos";
  if (pathname.startsWith("/admin/happy-hour")) return "Happy Hour";
  if (pathname.startsWith("/admin/categories")) return "Categorías";
  return "Administración";
}
