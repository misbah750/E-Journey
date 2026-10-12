/**
 * Visa services and prices — from e-Journey's visa price list.
 *
 * Each country card lists one or more options. `type` is 'e-visa' (e-Visa / paper visa) or 'sticker'.
 * `sc: true` means service charges are added on top of the listed fee ("+ SC").
 * `code` is the ISO country code used for the flag image (flagcdn.com).
 */
export const visaTypes = [
  { id: 'all', label: 'All Visas' },
  { id: 'e-visa', label: 'e-Visa / Paper Visa' },
  { id: 'sticker', label: 'Sticker Visa' },
  { id: 'done-base', label: 'Done Base' },
];

export const visas = [
  {
    country: 'Dubai (UAE)', code: 'ae',
    options: [
      { label: '30 days', type: 'e-visa', currency: 'AED', amount: 320 },
      { label: '60 days', type: 'e-visa', currency: 'AED', amount: 490 },
    ],
  },
  {
    country: 'Saudi Arabia (Umrah)', code: 'sa', link: '/umrah',
    options: [{ label: 'Umrah e-Visa · 28 days', type: 'e-visa', currency: 'SAR', amount: 535 }],
  },
  {
    country: 'Malaysia', code: 'my', doneBase: true,
    options: [
      { label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 12500 },
      { label: 'e-Visa · done base', type: 'e-visa', currency: 'PKR', amount: 20500 },
      { label: 'Sticker visa', type: 'sticker', currency: 'PKR', amount: 17500 },
    ],
  },
  {
    country: 'Thailand', code: 'th',
    options: [
      { label: 'Single entry', type: 'e-visa', currency: 'PKR', amount: 16000 },
      { label: 'Multiple entry', type: 'e-visa', currency: 'PKR', amount: 70000 },
    ],
  },
  {
    country: 'Singapore', code: 'sg', doneBase: true,
    options: [
      { label: 'e-Visa · online', type: 'e-visa', currency: 'PKR', amount: 14500 },
      { label: 'e-Visa · consulate', type: 'e-visa', currency: 'PKR', amount: 12500 },
    ],
  },
  {
    country: 'Azerbaijan', code: 'az',
    options: [
      { label: 'e-Visa · normal', type: 'e-visa', currency: 'PKR', amount: 11500 },
      { label: 'e-Visa · urgent', type: 'e-visa', currency: 'PKR', amount: 23500 },
    ],
  },
  {
    country: 'Türkiye', code: 'tr',
    options: [{ label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 23500 }],
  },
  {
    country: 'Sri Lanka', code: 'lk',
    options: [{ label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 9500 }],
  },
  {
    country: 'Indonesia', code: 'id', doneBase: true,
    options: [
      { label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 34000 },
      { label: '1 year · multiple entry', type: 'e-visa', currency: 'PKR', amount: 105000 },
    ],
  },
  {
    country: 'Uzbekistan', code: 'uz',
    options: [{ label: '30 days', type: 'sticker', currency: 'PKR', amount: 42000 }],
  },
  {
    country: 'Egypt', code: 'eg',
    options: [{ label: 'Sticker visa', type: 'sticker', currency: 'PKR', amount: 17000 }],
  },
  {
    country: 'Bahrain', code: 'bh',
    options: [
      { label: '14 days', type: 'e-visa', currency: 'PKR', amount: 28000 },
      { label: '90 days · multiple entry', type: 'e-visa', currency: 'PKR', amount: 43000 },
      { label: '1 year · multiple entry', type: 'e-visa', currency: 'PKR', amount: 63000 },
    ],
  },
  {
    country: 'Hong Kong', code: 'hk',
    options: [{ label: '30 days', type: 'e-visa', currency: 'PKR', amount: 38000 }],
  },
  {
    country: 'South Korea', code: 'kr',
    options: [{ label: '30 days', type: 'e-visa', currency: 'PKR', amount: 12000, sc: true }],
  },
  {
    country: 'Nepal', code: 'np',
    options: [
      { label: 'Invitation · 30 days', type: 'e-visa', currency: 'PKR', amount: 5500 },
      { label: 'Invitation · 90 days', type: 'e-visa', currency: 'PKR', amount: 6500 },
    ],
  },
  {
    country: 'Cambodia', code: 'kh',
    options: [{ label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 20500 }],
  },
  {
    country: 'Kenya', code: 'ke',
    options: [{ label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 21500 }],
  },
  {
    country: 'Tanzania', code: 'tz', doneBase: true,
    options: [{ label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 65000 }],
  },
  {
    country: 'Morocco', code: 'ma',
    options: [{ label: 'e-Visa', type: 'e-visa', currency: 'PKR', amount: 38000 }],
  },
  {
    country: 'Philippines', code: 'ph',
    options: [
      { label: '30 days', type: 'sticker', currency: 'PKR', amount: 18500 },
      { label: '6 months · multiple entry', type: 'sticker', currency: 'PKR', amount: 30000 },
      { label: '1 year · multiple entry', type: 'sticker', currency: 'PKR', amount: 42000 },
    ],
  },
  {
    country: 'South Africa', code: 'za',
    options: [{ label: '30 days', type: 'sticker', currency: 'PKR', amount: 28000 }],
  },
  {
    country: 'Tajikistan', code: 'tj',
    options: [{ label: '30 days', type: 'sticker', currency: 'USD', amount: 185 }],
  },
  {
    country: 'Australia', code: 'au',
    options: [{ label: 'Multiple entry', type: 'e-visa', currency: 'AUD', amount: 200, sc: true }],
  },
  {
    country: 'New Zealand', code: 'nz',
    options: [{ label: 'Visa fee', type: 'e-visa', currency: 'NZD', amount: 442, sc: true }],
  },
  {
    country: 'Canada', code: 'ca',
    options: [{ label: 'Visa fee', type: 'sticker', currency: 'CAD', amount: 185, sc: true }],
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

export const doneBaseCountries = visas.filter((v) => v.doneBase).map((v) => v.country);

export const flagUrl = (code, w = 80) => `https://flagcdn.com/w${w}/${code}.png`;

export const formatVisaPrice = (o) =>
  `${o.currency} ${o.amount.toLocaleString('en-US')}${o.sc ? ' + SC' : ''}`;

/** The cheapest option, for compact previews (prefers PKR prices). */
export const visaFrom = (v) => {
  const pkr = v.options.filter((o) => o.currency === 'PKR');
  const pool = pkr.length ? pkr : v.options;
  return pool.reduce((a, b) => (b.amount < a.amount ? b : a));
};
