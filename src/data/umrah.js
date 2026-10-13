import { images } from './images.js';

/**
 * Umrah services. Umrah rates move with the season, so they are refreshed every 15 days to a month.
 *
 * - `umrahPackages` are the current group packages, transcribed from e-Journey's 1448-H flyers
 *   (public/flyers/umrah-*.webp). Replace or remove a block when a new flyer comes out.
 *   Flight dates are YYYY-MM-DD; once a departure date has passed it is marked "Departed" automatically.
 *   Prices are PKR per person in the order of OCCUPANCY; `null` shows "Ask".
 * - `umrahTypes` describe Group / Individual / Five Star Umrah. To publish a rate on a type, set
 *   `price` (PKR, per person) and `validTill` (YYYY-MM-DD); it hides itself after that date.
 */
export const umrahRateNote = 'Umrah rates change with the season and are updated every 15 days to a month.';

export const OCCUPANCY = ['Sharing', 'Quad', 'Triple', 'Double'];

export const UMRAH_INCLUDES = ['Airline ticket', 'Umrah visa', 'Complete transport'];

const H = {
  masmara: { name: 'Masarat Masmara', note: 'Shuttle service' },
  shrouq: { name: 'Rawdat Al Shrouq', note: '1100 m' },
  khalil: { name: 'Masarat Al Khalil', note: '750–800 m' },
  silver: { name: 'Masarat Silver', note: '600 m' },
  diyafah: { name: 'Abraj Al Diyafah', note: 'Shuttle service' },
  taybah: { name: 'Masarat Majd Taybah', note: '650–700 m' },
  naseem: { name: 'Naseem Al Sharia', note: '650 m' },
  zahra: { name: 'Zahra 2', note: '500 m' },
  nakheel: { name: 'Diyar Al Nakheel', note: '200–250 m' },
};

/** The six hotel combinations used on the PIA and Airsial flyers, with their four prices each. */
const sixHotels = (rows) => [
  [H.masmara, H.diyafah], [H.masmara, H.taybah], [H.shrouq, H.taybah],
  [H.silver, H.naseem], [H.silver, H.zahra], [H.silver, H.nakheel],
].map(([makkah, madinah], i) => ({ makkah, madinah, prices: rows[i] }));

/** The five hotel combinations used on the SalamAir flyers. */
const fiveHotels = (rows) => [
  [H.masmara, H.diyafah], [H.masmara, H.taybah], [H.shrouq, H.taybah],
  [H.khalil, H.taybah], [H.silver, H.zahra],
].map(([makkah, madinah], i) => ({ makkah, madinah, prices: rows[i] }));

const leg = (flight, date, from, to, dep, arr) => ({ flight, date, from, to, dep, arr });

const salamAirOption = (out, back, backTimes = ['16:55', '20:50'], homeDate) => [
  leg('OV 514', out, 'KHI', 'MCT', '06:40', '07:30'),
  leg('OV 283', out, 'MCT', 'JED', '08:40', '11:00'),
  leg('OV 286', back, 'JED', 'MCT', ...backTimes),
  leg('OV 513', homeDate, 'MCT', 'KHI', '03:15', '05:55'),
];

const SALAMAIR_FIVE = fiveHotels([
  [195000, 200000, 205000, 220500],
  [205000, 210000, 220000, 240000],
  [215000, 225000, 240000, 270000],
  [225000, 236000, 255000, 296000],
  [232000, 245000, 270000, 315000],
]);

