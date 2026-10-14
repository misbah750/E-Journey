import { images } from './images.js';
import settings from '../content/settings/umrah.json';

/**
 * Umrah services, edited from the admin page (/admin).
 *
 * - Umrah Packages: one file per flyer in src/content/umrah-packages/ (flights, hotels, four prices,
 *   child and infant rates, flyer). Departed flight dates are marked automatically; a flyer whose
 *   departures have all left stays visible with an "ask for next dates" note until it is unpublished.
 * - Umrah Settings (src/content/settings/umrah.json): rate note, Umrah visa price, and optional
 *   prices for Individual and Five Star Umrah (hidden automatically after their "valid till" date).
 */
export const umrahRateNote = settings.rateNote || 'Umrah rates change with the season and are updated every 15 days to a month.';

export const OCCUPANCY = ['Sharing', 'Quad', 'Triple', 'Double'];

export const UMRAH_INCLUDES = ['Airline ticket', 'Umrah visa', 'Complete transport'];

const files = import.meta.glob('../content/umrah-packages/*.json', { eager: true, import: 'default' });

const toNumber = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

const normalize = (id, d) => ({
  id,
  airline: d.airline || '',
  via: d.via || '',
  nights: toNumber(d.nights),
  days: toNumber(d.days),
  makkah: toNumber(d.makkah),
  madinah: toNumber(d.madinah),
  baggage: d.baggage || '',
  flights: (d.flights || [])
    .map((f) => ({ label: f.label || '', legs: (f.legs || []).filter((l) => l.date) }))
    .filter((f) => f.legs.length),
  packages: (d.packages || []).map((p) => ({
    makkah: { name: p.makkahHotel || '', note: p.makkahNote || '' },
    madinah: { name: p.madinahHotel || '', note: p.madinahNote || '' },
    prices: [p.sharing, p.quad, p.triple, p.double].map(toNumber),
  })),
  child: toNumber(d.child),
  infant: toNumber(d.infant),
  flyer: d.flyer || '',
  published: d.published !== false,
});

export const umrahPackages = Object.entries(files)
  .map(([file, data]) => normalize(file.split('/').pop().replace(/\.json$/, ''), data))
  .filter((g) => g.published && g.flights.length && g.packages.length);

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

export const groupFrom = (group) => {
  const prices = group.packages.flatMap((p) => p.prices).filter((n) => n != null);
  return prices.length ? Math.min(...prices) : null;
};

/** Lowest per-person price among groups that still have departures ahead. */
export const umrahFromPrice = () => {
  const live = umrahPackages.filter(nextDeparture).map(groupFrom).filter((n) => n != null);
  return live.length ? Math.min(...live) : null;
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
    text: 'Umrah planned around your own dates and family. Choose your hotels, room type and length of stay.',
    points: ['Travel on your own dates', 'Choice of hotels & room type', 'Transfers between the holy cities', 'Visa and tickets arranged'],
    price: toNumber(settings.individualPrice),
    validTill: settings.individualValidTill || null,
  },
  {
    id: 'five-star',
    title: 'Five Star Umrah',
    tagline: 'Comfort close to the Haram',
    image: images.hotelLuxury,
    text: 'Five-star hotels close to Masjid al-Haram and Masjid an-Nabawi, with comfortable transport throughout.',
    points: ['Five-star hotels near the Haramain', 'Comfortable private transfers', 'Ideal for families & elderly pilgrims', 'Visa and tickets arranged'],
    price: toNumber(settings.fiveStarPrice),
    validTill: settings.fiveStarValidTill || null,
  },
];

/** Umrah visa only. An empty price shows "Ask for the current rate". */
export const umrahVisa = { label: 'Umrah visa (28 days)', price: settings.visaPrice || null };

/** True when a type has a published price that is still within its validity date. */
export const hasCurrentPrice = (t) =>
  !!t.price && !!t.validTill && new Date(`${t.validTill}T23:59:59`) >= new Date();
