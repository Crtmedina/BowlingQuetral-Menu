# Bowling Quetral — Menú digital

Carta pública en `/carta`. Panel de administración en `/admin` (requiere login).

## Acceso al panel (desarrollo)

1. Copia `.env.example` → `.env.local` y completa `MONGODB_URI`.
2. Las credenciales del admin y el `AUTH_SECRET` de este proyecto están en **`ACCESO-ADMIN.local.md`** (archivo local, no va a Git).
3. Reinicia `npm run dev` y entra en [http://localhost:3000/login](http://localhost:3000/login).

En producción, define `AUTH_SECRET`, `ADMIN_USERNAME` y `ADMIN_PASSWORD` en el hosting (valores distintos a desarrollo).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
