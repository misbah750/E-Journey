import { images } from './images.js';

/**
 * Destination showcase. These are inspiration pages, not priced packages —
 * every "Explore" action opens a tailored inquiry.
 */
export const pakistanDestinations = [
  {
    slug: 'hunza',
    name: 'Hunza',
    region: 'Gilgit-Baltistan',
    image: images.hunza,
    short: 'Apricot orchards, ancient forts and the peaks of the Karakoram.',
    description:
      'Hunza is where the Karakoram Highway reveals its most celebrated views — Rakaposhi and Ultar above terraced villages, the forts of Baltit and Altit, and the turquoise waters of Attabad Lake further up the valley.',
    highlights: ['Baltit & Altit forts', 'Attabad Lake', 'Passu Cones', 'Khunjerab Pass'],
    bestTime: 'April – October',
    idealFor: ['Families', 'Couples', 'Photography'],
  },
  {
    slug: 'skardu',
    name: 'Skardu',
    region: 'Gilgit-Baltistan',
    image: images.skardu,
    short: 'Cold deserts, alpine lakes and the gateway to the world’s great peaks.',
    description:
      'Skardu sits where the Indus widens between towering ranges — a base for the Shangrila and Upper Kachura lakes, the high Deosai Plains and the historic valleys of Shigar and Khaplu.',
    highlights: ['Shangrila & Upper Kachura', 'Deosai Plains', 'Shigar Fort', 'Katpana cold desert'],
    bestTime: 'May – October',
    idealFor: ['Adventure', 'Couples', 'Groups'],
  },
  {
    slug: 'fairy-meadows',
    name: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    image: images.fairyMeadows,
    short: 'Alpine meadows at the foot of Nanga Parbat.',
    description:
      'A jeep ride and a mountain trail lead to Fairy Meadows, a pine-ringed plateau with one of the most dramatic mountain views on earth — the Rakhiot face of Nanga Parbat.',
    highlights: ['Nanga Parbat viewpoint', 'Beyal Camp trek', 'Stargazing', 'Log-cabin stays'],
    bestTime: 'June – September',
    idealFor: ['Adventure', 'Friends', 'Photography'],
  },
  {
    slug: 'naran-kaghan',
    name: 'Naran & Kaghan',
    region: 'Khyber Pakhtunkhwa',
    image: images.naran,
    short: 'Glacial lakes and green valleys along the Kunhar River.',
    description:
      'The Kaghan Valley follows the Kunhar River up to Naran and the legendary Lake Saiful Muluk, continuing to Lulusar Lake and the Babusar Pass in summer.',
    highlights: ['Lake Saiful Muluk', 'Lulusar Lake', 'Babusar Top', 'Shogran & Siri Paye'],
    bestTime: 'May – September',
    idealFor: ['Families', 'Groups', 'Road trips'],
  },
  {
    slug: 'swat',
    name: 'Swat',
    region: 'Khyber Pakhtunkhwa',
    image: images.swat,
    short: 'The “Switzerland of the East” — rivers, forests and lakes.',
    description:
      'From Mingora’s Buddhist heritage to the forests of Kalam and the lakes of the Usho Valley, Swat offers green, easily reached mountain escapes for every kind of traveller.',
    highlights: ['Kalam & Usho forest', 'Mahodand Lake', 'Malam Jabba', 'Buddhist heritage sites'],
    bestTime: 'April – October',
    idealFor: ['Families', 'Couples', 'Groups'],
  },
  {
    slug: 'kashmir',
    name: 'Neelum, Kashmir',
    region: 'Azad Kashmir',
    image: images.kashmir,
    short: 'Emerald rivers and hillside villages in the Neelum Valley.',
    description:
      'The Neelum Valley winds past Keran, Sharda and Kel, with the hilltop village of Arang Kel and alpine lakes such as Ratti Gali rewarding those who travel further.',
    highlights: ['Keran & Sharda', 'Arang Kel', 'Ratti Gali Lake', 'Neelum River'],
    bestTime: 'May – October',
    idealFor: ['Families', 'Couples', 'Nature lovers'],
  },
  {
    slug: 'murree',
    name: 'Murree & Galiyat',
    region: 'Punjab / KP',
    image: images.murree,
    short: 'Classic hill-station charm, pine forests and snowy winters.',
    description:
      'An easy escape from Islamabad, Murree and the Galiyat offer colonial-era promenades, forest walks at Nathia Gali and Ayubia, and some of Pakistan’s most accessible snowfall.',
    highlights: ['Mall Road', 'Nathia Gali', 'Ayubia chairlift', 'Winter snowfall'],
    bestTime: 'Year-round',
    idealFor: ['Families', 'Weekend breaks'],
  },
  {
    slug: 'islamabad',
    name: 'Islamabad',
    region: 'Capital Territory',
    image: images.islamabad,
    short: 'A green capital at the foot of the Margalla Hills.',
    description:
      'Pakistan’s capital pairs landmark architecture like the Faisal Mosque with Margalla Hills trails and Daman-e-Koh views — and is the natural starting point for journeys north.',
    highlights: ['Faisal Mosque', 'Daman-e-Koh', 'Margalla Hills trails', 'Pakistan Monument'],
    bestTime: 'October – April',
    idealFor: ['City breaks', 'Business', 'Families'],
  },
];

