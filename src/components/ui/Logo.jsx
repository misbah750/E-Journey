import { Link } from 'react-router-dom';

/**
 * The official e-Journey logo artwork (public/brand/).
 * Each mark has an original-colour version and a "-light" version (green → cream)
 * for use on dark or photographic backgrounds. Regenerate the files from the master
 * logo if the artwork changes.
 */
export const BRAND = {
  full: '/brand/logo-full.png',
  fullLight: '/brand/logo-full-light.png',
  wordmark: '/brand/logo-wordmark.png',
  wordmarkLight: '/brand/logo-wordmark-light.png',
  lockup: '/brand/logo-lockup.png',
  lockupLight: '/brand/logo-lockup-light.png',
  emblem: '/brand/logo-emblem.png',
  emblemLight: '/brand/logo-emblem-light.png',
};

/** Navigation logo: e-Journey wordmark. `light` shows the reversed version over photography. */
export default function Logo({ onClick, light = false }) {
  return (
    <Link
      to="/"
      className={`logo ${light ? 'logo--light' : ''}`}
      onClick={onClick}
      aria-label="e-Journey Travel & Tours — home"
    >
      <img className="logo__img logo__img--dark" src={BRAND.wordmark} alt="" width="738" height="180" decoding="async" />
      <img className="logo__img logo__img--light" src={BRAND.wordmarkLight} alt="" width="738" height="180" decoding="async" />
    </Link>
  );
}

/** Complete logo — emblem, wordmark and tagline. */
export function BrandLogo({ light = false, className = '', width = 900 }) {
  return (
    <img
      className={`brand-logo ${className}`}
      src={light ? BRAND.fullLight : BRAND.full}
      alt="e-Journey Travel & Tours — Your Travel Peace Is Our Guarantee"
      width={width}
      height={Math.round((width * 712) / 900)}
      loading="lazy"
      decoding="async"
    />
  );
}

/** The emblem alone (script e, gold crescent and aircraft). */
export function BrandEmblem({ light = false, className = '' }) {
  return (
    <img
      className={`brand-emblem ${className}`}
      src={light ? BRAND.emblemLight : BRAND.emblem}
      alt=""
      width="560"
      height="396"
      decoding="async"
    />
  );
}
