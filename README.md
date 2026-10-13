# e-Journey Travel & Tours — Website

**Travel Beyond Destinations.** · *Your Travel Peace Is Our Guarantee*

Premium, responsive marketing and lead-generation website for e-Journey Travel & Tours, Karachi.
Built with React 19, Vite and React Router. No UI framework: the design system is hand-written CSS.

## Run it

```bash
npm install
npm run dev        # http://localhost:5174 (see .claude/launch.json) or Vite's default port
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — kept short: hero, the five core services, featured tour packages, Umrah types, popular visa prices, Pakistan gallery, call to action |
| `/about` | Company profile, mission, vision, philosophy, values, divisions |
| `/services` | All 12 services with detail |
| `/destinations` | All tour packages + Pakistan and international destinations |
| `/ticketing` | Domestic (`#domestic`) and international (`#international`) air tickets with a fare request form |
| `/international-tours` | Tour packages (country filter) + tailor-made destinations |
| `/pakistan-tours` | Domestic destinations with tour-details downloads |
| `/umrah` | Current Umrah packages 1448-H (`#packages`, one tab per flyer), Group / Individual / Five Star Umrah (`#group`, `#individual`, `#five-star`), FAQ, Umrah inquiry. `/hajj-umrah` redirects here |
| `/visa-assistance` | Visa prices, document checklists and processing times by country (filter + search), case preparation, visa form. `/visa` redirects here |
| `/corporate-travel` · `/hotels` · `/travel-insurance` | Service pages with dedicated forms |
| `/contact` | Contact details, map, universal travel inquiry form |
| `/plan-your-trip` | Five-step custom trip builder (accepts `?package=`, `?style=`, `?destination=`) |
| `/packages/:slug` | Package detail: hotels, inclusions, price options, validity, flyer download, booking request |

## Editing content

Everything the agency is likely to change lives in `src/data/`:

- `site.js` — address, phone numbers, email, **WhatsApp number**, social links
- `packages.js` — international tour packages from the flyers (prices, hotels, inclusions, `validTill`, flyer file in `public/flyers/`).
  Packages run on roughly two-month validity: once `validTill` passes, the price is hidden automatically and
  visitors are asked for the current price, so update the price and date (and the flyer) when a new offer comes out.
- `visas.js` — visa prices by country (e-Visa / sticker, `sc: true` for “+ SC”), `docs` checklists, `processing` times, case preparation list
- `umrah.js` — current Umrah group packages from the flyers (`umrahPackages`: flights, hotels, prices, child/infant
  rates, flyer file); departed flight dates are marked automatically. Also the Umrah types. Rates change every 15 days to a month: set `price` and `validTill` on a type to publish
  a rate; it hides itself after that date and visitors are asked for the current rate
- `destinations.js` — Pakistan and international destination guides
- `services.js` — the 12 services
- `content.js` — navigation, FAQs, process steps, values, **testimonials**
- `reviews.js` — Google / Facebook review links and reviews (the homepage Reviews section appears once filled)
- `images.js` — every photo (Unsplash id + alt text). Swap an `id` to change a photo.

## Logo

The official logo lives in `public/brand/` (transparent PNGs in original colours plus `-light`
versions for dark backgrounds, favicons and the social share image). They are generated from
`brand-source/ejourney-logo-master.png`. If the artwork changes, replace the master and run:

```bash
python scripts/process_logo.py
```

## Hero video

The homepage hero is a montage of famous places (Hunza, Makkah, Dubai, Cappadocia, Madinah,
Lahore, Maldives), configured in `src/data/heroVideos.js`. Clips are free Pexels videos streamed
from the Pexels CDN:
- Desktop plays muted video with crossfades, captions and progress bars, plus a pause button.
- Phones and data-saver connections see a still-image slideshow instead.
- Reduced-motion users see a single still image.

For production, it's best to self-host short, compressed versions (about 1–2 MB each) in `public/video/`
and point `hd`/`sd` at them.

## Inquiry forms — connect before launch

All forms (hero widget, trip builder, contact and service forms) send a travel **inquiry**. They
never show fake prices or booking confirmations.

- **With a form endpoint (recommended):** set `VITE_INQUIRY_ENDPOINT` in `.env` to any service that
  accepts a JSON POST, such as Formspree, Web3Forms, Getform or your own API. Visitors then see
  *"Thank you! Our travel consultant will contact you shortly."*
- **Without one:** visitors are offered one-tap **Send via WhatsApp / Send by Email**, with the request
  already written out, so no lead is lost.

A hidden honeypot field filters simple spam bots.

## SEO

- Page titles, meta descriptions, Open Graph tags and canonical URLs are set per page (`useSeo`).
- `TravelAgency` structured data is in `index.html`. FAQ pages add `FAQPage` data and package pages add `TouristTrip` data.
- Set `VITE_SITE_URL=https://your-domain` in `.env` and the build emits `sitemap.xml` and `robots.txt`.
  Also replace the relative `og:image` in `index.html` with an absolute URL on your domain.

## Deploying

This is a single-page app, so all routes must serve `index.html`:
- **Netlify:** `public/_redirects` is included.
- **Vercel:** `vercel.json` is included.
- **Other hosts:** add an equivalent "rewrite all to /index.html" rule.

## Before going live — checklist

- [ ] Replace placeholder testimonials in `content.js` with verified customer feedback (set `verified: true`)
- [ ] Add official Facebook / Instagram / LinkedIn URLs in `site.js`
- [ ] Set `VITE_INQUIRY_ENDPOINT` and `VITE_SITE_URL`
- [ ] Confirm package prices, `validTill` dates and visa prices are current
- [ ] Optionally replace stock photography with the agency's own images

## Credits

Photography via [Unsplash](https://unsplash.com) (Unsplash License). Hero video clips via [Pexels](https://www.pexels.com) (Pexels License) — videographers credited in `src/data/heroVideos.js`. Icons by [Lucide](https://lucide.dev).
