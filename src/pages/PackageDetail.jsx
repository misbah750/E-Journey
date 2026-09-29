import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight, Check, CircleCheck, Moon, MapPin, Users, Plane, Share2, Link2, Mail, BedDouble,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import PackageCard from '../components/sections/PackageCard.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon, FacebookIcon } from '../components/ui/BrandIcons.jsx';
import NotFound from './NotFound.jsx';
import { packages, getPackage, formatPKR } from '../data/packages.js';
import { unsplash } from '../data/images.js';
import { whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

const CONFIGS = ['Per Person', 'Duo / Couple', 'Family'];

function stayPlan(stays) {
  let night = 1;
  return stays.map((s) => {
    const from = night;
    night += s.nights;
    return { ...s, from, to: night - 1 };
  });
}

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
      <span className="share__label"><Share2 size={16} aria-hidden="true" /> Share itinerary</span>
      <div className="share__links">
        <a href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><WhatsAppIcon size={18} /></a>
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
  const [config, setConfig] = useState(CONFIGS[0]);

  useSeo(
    pkg
      ? {
          title: `${pkg.name} — ${pkg.titleAccent} ${pkg.titleRest}`,
          description: `${pkg.summary} ${pkg.stays.map((s) => `${s.nights} nights in ${s.place}`).join(', ')}. ${pkg.priceLabel} ${formatPKR(pkg.price)} (${pkg.basis}).`,
          image: unsplash(pkg.images[0].id, 1200),
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: `${pkg.titleAccent} ${pkg.titleRest}`,
            description: pkg.summary,
            image: unsplash(pkg.images[0].id, 1200),
            itinerary: pkg.stays.map((s) => ({ '@type': 'Place', name: s.place })),
            provider: { '@type': 'TravelAgency', name: 'e-Journey Travel & Tours' },
            offers: { '@type': 'Offer', price: pkg.price, priceCurrency: 'PKR', description: pkg.basis },
          },
        }
      : { title: 'Package not found' },
  );

  if (!pkg) return <NotFound />;

  const plan = stayPlan(pkg.stays);
  const related = [...packages.filter((p) => p.slug !== pkg.slug && p.category === pkg.category), ...packages.filter((p) => p.category !== pkg.category)].slice(0, 2);
  const title = `${pkg.titleAccent} ${pkg.titleRest}`;
  const isSpiritual = pkg.category === 'spiritual';

  return (
    <>
      <PageHero
        tone={isSpiritual ? 'emerald' : 'forest'}
        image={pkg.images[0]}
        eyebrow={`${pkg.tier} · ${pkg.tierLine}`}
        title={<>{pkg.titleAccent} <em>{pkg.titleRest}</em></>}
        lead={pkg.summary}
        crumbs={[
          { label: isSpiritual ? 'Hajj & Umrah' : 'International Tours', to: isSpiritual ? '/hajj-umrah' : '/international-tours' },
          { label: pkg.shortTitle },
        ]}
      >
        <a href="#book" className="btn btn--gold btn--lg">Book Now <ArrowRight size={18} aria-hidden="true" /></a>
        <Link to={`/plan-your-trip?package=${pkg.slug}`} className="btn btn--ghost-light btn--lg">Customize</Link>
      </PageHero>

      <section className="facts-strip facts-strip--package" aria-label="Package summary">
        <div className="container">
          <ul>
            <li><Moon size={22} aria-hidden="true" /><span><small>Total duration</small><strong>{pkg.nights} Nights</strong></span></li>
            <li><MapPin size={22} aria-hidden="true" /><span><small>Stay</small><strong>{pkg.stays.map((s) => `${s.nights} ${s.place}`).join(' · ')}</strong></span></li>
            <li><BedDouble size={22} aria-hidden="true" /><span><small>Basis</small><strong>{pkg.basis.replace('Starting price · ', '')}</strong></span></li>
            {pkg.departure && <li><Plane size={22} aria-hidden="true" /><span><small>Travel</small><strong>{pkg.departure}</strong></span></li>}
          </ul>
        </div>
      </section>

      <Section tone="ivory" className="pd">
        <div className="pd__grid">
          <div className="pd__main">
            <Reveal className="pd-card">
              <p className="eyebrow">Comprehensive Experience</p>
              <h2 className="h3">Package Overview</h2>
              <p className="body-copy">
                {pkg.summary} Our team handles the arrangements so you can focus on the experience itself — and every
                element can be adjusted by your consultant.
              </p>
              <ul className="pd-highlights">
                {pkg.highlights.map((h) => (
                  <li key={h}><CircleCheck size={18} aria-hidden="true" /> {h}</li>
                ))}
              </ul>
              <h3 className="pd-card__sub">What’s included</h3>
              <ul className="check-list">
                {pkg.inclusions.map((item) => (
                  <li key={item}><Check size={16} aria-hidden="true" /> {item}</li>
                ))}
              </ul>
              <p className="pd-note">Final inclusions, hotels and flight timings are confirmed by your consultant at the time of booking.</p>
            </Reveal>

            <div className="pd-media">
              {pkg.images.map((im, i) => (
                <Reveal key={im.id} variant="mask" delay={i * 120} className="pd-media__item">
                  <Img image={im} sizes="(max-width: 900px) 50vw, 30vw" maxWidth={1080} />
                </Reveal>
              ))}
            </div>

            <div className="pd-itinerary">
              <Reveal>
                <p className="eyebrow">Journey Breakdown</p>
                <h2 className="h3">{pkg.itinerary ? 'Package Itinerary' : 'Stay Plan'}</h2>
                <p className="pd-itinerary__lead">
                  {pkg.itinerary
                    ? 'Designed for maximum spiritual focus and physical ease.'
                    : 'How your nights are divided. A detailed day-by-day plan is shared by your consultant with your quotation.'}
                </p>
              </Reveal>
              <ol className="timeline">
                {pkg.itinerary
                  ? pkg.itinerary.map((d, i) => (
                      <Reveal as="li" key={d.days} delay={i * 60}>
                        <span className="timeline__tag">{d.days}</span>
                        <div>
                          <h3>{d.title}</h3>
                          <p>{d.text}</p>
                        </div>
                      </Reveal>
                    ))
                  : plan.map((s, i) => (
                      <Reveal as="li" key={s.place} delay={i * 60}>
                        <span className="timeline__tag">Nights {String(s.from).padStart(2, '0')} – {String(s.to).padStart(2, '0')}</span>
                        <div>
                          <h3>{s.nights} Nights in {s.place}</h3>
                          <p>{i === 0 ? 'Arrival, transfer and check-in, followed by your programme in ' : 'Transfer and check-in, continuing your journey in '}{s.place}.</p>
                        </div>
                      </Reveal>
                    ))}
              </ol>
            </div>
          </div>

          <aside className="pd__aside" aria-label="Pricing and booking">
            <div className="price-card">
              <div className="price-card__top">
                <span><Moon size={15} aria-hidden="true" /> {pkg.name}</span>
              </div>
              <span className="price-card__label">{pkg.priceLabel}</span>
              <strong className="price-card__amount">{formatPKR(pkg.price)}</strong>
              <span className="price-card__basis">({pkg.basis})</span>
              {pkg.priceNote && <span className="price-card__note">*{pkg.priceNote}</span>}

              <p className="price-card__guarantee"><CircleCheck size={17} aria-hidden="true" /> Your Travel Peace Is Our Guarantee</p>

              <div className="price-card__config">
                <span id="config-label">Choose configuration</span>
                <div role="radiogroup" aria-labelledby="config-label">
                  {CONFIGS.map((c) => (
                    <button key={c} type="button" role="radio" aria-checked={config === c} onClick={() => setConfig(c)}>
                      {c === 'Per Person' ? <Users size={15} aria-hidden="true" /> : null}{c}
                    </button>
                  ))}
                </div>
              </div>

              <a href="#book" className="btn btn--gold btn--lg btn--block">Confirm &amp; Book Now</a>
              <Link to={`/plan-your-trip?package=${pkg.slug}`} className="btn btn--ghost-light btn--block">Customize Itinerary</Link>
            </div>

            <div className="consult-card">
              <p className="eyebrow">Still have questions?</p>
              <h3 className="h3">Talk to our {isSpiritual ? 'pilgrimage' : 'travel'} consultant</h3>
              <p>Custom hotel distances, room upgrades or special assistance — our team is on standby to help.</p>
              <a href={whatsappUrl(`Hello e-Journey, I'm interested in the ${pkg.name} (${title}).`)} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                <WhatsAppIcon size={18} /> Chat via WhatsApp
              </a>
            </div>

            <ShareLinks title={`${title} — e-Journey Travel & Tours`} />
          </aside>
        </div>
      </Section>

      <Section id="book" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Request Booking"
            title={<>Reserve Your <em>{pkg.shortTitle}</em></>}
            lead="Send your details and preferred dates. A consultant will confirm availability, hotels and the final price with you before anything is booked."
          />
          <Reveal delay={120}>
            <InquiryForm
              key={config}
              variant="booking"
              source={`Package: ${pkg.name}`}
              defaults={{ travelType: isSpiritual ? (pkg.slug.includes('umrah') ? 'Umrah' : 'Other') : 'Holiday', package: `${title} (${pkg.name})`, configuration: config }}
              submitLabel="Request Booking"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="You May Also Like" title={<>More Signature <em>Journeys</em></>} align="center" />
        <div className="pkg-grid">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
