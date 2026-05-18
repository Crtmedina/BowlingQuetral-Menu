/** Cookie de sesión del panel admin (compatible con Edge y Node). */

export const SESSION_COOKIE = "bq_admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 días

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET no está configurado o es demasiado corto (mín. 16 caracteres).");
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function hmacSign(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toBase64Url(new Uint8Array(sig));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionValue(): Promise<string> {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = toBase64Url(new TextEncoder().encode(JSON.stringify({ exp, v: 1 })));
  const sig = await hmacSign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionValue(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 16) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  try {
    const expected = await hmacSign(payload);
    if (!constantTimeEqual(sig, expected)) return false;
    const json = new TextDecoder().decode(fromBase64Url(payload));
    const data = JSON.parse(json) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export { MAX_AGE_SEC };
