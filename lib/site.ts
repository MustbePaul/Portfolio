const DEVELOPMENT_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string) {
  const url = new URL(value);
  url.pathname = url.pathname.replace(/\/$/, "");
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/$/, "");
}

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NODE_ENV !== "production") return DEVELOPMENT_URL;

  throw new Error(
    "NEXT_PUBLIC_SITE_URL is required for production builds outside Vercel.",
  );
}

export const siteUrl = normalizeSiteUrl(resolveSiteUrl());

export const absoluteUrl = (path = "/") =>
  new URL(path, `${siteUrl}/`).toString();
