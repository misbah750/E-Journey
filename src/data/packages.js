import { images } from './images.js';

/**
 * Signature packages — pricing, durations and inclusions as supplied by e-Journey.
 * Ratings are intentionally omitted until verified review data is available
 * (add `rating: { score, count }` to a package to display one).
 */
export const packages = [
  {
    slug: 'umrah-20-night-platinum',
    category: 'spiritual',
    tier: 'Gold Tier',
    tierLine: 'Premier Spiritual Journey',
    name: '20 Night Platinum Umrah',
    titleAccent: 'Umrah Pilgrimage',
    titleRest: 'Package',
    shortTitle: 'Umrah Platinum',
    region: 'Makkah & Madinah',
    nights: 20,
    stays: [
      { nights: 10, place: 'Makkah' },
      { nights: 10, place: 'Madinah' },
    ],
    summary:
      'A complete, guided spiritual experience, offering dedicated time for deep reflection and worship in the two holiest cities of Islam.',
    priceLabel: 'Starting From',
    price: 250000,
    basis: 'Per Person, Quad Sharing',
    images: [images.kaaba, images.madinah],
    departure: 'Karachi departures',
    configurations: ['Quad', 'Triple', 'Double'],
    highlights: [
      'Scholar guidance before and during Umrah',
      'Hotels close to the Haramain',
      'Air-conditioned intercity coach transfers',
      'Guided Ziyarat in Makkah & Madinah',
    ],
    inclusions: [
      'Complete Umrah visa processing & assistance',
      '10 nights hotel stay in Makkah',
      '10 nights hotel stay in Madinah',
      'Air-conditioned VIP coach intercity transfers',
      'Guided holy Ziyarat in Makkah & Madinah',
      'Experienced scholars for pilgrimage guidance',
    ],
    itinerary: [
      {
        days: 'Days 01 – 02',
        title: 'Departure from Pakistan & arrival in Makkah',
        text: 'Fly from Karachi to Jeddah. Meet-and-assist by the e-Journey airport representative, transfer by air-conditioned coach to your hotel in Makkah, check-in, and a guided first Umrah under scholar supervision.',
      },
      {
        days: 'Days 03 – 07',
        title: 'Ibadah in Makkah & holy Ziyarat',
        text: 'Dedicated days for prayer and Tawaf in Masjid al-Haram. A guided half-day visit to Jabal al-Nour (Ghar-e-Hira), Jabal Thawr, Mina, Muzdalifah and Arafat with historical commentary.',
      },
      {
        days: 'Days 08 – 10',
        title: 'Spiritual completion & farewell Tawaf',
        text: 'Individual worship and supplication at the Haram, with scholar sessions on spiritual etiquette before departing for the City of the Prophet ﷺ. Tawaf al-Wada.',
      },
      {
        days: 'Days 11 – 15',
        title: 'Madinah Munawwarah & Salam at Roza-e-Rasool ﷺ',
        text: 'Intercity transfer to Madinah and check-in close to Masjid an-Nabawi. Presenting Salam at the Roza of the Holy Prophet ﷺ, with Riyaz-ul-Jannah reservation assistance.',
      },
      {
        days: 'Days 16 – 20',
        title: 'Madinah Ziyarat & return',
        text: 'Organised visits to Masjid Quba, Mount Uhud and the Saba Masajid. Final prayers in Masjid an-Nabawi, then transfer to Prince Mohammad bin Abdulaziz Airport for the return flight to Pakistan.',
      },
    ],
  },
  {
    slug: 'dubai-desert-15-night-grand-escape',
    category: 'gulf',
    tier: 'Ultimate Dune Tier',
    tierLine: 'Premier City & Desert Adventure',
    name: '15 Night Dubai Grand Escape',
    titleAccent: 'Dubai & Arabian Desert',
    titleRest: 'Grand Escape',
    shortTitle: 'Dubai City & Desert',
    region: 'United Arab Emirates',
    nights: 15,
    stays: [
      { nights: 10, place: 'Dubai City' },
      { nights: 5, place: 'Desert Resort' },
    ],
    summary:
      'A complete, thrilling modern and authentic experience, offering a perfect blend of high-rise city excitement and timeless desert tranquility.',
    priceLabel: 'Total Package Cost',
    price: 575000,
    basis: 'Per Couple, Superior Room Sharing, Flights Included',
    images: [images.dubai, images.dubaiDesert],
    departure: 'Flights included',
    configurations: ['Couple', 'Family'],
    highlights: [
      'Flights included',
      'Superior room sharing',
      '10 nights in Dubai city',
      '5 nights at a desert resort with safari',
    ],
    inclusions: [
      'Flights',
      '10 nights city hotel stay in Dubai',
      '5 nights luxury desert resort stay',
      'Desert safari',
      'Superior room sharing',
    ],
  },
  {
    slug: 'qatar-doha-15-night-grand-discovery',
    category: 'gulf',
    tier: 'Elite Pearl Tier',
    tierLine: 'Premier City & Heritage Discovery',
    name: '15 Night Qatar Grand Discovery',
    titleAccent: 'Qatar & Doha',
    titleRest: 'Grand Discovery',
    shortTitle: 'Qatar Heritage Tour',
    region: 'Doha & Beyond',
    nights: 15,
    stays: [
      { nights: 10, place: 'Doha City' },
      { nights: 5, place: 'Inland Sea Desert' },
    ],
    summary:
      'A complete, enriching modern and traditional experience, offering a perfect blend of architectural wonder, cultural heritage, and desert adventures.',
    priceLabel: 'Total Package Cost',
    price: 1480000,
    priceNote: 'Equivalent to approx. QAR 18,500',
    basis: 'Starting price · Per Couple, Premium Sharing, Private Transfers',
    images: [images.doha, images.qatarMuseum],
    departure: 'Private transfers',
    configurations: ['Couple', 'Family'],
    highlights: [
      'Private transfers',
      'Premium sharing',
      '10 nights in Doha city',
      '5 nights at the Inland Sea desert',
    ],
    inclusions: [
      '10 nights stay in Doha City',
      '5 nights at the Inland Sea desert',
      'Private transfers',
      'Premium sharing',
    ],
  },
];

export const packageCategories = [
  { id: 'all', label: 'All Packages' },
  { id: 'spiritual', label: 'Spiritual & Pilgrimage' },
  { id: 'gulf', label: 'Gulf Escapes' },
];

export const getPackage = (slug) => packages.find((p) => p.slug === slug);

export const formatPKR = (n) => `PKR ${n.toLocaleString('en-US')}`;