export const umrahPackages = [
  {
    id: 'pia-20-nights-13-oct',
    airline: 'PIA',
    nights: 20, days: 21, makkah: 12, madinah: 8,
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [
      { label: '22 days', legs: [leg('PK761', '2026-10-13', 'KHI', 'JED', '17:50', '20:30'), leg('PK732', '2026-11-03', 'JED', 'KHI', '02:00', '08:05')] },
      { label: '21 days', legs: [leg('PK761', '2026-10-14', 'KHI', 'JED', '19:20', '22:00'), leg('PK732', '2026-11-03', 'JED', 'KHI', '02:00', '08:05')] },
    ],
    packages: sixHotels([
      [212000, 217000, 225000, 237000],
      [217000, 222000, 232000, 250000],
      [230000, 240000, 255000, 284000],
      [243000, 255000, 275000, 315000],
      [246000, 258000, 280000, 320000],
      [265000, 282000, 310000, 368000],
    ]),
    infant: 85000, child: 185000,
    flyer: '/flyers/umrah-pia-20-nights-13-oct.webp',
  },
  {
    id: 'pia-19-nights-22-oct',
    airline: 'PIA',
    nights: 19, days: 20, makkah: 11, madinah: 8,
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [
      { legs: [leg('PK731', '2026-10-22', 'KHI', 'JED', '22:20', '01:00'), leg('PK832', '2026-11-10', 'JED', 'KHI', '22:20', '04:15')] },
    ],
    packages: sixHotels([
      [212000, 217000, 225000, 239000],
      [null, 223000, 233000, 251000], // sharing price is unreadable on the flyer
      [229000, 237000, 252000, 290000],
      [245000, 257000, 278000, 318000],
      [247000, 260000, 281000, 324000],
      [266000, 284000, 313000, 372000],
    ]),
    infant: 85000, child: 185000,
    flyer: '/flyers/umrah-pia-19-nights-22-oct.webp',
  },
  {
    id: 'pia-21-nights-24-oct',
    airline: 'PIA',
    nights: 21, days: 22, makkah: 13, madinah: 8,
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [
      { legs: [leg('PK761', '2026-10-24', 'KHI', 'JED', '19:20', '21:40'), leg('PK732', '2026-11-14', 'JED', 'KHI', '02:00', '08:05')] },
    ],
    packages: sixHotels([
      [214000, 217000, 227000, 243000],
      [219000, 225000, 235000, 255000],
      [233000, 243000, 258000, 290000],
      [250000, 264000, 287000, 332000],
      [253000, 267000, 290000, 338000],
      [272000, 290000, 322000, 385000],
    ]),
    infant: 85000, child: 185000,
    flyer: '/flyers/umrah-pia-21-nights-24-oct.webp',
  },
  {
    id: 'pia-20-nights-28-oct',
    airline: 'PIA',
    nights: 20, days: 21, makkah: 12, madinah: 8,
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [
      { legs: [leg('PK731', '2026-10-28', 'KHI', 'JED', '21:50', '00:30'), leg('PK832', '2026-11-17', 'JED', 'KHI', '22:20', '04:15')] },
      { legs: [leg('PK761', '2026-10-30', 'KHI', 'JED', '21:50', '00:30'), leg('PK732', '2026-11-19', 'JED', 'KHI', '02:00', '08:05')] },
    ],
    packages: sixHotels([
      [214000, 219000, 226000, 241000],
      [219000, 225000, 234000, 253000],
      [232000, 240000, 255000, 285000],
      [248000, 260000, 282000, 325000],
      [250000, 264000, 286000, 332000],
      [269000, 287000, 318000, 379000],
    ]),
    infant: 85000, child: 185000,
    flyer: '/flyers/umrah-pia-20-nights-28-oct.webp',
  },
  {
    id: 'airsial-19-nights',
    airline: 'Airsial',
    nights: 19, days: 20, makkah: 11, madinah: 8,
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [
      ['2026-10-01', '2026-10-20'], ['2026-10-04', '2026-10-23'], ['2026-10-06', '2026-10-25'], ['2026-10-07', '2026-10-26'],
      ['2026-10-08', '2026-10-27'], ['2026-10-09', '2026-10-28'], ['2026-10-11', '2026-10-30'],
    ].map(([out, back]) => ({
      legs: [leg('PF-714', out, 'KHI', 'JED', '02:05', '04:45'), leg('PF-715', back, 'JED', 'KHI', '05:35', '11:35')],
    })),
    packages: sixHotels([
      [215000, 220000, 225000, 235000],
      [220000, 225000, 230000, 245000],
      [232000, 240000, 255000, 280000],
      [237000, 248000, 265000, 300000],
      [240000, 250000, 270000, 308000],
      [265000, 280500, 309000, 365000],
    ]),
    infant: 85000, child: 185000,
    flyer: '/flyers/umrah-airsial-19-nights.webp',
  },
  {
    id: 'salamair-21-nights',
    airline: 'SalamAir',
    nights: 21, days: 22, makkah: 13, madinah: 8,
    via: 'Muscat',
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [{ legs: salamAirOption('2026-10-04', '2026-10-25', ['16:55', '20:50'], '2026-10-26') }],
    packages: SALAMAIR_FIVE,
    infant: 80000, child: 175000,
    flyer: '/flyers/umrah-salamair-21-nights.webp',
  },
  {
    id: 'salamair-20-nights',
    airline: 'SalamAir',
    nights: 20, days: 21, makkah: 12, madinah: 8,
    via: 'Muscat',
    baggage: '20 KG + 30 KG · 7 KG hand carry · meals',
    flights: [
      { legs: salamAirOption('2026-10-01', '2026-10-21', ['17:00', '21:15'], '2026-10-22') },
      { legs: salamAirOption('2026-10-06', '2026-10-26', ['16:55', '20:50'], '2026-10-27') },
      { legs: salamAirOption('2026-10-07', '2026-10-27', ['16:45', '20:40'], '2026-10-28') },
      { legs: salamAirOption('2026-10-08', '2026-10-28', ['17:00', '20:55'], '2026-10-29') },
      { legs: salamAirOption('2026-10-11', '2026-10-31', ['16:55', '20:50'], '2026-11-01') },
    ],
    packages: SALAMAIR_FIVE,
    infant: 80000, child: 175000,
    flyer: '/flyers/umrah-salamair-20-nights.webp',
  },
];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** True once a flight option's first departure date is before today. */
export const hasDeparted = (option) => new Date(`${option.legs[0].date}T00:00:00`) < startOfToday();

