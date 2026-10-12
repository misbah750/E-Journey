import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import { services } from '../data/services.js';
import { whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

const scopes = [
  { id: 'domestic', eyebrow: 'Domestic Tickets', service: services.find((s) => s.id === 'domestic-tickets') },
  { id: 'international', eyebrow: 'International Tickets', service: services.find((s) => s.id === 'international-tickets') },
];

export default function Ticketing() {
  useSeo({
    title: 'Air Tickets — Domestic & International Flights from Pakistan',
    description:
      'Domestic and international air ticketing from Karachi by e-Journey Travel & Tours — Skardu, Gilgit and city-to-city flights in Pakistan, and one-way, return and multi-city fares worldwide.',
  });

  return (
    <>
      <PageHero
        image={images.wing}
        eyebrow="Ticketing"
        title={<>Air Tickets, <em>Domestic &amp; International</em></>}
        lead="Tell us where and when — we compare the options and book the fare that fits your schedule, with help on date changes and reissues."
        crumbs={[{ label: 'Ticketing' }]}
      >
        <a href="#fare-request" className="btn btn--gold btn--lg">Request a Fare <ArrowRight size={18} aria-hidden="true" /></a>
        <a href={whatsappUrl('Hello e-Journey, I need an air ticket quote.')} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light btn--lg">
          <WhatsAppIcon size={18} /> WhatsApp a Request
        </a>
      </PageHero>

      <Section tone="ivory">
        <ul className="ticket-scopes">
          {scopes.map(({ id, eyebrow, service }, i) => (
            <Reveal as="li" key={id} id={id} delay={i * 120} className="ticket-scope">
              <div className="ticket-scope__media">
                <Img image={service.image} sizes="(max-width: 900px) 100vw, 45vw" maxWidth={1080} />
              </div>
              <div className="ticket-scope__body">
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="h3">{service.short}</h2>
                <p className="body-copy">{service.long}</p>
                <ul className="check-list">
                  {service.points.map((p) => (
                    <li key={p}><Check size={16} aria-hidden="true" /> {p}</li>
                  ))}
                </ul>
                <a href="#fare-request" className="btn btn--forest">
                  Request a {id === 'domestic' ? 'Domestic' : 'International'} Fare <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="fare-request" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Fare Request"
            title={<>Where Are You <em>Flying?</em></>}
            lead="Share your route, dates and number of passengers. A consultant will come back with available fares and timings."
          >
            <FormAside image={images.wingSunset} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="flights" source="Ticketing page" defaults={{ travelType: 'Flights' }} submitLabel="Get Fare Options" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
