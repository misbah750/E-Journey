import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { visas, flagUrl, formatVisaPrice, visaFrom } from '../../data/visas.js';

const POPULAR = ['Dubai (UAE)', 'Malaysia', 'Thailand', 'Singapore', 'Azerbaijan', 'Sri Lanka', 'Türkiye', 'Uzbekistan'];

/** Homepage teaser: popular visas with their starting price. */
export default function VisaPreview() {
  const list = POPULAR.map((name) => visas.find((v) => v.country === name)).filter(Boolean);
  return (
    <Section id="visa" tone="ivory" className="visa-preview">
      <div className="visa-preview__grid">
        <SectionHeading
          eyebrow="Visa Services"
          title={<>Visa Prices, <em>Clearly Listed</em></>}
          lead={`e-Visas, sticker visas and case preparation for ${visas.length}+ countries, plus USA, UK, Schengen, Canada and Australia files.`}
        >
          <Link to="/visa-assistance" className="btn btn--forest">
            See All Visa Prices <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </SectionHeading>
        <ul className="visa-chips">
          {list.map((v, i) => (
            <Reveal as="li" key={v.country} delay={(i % 4) * 60}>
              <Link to="/visa-assistance#visa-prices" className="visa-chip">
                <img src={flagUrl(v.code)} alt="" width="36" height="27" loading="lazy" decoding="async" />
                <span>
                  <strong>{v.country}</strong>
                  <small>from {formatVisaPrice(visaFrom(v))}</small>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
