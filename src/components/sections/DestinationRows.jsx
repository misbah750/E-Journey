import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Users } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Alternating editorial rows — one per destination, each anchored by its slug. */
export default function DestinationRows({ items, headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <ul className="dest-rows">
      {items.map((d, i) => (
        <li key={d.slug} id={d.slug} className={`dest-row ${i % 2 ? 'dest-row--flip' : ''}`}>
          <Reveal variant="mask" className="dest-row__media">
            <Img image={d.image} sizes="(max-width: 900px) 100vw, 50vw" />
          </Reveal>
          <Reveal delay={120} className="dest-row__body">
            <span className="dest-row__index">{String(i + 1).padStart(2, '0')}</span>
            <p className="eyebrow">{d.region}</p>
            <H className="h2 dest-row__title">{d.name}</H>
            <p className="body-copy">{d.description}</p>
            <ul className="tag-list" aria-label={`Highlights of ${d.name}`}>
              {d.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <dl className="dest-row__meta">
              {d.bestTime && (
                <div>
                  <dt><CalendarDays size={16} aria-hidden="true" /> Best time</dt>
                  <dd>{d.bestTime}</dd>
                </div>
              )}
              <div>
                <dt><Users size={16} aria-hidden="true" /> Ideal for</dt>
                <dd>{d.idealFor.join(' · ')}</dd>
              </div>
            </dl>
            <Link to={`/plan-your-trip?destination=${encodeURIComponent(d.name)}`} className="btn btn--forest">
              Plan a trip to {d.name} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