/** Earliest departure that is still ahead, or null when every option has left. */
export const nextDeparture = (group) => {
  const upcoming = group.flights.filter((f) => !hasDeparted(f)).map((f) => f.legs[0].date).sort();
  return upcoming[0] || null;
};

/** Groups with upcoming departures first (soonest first), then groups whose departures have all left. */
export const sortedUmrahPackages = () =>
  [...umrahPackages].sort((a, b) => {
    const na = nextDeparture(a);
    const nb = nextDeparture(b);
    if (na && nb) return na.localeCompare(nb);
    if (na) return -1;
    if (nb) return 1;
    return 0;
  });

export const groupFrom = (group) => Math.min(...group.packages.flatMap((p) => p.prices).filter((n) => n != null));

/** Lowest per-person price among groups that still have departures ahead. */
export const umrahFromPrice = () => {
  const live = umrahPackages.filter(nextDeparture);
  return live.length ? Math.min(...live.map(groupFrom)) : null;
};

export const formatDay = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

export const umrahTypes = [
  {
    id: 'group',
    title: 'Group Umrah',
    tagline: 'Travel together, guided throughout',
    image: images.kaaba,
    text: 'Join a group movement from Karachi on fixed departures, with flights, visa, hotels and transport arranged.',
    points: ['Fixed group departures from Karachi', 'Shared transport & Ziyarat', 'Sharing, quad, triple or double rooms', 'Visa and tickets arranged'],
    price: null,
    validTill: null,
  },
  {
    id: 'individual',
    title: 'Individual Umrah',
    tagline: 'Your dates, your pace',
    image: images.madinah,
    text: 'Umrah planned around your own dates and family — choose your hotels, room type and length of stay.',
    points: ['Travel on your own dates', 'Choice of hotels & room type', 'Transfers between the holy cities', 'Visa and tickets arranged'],
    price: null,
    validTill: null,
  },
  {
    id: 'five-star',
    title: 'Five Star Umrah',
    tagline: 'Comfort close to the Haram',
    image: images.hotelLuxury,
    text: 'Five-star hotels close to Masjid al-Haram and Masjid an-Nabawi, with comfortable transport throughout.',
    points: ['Five-star hotels near the Haramain', 'Comfortable private transfers', 'Ideal for families & elderly pilgrims', 'Visa and tickets arranged'],
    price: null,
    validTill: null,
  },
];

/** Umrah visa only. Set `price` (e.g. 'SAR 535') to publish the rate; null shows "Ask for the current rate". */
export const umrahVisa = { label: 'Umrah visa (28 days)', price: null };

/** True when a type has a published price that is still within its validity date. */
export const hasCurrentPrice = (t) =>
  !!t.price && !!t.validTill && new Date(`${t.validTill}T23:59:59`) >= new Date();
