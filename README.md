# Bowling Quetral — Menú digital

## URLs

| Quién | URL | Notas |
|--------|-----|--------|
| **Clientes (QR, redes)** | `/` o `/carta` | La raíz redirige a la carta. No hay enlace al panel en la web pública. |
| **Personal del local** | `/login` | Bookmark privado. Tras login → `/admin`. Sin credenciales no hay acceso. |

El panel (`/admin/*`) está protegido por middleware: cualquier visita sin sesión va a `/login`.

## Acceso al panel (desarrollo)

1. Copia `.env.example` → `.env.local` y completa `MONGODB_URI`.
2. Las credenciales del admin y el `AUTH_SECRET` están en **`ACCESO-ADMIN.local.md`** (local, no va a Git).
3. Reinicia `npm run dev` y entra solo en [http://localhost:3000/login](http://localhost:3000/login).

En producción, define `AUTH_SECRET`, `ADMIN_USERNAME` y `ADMIN_PASSWORD` en el hosting (valores distintos a desarrollo). No publiques `/login` en la carta ni en el QR.

## Presentación al cliente

```bash
npm run demo
```

Modo producción local; suele ir más fluido que `npm run dev`. Opcional: `npm run seed:carta` antes de la demo.

## Desarrollo

```bash
npm run dev
```

- Carta: [http://localhost:3000/carta](http://localhost:3000/carta)
- Panel: [http://localhost:3000/login](http://localhost:3000/login)
