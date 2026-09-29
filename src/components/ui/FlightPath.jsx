/** Decorative gold flight path with aircraft — echoes the swoosh in the e-Journey logo. */
export default function FlightPath({ className = '' }) {
  return (
    <svg className={`flight-path ${className}`} viewBox="0 0 640 320" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="flight-path-gold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--gold)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--gold)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--gold-bright)" />
        </linearGradient>
      </defs>
      <path className="flight-path__trail" d="M8 312C190 318 420 262 574 72" fill="none" stroke="url(#flight-path-gold)" />
      <g className="flight-path__plane" transform="translate(588 56) rotate(-51) scale(0.42)" fill="var(--gold-bright)">
        <path d="M-44 -3.2h82c6 0 11 1.6 11 3.2s-5 3.2-11 3.2h-82c-3 0-5-1.4-5-3.2s2-3.2 5-3.2Z" />
        <path d="M6 -3 -14 -44h-8l10 41ZM6 3-14 44h-8l10-41Z" />
        <path d="M-34 -2.5-45 -19h-5l6 16.5ZM-34 2.5-45 19h-5l6-16.5Z" />
      </g>
    </svg>
  );
}
