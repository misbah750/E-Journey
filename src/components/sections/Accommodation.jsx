import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { images } from '../../data/images.js';

export const stayCategories = [
  { label: 'Budget', text: 'Clean, well-located stays and self-catering units.', image: images.hotelBudget },
  { label: 'Mid-range', text: 'Comfortable hotels with the essentials done well.', image: images.hotelMid },
  { label: 'Premium', text: 'Upscale rooms, great locations and extra space.', image: images.hotelPremium },
  { label: 'Luxury', text: 'Exclusive deluxe hotels and suites.', image: images.hotelLuxury },
  { label: 'Resorts', text: 'Beach, desert and mountain resort escapes.', image: images.resort },
];

export default function Accommodation({ cta = true, tone = 'sand' }) {
  return (
    <Section id="accommodation" tone={tone} className="stays">
      <div className="section-head-row">
        <SectionHeading eyebrow="Hotels & Accommodation" title={<>Stay Somewhere <em>You’ll Love</em></>} />
        <Reveal delay={120} className="section-head-row__aside">
          <p className="lead">
            From low-budget self-catering units to exclusive deluxe hotels, e-Journey arranges accommodation across every
            category and destination — matched to how you like to travel.
          </p>
          {cta && (
            <Link to="/hotels" className="btn btn--forest">
              Find Accommodation <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </Reveal>
      </div>
      <ul className="stays__grid">
        {stayCategories.map((c, i) => (
          <Reveal as="li" key={c.label} variant="scale" delay={i * 80} className="stay-card">
            <Img image={c.image} sizes="(max-width: 760px) 70vw, 20vw" maxWidth={1080} />
            <span className="stay-card__body">
              <span className="stay-card__no">0{i + 1}</span>
              <span className="stay-card__label">{c.label}</span>
              <span className="stay-card__text">{c.text}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
