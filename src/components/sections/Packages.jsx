import { useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import PackageCard from './PackageCard.jsx';
import { packages, packageCategories } from '../../data/packages.js';

/** Signature packages with category filter. Pass `only` to lock to a category and hide the filter. */
export default function Packages({
  id = 'packages', tone = 'sand', only, eyebrow = 'Signature Journeys',
  title = <>Thoughtfully Designed <em>Travel Experiences</em></>,
  lead = 'Our signature packages — each one flexible for solo travellers, couples and families, and fully customizable by our consultants.',
}) {
  const [filter, setFilter] = useState(only || 'all');
  const list = packages.filter((p) => filter === 'all' || p.category === filter);

  return (
    <Section id={id} tone={tone} className="packages">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align="center" />
      {!only && (
        <Reveal className="filter-chips" role="group" aria-label="Filter packages">
          {packageCategories.map((c) => (
            <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
              {c.label}
            </button>
          ))}
        </Reveal>
      )}
      <div className={`pkg-grid ${list.length === 1 ? 'pkg-grid--single' : ''} ${list.length === 3 ? 'pkg-grid--three' : ''}`} key={filter}>
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 120}>
            <PackageCard pkg={p} />
          </Reveal>
        ))}
      </div>
      <p className="pkg-footnote">
        All rates in PKR and subject to availability at the time of booking. Plans available for solo travellers, couples and
        families.
      </p>
    </Section>
  );
}
