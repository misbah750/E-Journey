import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { services } from '../../data/services.js';

export function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon;
  return (
    <Reveal as="li" delay={(index % 4) * 70} className="service-card">
      <Link to={service.to} className="service-card__link">
        <span className="service-card__media">
          <Img image={service.image} sizes="(max-width: 500px) 100vw, (max-width: 1100px) 33vw, 25vw" maxWidth={768} />
          <span className="service-card__no">{service.no}</span>
        </span>
        <span className="service-card__icon"><Icon size={22} aria-hidden="true" /></span>
        <span className="service-card__body">
          <h3 className="service-card__title">{service.title}</h3>
          <span className="service-card__text">{service.short}</span>
          <span className="link-arrow">
            Explore Service <ArrowRight size={16} aria-hidden="true" />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export default function ServicesGrid({ id = 'services', tone = 'white' }) {
  return (
    <Section id={id} tone={tone}>
      <div className="section-head-row">
        <SectionHeading
          eyebrow="Our Services"
          title={<>Everything You Need for <em>Your Journey</em></>}
        />
        <Reveal delay={120} className="section-head-row__aside">
          <p className="lead">
            From the first ticket to the final destination, our travel specialists help make every part of your journey
            simple.
          </p>
          <Link to="/services" className="link-arrow link-arrow--strong">
            View the full service portfolio <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
      <ul className="services-grid">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </ul>
    </Section>
  );
}
