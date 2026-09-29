import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Phone } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { WhatsAppIcon } from '../ui/BrandIcons.jsx';
import { faqs as defaultFaqs } from '../../data/content.js';
import { site, whatsappUrl } from '../../data/site.js';

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="accordion">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{f.q}</span>
                <Plus size={20} aria-hidden="true" className="accordion__icon" />
              </button>
            </h3>
            <div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`} className="accordion__panel" inert={!isOpen}>
              <div><p>{f.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQ({ items = defaultFaqs, tone = 'ivory', title }) {
  return (
    <Section id="faq" tone={tone} className="faq">
      <div className="faq__layout">
        <Reveal className="faq__intro">
          <p className="eyebrow">FAQ</p>
          <h2 className="h2">{title || <>Questions, <em>Answered</em></>}</h2>
          <p className="lead">Can’t find what you’re looking for? Our consultants are happy to help.</p>
          <div className="faq__help">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
              <WhatsAppIcon size={18} /> Ask on WhatsApp
            </a>
            <a href={`tel:${site.phones[0].tel}`} className="btn btn--outline">
              <Phone size={18} aria-hidden="true" /> {site.phones[0].label}
            </a>
          </div>
          <Link to="/contact" className="link-arrow link-arrow--strong">Talk to a travel consultant</Link>
        </Reveal>
        <Reveal delay={120}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
