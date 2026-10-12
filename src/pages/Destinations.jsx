import { Link } from 'react-router-dom';
import { ArrowRight, Globe2, Route, Wallet } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Packages from '../components/sections/Packages.jsx';
import { DestinationCard } from '../components/sections/Destinations.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { pakistanDestinations, internationalDestinations } from '../data/destinations.js';
import { useSeo } from '../lib/hooks.js';

const facts = [
  { icon: Globe2, title: 'Pakistan & Worldwide', text: 'Northern Areas, Asia, Central Asia & the Red Sea' },
  { icon: Route, title: 'Custom or Group', text: 'Independent tours and packaged departures' },
  { icon: Wallet, title: 'Transparent PKR Rates', text: 'Clear pricing, confirmed by a consultant' },
];

export default function Destinations() {
  useSeo({
    title: 'Destinations & Tour Packages',
    description:
      'Explore e-Journey destinations — international tour packages to Thailand, Malaysia, Bali, Sri Lanka, Uzbekistan, Azerbaijan and Egypt, and Hunza, Skardu and Northern Pakistan tours.',
  });

  return (
    <>
      <PageHero
        image={images.dubaiSunset}
        eyebrow="Destinations Catalog"
        title={<>Explore Our <em>Journeys.</em></>}
        lead="Ready-to-book tour packages abroad and the mountain valleys of Pakistan — every destination planned with care and peace of mind."
        crumbs={[{ label: 'Destinations' }]}
      />

      <section className="facts-strip" aria-label="Highlights">
        <div className="container">
          <ul>
            {facts.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80}>
                <Icon size={22} aria-hidden="true" />
                <span><strong>{title}</strong><small>{text}</small></span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Packages tone="ivory" />

      <Section id="pakistan" tone="white">
        <div className="section-head-row">
          <SectionHeading eyebrow="Pakistan" title={<>The Valleys of the <em>North &amp; Beyond</em></>} />
          <Reveal delay={120} className="section-head-row__aside section-head-row__aside--end">
            <Link to="/pakistan-tours" className="btn btn--outline">All Pakistan tours <ArrowRight size={18} aria-hidden="true" /></Link>
          </Reveal>
        </div>
        <ul className="dest-grid dest-grid--uniform">
          {pakistanDestinations.map((d, i) => (
            <DestinationCard key={d.slug} dest={d} base="/pakistan-tours" index={i % 4} />
          ))}
        </ul>
      </Section>

      <Section id="international" tone="sand">
        <div className="section-head-row">
          <SectionHeading eyebrow="International" title={<>The World, <em>Thoughtfully Planned</em></>} />
          <Reveal delay={120} className="section-head-row__aside section-head-row__aside--end">
            <Link to="/international-tours" className="btn btn--outline">All international tours <ArrowRight size={18} aria-hidden="true" /></Link>
          </Reveal>
        </div>
        <ul className="dest-grid dest-grid--uniform">
          {internationalDestinations.map((d, i) => (
            <DestinationCard key={d.slug} dest={d} base="/international-tours" index={i % 4} />
          ))}
        </ul>
      </Section>

      <FinalCTA />
    </>
  );
}
