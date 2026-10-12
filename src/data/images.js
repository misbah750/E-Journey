/**
 * Image registry. All photos are free-to-use Unsplash images (Unsplash License),
 * referenced by photo id and served through the Unsplash CDN at responsive sizes.
 * Swap any `id` for the agency's own photography later — alt text lives here too.
 */
const img = (id, alt, position) => ({ id, alt, position });

export const images = {
  // Pakistan
  heroSkardu: img('1614703185698-5bb9810638af', 'Snow-capped peaks reflected in a still alpine lake in northern Pakistan'),
  hunza: img('1514558427911-8e293bebf18c', 'Aerial view of the Hunza River winding through the Karakoram valley'),
  hunzaAutumn: img('1589798044196-08cc857acb03', 'Poplar trees in autumn colour in Hunza Valley'),
  attabad: img('1630700246857-3113649eb3b6', 'Turquoise water of Attabad Lake beneath rocky Karakoram cliffs'),
  passu: img('1632133915653-8ded5c72e329', 'Sunset over the jagged Passu Cones in upper Hunza'),
  skardu: img('1672652787237-20f1cf66624e', 'Pine forest and mountain ridges near Skardu, Gilgit-Baltistan'),
  shangrila: img('1604676055604-fe96097e4f9f', 'Red-roofed pavilion beside the lake at Shangrila, Skardu'),
  skarduNight: img('1703182186928-c536061bf1b6', 'Mountains mirrored in a calm lake under a deep blue sky'),
  fairyMeadows: img('1664872759149-b7605ca5a3a7', 'Wooden cabins at Fairy Meadows facing Nanga Parbat', 'center 40%'),
  naran: img('1565182027317-ca49ef1405f5', 'A wooden boat on Lake Saiful Muluk in the Kaghan Valley'),
  swat: img('1600402279586-09818db238b9', 'Pine-fringed Mahodand Lake in the upper Usho Valley, Swat'),
  kashmir: img('1659553761498-6a8728fbf281', 'The village of Arang Kel above the Neelum Valley, Azad Kashmir'),
  murree: img('1584043204475-8cc101d6c77a', 'Forested ridges seen from Kashmir Point, Murree'),
  islamabad: img('1608020932658-d0e19a69580b', 'Faisal Mosque in Islamabad set against the Margalla Hills'),
  deosai: img('1522075646656-6cc7dc117480', 'A clear stream across the high Deosai Plains'),

  // Pilgrimage
  kaaba: img('1693590614566-1d3ea9ef32f7', 'Pilgrims performing Tawaf around the Kaaba at Masjid al-Haram, Makkah'),
  kaabaClose: img('1579305796288-c534f6cf17ab', 'The Kaaba at the heart of Masjid al-Haram in Makkah'),
  madinah: img('1591604129939-f1efa4d9f7fa', 'The Green Dome and minarets of Masjid an-Nabawi, Madinah, at dusk'),
  madinahCourtyard: img('1602769490455-36cf9734dbcb', "Pilgrims walking in the courtyard of the Prophet's Mosque in Madinah"),
  islamicPattern: img('1558114965-eeb97aa84c3b', 'Intricate geometric tile work on the interior of a dome'),

  // Gulf
  dubai: img('1651467606797-e1c660cf3fda', 'The Burj Khalifa rising above Downtown Dubai'),
  dubaiSunset: img('1512453979798-5ea266f8880c', 'The Dubai skyline at sunset'),
  dubaiDesert: img('1760261799672-2469a6c4c6f3', 'Courtyard pool and palms at a desert resort in the UAE'),
  dunes: img('1612899326681-66508905b4ce', 'Travellers crossing golden sand dunes in the Arabian desert'),
  doha: img('1685113872064-de4180a0ea93', 'Towers of the Doha skyline in Qatar'),
  dohaKatara: img('1700901742651-6b353164caf3', 'The crescent-shaped Katara Towers on the Doha waterfront'),
  qatarMuseum: img('1700901683937-fc9b9c2252b2', 'The desert-rose architecture of the National Museum of Qatar'),

  // International
  cappadocia: img('1604156789095-3348604c0f43', 'Hot-air balloons drifting over the valleys of Cappadocia, Türkiye'),
  istanbul: img('1623439844752-524658b16ce6', 'The Süleymaniye Mosque above the Istanbul skyline'),
  kualaLumpur: img('1566914447826-bf04e54bf1be', 'The Petronas Twin Towers in Kuala Lumpur, Malaysia'),
  thailand: img('1534008897995-27a23e859048', 'Longtail boats on turquoise water between limestone cliffs, Thailand'),
  europe: img('1530122037265-a5f1f91d3b99', 'Chalets in the Lauterbrunnen valley, Switzerland'),
  paris: img('1502602898657-3e91760cbb34', 'The Eiffel Tower over the Seine in Paris'),
  alula: img('1590959914819-b767b9fe4cfb', 'Traditional mud-brick architecture reflected in water in AlUla, Saudi Arabia'),
  maldives: img('1590523277543-a94d2e4eb00b', 'Overwater villas above a turquoise lagoon in the Maldives'),

  // Themes
  couple: img('1563196638-8c9457546e5f', 'A couple walking hand in hand at golden hour'),
  beachPalms: img('1602002418816-5c0aeef426aa', 'Two loungers under palm trees on a white-sand beach'),
  resortPool: img('1540541338287-41700207dee6', 'An infinity pool overlooking the ocean at a resort'),
  family: img('1597524678053-5e6fef52d8a3', 'A family enjoying the beach, a child on her father’s shoulders'),
  familyMountains: img('1559054109-82d938dac629', 'Friends and family resting on rocks above a mountain valley'),
  cabin: img('1483450388369-9ed95738483c', 'Passengers inside an aircraft cabin'),
  businessAirport: img('1768793096346-6d84e93e4195', 'A traveller working on a laptop by an airport window at sunrise'),
  handshake: img('1686771416282-3888ddaf249b', 'Two professionals shaking hands across a desk'),
  passport: img('1581553673739-c4906b5d0de8', 'An open passport with colourful visa stamps'),
  passportClose: img('1454496406107-dc34337da8d6', 'A passport resting on travel documents'),
  hotelBudget: img('1582719478250-c89cae4dc85b', 'A simple, well-kept hotel room with crisp white linen'),
  hotelMid: img('1618773928121-c32242e63f39', 'A bright hotel bedroom with neutral furnishings'),
  hotelPremium: img('1611892440504-42a792e24d32', 'A premium hotel bedroom with a private terrace'),
  hotelLuxury: img('1578683010236-d716f9a3f461', 'A spacious luxury suite with a lounge area'),
  resort: img('1561501900-3701fa6a0864', 'A resort building beside an infinity pool'),
  wing: img('1530469641172-8ac15d0a7d6a', 'View of an aircraft wing above the clouds from a window seat'),
  wingSunset: img('1551748629-08d916ed6682', 'An aircraft flying above a sea of clouds'),
  planning: img('1488646953014-85cb44e25828', 'Camera, notebook and travel essentials laid out for trip planning'),
};

/** Build an Unsplash CDN URL for a photo id. */
export const unsplash = (id, w = 1200, q = 75) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
