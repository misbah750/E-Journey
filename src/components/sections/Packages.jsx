import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import PackageCard from './PackageCard.jsx';
import { packages, packageCountries } from '../../data/packages.js';

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
  const list = limit ? pickVaried(limit) : packages.filter((p) => filter === 'all' || p.country === filter);

  return (
    <Section id={id} tone={tone} className="packages">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align="center" />
      {!limit && (
        <Reveal className="filter-chips" role="group" aria-label="Filter packages by country">
          {['all', ...packageCountries].map((c) => (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c === 'all' ? 'All Packages' : c}
            </button>
          ))}
        </Reveal>
      )}
      <div className={`pkg-grid ${list.length === 1 ? 'pkg-grid--single' : ''}`} key={filter}>
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
