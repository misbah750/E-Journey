import { images } from './images.js';

/**
 * Umrah services. Umrah rates move with the season, so they are refreshed every 15 days to a month.
 *
 * To publish a rate, set `price` (PKR, per person) and `validTill` (YYYY-MM-DD) on a type.
 * Once `validTill` has passed the price is hidden automatically and visitors are asked to
 * request the current rate — so an out-of-date price is never shown.
 */
export const umrahRateNote = 'Umrah rates change with the season and are updated every 15 days to a month.';

export const umrahTypes = [
  {
    id: 'group',
    title: 'Group Umrah',
    tagline: 'Travel together, guided throughout',
    image: images.kaaba,
    text: 'Join a group movement from Pakistan with a religious scholar guiding the group before and during Umrah.',
    points: ['Scholar guidance for the group', 'Shared transport & Ziyarat', 'Quad, triple or double sharing', 'Visa and tickets arranged'],
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

export const umrahVisa = { label: 'Umrah e-Visa (28 days)', price: 'SAR 535' };

/** True when a type has a published price that is still within its validity date. */
export const hasCurrentPrice = (t) =>
  !!t.price && !!t.validTill && new Date(`${t.validTill}T23:59:59`) >= new Date();
