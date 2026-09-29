import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Process from '../components/sections/Process.jsx';
import FAQ from '../components/sections/FAQ.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { services } from '../data/services.js';
import { images } from '../data/images.js';
import { faqs } from '../data/content.js';
import { faqJsonLd, useSeo } from '../lib/hooks.js';

export default function Services() {
  useSeo({
    title: 'Travel Services',
    description:
      'International and domestic flight tickets, holidays, corporate travel, hotels, visa assistance, travel insurance, Hajj & Umrah, sightseeing, group travel and reservations — all from e-Journey Travel & Tours, Karachi.',
    jsonLd: faqJsonLd(faqs),
  });

  return (
    <>
      <PageHero
        image={images.wing}
        eyebrow="Our Services"
        title={<>Everything You Need for <em>Your Journey</em></>}
        lead="From the first ticket to the final destination, our travel specialists help make every part of your journey simple."
        crumbs={[{ label: 'Services' }]}
      >
        <Link to="/plan-your-trip" className="btn btn--gold btn--lg">
          Request a Quote <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/contact" className="btn btn--ghost-light btn--lg">Talk to a Consultant</Link>
      </PageHero>

      <Section tone="ivory">
        <SectionHeading
          eyebrow="Service Portfolio"
          title={<>Twelve Ways We <em>Take Care of You</em></>}
          lead="Use one service or combine several — a single consultant can coordinate your tickets, stay, visa and insurance together."
          align="center"
        />
        <Reveal as="nav" className="jump-nav" aria-label="Jump to a service">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.title}</a>
          ))}
        </Reveal>

        <ul className="service-detail-grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            const dedicated = !s.to.startsWith('/services');
            return (
              <Reveal as="li" key={s.id} id={s.id} delay={(i % 2) * 100} className="service-detail">
                <div className="service-detail__head">
                  <span className="service-detail__icon"><Icon size={26} aria-hidden="true" /></span>
                  <span className="service-detail__no">{s.no}</span>
                </div>
                <h2 className="service-detail__title">{s.title}</h2>
                <p className="service-detail__short">{s.short}</p>
                <p className="service-detail__long">{s.long}</p>
                <ul className="service-detail__points">
                  {s.points.map((p) => (
                    <li key={p}><Check size={15} aria-hidden="true" /> {p}</li>
                  ))}
                </ul>
                <div className="service-detail__actions">
                  <Link to={`/contact?type=${encodeURIComponent(s.travelType)}#inquiry`} className="btn btn--forest btn--sm">
                    Request This Service <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  {dedicated && (
                    <Link to={s.to} className="link-arrow">Learn more <ArrowRight size={15} aria-hidden="true" /></Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Process />
      <FAQ />
      <FinalCTA />
    </>
  );
}
