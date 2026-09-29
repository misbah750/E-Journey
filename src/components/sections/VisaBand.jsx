import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { images } from '../../data/images.js';

export const visaServices = [
  'Visa information',
  'Application guidance',
  'Documentation support',
  'Passport collection & dispatch assistance',
  'Application updates',
  'Corporate visa support',
  'Leisure traveler support',
];

export const visaSteps = [
  { title: 'Requirements', text: 'We explain exactly what your destination asks for.' },
  { title: 'Documents', text: 'A clear checklist and help preparing each item.' },
  { title: 'Submission', text: 'Application lodged and passports handled with care.' },
  { title: 'Updates', text: 'You stay informed until your passport is returned.' },
];

export default function VisaBand() {
  return (
    <Section id="visa" tone="ivory" className="visa">
      <div className="split split--media-left">
        <div className="visa__media">
          <Reveal variant="mask" className="visa__main">
            <Img image={images.passport} sizes="(max-width: 960px) 100vw, 45vw" />
          </Reveal>
          <Reveal variant="up" delay={220} className="visa__steps">
            <p className="visa__steps-title">How it works</p>
            <ol>
              {visaSteps.map((s, i) => (
                <li key={s.title}>
                  <span>{String(i + 1).padStart(2, '0')}</span> {s.title}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow">Visa Assistance</p>
            <h2 className="h2">Visa Assistance Without the <em>Guesswork</em></h2>
            <p className="lead">
              Visa procedures can be time-consuming. Our team helps travelers understand requirements, prepare
              applications, coordinate document handling, and stay informed throughout the process.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="check-list">
              {visaServices.map((s) => (
                <li key={s}><Check size={16} aria-hidden="true" /> {s}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <Link to="/visa-assistance" className="btn btn--forest">
              Get Visa Assistance <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
