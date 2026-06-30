// lib/seo.ts
//
// Central module for reading/writing SEO settings from the database.
// Uses Vercel Postgres (@vercel/postgres) — works seamlessly with Vercel deployments.
//
// SETUP REQUIRED:
// 1. In Vercel dashboard → Storage → Create Database → Postgres
// 2. Vercel auto-injects POSTGRES_URL env vars — no manual config needed
// 3. Run the SQL in schema.sql once (via Vercel's Postgres query tab, or `psql`)
// 4. npm install @vercel/postgres

import { sql } from '@vercel/postgres';

export type SiteSettings = {
  siteTitle: string;
  siteDesc: string;
  metaPixelId: string;
  gtmId: string;
};

const DEFAULTS: SiteSettings = {
  siteTitle: 'Riverr360 | Revenue Leakage Consulting',
  siteDesc: 'Riverr360 helps businesses identify and fix revenue leakage through strategic consulting and data-driven solutions.',
  metaPixelId: '1529840028657513',
  gtmId: '',
};

/**
 * Reads all site settings from the database.
 * Falls back to DEFAULTS if the table is empty or unreachable (e.g. local dev without DB).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { rows } = await sql`SELECT key, value FROM site_settings`;
    if (rows.length === 0) return DEFAULTS;

    const map = Object.fromEntries(rows.map(r => [r.key, r.value]));
    return {
      siteTitle: map.site_title ?? DEFAULTS.siteTitle,
      siteDesc: map.site_description ?? DEFAULTS.siteDesc,
      metaPixelId: map.meta_pixel_id ?? DEFAULTS.metaPixelId,
      gtmId: map.gtm_id ?? DEFAULTS.gtmId,
    };
  } catch (err) {
    console.error('[seo-settings] Failed to read from DB, using defaults:', err);
    return DEFAULTS;
  }
}

/**
 * Writes site settings to the database. Upserts each key individually.
 */
export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES ('site_title', ${settings.siteTitle}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${settings.siteTitle}, updated_at = NOW()
  `;
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES ('site_description', ${settings.siteDesc}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${settings.siteDesc}, updated_at = NOW()
  `;
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES ('meta_pixel_id', ${settings.metaPixelId}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${settings.metaPixelId}, updated_at = NOW()
  `;
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES ('gtm_id', ${settings.gtmId}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${settings.gtmId}, updated_at = NOW()
  `;
}

// ── Per-page SEO overrides (for blog posts, case studies, etc.) ────────────────

export type PageSEO = {
  title: string;
  description: string;
};

export async function getPageSEO(path: string): Promise<PageSEO | null> {
  try {
    const { rows } = await sql`SELECT title, description FROM page_seo WHERE path = ${path}`;
    if (rows.length === 0) return null;
    return { title: rows[0].title, description: rows[0].description };
  } catch (err) {
    console.error('[seo-settings] Failed to read page SEO:', err);
    return null;
  }
}

export async function savePageSEO(path: string, seo: PageSEO): Promise<void> {
  await sql`
    INSERT INTO page_seo (path, title, description, updated_at)
    VALUES (${path}, ${seo.title}, ${seo.description}, NOW())
    ON CONFLICT (path) DO UPDATE
    SET title = ${seo.title}, description = ${seo.description}, updated_at = NOW()
  `;
}
