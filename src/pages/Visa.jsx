import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Search, FolderCheck, Clock, FileText, MessageCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import {
  visas, visaTypes, casePreparation, DOCS, TYPE_LABEL, flagUrl, formatVisaPrice, sharedType,
} from '../data/visas.js';
import { whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

export function Flag({ code, size = 40 }) {
  return <img className="flag" src={flagUrl(code)} alt="" width={size} height={Math.round(size * 0.75)} loading="lazy" decoding="async" />;
}

function VisaCard({ visa, onApply }) {
  const type = sharedType(visa);
  return (
    <li className="visa-card">
      <div className="visa-card__head">
        <Flag code={visa.code} />
        <h3>{visa.country}</h3>
        {type && <span className={`visa-card__type visa-card__type--${type}`}>{TYPE_LABEL[type]}</span>}
      </div>

      <ul className="visa-card__opts">
        {visa.options.map((o) => (
          <li key={o.label}>
            <span>{o.label}</span>
            <strong className={o.amount == null ? 'is-ask' : ''}>{formatVisaPrice(o)}</strong>
          </li>
        ))}
      </ul>

      {visa.processing && (
        <p className="visa-card__time">
          <Clock size={15} aria-hidden="true" />
          <span><strong>Processing:</strong> approx. {visa.processing}</span>
        </p>
      )}

      {visa.docs && (
        <details className="visa-card__docs">
          <summary><FileText size={15} aria-hidden="true" /> Documents required ({visa.docs.length})</summary>
          <ul>
            {visa.docs.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </details>
      )}

      <div className="visa-card__actions">
        <a href="#visa-inquiry" onClick={() => onApply(visa.country)} className="link-arrow">
          Apply <ArrowRight size={15} aria-hidden="true" />
        </a>
        {visa.link ? (
          <Link to={visa.link} className="visa-card__wa">Umrah packages</Link>
        ) : (
          <a
            href={whatsappUrl(`Hello e-Journey, I'd like to apply for a ${visa.country} visa.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="visa-card__wa"
            aria-label={`Ask about a ${visa.country} visa on WhatsApp`}
          >
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        )}
      </div>
    </li>
  );
}

export default function Visa() {
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');

  useSeo({
    title: 'Visa Services, Prices & Requirements from Pakistan',
    description:
      'Visa prices, document requirements and processing times from e-Journey Travel & Tours, Karachi — Dubai, Malaysia, Thailand, Singapore, Azerbaijan, Sri Lanka, Türkiye, Uzbekistan and more, plus case preparation for the USA, UK, Schengen, Canada and Australia.',
  });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visas
      .filter((v) => !q || v.country.toLowerCase().includes(q))
      .map((v) => {
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
        lead="e-Visas, sticker visas and full case preparation — clear prices, the documents you need, and how long each visa usually takes."
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
          lead="Prices are per applicant. “+ SC” means service charges are added to the listed fee. Open “Documents required” on any card for the checklist."
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
            {list.map((v) => <VisaCard key={v.country} visa={v} onApply={setCountry} />)}
          </ul>
        ) : (
          <div className="visa-empty">
            <p>We don’t have a listed price for “{query}” yet — ask us and we’ll check the requirements for you.</p>
            <a href={whatsappUrl(`Hello e-Journey, do you process visas for ${query}?`)} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
              <WhatsAppIcon size={18} /> Ask on WhatsApp
            </a>
          </div>
        )}
        <p className="visa-footnote">
          <Info size={15} aria-hidden="true" /> Processing times are approximate and counted from submission of a complete
          file. They are set by the embassy and can change in busy seasons.
        </p>
      </Section>

      <Section tone="forest" className="visa-extra">
        <div className="visa-extra__grid">
          <Reveal className="visa-extra__card">
            <span className="visa-extra__icon"><FolderCheck size={24} aria-hidden="true" /></span>
            <p className="eyebrow eyebrow--light">Case Preparation</p>
            <h2 className="h3">USA, UK, Schengen &amp; more</h2>
            <p>For visas that need a full application file, we prepare your case and documents and guide you through the appointment. Processing depends on embassy appointments — we’ll advise the current timeline.</p>
            <ul className="flag-list">
              {casePreparation.map((c) => (
                <li key={c.country}><Flag code={c.code} size={28} /> {c.country}</li>
              ))}
            </ul>
            <a href="#visa-inquiry" className="btn btn--gold">Start My Case <ArrowRight size={18} aria-hidden="true" /></a>
          </Reveal>
          <Reveal delay={120} className="visa-extra__card">
            <span className="visa-extra__icon"><FileText size={24} aria-hidden="true" /></span>
            <p className="eyebrow eyebrow--light">Case File Checklist</p>
            <h2 className="h3">What a full visa file needs</h2>
            <ul className="visa-extra__docs">
              {DOCS.full.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <a href={whatsappUrl('Hello e-Journey, I would like to check my visa documents.')} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light">
              <MessageCircle size={18} aria-hidden="true" /> Check My Documents
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
