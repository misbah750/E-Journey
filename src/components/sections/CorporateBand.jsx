import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Hotel, Stamp, ShieldCheck, Siren, BriefcaseBusiness, SlidersHorizontal } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { images } from '../../data/images.js';

export const corporateServices = [
  { icon: Plane, label: 'Business flight booking' },
  { icon: Hotel, label: 'Hotel reservations' },
  { icon: Stamp, label: 'Visa assistance' },
  { icon: ShieldCheck, label: 'Travel insurance' },
  { icon: Siren, label: 'Emergency travel assistance' },
  { icon: BriefcaseBusiness, label: 'Corporate travel management' },
  { icon: SlidersHorizontal, label: 'Customized business travel solutions' },
];

export default function CorporateBand({ showCta = true }) {
  return (
    <Section id="corporate" tone="forest" className="corporate">
      <div className="split">
        <div>
          <Reveal>
            <p className="eyebrow">Corporate Travel</p>
            <h2 className="h2">Business Travel, <em>Simplified.</em></h2>
            <p className="lead">
              A dedicated corporate travel operation for companies that need cost-effective arrangements and responsive
              service, so your people arrive prepared and your travel budget goes further.
            </p>
          </Reveal>
          <ul className="icon-grid">
            {corporateServices.map(({ icon: Icon, label }, i) => (
              <Reveal as="li" key={label} delay={i * 60}>
                <Icon size={19} aria-hidden="true" /> {label}
              </Reveal>
            ))}
          </ul>
          {showCta && (
            <Reveal delay={200}>
              <Link to="/corporate-travel#corporate-inquiry" className="btn btn--gold">
                Talk to Corporate Travel Team <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </div>
        <div className="corporate__media">
          <Reveal variant="mask" className="corporate__main">
            <Img image={images.businessAirport} sizes="(max-width: 960px) 100vw, 45vw" />
          </Reveal>
          <Reveal variant="up" delay={220} className="corporate__card">
            <span className="corporate__card-kicker">Dedicated desk</span>
            <strong>One point of contact for your company’s tickets, hotels, visas and insurance.</strong>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
