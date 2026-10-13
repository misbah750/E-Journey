import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight, Check, CircleCheck, Moon, MapPin, Share2, Link2, Mail, Hotel, CalendarClock, Download, Info,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Img from '../components/ui/Img.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import PackageCard from '../components/sections/PackageCard.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon, FacebookIcon } from '../components/ui/BrandIcons.jsx';
import NotFound from './NotFound.jsx';
import {
  packages, getPackage, legacyPackageRedirects, formatPKR, formatDate, isExpired, lowestPrice,
} from '../data/packages.js';
import { unsplash } from '../data/images.js';
import { whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

const pad = (n) => String(n).padStart(2, '0');

function ShareLinks({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="share">
      <span className="share__label"><Share2 size={16} aria-hidden="true" /> Share package</span>
      <div className="share__links">
        <a href={`https://wa.me/?text=${encodeURIComponent(`${title}: ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><WhatsAppIcon size={18} /></a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><FacebookIcon size={18} /></a>
        <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} aria-label="Share by email"><Mail size={18} aria-hidden="true" /></a>
        <button type="button" onClick={copy} aria-label="Copy link"><Link2 size={18} aria-hidden="true" /></button>
      </div>
      <span className="share__status" role="status" aria-live="polite">{copied ? 'Link copied' : ''}</span>
    </div>
  );
}

export default function PackageDetail() {
  const { slug } = useParams();
  const pkg = getPackage(slug);
  const [option, setOption] = useState(0);
  const expired = pkg ? isExpired(pkg) : false;

  useSeo(
    pkg
      ? {
          title: `${pkg.title} Tour Package from Pakistan`,
          description: `${pkg.title}: ${pkg.nights} nights, ${pkg.stars} hotels. ${pkg.summary}${expired ? '' : ` From ${formatPKR(lowestPrice(pkg))} per person.`}`,
          image: unsplash(pkg.images[0].id, 1200),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: pkg.title,
            description: pkg.summary,
            image: unsplash(pkg.images[0].id, 1200),
            itinerary: pkg.cities.map((c) => ({ '@type': 'Place', name: c })),
            provider: { '@type': 'TravelAgency', name: 'e-Journey Travel & Tours' },
            ...(expired
              ? {}
              : {
                  offers: pkg.prices.map((p) => ({
                    '@type': 'Offer', price: p.amount, priceCurrency: 'PKR', description: `${p.label}, twin sharing`, priceValidUntil: pkg.validTill,
                  })),
                }),
          },
        }
      : { title: 'Package not found' },
  );

  if (!pkg) {
    const to = legacyPackageRedirects[slug];
    return to ? <Navigate to={to} replace /> : <NotFound />;
  }

  const multi = pkg.prices.length > 1;
  const chosen = pkg.prices[option];
  const packageLabel = multi ? `${pkg.title} (${chosen.label})` : pkg.title;
  const related = [
    ...packages.filter((p) => p.slug !== pkg.slug && p.country === pkg.country),
    ...packages.filter((p) => p.country !== pkg.country),
  ].slice(0, 3);

  return (
    <>
      <PageHero
        image={pkg.images[0]}
        eyebrow={`${pkg.country} · ${pkg.stars}`}
        title={<>{pkg.title}</>}
        lead={pkg.summary}
        crumbs={[{ label: 'International Tours', to: '/international-tours' }, { label: pkg.title }]}
      >
        <a href="#book" className="btn btn--gold btn--lg">Book Now <ArrowRight size={18} aria-hidden="true" /></a>
        <a href={pkg.flyer} download className="btn btn--ghost-light btn--lg"><Download size={18} aria-hidden="true" /> Download Flyer</a>
      </PageHero>

      <section className="facts-strip facts-strip--package" aria-label="Package summary">
        <div className="container">
          <ul>
            <li><Moon size={22} aria-hidden="true" /><span><small>Duration</small><strong>{pad(pkg.nights)} Nights · {pad(pkg.days)} Days</strong></span></li>
            <li><MapPin size={22} aria-hidden="true" /><span><small>Destinations</small><strong>{pkg.cities.join(' · ')}</strong></span></li>
            <li><Hotel size={22} aria-hidden="true" /><span><small>Hotels</small><strong>{pkg.stars} · Twin sharing</strong></span></li>
            <li>
              <CalendarClock size={22} aria-hidden="true" />
              <span><small>Price validity</small><strong>{expired ? 'Ask for current price' : `Valid till ${formatDate(pkg.validTill)}`}</strong></span>
            </li>
          </ul>
        </div>
      </section>

      <Section tone="ivory" className="pd">
        <div className="pd__grid">
          <div className="pd__main">
            <Reveal className="pd-card">
              <p className="eyebrow">Package Overview</p>
              <h2 className="h3">What’s in this package</h2>
              <p className="body-copy">{pkg.summary}</p>

              <h3 className="pd-card__sub">Hotels</h3>
              <ul className="pd-hotels">
                {pkg.hotels.map((h) => (
                  <li key={h}><Hotel size={17} aria-hidden="true" /> {h}</li>
                ))}
                {multi && pkg.prices.map((p) => p.hotel && (
                  <li key={p.label}><Hotel size={17} aria-hidden="true" /> {p.label}: {p.hotel}</li>
                ))}
              </ul>

              <h3 className="pd-card__sub">What’s included</h3>
              <ul className="check-list">
                {pkg.inclusions.map((item) => (
                  <li key={item}><Check size={16} aria-hidden="true" /> {item}</li>
                ))}
              </ul>
              {pkg.airfareNotIncluded && (
                <p className="pd-flag"><Info size={16} aria-hidden="true" /> Airline ticket is not included. We can quote flights separately.</p>
              )}
              <p className="pd-note">Terms and conditions apply. Hotels are as named or similar; final details are confirmed by your consultant at the time of booking.</p>
            </Reveal>

            <Reveal className="pd-flyer">
              <a href={pkg.flyer} target="_blank" rel="noopener noreferrer" className="pd-flyer__img" aria-label={`Open the ${pkg.title} flyer`}>
                <img src={pkg.flyer} alt={`${pkg.title} package flyer`} loading="lazy" decoding="async" width="1100" height="1400" />
              </a>
              <div className="pd-flyer__body">
                <p className="eyebrow">Package Flyer</p>
                <h2 className="h3">Save or share the flyer</h2>
                <p>The full package on one page, handy to keep on your phone or send to family.</p>
                <a href={pkg.flyer} download className="btn btn--forest"><Download size={18} aria-hidden="true" /> Download Flyer</a>
              </div>
            </Reveal>

            <div className="pd-media">
              {pkg.images.map((im, i) => (
                <Reveal key={im.id} variant="mask" delay={i * 120} className="pd-media__item">
                  <Img image={im} sizes="(max-width: 900px) 50vw, 30vw" maxWidth={1080} />
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="pd__aside" aria-label="Pricing and booking">
            <div className="price-card">
              <div className="price-card__top">
                <span><Moon size={15} aria-hidden="true" /> {pad(pkg.nights)} Nights · {pad(pkg.days)} Days</span>
                <span>{pkg.stars}</span>
              </div>

              {expired ? (
                <>
                  <span className="price-card__label">Price on request</span>
                  <strong className="price-card__amount price-card__amount--ask">Ask for the current price</strong>
                  <span className="price-card__basis">Package prices are refreshed about every two months.</span>
                </>
              ) : (
                <>
                  {multi && (
                    <div className="price-card__config">
                      <span id="option-label">Choose hotel category</span>
                      <div role="radiogroup" aria-labelledby="option-label" style={{ gridTemplateColumns: `repeat(${pkg.prices.length}, minmax(0, 1fr))` }}>
                        {pkg.prices.map((p, i) => (
                          <button key={p.label} type="button" role="radio" aria-checked={option === i} onClick={() => setOption(i)}>
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className="price-card__label">{multi ? `${chosen.label} package` : 'Package price'}</span>
                  <strong className="price-card__amount">{formatPKR(chosen.amount)}</strong>
                  <span className="price-card__basis">(Per person, twin sharing)</span>
                  {chosen.hotel && <span className="price-card__note">{chosen.hotel}</span>}
                  <span className="price-card__valid"><CalendarClock size={15} aria-hidden="true" /> Valid till {formatDate(pkg.validTill)}</span>
                </>
              )}
              {pkg.airfareNotIncluded && <span className="price-card__note">*Airline ticket not included</span>}

              <p className="price-card__guarantee"><CircleCheck size={17} aria-hidden="true" /> Your Travel Peace Is Our Guarantee</p>

              <a href="#book" className="btn btn--gold btn--lg btn--block">Confirm &amp; Book Now</a>
              <a href={pkg.flyer} download className="btn btn--ghost-light btn--block"><Download size={17} aria-hidden="true" /> Download Flyer</a>
            </div>

            <div className="consult-card">
              <p className="eyebrow">Still have questions?</p>
              <h3 className="h3">Talk to our travel consultant</h3>
              <p>Different dates, a room upgrade or flights from your city? Our team will tailor the package for you.</p>
              <a href={whatsappUrl(`Hello e-Journey, I'm interested in the ${packageLabel} package.`)} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                <WhatsAppIcon size={18} /> Chat via WhatsApp
              </a>
            </div>

            <ShareLinks title={`${pkg.title} | e-Journey Travel & Tours`} />
          </aside>
        </div>
      </Section>

      <Section id="book" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Request Booking"
            title={<>Reserve <em>{pkg.title}</em></>}
            lead="Send your details and preferred dates. A consultant will confirm availability, hotels and the final price with you before anything is booked."
          >
            <FormAside image={pkg.images[1] || pkg.images[0]} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm
              key={packageLabel}
              variant="booking"
              source={`Package: ${packageLabel}`}
              defaults={{ travelType: 'Holiday', package: packageLabel }}
              submitLabel="Request Booking"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="You May Also Like" title={<>More Tour <em>Packages</em></>} align="center" />
        <div className="pkg-grid">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="pkg-more">
          <Link to="/international-tours#packages" className="btn btn--outline">View all packages <ArrowRight size={18} aria-hidden="true" /></Link>
        </Reveal>
      </Section>
    </>
  );
}
