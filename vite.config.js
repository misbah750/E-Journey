import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { packages } from './src/data/packages.js';

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/destinations',
  '/pakistan-tours',
  '/international-tours',
  '/hajj-umrah',
  '/corporate-travel',
  '/visa-assistance',
  '/hotels',
  '/travel-insurance',
  '/contact',
  '/plan-your-trip',
  ...packages.map((p) => `/packages/${p.slug}`),
];

/**
 * Emits robots.txt and sitemap.xml at build time.
 * Set VITE_SITE_URL (e.g. https://www.your-domain.pk) in .env to enable the sitemap.
 */
function seoFiles(siteUrl) {
  return {
    name: 'ejourney-seo-files',
    apply: 'build',
    generateBundle() {
      const base = (siteUrl || '').replace(/\/$/, '');
      const robots = ['User-agent: *', 'Allow: /', base ? `Sitemap: ${base}/sitemap.xml` : ''].filter(Boolean).join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots + '\n' });
      if (!base) return;
      const today = new Date().toISOString().slice(0, 10);
      const urls = ROUTES.map(
        (r) => `  <url><loc>${base}${r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : r.startsWith('/packages') ? '0.7' : '0.8'}</priority></url>`,
      ).join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL)],
  };
});
