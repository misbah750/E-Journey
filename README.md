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

## Editing the website from /admin (no code)

Day-to-day changes are made in the browser at **https://YOUR-SITE/admin**:

| Section | What you can change |
| --- | --- |
| **Tour Packages** | Add, edit, hide or delete international and domestic packages: photos, cities, hotels, inclusions, prices, "valid till" date, flyer |
| **Umrah Packages** | One entry per Umrah flyer: airline, flight dates and times, hotels, Sharing / Quad / Triple / Double prices, child and infant rates, flyer |
| **Visa Prices** | Countries, prices, processing time, documents checklist |
| **Settings** | Contact details (address, numbers, emails, Director, social links), Umrah visa price and rate note, Google / Facebook ratings and reviews |

Press **Publish** and the change is saved to GitHub; Vercel rebuilds the live site automatically in about 1 to 2 minutes.
Uploaded photos and flyers are stored in `public/uploads/`. Turning off **Show on website** hides an item without deleting it.

### One-time setup (about 5 minutes)

The admin page logs in with GitHub. It needs a GitHub "OAuth app" and two keys in Vercel:

1. In GitHub, open **Settings → Developer settings → OAuth Apps → New OAuth App** and fill in:
   - **Application name:** e-Journey Admin
   - **Homepage URL:** your live address, e.g. `https://www.ejourney.net` (or the `...vercel.app` address until the domain is moved)
   - **Authorization callback URL:** the same address followed by `/api/callback`, e.g. `https://www.ejourney.net/api/callback`
2. Click **Register application**, copy the **Client ID**, then click **Generate a new client secret** and copy it.
3. In Vercel, open the project → **Settings → Environment Variables** and add:
   - `OAUTH_GITHUB_CLIENT_ID` = the Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = the client secret
4. In Vercel → **Deployments**, open the latest deployment's menu and choose **Redeploy**.
5. Open `https://YOUR-SITE/admin` and click **Login with GitHub**.

Notes:
- Everyone who edits needs a GitHub account with write access to the repository
  (GitHub repo → **Settings → Collaborators → Add people**).
- When the website moves to a new domain, update the OAuth app's Homepage and callback URLs to the new domain.
- The login asks for access to public repositories. If the repository is ever made private, change
  `auth_scope: 'public_repo'` to `auth_scope: 'repo'` in `public/admin/config.js`.
- If you also edit code on your computer, run `git pull` first so you have the latest admin changes.

## Editing content in code

Editable content lives in `src/content/` as JSON (the same files the admin page edits):

- `packages/*.json` — tour packages (file name = web address `/packages/<name>`). Once `validTill` passes, the
  price is hidden automatically and visitors are asked for the current price.
- `umrah-packages/*.json` — Umrah flyers (flights, hotels, prices); departed flight dates are marked automatically.
- `visas/*.json` — visa prices, processing times and document checklist (`basic`, `ticket`, `tourist`, `full`, `umrah`).
- `settings/contact.json`, `settings/umrah.json`, `settings/reviews.json`.

Other content is in `src/data/`:

- `destinations.js` — Pakistan and international destination guides
- `services.js` — the 12 services
- `content.js` — navigation, FAQs, process steps, values, **testimonials**
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
