import { useState } from 'react';
import { ArrowRight, CalendarClock, Check, Download, Plane } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import {
  OCCUPANCY, UMRAH_INCLUDES, sortedUmrahPackages, nextDeparture, hasDeparted, groupFrom, formatDay, umrahRateNote,
} from '../../data/umrah.js';
import { formatPKR } from '../../data/packages.js';

const pad = (n) => String(n).padStart(2, '0');

/** Short description of a chosen hotel package, used to pre-fill the Umrah booking form. */
export const describeUmrahChoice = (group, index) => {
  const p = group.packages[index];
  const next = nextDeparture(group);
  return `${group.airline} ${group.nights} Nights${next ? ` (departs ${formatDay(next)})` : ''}, Package ${pad(index + 1)}: ${p.makkah.name} / ${p.madinah.name}`;
};

/**
 * Current Umrah group packages, one tab per flyer (airline + duration + dates).
 * `onBook(group, index)` is called when a visitor picks a hotel package.
 */
export default function UmrahPackages({ onBook }) {
  const groups = sortedUmrahPackages();
  const [activeId, setActiveId] = useState(groups[0]?.id);
  if (!groups.length) return null;
  const g = groups.find((x) => x.id === activeId) || groups[0];
  const next = nextDeparture(g);

  return (
    <Section id="packages" tone="white" className="umrah-pk">
      <SectionHeading
        eyebrow="Umrah Packages 1448-H"
        title={<>Current Group <em>Departures</em></>}
        lead="From Karachi, with airline ticket, Umrah visa and complete transport included. Prices are per person in PKR."
        align="center"
      >
        <p className="rate-note"><CalendarClock size={16} aria-hidden="true" /> {umrahRateNote}</p>
      </SectionHeading>

      <Reveal className="umrah-tabs" role="tablist" aria-label="Umrah packages by airline and dates">
        {groups.map((x) => {
          const n = nextDeparture(x);
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={x.id === g.id}
              aria-controls="umrah-panel"
              className={n ? '' : 'is-past'}
              onClick={() => setActiveId(x.id)}
            >
              <strong>{x.airline} · {x.nights} Nights</strong>
              <small>{n ? `${x.flights.length > 1 ? 'From' : 'Departs'} ${formatDay(n)}` : 'Departed'}</small>
            </button>
          );
        })}
      </Reveal>

      <div className="umrah-panel" role="tabpanel" id="umrah-panel" aria-labelledby={`tab-${g.id}`} key={g.id}>
        <div className="umrah-panel__head">
          <div>
            <p className="umrah-panel__airline"><Plane size={16} aria-hidden="true" /> {g.airline}{g.via ? ` · via ${g.via}` : ''}</p>
            <h3 className="umrah-panel__title">
              {[g.nights && `${g.nights} Nights`, g.days && `${g.days} Days`].filter(Boolean).join(' · ')} <span>from Karachi</span>
            </h3>
            <ul className="umrah-panel__facts">
              {g.makkah && <li>{g.makkah} nights Makkah</li>}
              {g.madinah && <li>{g.madinah} nights Madinah</li>}
              {g.baggage && <li>{g.baggage}</li>}
            </ul>
            <ul className="umrah-panel__incl">
              {UMRAH_INCLUDES.map((i) => <li key={i}><Check size={15} aria-hidden="true" /> {i}</li>)}
            </ul>
          </div>
          <div className="umrah-panel__from">
            {groupFrom(g) != null && (
              <>
                <span>Packages from</span>
                <strong>{formatPKR(groupFrom(g))}</strong>
                <small>per person</small>
              </>
            )}
            {g.flyer && <a href={g.flyer} download className="btn btn--ghost-light btn--sm"><Download size={16} aria-hidden="true" /> Download Flyer</a>}
          </div>
        </div>

        {!next && (
          <p className="umrah-panel__note">
            All departures on this flyer have left. Ask us for the next dates and current rates.
          </p>
        )}

        <h4 className="umrah-panel__sub">Flight options</h4>
        <ul className="umrah-flights">
          {g.flights.map((f, i) => {
            const past = hasDeparted(f);
            return (
              <li key={f.legs[0].date + i} className={past ? 'is-past' : ''}>
                <span className="umrah-flights__tag">
                  {f.label ? `${f.label}` : `Option ${i + 1}`}
                  {past && <em>Departed</em>}
                </span>
                {f.legs.map((l) => (
                  <span key={l.flight + l.date} className="umrah-flights__leg">
                    <strong>{l.flight}</strong> {formatDay(l.date)} · {l.from} → {l.to} · {l.dep} / {l.arr}
                  </span>
                ))}
              </li>
            );
          })}
        </ul>

        <h4 className="umrah-panel__sub">Hotels &amp; prices</h4>
        <ul className="umrah-hotels">
          {g.packages.map((p, i) => (
            <li key={i} className="umrah-hotel">
              <p className="umrah-hotel__no">Package {pad(i + 1)}</p>
              <dl className="umrah-hotel__stays">
                <div><dt>Makkah</dt><dd>{p.makkah.name} / similar<small>{p.makkah.note}</small></dd></div>
                <div><dt>Madinah</dt><dd>{p.madinah.name} / similar<small>{p.madinah.note}</small></dd></div>
              </dl>
              <table className="umrah-hotel__prices">
                <thead>
                  <tr>{OCCUPANCY.map((o) => <th key={o} scope="col">{o}</th>)}</tr>
                </thead>
                <tbody>
                  <tr>
                    {p.prices.map((n, j) => (
                      <td key={OCCUPANCY[j]} className={n == null ? 'is-ask' : ''}>{n == null ? 'Ask' : n.toLocaleString('en-US')}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <a href="#pilgrim-inquiry" onClick={() => onBook(g, i)} className="btn btn--forest btn--sm btn--block">
                {next ? `Book Package ${pad(i + 1)}` : 'Ask for Next Dates'} <ArrowRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <p className="umrah-panel__child">
          {g.child != null && <><strong>Child (without bed):</strong> {formatPKR(g.child)} <span aria-hidden="true">·</span>{' '}</>}
          {g.infant != null && <><strong>Infant:</strong> {formatPKR(g.infant)} <span aria-hidden="true">·</span>{' '}</>}
          Hotels as named or similar. Terms and conditions apply.
        </p>
      </div>
    </Section>
  );
}
