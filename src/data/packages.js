import { resolvePhoto } from './images.js';

/**
 * Tour packages. Each package is one file in src/content/packages/, edited from the admin page
 * (/admin → Tour Packages). The file name is the package's web address: /packages/<file-name>.
 *
 * - `region` is International (International Tours page) or Domestic (Pakistan Tours page).
 * - Once `validTill` has passed, the price is hidden automatically and visitors are asked
 *   for the current price, until the package is updated or unpublished.
 * - `published: false` hides a package without deleting it.
 */
const files = import.meta.glob('../content/packages/*.json', { eager: true, import: 'default' });

const toNumber = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

const normalize = (slug, d) => ({
  slug,
  title: d.title,
  region: d.region === 'Domestic' ? 'Domestic' : 'International',
  country: d.country || '',
  cities: d.cities?.length ? d.cities : [d.title],
  nights: toNumber(d.nights),
  days: toNumber(d.days),
  stars: d.stars || '',
  images: (d.photos || []).map((ref) => resolvePhoto(ref, d.title)).filter(Boolean),
  summary: d.summary || '',
  hotels: d.hotels || [],
  inclusions: d.inclusions || [],
  prices: (d.prices || [])
    .map((p) => ({ label: p.label || 'Per person', amount: toNumber(p.amount), hotel: p.hotel || '' }))
    .filter((p) => p.amount),
  airfareNotIncluded: !!d.airfareNotIncluded,
  validTill: d.validTill || '',
  flyer: d.flyer || '',
  order: toNumber(d.order) ?? 999,
  published: d.published !== false,
});

/** Every published package, in display order. */
export const allPackages = Object.entries(files)
  .map(([file, data]) => normalize(file.split('/').pop().replace(/\.json$/, ''), data))
  .filter((p) => p.published && p.title && p.images.length)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const packages = allPackages.filter((p) => p.region === 'International');
export const domesticPackages = allPackages.filter((p) => p.region === 'Domestic');

/** Older package links that should land somewhere useful. */
export const legacyPackageRedirects = {
  'umrah-20-night-platinum': '/umrah',
  'executive-umrah': '/umrah',
  'najaf-karbala-14-night-ziyarat': '/international-tours',
  'dubai-desert-15-night-grand-escape': '/international-tours',
  'dubai-desert-grand-escape': '/international-tours',
  'qatar-doha-15-night-grand-discovery': '/international-tours',
};

export const getPackage = (slug) => allPackages.find((p) => p.slug === slug);

/** Countries in display order, for filters. */
export const packageCountries = [...new Set(packages.map((p) => p.country).filter(Boolean))];

export const formatPKR = (n) => `PKR ${n.toLocaleString('en-US')}`;

export const lowestPrice = (pkg) => Math.min(...pkg.prices.map((p) => p.amount));

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** True when there is no price to show: none entered, or the validity date has passed (local time). */
export const isExpired = (pkg) =>
  !pkg.prices.length || (!!pkg.validTill && new Date(`${pkg.validTill}T23:59:59`) < new Date());

const pad2 = (n) => String(n).padStart(2, '0');

/** "05 Nights · 06 Days", or an empty string when the duration was left blank. */
export const durationLabel = (pkg) =>
  [pkg.nights && `${pad2(pkg.nights)} Nights`, pkg.days && `${pad2(pkg.days)} Days`].filter(Boolean).join(' · ');
