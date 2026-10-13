import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { pakistanDestinations, internationalDestinations } from '../../data/destinations.js';

export function DestinationCard({ dest, base, featured = false, index = 0 }) {
  return (
    <Reveal as="li" variant="scale" delay={index * 80} className={`dest-card ${featured ? 'dest-card--featured' : ''}`}>
      <Link to={`${base}#${dest.slug}`} className="dest-card__link">
        <Img image={dest.image} sizes={featured ? '(max-width: 760px) 80vw, 50vw' : '(max-width: 760px) 80vw, 25vw'} />
        <span className="dest-card__body">
          <span className="dest-card__region">{dest.region}</span>
          <span className="dest-card__name">{dest.name}</span>
          <span className="dest-card__text">{dest.short}</span>
          <span className="dest-card__cta">
            Explore Destination <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

const TABS = [
  { id: 'pakistan', label: 'Pakistan', items: pakistanDestinations.slice(0, 5), base: '/pakistan-tours', all: '/pakistan-tours', allLabel: 'Explore Pakistan tours' },
  { id: 'international', label: 'International', items: internationalDestinations.slice(0, 5), base: '/international-tours', all: '/international-tours', allLabel: 'Explore international tours' },
];

export default function Destinations({ tone = 'ivory' }) {
  const [active, setActive] = useState('pakistan');
  const refs = useRef([]);
  const tab = TABS.find((t) => t.id === active);

  const onKey = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + 1) % TABS.length;
    setActive(TABS[next].id);
    refs.current[next]?.focus();
  };

  return (
    <Section id="destinations" tone={tone}>
      <div className="section-head-row">
        <SectionHeading
          eyebrow="Featured Destinations"
          title={<>Where Will Your Journey <em>Take You?</em></>}
          lead="Thoughtfully designed travel experiences, from the valleys of the Karakoram to the skylines of the Gulf, planned around you."
        />
        <Reveal delay={120} className="section-head-row__aside section-head-row__aside--end">
          <div className="segmented" role="tablist" aria-label="Destination region">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => (refs.current[i] = el)}
                type="button"
                role="tab"
                aria-selected={active === t.id}
                aria-controls="dest-panel"
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <ul className="dest-grid" id="dest-panel" role="tabpanel" key={active}>
        {tab.items.map((d, i) => (
          <DestinationCard key={d.slug} dest={d} base={tab.base} featured={i === 0} index={i} />
        ))}
      </ul>

      <div className="center-cta">
        <Link to={tab.all} className="btn btn--outline">
          {tab.allLabel} <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
