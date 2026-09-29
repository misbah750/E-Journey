import { Link } from 'react-router-dom';
import { ArrowRight, Tent, Hotel, Bus, UtensilsCrossed, Headset, ClipboardList, BookOpen } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { KaabaIcon } from '../ui/BrandIcons.jsx';
import { images } from '../../data/images.js';

export const pilgrimHighlights = [
  { icon: KaabaIcon, label: 'Umrah Packages' },
  { icon: Tent, label: 'Hajj Packages' },
  { icon: Hotel, label: 'Accommodation' },
  { icon: Bus, label: 'Transportation' },
  { icon: UtensilsCrossed, label: 'Meals' },
  { icon: Headset, label: 'Travel Assistance' },
  { icon: ClipboardList, label: 'Pre-Travel Guidance' },
  { icon: BookOpen, label: 'Religious Guidance' },
];

export function Ornament() {
  return (
    <svg className="ornament" viewBox="0 0 160 16" aria-hidden="true">
      <path d="M0 8h62M98 8h62" stroke="currentColor" strokeWidth="1" />
      <path d="m80 1 2.4 4.6L87 8l-4.6 2.4L80 15l-2.4-4.6L73 8l4.6-2.4L80 1Z" fill="currentColor" />
      <circle cx="68" cy="8" r="1.6" fill="currentColor" />
      <circle cx="92" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function HajjBand({ cta = true }) {
  return (
    <Section id="hajj-umrah" tone="emerald" className="pilgrim">
      <div className="split split--media-left">
        <div className="pilgrim__media">
          <Reveal variant="mask" className="arch arch--tall">
            <Img image={images.kaaba} sizes="(max-width: 960px) 60vw, 26vw" maxWidth={1080} />
          </Reveal>
          <Reveal variant="up" delay={220} className="arch arch--short">
            <Img image={images.madinah} sizes="(max-width: 960px) 45vw, 20vw" maxWidth={1080} />
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow">Hajj &amp; Umrah Services</p>
            <h2 className="h2">A Journey of <em>Faith</em></h2>
            <Ornament />
            <p className="lead">
              Travel with confidence and peace of mind. Our experienced team assists pilgrims with travel, accommodation,
              meals, organized packages, and guidance throughout their spiritual journey.
            </p>
            <p className="body-copy">
              Religious scholars provide guidance before and during Hajj and Umrah, so you can give your full attention to
              worship.
            </p>
          </Reveal>
          <ul className="icon-grid icon-grid--gold">
            {pilgrimHighlights.map(({ icon: Icon, label }, i) => (
              <Reveal as="li" key={label} delay={i * 60}>
                <Icon size={19} aria-hidden="true" /> {label}
              </Reveal>
            ))}
          </ul>
          {cta && (
            <Reveal delay={200}>
              <Link to="/hajj-umrah" className="btn btn--gold">
                Explore Hajj &amp; Umrah Packages <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
