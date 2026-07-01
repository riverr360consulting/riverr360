// lib/seo.ts
//
// Reads/writes SEO settings via a JSON file committed to your GitHub repo.
// No database needed — Vercel auto-redeploys when the file changes on GitHub,
// and the new settings become the build's static data within ~60 seconds.
//
// SETUP REQUIRED:
// 1. Create a GitHub Personal Access Token:
//    GitHub → Settings → Developer settings → Personal access tokens →
//    Fine-grained tokens → Generate new token
//    - Repository access: Only your riverr360 repo
//    - Permissions: Contents → Read and write
// 2. In Vercel → your project → Settings → Environment Variables, add:
//    GITHUB_SEO_TOKEN = <the token you generated>
//    GITHUB_REPO      = yourusername/riverr360   (e.g. "riverr360/riverr360-consulting")
// 3. Redeploy after adding the env vars.

import data from '@/data/seo.json';

export type SiteSettings = {
  siteTitle: string;
  siteDesc: string;
  metaPixelId: string;
  gtmId: string;
};

/**
 * Reads current settings directly from the bundled JSON file.
 * This is fast (no network call) because Next.js bundles the file at build time —
 * which is exactly why a fresh deploy is needed after every save.
 */
export function getSiteSettings(): SiteSettings {
  return data as SiteSettings;
}

/**
 * Saves new settings by committing an updated data/seo.json to GitHub
 * using the GitHub Contents API. This triggers Vercel's auto-deploy hook.
 */
export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const token = process.env.GITHUB_SEO_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: "owner/repo"

  if (!token || !repo) {
    throw new Error('Missing GITHUB_SEO_TOKEN or GITHUB_REPO environment variables');
  }

  const filePath = 'data/seo.json';
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  // GitHub requires the current file's SHA to update it (prevents overwrite conflicts)
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!getRes.ok) {
    throw new Error(`Failed to fetch current file from GitHub: ${getRes.status}`);
  }

  const currentFile = await getRes.json();
  const sha = currentFile.sha;

  const newContent = JSON.stringify(settings, null, 2);
  const encodedContent = Buffer.from(newContent, 'utf-8').toString('base64');

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'chore: update SEO settings via admin panel',
      content: encodedContent,
      sha,
    }),
  });

  if (!putRes.ok) {
    const errBody = await putRes.text();
    throw new Error(`Failed to commit to GitHub: ${putRes.status} — ${errBody}`);
  }
}
