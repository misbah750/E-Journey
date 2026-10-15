import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Wallet } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import PackageCard from './PackageCard.jsx';
import { packages, packageCountries, isExpired, lowestPrice } from '../../data/packages.js';

/** Price bands for the filter (PKR per person, lowest option of each package). */
const PRICE_RANGES = [
  { id: 'all', label: 'Any price' },
  { id: 'under-100', label: 'Under 100,000', test: (n) => n < 100000 },
  { id: '100-130', label: '100,000 to 130,000', test: (n) => n >= 100000 && n < 130000 },
  { id: '130-160', label: '130,000 to 160,000', test: (n) => n >= 130000 && n < 160000 },
  { id: '160-up', label: '160,000 and above', test: (n) => n >= 160000 },
];

/** Current price used for filtering, or null when the price is on request. */
const currentPrice = (p) => (isExpired(p) ? null : lowestPrice(p));

/** A short, varied selection: one package per country in turn. */
function pickVaried(limit) {
  const groups = packageCountries.map((c) => packages.filter((p) => p.country === c));
  const out = [];
  for (let round = 0; out.length < limit && round < packages.length; round += 1) {
    groups.forEach((g) => { if (g[round] && out.length < limit) out.push(g[round]); });
  }
  return out;
}

/**
 * International tour packages with a country filter.
 * Pass `limit` to show a short selection (filter hidden) with a link to the full list.
 */
export default function Packages({
  id = 'packages', tone = 'sand', limit, eyebrow = 'International Tour Packages',
  title = <>Holidays Abroad, <em>Ready to Book</em></>,
  lead = 'Hotels, breakfast, transfers, sightseeing and visa in one package. Prices per person on twin sharing.',
}) {
  const [filter, setFilter] = useState('all');
  const [price, setPrice] = useState('all');
  const range = PRICE_RANGES.find((r) => r.id === price);
  // Only offer price bands that have at least one package in them.
  const ranges = PRICE_RANGES.filter((r) => !r.test || packages.some((p) => currentPrice(p) != null && r.test(currentPrice(p))));
  const list = limit
    ? pickVaried(limit)
    : packages.filter((p) => {
        if (filter !== 'all' && p.country !== filter) return false;
        if (!range?.test) return true;
        const n = currentPrice(p);
        return n != null && range.test(n);
      });
  const reset = () => { setFilter('all'); setPrice('all'); };

  return (
    <Section id={id} tone={tone} className="packages">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align="center" />
      {!limit && (
        <Reveal className="pkg-filters">
          <div className="filter-chips" role="group" aria-label="Filter packages by country">
            {['all', ...packageCountries].map((c) => (
              <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c === 'all' ? 'All Packages' : c}
              </button>
            ))}
          </div>
          {ranges.length > 2 && (
            <div className="price-chips" role="group" aria-label="Filter packages by price per person">
              <span className="price-chips__label"><Wallet size={15} aria-hidden="true" /> Price (PKR)</span>
              {ranges.map((r) => (
                <button key={r.id} type="button" aria-pressed={price === r.id} onClick={() => setPrice(r.id)}>
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </Reveal>
      )}
      {!list.length && (
        <div className="pkg-empty">
          <p>No packages match these filters right now. Ask us and we’ll put one together for your budget.</p>
          <button type="button" className="btn btn--outline" onClick={reset}>Show all packages</button>
        </div>
      )}
      <div className={`pkg-grid ${list.length === 1 ? 'pkg-grid--single' : ''}`} key={`${filter}-${price}`}>
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 100}>
            <PackageCard pkg={p} />
          </Reveal>
        ))}
      </div>
      {limit && packages.length > limit && (
        <Reveal className="pkg-more">
          <Link to="/international-tours#packages" className="btn btn--forest btn--lg">
            View all {packages.length} packages <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      )}
      <p className="pkg-footnote">
        <CalendarClock size={15} aria-hidden="true" /> Package prices are valid until the date shown and refreshed about
        every two months. Terms and conditions apply; rates are subject to availability at the time of booking.
      </p>
    </Section>
  );
}
