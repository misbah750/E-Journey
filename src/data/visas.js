/**
 * Visa services and prices — from e-Journey's visa price list.
 *
 * Each country card lists one or more options. `type` is 'e-visa' (e-Visa / paper visa) or 'sticker'.
 * `sc: true` means service charges are added on top of the listed fee ("+ SC").
 * `amount: null` shows "Ask for current rate" instead of a price.
 * `code` is the ISO country code used for the flag image (flagcdn.com).
 *
 * `docs` (a list from DOCS below) and `processing` are shown on each card.
 * Processing times are indicative and set by the embassy — review them with the visa desk and adjust here.
 */
const BASIC = [
  'Passport scan — valid for at least 6 months',
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

export const visaTypes = [
  { id: 'all', label: 'All Visas' },
  { id: 'e-visa', label: 'e-Visa / Paper Visa' },
  { id: 'sticker', label: 'Sticker Visa' },
];

export const TYPE_LABEL = { 'e-visa': 'e-Visa', sticker: 'Sticker visa' };

export const visas = [
  {
    country: 'Dubai (UAE)', code: 'ae', docs: DOCS.ticket, processing: '3–5 working days',
    options: [
      { label: '30 days', type: 'e-visa', currency: 'AED', amount: 320 },
      { label: '60 days', type: 'e-visa', currency: 'AED', amount: 490 },
    ],
  },
  {
    country: 'Saudi Arabia (Umrah)', code: 'sa', link: '/umrah', docs: DOCS.umrah, processing: '2–4 working days',
    options: [{ label: 'Umrah visa · 28 days', type: 'e-visa', currency: 'SAR', amount: null }],
  },
  {
    country: 'Malaysia', code: 'my', docs: DOCS.tourist, processing: '3–5 working days (sticker visa 7–10 working days)',
    options: [
      { label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 12500 },
      { label: 'Sticker visa', type: 'sticker', currency: 'PKR', amount: 17500 },
    ],
  },
  {
    country: 'Thailand', code: 'th', docs: DOCS.tourist, processing: '10–15 working days',
    options: [
      { label: 'Single entry', type: 'e-visa', currency: 'PKR', amount: 16000 },
      { label: 'Multiple entry', type: 'e-visa', currency: 'PKR', amount: 70000 },
    ],
  },
  {
    country: 'Singapore', code: 'sg', docs: DOCS.tourist, processing: '5–7 working days',
    options: [
      { label: 'Online application', type: 'e-visa', currency: 'PKR', amount: 14500 },
      { label: 'Through consulate', type: 'e-visa', currency: 'PKR', amount: 12500 },
    ],
  },
  {
    country: 'Azerbaijan', code: 'az', docs: DOCS.basic, processing: 'Normal 3–5 working days · urgent 1–2 working days',
    options: [
      { label: 'Normal', type: 'e-visa', currency: 'PKR', amount: 11500 },
      { label: 'Urgent', type: 'e-visa', currency: 'PKR', amount: 23500 },
    ],
  },
  {
    country: 'Türkiye', code: 'tr', docs: DOCS.tourist, processing: '10–15 working days',
    options: [{ label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 23500 }],
  },
  {
    country: 'Sri Lanka', code: 'lk', docs: DOCS.ticket, processing: '1–3 working days',
    options: [{ label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 9500 }],
  },
  {
    country: 'Indonesia', code: 'id', docs: DOCS.tourist, processing: '5–7 working days',
    options: [
      { label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 34000 },
      { label: '1 year · multiple entry', type: 'e-visa', currency: 'PKR', amount: 105000 },
    ],
  },
  {
    country: 'Uzbekistan', code: 'uz', docs: DOCS.tourist, processing: '7–10 working days',
    options: [{ label: '30 days', type: 'sticker', currency: 'PKR', amount: 42000 }],
  },
  {
    country: 'Egypt', code: 'eg', docs: DOCS.tourist, processing: '10–15 working days',
    options: [{ label: 'Tourist visa', type: 'sticker', currency: 'PKR', amount: 17000 }],
  },
  {
    country: 'Bahrain', code: 'bh', docs: DOCS.tourist, processing: '5–7 working days',
    options: [
      { label: '14 days', type: 'e-visa', currency: 'PKR', amount: 28000 },
      { label: '90 days · multiple entry', type: 'e-visa', currency: 'PKR', amount: 43000 },
      { label: '1 year · multiple entry', type: 'e-visa', currency: 'PKR', amount: 63000 },
    ],
  },
  {
    country: 'Hong Kong', code: 'hk', docs: DOCS.tourist, processing: '4–6 weeks',
    options: [{ label: '30 days', type: 'e-visa', currency: 'PKR', amount: 38000 }],
  },
  {
    country: 'South Korea', code: 'kr', docs: DOCS.full, processing: '10–15 working days',
    options: [{ label: '30 days', type: 'e-visa', currency: 'PKR', amount: 12000, sc: true }],
  },
  {
    country: 'Nepal', code: 'np', docs: DOCS.basic, processing: '3–5 working days',
    options: [
      { label: 'Invitation · 30 days', type: 'e-visa', currency: 'PKR', amount: 5500 },
      { label: 'Invitation · 90 days', type: 'e-visa', currency: 'PKR', amount: 6500 },
    ],
  },
  {
    country: 'Cambodia', code: 'kh', docs: DOCS.ticket, processing: '3–5 working days',
    options: [{ label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 20500 }],
  },
  {
    country: 'Kenya', code: 'ke', docs: DOCS.tourist, processing: '3–7 working days',
    options: [{ label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 21500 }],
  },
  {
    country: 'Tanzania', code: 'tz', docs: DOCS.tourist, processing: '10–15 working days',
    options: [{ label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 65000 }],
  },
  {
    country: 'Morocco', code: 'ma', docs: DOCS.tourist, processing: '7–10 working days',
    options: [{ label: 'Tourist visa', type: 'e-visa', currency: 'PKR', amount: 38000 }],
  },
  {
    country: 'Philippines', code: 'ph', docs: DOCS.tourist, processing: '10–15 working days',
    options: [
      { label: '30 days', type: 'sticker', currency: 'PKR', amount: 18500 },
      { label: '6 months · multiple entry', type: 'sticker', currency: 'PKR', amount: 30000 },
      { label: '1 year · multiple entry', type: 'sticker', currency: 'PKR', amount: 42000 },
    ],
  },
  {
    country: 'South Africa', code: 'za', docs: DOCS.full, processing: '15–20 working days',
    options: [{ label: '30 days', type: 'sticker', currency: 'PKR', amount: 28000 }],
  },
  {
    country: 'Tajikistan', code: 'tj', docs: DOCS.basic, processing: '5–7 working days',
    options: [{ label: '30 days', type: 'sticker', currency: 'USD', amount: 185 }],
  },
  {
    country: 'Australia', code: 'au', docs: DOCS.full, processing: '4–8 weeks',
    options: [{ label: 'Multiple entry', type: 'e-visa', currency: 'AUD', amount: 200, sc: true }],
  },
  {
    country: 'New Zealand', code: 'nz', docs: DOCS.full, processing: '4–6 weeks',
    options: [{ label: 'Visitor visa', type: 'e-visa', currency: 'NZD', amount: 442, sc: true }],
  },
  {
    country: 'Canada', code: 'ca', docs: DOCS.full, processing: '6–10 weeks',
    options: [{ label: 'Visitor visa', type: 'sticker', currency: 'CAD', amount: 185, sc: true }],
  },
];

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
