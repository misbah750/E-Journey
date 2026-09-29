import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { services } from '../../data/services.js';

export function ServiceCard({ service, index = 0 }) {
  const Icon = service.icon;
  return (
    <Reveal as="li" delay={(index % 4) * 70} className="service-card">
      <Link to={service.to} className="service-card__link">
        <span className="service-card__no">{service.no}</span>
        <span className="service-card__icon"><Icon size={24} aria-hidden="true" /></span>
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__text">{service.short}</p>
        <span className="link-arrow">
          Explore Service <ArrowRight size={16} aria-hidden="true" />
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
