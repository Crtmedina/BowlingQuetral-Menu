export function isHttpImageUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  return u.startsWith("https://") || u.startsWith("http://");
}
