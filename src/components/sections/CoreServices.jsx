import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Plane, Palmtree, Stamp, ShieldCheck } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { KaabaIcon } from '../ui/BrandIcons.jsx';
import { images } from '../../data/images.js';

export const coreServices = [
  { to: '/ticketing', title: 'Ticketing', text: 'Domestic & international air tickets', icon: Plane, image: images.wing },
  { to: '/international-tours', title: 'Tourism', text: 'Tour packages abroad & across Pakistan', icon: Palmtree, image: images.thailand },
  { to: '/visa-assistance', title: 'Visa', text: 'e-Visas, sticker visas & case preparation', icon: Stamp, image: images.passport },
  { to: '/umrah', title: 'Umrah', text: 'Group, individual & five star Umrah', icon: KaabaIcon, image: images.kaaba },
  { to: '/travel-insurance', title: 'Travel Insurance', text: 'Cover for every kind of trip', icon: ShieldCheck, image: images.family },
];

/** The five things e-Journey does — the homepage's map of the site. */
export default function CoreServices() {
  return (
    <Section id="services" tone="white" className="core">
      <div className="section-head-row">
        <SectionHeading
          eyebrow="What We Do"
          title={<>Everything for Your Trip, <em>In One Place</em></>}
        />
        <Reveal delay={120} className="section-head-row__aside">
          <p className="lead">
            A Karachi travel agency for air tickets, holidays, visas, Umrah and travel insurance, with a real consultant
            behind every booking.
          </p>
          <Link to="/about" className="link-arrow link-arrow--strong">
            About e-Journey <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
      <ul className="core__grid">
        {coreServices.map(({ to, title, text, icon: Icon, image }, i) => (
          <Reveal as="li" key={to} delay={i * 70} className="core__item">
            <Link to={to} className="core__link">
              <Img image={image} sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 20vw" maxWidth={768} />
              <span className="core__shade" aria-hidden="true" />
              <span className="core__icon"><Icon size={22} aria-hidden="true" /></span>
              <span className="core__body">
                <span className="core__title">{title}</span>
                <span className="core__text">{text}</span>
              </span>
              <span className="core__go" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
