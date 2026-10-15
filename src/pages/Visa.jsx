import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, Search, FolderCheck, Clock, FileText, MessageCircle, ChevronDown } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import {
  visas, VISA_REGIONS, casePreparation, DOCS, TYPE_LABEL, flagUrl, formatVisaPrice, sharedType,
} from '../data/visas.js';
import { whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

export function Flag({ code, size = 40 }) {
  if (!code) return null;
  return (
    <img
      className="flag"
      src={flagUrl(code)}
      alt=""
      width={size}
      height={Math.round(size * 0.75)}
      loading="lazy"
      decoding="async"
      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
    />
  );
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** One country on the rate sheet: prices at a glance, documents and actions when opened. */
function RateRow({ visa, open, onToggle, onApply }) {
  const type = sharedType(visa);
  const panelId = `visa-${slugify(visa.country)}`;
  return (
    <li className={`rate ${open ? 'is-open' : ''}`}>
      <button type="button" className="rate__head" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span className="rate__flag"><Flag code={visa.code} size={36} /></span>
        <span className="rate__country">
          <strong>{visa.country}</strong>
          {type && <small>{TYPE_LABEL[type]}</small>}
        </span>
        <span className="rate__time">
          {visa.processing && <><Clock size={14} aria-hidden="true" /> {visa.processing}</>}
        </span>
        <span className="rate__opts">
          {visa.options.map((o) => (
            <span key={o.label} className="rate__opt">
              <span>{o.label}</span>
              <strong className={o.amount == null ? 'is-ask' : ''}>{formatVisaPrice(o)}</strong>
            </span>
          ))}
        </span>
        <ChevronDown size={18} aria-hidden="true" className="rate__chev" />
      </button>

      <div className="rate__more" id={panelId} hidden={!open}>
        <div className="rate__docs">
          <p><FileText size={15} aria-hidden="true" /> Documents required</p>
          <ul>
            {visa.docs.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div className="rate__actions">
          <a href="#visa-inquiry" onClick={() => onApply(visa.country)} className="btn btn--forest btn--sm">
            Apply <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href={whatsappUrl(`Hello e-Journey, I'd like to apply for a ${visa.country} visa.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
          >
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
          {visa.link && <Link to={visa.link} className="link-arrow">Umrah packages <ArrowRight size={15} aria-hidden="true" /></Link>}
        </div>
      </div>
    </li>
  );
}

export default function Visa() {
  const [region, setRegion] = useState('all');
  const [query, setQuery] = useState('');
  const [openCountry, setOpenCountry] = useState('');
  const [country, setCountry] = useState('');

  useSeo({
    title: 'Visa Services, Prices & Requirements from Pakistan',
    description:
      'Visa prices, document requirements and processing times from e-Journey Travel & Tours, Karachi: Dubai, Malaysia, Thailand, Singapore, Azerbaijan, Sri Lanka, Türkiye, Uzbekistan and more, plus case preparation for the USA, UK, Schengen, Canada and Australia.',
  });

  const regions = useMemo(() => VISA_REGIONS.filter((r) => visas.some((v) => v.region === r)), []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = visas.filter((v) => (region === 'all' || v.region === region) && (!q || v.country.toLowerCase().includes(q)));
    return regions.map((r) => ({ region: r, items: list.filter((v) => v.region === r) })).filter((g) => g.items.length);
  }, [region, query, regions]);

  return (
    <>
      <PageHero
        image={images.passport}
        eyebrow="Visa Services"
        title={<>Visa Services &amp; <em>Prices</em></>}
        lead="e-Visas, sticker visas and full case preparation, with clear prices, the documents you need, and how long each visa usually takes."
        crumbs={[{ label: 'Visa' }]}
      >
        <a href="#visa-prices" className="btn btn--gold btn--lg">See Visa Prices <ArrowRight size={18} aria-hidden="true" /></a>
        <a href={whatsappUrl('Hello e-Journey, I need help with a visa.')} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-light btn--lg">
          <WhatsAppIcon size={18} /> Ask on WhatsApp
        </a>
      </PageHero>

      <Section id="visa-prices" tone="ivory">
        <SectionHeading
          eyebrow="Visa Price List"
          title={<>Visa Prices at a <em>Glance</em></>}
          lead="Prices are per applicant. “+ SC” means service charges are added to the listed fee. Tap a country for the documents you need."
          align="center"
        />

        <Reveal className="rate-tools">
          <label className="visa-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search country</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search country…" />
          </label>
          <div className="filter-chips" role="group" aria-label="Filter by region">
            {['all', ...regions].map((r) => (
              <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(r)}>
                {r === 'all' ? 'All' : r}
              </button>
            ))}
          </div>
        </Reveal>

        {groups.length ? (
          <div className="rate-sheet">
            <div className="rate-sheet__labels" aria-hidden="true">
              <span>Country</span>
              <span>Processing</span>
              <span>Visa and price</span>
            </div>
            {groups.map((g) => (
              <section key={g.region} className="rate-group" aria-label={g.region}>
                <h3 className="rate-group__title">{g.region}</h3>
                <ul className="rate-list">
                  {g.items.map((v) => (
                    <RateRow
                      key={v.country}
                      visa={v}
                      open={openCountry === v.country}
                      onToggle={() => setOpenCountry((c) => (c === v.country ? '' : v.country))}
                      onApply={setCountry}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="visa-empty">
            <p>We don’t have a listed price for “{query}” yet. Ask us and we’ll check the requirements for you.</p>
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
            <p>For visas that need a full application file, we prepare your case and documents and guide you through the appointment. Processing depends on embassy appointments, so we’ll advise the current timeline.</p>
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
            application and keep you informed. Processing times and outcomes remain at the discretion of the issuing
            authority.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
