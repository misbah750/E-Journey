/* global CMS */
/**
 * Admin page (Decap CMS) for e-Journey Travel & Tours.
 *
 * Everything here edits the JSON files in src/content/. Pressing "Publish" saves the change to GitHub,
 * and Vercel rebuilds the live website automatically (about 1 to 2 minutes).
 * Login uses GitHub through /api/auth and /api/callback (see README).
 */
(function () {
  const origin = window.location.origin;
  const isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

  const date = (name, label, hint) => ({
    name,
    label,
    hint,
    widget: 'datetime',
    format: 'YYYY-MM-DD',
    date_format: 'DD MMM YYYY',
    time_format: false,
    picker_utc: true,
    required: false,
  });
  const text = (name, label, extra = {}) => ({ name, label, widget: 'string', ...extra });
  const num = (name, label, extra = {}) => ({ name, label, widget: 'number', value_type: 'int', required: false, ...extra });
  const list = (name, label, itemLabel, extra = {}) => ({
    name,
    label,
    widget: 'list',
    field: { name: 'item', label: itemLabel, widget: 'string' },
    ...extra,
  });
  const published = {
    name: 'published',
    label: 'Show on website',
    widget: 'boolean',
    default: true,
    hint: 'Turn off to hide this without deleting it.',
  };
  const order = num('order', 'Order', { default: 100, hint: 'Smaller numbers show first.' });

  const packages = {
    name: 'packages',
    label: 'Tour Packages',
    label_singular: 'Tour Package',
    description: 'International and domestic tour packages (from your flyers). Prices hide automatically after "Valid till".',
    folder: 'src/content/packages',
    extension: 'json',
    format: 'json',
    create: true,
    delete: true,
    slug: '{{slug}}',
    identifier_field: 'title',
    summary: '{{title}} · {{region}} · valid till {{validTill}}',
    sortable_fields: ['order', 'title', 'validTill'],
    editor: { preview: false },
    fields: [
      text('title', 'Package name', { hint: 'e.g. Bangkok & Pattaya. The web address is made from this name when you create the package.' }),
      {
        name: 'region',
        label: 'Region',
        widget: 'select',
        options: ['International', 'Domestic'],
        default: 'International',
        hint: 'International shows on International Tours; Domestic shows on Pakistan Tours.',
      },
      text('country', 'Country', { hint: 'e.g. Thailand, or Pakistan for domestic tours.' }),
      list('cities', 'Cities / places', 'City'),
      num('nights', 'Nights'),
      num('days', 'Days'),
      text('stars', 'Hotel category', { required: false, hint: 'e.g. 4 Star' }),
      {
        name: 'photos',
        label: 'Photos (1 or 2)',
        widget: 'list',
        min: 1,
        max: 2,
        field: { name: 'photo', label: 'Photo', widget: 'image' },
        hint: 'Landscape photos look best. The first photo is the main one.',
      },
      { name: 'summary', label: 'Short description', widget: 'text' },
      list('hotels', 'Hotels', 'Hotel', { required: false, hint: 'e.g. 4 nights at Ibis Bangkok Sukhumvit 4 / similar' }),
      list('inclusions', "What's included", 'Item'),
      {
        name: 'prices',
        label: 'Prices (PKR per person)',
        widget: 'list',
        summary: '{{fields.label}}: {{fields.amount}}',
        hint: 'One price, or several options such as 3 Star and 4 Star.',
        fields: [
          text('label', 'Option name', { default: 'Per person', hint: 'e.g. Per person, 3 Star, 4 Star' }),
          num('amount', 'Price (PKR)', { required: true }),
          text('hotel', 'Hotel for this option', { required: false }),
        ],
      },
      { name: 'airfareNotIncluded', label: 'Airline ticket NOT included', widget: 'boolean', default: false },
      date('validTill', 'Price valid till', 'After this date the price is hidden and visitors are asked for the current price.'),
      { name: 'flyer', label: 'Flyer image', widget: 'image', required: false, hint: 'Visitors can download it from the package page.' },
      order,
      published,
    ],
  };

  const leg = {
    name: 'legs',
    label: 'Flights',
    widget: 'list',
    summary: '{{fields.flight}} {{fields.date}} {{fields.from}} → {{fields.to}}',
    fields: [
      text('flight', 'Flight number', { hint: 'e.g. PK761' }),
      { ...date('date', 'Date'), required: true },
      text('from', 'From', { hint: 'e.g. KHI' }),
      text('to', 'To', { hint: 'e.g. JED' }),
      text('dep', 'Departs', { hint: 'e.g. 19:20' }),
      text('arr', 'Arrives', { hint: 'e.g. 21:40' }),
    ],
  };

  const umrahPackages = {
    name: 'umrah-packages',
    label: 'Umrah Packages',
    label_singular: 'Umrah Package (one flyer)',
    description: 'One entry per Umrah flyer: airline, flights, hotels and prices. Departed dates are marked automatically.',
    folder: 'src/content/umrah-packages',
    extension: 'json',
    format: 'json',
    create: true,
    delete: true,
    slug: '{{slug}}',
    identifier_field: 'title',
    summary: '{{title}}',
    editor: { preview: false },
    fields: [
      text('title', 'Name (for this list only)', { hint: 'e.g. PIA 20 Nights (from 13 Oct)' }),
      text('airline', 'Airline', { hint: 'e.g. PIA, Airsial, SalamAir' }),
      text('via', 'Via (connecting city)', { required: false, hint: 'e.g. Muscat. Leave empty for direct flights.' }),
      num('nights', 'Nights'),
      num('days', 'Days'),
      num('makkah', 'Nights in Makkah'),
      num('madinah', 'Nights in Madinah'),
      text('baggage', 'Baggage & meals', { required: false, default: '20 KG + 30 KG · 7 KG hand carry · meals' }),
      {
        name: 'flights',
        label: 'Flight options',
        widget: 'list',
        summary: '{{fields.label}}',
        hint: 'Add one option per departure date. Each option has its outbound and return flights.',
        fields: [text('label', 'Option label', { required: false, hint: 'Optional, e.g. 22 days' }), leg],
      },
      {
        name: 'packages',
        label: 'Hotels & prices',
        widget: 'list',
        summary: '{{fields.makkahHotel}} / {{fields.madinahHotel}}',
        hint: 'Package 01, 02, 03... in the same order as the flyer. Leave a price empty to show "Ask".',
        fields: [
          text('makkahHotel', 'Makkah hotel'),
          text('makkahNote', 'Makkah distance / note', { required: false, hint: 'e.g. 600 m, or Shuttle service' }),
          text('madinahHotel', 'Madinah hotel'),
          text('madinahNote', 'Madinah distance / note', { required: false }),
          num('sharing', 'Sharing (PKR)'),
          num('quad', 'Quad (PKR)'),
          num('triple', 'Triple (PKR)'),
          num('double', 'Double (PKR)'),
        ],
      },
      num('child', 'Child price without bed (PKR)'),
      num('infant', 'Infant price (PKR)'),
      { name: 'flyer', label: 'Flyer image', widget: 'image', required: false },
      published,
    ],
  };

  const visas = {
    name: 'visas',
    label: 'Visa Prices',
    label_singular: 'Visa Country',
    description: 'Visa prices, documents and processing time per country.',
    folder: 'src/content/visas',
    extension: 'json',
    format: 'json',
    create: true,
    delete: true,
    slug: '{{slug}}',
    identifier_field: 'country',
    summary: '{{country}} · {{region}}',
    sortable_fields: ['order', 'country'],
    editor: { preview: false },
    fields: [
      text('country', 'Country'),
      text('code', 'Flag code', { required: false, hint: 'Two-letter country code for the flag, e.g. ae (UAE), my (Malaysia), th (Thailand).' }),
      {
        name: 'region',
        label: 'Region',
        widget: 'select',
        options: ['Gulf & Middle East', 'Asia', 'Central Asia', 'Africa', 'Americas & Oceania'],
        default: 'Asia',
        hint: 'The group this country is listed under on the visa page.',
      },
      {
        name: 'options',
        label: 'Visa options & prices',
        widget: 'list',
        summary: '{{fields.label}}: {{fields.currency}} {{fields.amount}}',
        fields: [
          text('label', 'Option', { hint: 'e.g. 30 days, Single entry, Tourist visa' }),
          { name: 'type', label: 'Type', widget: 'select', options: [{ label: 'e-Visa / paper visa', value: 'e-visa' }, { label: 'Sticker visa', value: 'sticker' }], default: 'e-visa' },
          { name: 'currency', label: 'Currency', widget: 'select', options: ['PKR', 'AED', 'SAR', 'USD', 'AUD', 'NZD', 'CAD', 'GBP', 'EUR'], default: 'PKR' },
          num('amount', 'Price', { hint: 'Leave empty to show "Ask for rate".' }),
          { name: 'sc', label: '+ service charges', widget: 'boolean', default: false },
        ],
      },
      text('processing', 'Processing time', { required: false, hint: 'e.g. 3–5 working days' }),
      {
        name: 'docs',
        label: 'Documents checklist',
        widget: 'select',
        default: 'tourist',
        options: [
          { label: 'Basic: passport, photo, CNIC', value: 'basic' },
          { label: 'Basic + return ticket & hotel', value: 'ticket' },
          { label: 'Tourist: adds bank statement & job proof', value: 'tourist' },
          { label: 'Full file (case preparation)', value: 'full' },
          { label: 'Umrah: adds vaccination certificate', value: 'umrah' },
        ],
      },
      text('link', 'Extra link', { required: false, hint: 'Optional page on this site, e.g. /umrah' }),
      order,
      published,
    ],
  };

  const settings = {
    name: 'settings',
    label: 'Settings',
    description: 'Contact details, Umrah rates and reviews.',
    editor: { preview: false },
    files: [
      {
        name: 'contact',
        label: 'Contact Details',
        file: 'src/content/settings/contact.json',
        fields: [
          list('addressLines', 'Office address (one line per row)', 'Line'),
          text('area', 'Area (short)', { hint: 'e.g. North Nazimabad, Karachi' }),
          text('mapQuery', 'Map search text', { hint: 'What Google Maps should search for, e.g. JF Plaza, Block D, North Nazimabad, Karachi' }),
          list('mobiles', 'Mobile numbers', 'Number', { hint: 'The first number is the main "Call us" number.' }),
          text('whatsapp', 'WhatsApp number', { hint: 'e.g. +92 335 5100991' }),
          text('email', 'Main email'),
          text('emailAlt', 'Second email', { required: false }),
          text('directorName', 'Director name', { required: false }),
          text('directorTitle', 'Director title', { required: false }),
          text('directorEmail', 'Director email', { required: false }),
          text('facebook', 'Facebook page link', { required: false }),
          text('instagram', 'Instagram link', { required: false }),
          text('linkedin', 'LinkedIn link', { required: false }),
        ],
      },
      {
        name: 'umrah',
        label: 'Umrah Settings',
        file: 'src/content/settings/umrah.json',
        fields: [
          text('rateNote', 'Rate note', { hint: 'Shown above the Umrah packages.' }),
          text('visaPrice', 'Umrah visa price', { required: false, hint: 'e.g. SAR 535. Leave empty to show "Ask for the current rate".' }),
          num('individualPrice', 'Individual Umrah: from price (PKR)', { hint: 'Optional.' }),
          date('individualValidTill', 'Individual Umrah price valid till'),
          num('fiveStarPrice', 'Five Star Umrah: from price (PKR)', { hint: 'Optional.' }),
          date('fiveStarValidTill', 'Five Star Umrah price valid till'),
        ],
      },
      {
        name: 'reviews',
        label: 'Reviews',
        file: 'src/content/settings/reviews.json',
        fields: [
          text('googleLink', 'Google reviews link', { required: false }),
          { name: 'googleRating', label: 'Google rating (e.g. 5.0)', widget: 'number', value_type: 'float', step: 0.1, required: false },
          num('googleCount', 'Number of Google reviews'),
          text('facebookLink', 'Facebook reviews link', { required: false }),
          num('facebookRecommendPercent', 'Facebook: % recommend'),
          num('facebookCount', 'Number of Facebook reviews'),
          {
            name: 'reviews',
            label: 'Reviews to show (copy exactly as posted)',
            widget: 'list',
            required: false,
            summary: '{{fields.name}} ({{fields.source}})',
            fields: [
              text('name', 'Reviewer name'),
              { name: 'source', label: 'From', widget: 'select', options: ['Google', 'Facebook'], default: 'Google' },
              num('rating', 'Stars (1 to 5)', { hint: 'Google only. Leave empty for Facebook "recommends".', min: 1, max: 5 }),
              { name: 'text', label: 'Review text', widget: 'text' },
              date('date', 'Date'),
            ],
          },
        ],
      },
    ],
  };

  CMS.init({
    config: {
      load_config_file: false,
      backend: {
        name: 'github',
        repo: 'misbah750/E-Journey',
        branch: 'main',
        base_url: origin,
        auth_endpoint: 'api/auth',
        auth_scope: 'public_repo',
        commit_messages: {
          create: 'Add {{collection}} "{{slug}}" (admin)',
          update: 'Update {{collection}} "{{slug}}" (admin)',
          delete: 'Delete {{collection}} "{{slug}}" (admin)',
          uploadMedia: 'Upload "{{path}}" (admin)',
          deleteMedia: 'Delete "{{path}}" (admin)',
        },
      },
      local_backend: isLocal,
      site_url: origin,
      display_url: origin,
      logo_url: '/brand/logo-full.png',
      media_folder: 'public/uploads',
      public_folder: '/uploads',
      collections: [packages, umrahPackages, visas, settings],
    },
  });
})();
