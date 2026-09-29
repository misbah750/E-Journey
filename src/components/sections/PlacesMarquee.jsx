const PLACES = [
  'Makkah', 'Madinah', 'Hunza', 'Skardu', 'Dubai', 'Istanbul', 'Cappadocia', 'Najaf', 'Karbala',
  'Doha', 'Fairy Meadows', 'Kuala Lumpur', 'Phuket', 'Swiss Alps', 'Paris', 'The Maldives', 'Lahore', 'Swat',
];

function Star() {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true" className="marquee__star">
      <path d="m10 0 2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4Z" fill="currentColor" />
    </svg>
  );
}

/** Slow, endless strip of destination names — a brand flourish between sections. */
export default function PlacesMarquee() {
  const row = PLACES.map((p) => (
    <li key={p}>
      <span>{p}</span>
      <Star />
    </li>
  ));
  return (
    <section className="marquee" aria-label="Destinations we plan journeys to">
      <p className="sr-only">{PLACES.join(', ')}</p>
      <div className="marquee__track" aria-hidden="true">
        <ul>{row}</ul>
        <ul>{row}</ul>
      </div>
    </section>
  );
}
