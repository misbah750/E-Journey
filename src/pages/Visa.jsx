import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Search, FolderCheck, BadgeCheck } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import {
  visas, visaTypes, casePreparation, doneBaseCountries, flagUrl, formatVisaPrice,
} from '../data/visas.js';
import { whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

const TYPE_LABEL = { 'e-visa': 'e-Visa', sticker: 'Sticker' };

export function Flag({ code, size = 40 }) {
  return <img className="flag" src={flagUrl(code)} alt="" width={size} height={Math.round(size * 0.75)} loading="lazy" decoding="async" />;
}

export default function Visa() {
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');

  useSeo({
    title: 'Visa Services & Prices from Pakistan',
    description:
      'Visa prices from e-Journey Travel & Tours, Karachi — Dubai, Malaysia, Thailand, Singapore, Azerbaijan, Sri Lanka, Türkiye, Uzbekistan and more, plus case preparation for the USA, UK, Schengen, Canada and Australia.',
  });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visas
      .filter((v) => !q || v.country.toLowerCase().includes(q))
      .map((v) => {
        if (type === 'done-base') return v.doneBase ? v : null;
        if (type === 'all') return v;
        const options = v.options.filter((o) => o.type === type);
        return options.length ? { ...v, options } : null;
      })
      .filter(Boolean);
  }, [type, query]);

  return (
    <>
      <PageHero
        image={images.passport}
        eyebrow="Visa Services"
        title={<>Visa Services &amp; <em>Prices</em></>}
        lead="e-Visas, sticker visas and full case preparation — clear prices, a document checklist, and updates until your visa is issued."
        crumbs={[{ label: 'Visa' }]}
      >
        <a href="#visa-prices" className="btn btn--gold btn--lg">See Visa Prices <ArrowRight size={18} aria-hidden="true" /></a>
        <a href={whatsappUrl('Hello e-Journey, I need help with a visa.')} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light btn--lg">
          <WhatsAppIcon size={18} /> Ask on WhatsApp
        </a>
      </PageHero>

      <Section id="visa-prices" tone="ivory">
        <SectionHeading
          eyebrow="Visa Prices"
          title={<>Choose Your <em>Destination</em></>}
          lead="Prices are per applicant. “+ SC” means service charges are added to the listed fee."
          align="center"
        />

        <Reveal className="visa-tools">
          <div className="filter-chips" role="group" aria-label="Filter by visa type">
            {visaTypes.map((t) => (
              <button key={t.id} type="button" aria-pressed={type === t.id} onClick={() => setType(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <label className="visa-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search country</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search country…" />
          </label>
        </Reveal>

        {list.length ? (
          <ul className="visa-grid">
            {list.map((v) => (
              <li key={v.country} className="visa-card">
                <div className="visa-card__head">
                  <Flag code={v.code} />
                  <h3>{v.country}</h3>
                  {v.doneBase && <span className="visa-card__badge"><BadgeCheck size={13} aria-hidden="true" /> Done base</span>}
                </div>
                <ul className="visa-card__opts">
                  {v.options.map((o) => (
                    <li key={o.label}>
                      <span>{o.label}<small>{TYPE_LABEL[o.type]}</small></span>
                      <strong>{formatVisaPrice(o)}</strong>
                    </li>
                  ))}
                </ul>
                <div className="visa-card__actions">
                  <a href="#visa-inquiry" onClick={() => setCountry(v.country)} className="link-arrow">
                    Apply <ArrowRight size={15} aria-hidden="true" />
                  </a>
                  {v.link ? (
                    <Link to={v.link} className="visa-card__wa">Umrah packages</Link>
                  ) : (
                    <a
                      href={whatsappUrl(`Hello e-Journey, I'd like to apply for a ${v.country} visa.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="visa-card__wa"
                      aria-label={`Ask about a ${v.country} visa on WhatsApp`}
                    >
                      <WhatsAppIcon size={16} /> WhatsApp
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="visa-empty">
            <p>We don’t have a listed price for “{query}” yet — ask us and we’ll check the requirements for you.</p>
            <a href={whatsappUrl(`Hello e-Journey, do you process visas for ${query}?`)} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
              <WhatsAppIcon size={18} /> Ask on WhatsApp
            </a>
          </div>
        )}
      </Section>

      <Section tone="forest" className="visa-extra">
        <div className="visa-extra__grid">
          <Reveal className="visa-extra__card">
            <span className="visa-extra__icon"><FolderCheck size={24} aria-hidden="true" /></span>
            <p className="eyebrow eyebrow--light">Case Preparation</p>
            <h2 className="h3">USA, UK, Schengen &amp; more</h2>
            <p>For visas that need a full application file, we prepare your case and documents and guide you through the appointment.</p>
            <ul className="flag-list">
              {casePreparation.map((c) => (
                <li key={c.country}><Flag code={c.code} size={28} /> {c.country}</li>
              ))}
            </ul>
            <a href="#visa-inquiry" className="btn btn--gold">Start My Case <ArrowRight size={18} aria-hidden="true" /></a>
          </Reveal>
          <Reveal delay={120} className="visa-extra__card">
            <span className="visa-extra__icon"><BadgeCheck size={24} aria-hidden="true" /></span>
            <p className="eyebrow eyebrow--light">Done Base Visa Available</p>
            <h2 className="h3">{doneBaseCountries.join(', ').replace(/, ([^,]*)$/, ' & $1')}</h2>
            <p>Done base visas are available for these countries. Ask our team for the current terms and processing time.</p>
            <ul className="flag-list">
              {visas.filter((v) => v.doneBase).map((v) => (
                <li key={v.country}><Flag code={v.code} size={28} /> {v.country}</li>
              ))}
            </ul>
            <a href={whatsappUrl('Hello e-Journey, I would like to know about done base visas.')} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light">
              <WhatsAppIcon size={18} /> Ask About Done Base
            </a>
          </Reveal>
        </div>
      </Section>

      <Section id="visa-inquiry" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Visa Application"
            title={<>Tell Us Where You’re <em>Heading</em></>}
            lead="Share your destination, visa type and travel date. A consultant will send the document checklist and next steps."
          >
            <FormAside image={images.passportClose} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm key={country} variant="visa" source="Visa page" defaults={{ travelType: 'Visa', country }} submitLabel="Apply for Visa" />
          </Reveal>
        </div>
        <Reveal className="notice">
          <Info size={20} aria-hidden="true" />
          <p>
            Visa decisions are made solely by the relevant embassy or consulate. We help you prepare a complete, accurate
            application and keep you informed — processing times and outcomes remain at the discretion of the issuing
            authority.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