export const internationalDestinations = [
  {
    slug: 'dubai',
    name: 'Dubai',
    region: 'United Arab Emirates',
    image: images.dubai,
    short: 'Skyline icons, desert safaris and effortless family fun.',
    description:
      'From the Burj Khalifa and Dubai Marina to the dunes beyond the city, Dubai is a short flight from Pakistan and one of the easiest holidays for families and couples alike.',
    highlights: ['Burj Khalifa', 'Desert safari', 'Dubai Marina', 'Theme parks'],
    idealFor: ['Families', 'Couples', 'Shopping'],
  },
  {
    slug: 'turkey',
    name: 'Türkiye',
    region: 'Istanbul & Cappadocia',
    image: images.cappadocia,
    short: 'Ottoman heritage, Bosphorus views and balloon-filled skies.',
    description:
      'Istanbul’s mosques, bazaars and waterfront meet Cappadocia’s fairy chimneys and sunrise balloon flights — with the coast of Antalya for those who want to linger.',
    highlights: ['Istanbul old city', 'Cappadocia balloons', 'Bosphorus cruise', 'Antalya coast'],
    idealFor: ['Honeymoon', 'Culture', 'Families'],
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    region: 'Kuala Lumpur & Langkawi',
    image: images.kualaLumpur,
    short: 'Modern cities, rainforest highlands and island beaches.',
    description:
      'Kuala Lumpur’s skyline and food scene, the cool Genting and Cameron Highlands, and the beaches of Langkawi and Penang make Malaysia a relaxed, family-friendly favourite.',
    highlights: ['Petronas Towers', 'Genting Highlands', 'Langkawi', 'Penang'],
    idealFor: ['Families', 'Honeymoon', 'Students'],
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    region: 'Bangkok, Phuket & Krabi',
    image: images.thailand,
    short: 'Island-hopping, turquoise bays and vibrant city life.',
    description:
      'Bangkok’s temples and markets, then the Andaman coast — Phuket, Krabi and the Phi Phi islands — for longtail boats, limestone cliffs and beaches.',
    highlights: ['Phi Phi Islands', 'Phuket', 'Krabi', 'Bangkok'],
    idealFor: ['Honeymoon', 'Friends', 'Beaches'],
  },
  {
    slug: 'europe',
    name: 'Europe',
    region: 'Switzerland, France & beyond',
    image: images.europe,
    short: 'Alpine valleys, historic capitals and scenic rail journeys.',
    description:
      'Multi-country journeys through Switzerland’s valleys, Paris, and beyond — with Schengen visa guidance and travel insurance handled alongside your itinerary.',
    highlights: ['Swiss Alps', 'Paris', 'Scenic rail', 'Schengen visa support'],
    idealFor: ['Honeymoon', 'Families', 'Luxury'],
  },
  {
    slug: 'saudi-arabia',
    name: 'Saudi Arabia',
    region: 'Makkah, Madinah & AlUla',
    image: images.alula,
    short: 'Sacred cities and the ancient landscapes of AlUla.',
    description:
      'Beyond Umrah in Makkah and Madinah, Saudi Arabia now welcomes leisure travellers to AlUla’s rock-cut heritage, Riyadh and the Red Sea coast.',
    highlights: ['Umrah', 'AlUla & Hegra', 'Riyadh', 'Red Sea coast'],
    idealFor: ['Pilgrims', 'Culture', 'Families'],
  },
  {
    slug: 'qatar',
    name: 'Qatar',
    region: 'Doha & the Inland Sea',
    image: images.qatarMuseum,
    short: 'Museums, souqs and dunes that meet the sea.',
    description:
      'Doha’s National Museum and Museum of Islamic Art, Souq Waqif and the Corniche, then the Inland Sea where the desert runs straight into the Gulf.',
    highlights: ['National Museum of Qatar', 'Souq Waqif', 'The Corniche', 'Inland Sea'],
    idealFor: ['Couples', 'Culture', 'Families'],
  },
];
