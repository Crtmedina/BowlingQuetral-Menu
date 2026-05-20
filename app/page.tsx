import { redirect } from "next/navigation";

/** La raíz es solo para clientes: el QR y enlaces públicos pueden usar `/` o `/carta`. */
export default function HomePage() {
  redirect("/carta");
}
