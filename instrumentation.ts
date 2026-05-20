/** Precalienta Mongo al arrancar el servidor (menos espera en la primera visita al panel). */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.MONGODB_URI) return;

  const { connectDB } = await import("@/lib/mongodb");
  connectDB().catch(() => {
    /* La primera página mostrará el banner de sin conexión si falla. */
  });
}
