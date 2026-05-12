import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Menú digital`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
};

/** Áreas seguras (notch / home indicator) en iOS y similares */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark ${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-[100dvh] min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
