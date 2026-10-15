/**
 * Visa services and prices — from e-Journey's visa price list.
 *
 * Each country card lists one or more options. `type` is 'e-visa' (e-Visa / paper visa) or 'sticker'.
 * `sc: true` means service charges are added on top of the listed fee ("+ SC").
 * `amount: null` shows "Ask for current rate" instead of a price.
 * `code` is the ISO country code used for the flag image (flagcdn.com).
 *
 * `docs` (one of the DOCS checklists below: basic, ticket, tourist, full, umrah) and `processing` are shown on each card.
 * Processing times are indicative and set by the embassy — review them with the visa desk and adjust here.
 */
const BASIC = [
  'Passport scan (valid for at least 6 months)',
  'Recent photo with white background',
  'CNIC copy',
];

export const DOCS = {
  basic: BASIC,
  ticket: [...BASIC, 'Confirmed return ticket & hotel booking'],
  tourist: [
    ...BASIC,
    'Bank statement (last 6 months)',
    'Confirmed return ticket & hotel booking',
    'Employment letter or business proof (NTN)',
  ],
  full: [
    ...BASIC,
    'Bank statement with maintenance letter (last 6 months)',
    'Tax returns / NTN certificate',
    'Employment letter or business documents',
    'Family registration certificate (FRC)',
    'Previous travel history (old passports & visas)',
    'Travel itinerary or invitation letter',
  ],
  umrah: [...BASIC, 'Meningitis vaccination certificate'],
};

/** Region groups for the rate sheet, in display order. */
export const VISA_REGIONS = ['Gulf & Middle East', 'Asia', 'Central Asia', 'Africa', 'Americas & Oceania'];

export const visaTypes = [
  { id: 'all', label: 'All Visas' },
  { id: 'e-visa', label: 'e-Visa / Paper Visa' },
  { id: 'sticker', label: 'Sticker Visa' },
];

export const TYPE_LABEL = { 'e-visa': 'e-Visa', sticker: 'Sticker visa' };

const files = import.meta.glob('../content/visas/*.json', { eager: true, import: 'default' });

const toNumber = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

/** Visa countries, one file each in src/content/visas/, edited from the admin page (/admin → Visa Prices). */
export const visas = Object.values(files)
  .filter((v) => v.published !== false && v.country && v.options?.length)
  .map((v) => ({
    country: v.country,
    code: (v.code || '').trim().toLowerCase(),
    region: VISA_REGIONS.includes(v.region) ? v.region : 'Asia',
    link: v.link || '',
    processing: v.processing || '',
    docs: DOCS[v.docs] || DOCS.basic,
    order: toNumber(v.order) ?? 999,
    options: v.options.map((o) => ({
      label: o.label,
      type: o.type === 'sticker' ? 'sticker' : 'e-visa',
      currency: o.currency || 'PKR',
      amount: toNumber(o.amount),
      sc: !!o.sc,
    })),
  }))
  .sort((a, b) => a.order - b.order || a.country.localeCompare(b.country));

/** Countries where we prepare the full visa file (embassy fees and requirements confirmed per case). */
export const casePreparation = [
  { country: 'USA', code: 'us' },
  { country: 'United Kingdom', code: 'gb' },
  { country: 'Europe (Schengen)', code: 'eu' },
  { country: 'Canada', code: 'ca' },
  { country: 'Australia', code: 'au' },
  { country: 'New Zealand', code: 'nz' },
];

export const flagUrl = (code, w = 80) => `https://flagcdn.com/w${w}/${code}.png`;

export const formatVisaPrice = (o) =>
  o.amount == null ? 'Ask for rate' : `${o.currency} ${o.amount.toLocaleString('en-US')}${o.sc ? ' + SC' : ''}`;

/** The single visa type shared by every option of a country, or null when they differ. */
export const sharedType = (v) => (v.options.every((o) => o.type === v.options[0].type) ? v.options[0].type : null);

/** The cheapest priced option, for compact previews (prefers PKR prices). */
export const visaFrom = (v) => {
  const priced = v.options.filter((o) => o.amount != null);
  const pkr = priced.filter((o) => o.currency === 'PKR');
  const pool = pkr.length ? pkr : priced;
  return pool.length ? pool.reduce((a, b) => (b.amount < a.amount ? b : a)) : v.options[0];
};
