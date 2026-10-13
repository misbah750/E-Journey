import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { HajjNote, Ornament } from './UmrahBand.jsx';
import { umrahTypes, umrahRateNote, umrahFromPrice } from '../../data/umrah.js';
import { formatPKR } from '../../data/packages.js';

/** Compact Umrah summary for the homepage: the three Umrah types, linking into the Umrah page. */
export default function UmrahTypesBand() {
  const from = umrahFromPrice();
  return (
    <Section id="umrah" tone="emerald" className="umrah-band">
      <div className="umrah-band__grid">
        <Reveal className="umrah-band__intro">
          <p className="eyebrow">Umrah Services</p>
          <h2 className="h2">A Journey of <em>Faith</em></h2>
          <Ornament />
          <p className="lead">
            Visa, tickets, hotels near the Haramain and scholar guidance — arranged for you, so your heart stays on worship.
          </p>
          {from && (
            <p className="umrah-band__from">
              Umrah packages 1448-H from <strong>{formatPKR(from)}</strong> per person
            </p>
          )}
          <p className="rate-note rate-note--light"><CalendarClock size={16} aria-hidden="true" /> {umrahRateNote}</p>
          <div className="umrah-band__actions">
            <Link to="/umrah#packages" className="btn btn--gold">
              View Umrah Packages <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <HajjNote />
          </div>
        </Reveal>
        <ul className="umrah-band__types">
          {umrahTypes.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 100}>
              <Link to={`/umrah#${t.id}`} className="umrah-mini">
                <span className="umrah-mini__media">
                  <Img image={t.image} sizes="(max-width: 760px) 30vw, 160px" maxWidth={480} />
                </span>
                <span className="umrah-mini__body">
                  <strong>{t.title}</strong>
                  <small>{t.tagline}</small>
                </span>
                <ArrowRight size={18} aria-hidden="true" className="umrah-mini__go" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
