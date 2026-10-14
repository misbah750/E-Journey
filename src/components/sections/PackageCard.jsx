import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarClock, Moon, Star } from 'lucide-react';
import Img from '../ui/Img.jsx';
import { formatPKR, formatDate, isExpired, lowestPrice, durationLabel } from '../../data/packages.js';
import { whatsappUrl } from '../../data/site.js';

/** Signature package card — mirrors the agency's printed package flyers. */
export default function PackageCard({ pkg, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const detail = `/packages/${pkg.slug}`;
  const [first, second] = pkg.images;
  const expired = isExpired(pkg);
  const multi = pkg.prices.length > 1;

  return (
    <article className="pkg">
      <div className={`pkg__media ${second ? 'pkg__media--dual' : ''}`}>
        <Img image={first} sizes="(max-width: 760px) 90vw, (max-width: 1180px) 45vw, 30vw" maxWidth={1080} />
        {second && <Img image={second} sizes="(max-width: 760px) 60vw, 20vw" maxWidth={768} />}
        {pkg.validTill && !expired && (
          <span className="pkg__valid"><CalendarClock size={14} aria-hidden="true" /> Valid till {formatDate(pkg.validTill)}</span>
        )}
        <Link to={detail} className="pkg__go" aria-label={`View details: ${pkg.title}`}>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </div>

      <div className="pkg__body">
        <p className="pkg__tier">
          {pkg.country}
          {pkg.country && pkg.stars && <span aria-hidden="true">|</span>}
          {pkg.stars && <><Star size={13} aria-hidden="true" className="pkg__star" /> {pkg.stars}</>}
        </p>
        {durationLabel(pkg) && (
          <p className="pkg__meta">
            <span className="pkg__nights"><Moon size={15} aria-hidden="true" /> {durationLabel(pkg)}</span>
          </p>
        )}

        <hr className="pkg__rule" />

        <H className="pkg__title">{pkg.title}</H>
        <p className="pkg__summary">{pkg.summary}</p>
        <ul className="pkg__stays">
          {pkg.cities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <hr className="pkg__rule" />

        <div className="pkg__price">
          {expired ? (
            <>
              <span className="pkg__price-label">Price on request</span>
              <strong className="pkg__amount pkg__amount--ask">Ask for the current price</strong>
            </>
          ) : (
            <>
              <span className="pkg__price-label">{multi ? 'Starting From' : 'Package Price'}</span>
              <strong className="pkg__amount">{formatPKR(lowestPrice(pkg))}</strong>
              <span className="pkg__basis">(Per Person, Twin Sharing)</span>
            </>
          )}
          {pkg.airfareNotIncluded && <span className="pkg__note">*Airline ticket not included</span>}
        </div>

        <div className="pkg__actions">
          <Link to={`${detail}#book`} className="btn-pkg">Book Now</Link>
          <Link to={detail} className="btn-pkg">View Details</Link>
          {pkg.flyer ? (
            <a href={pkg.flyer} download className="btn-pkg">Flyer</a>
          ) : (
            <a href={whatsappUrl(`Hello e-Journey, I'm interested in the ${pkg.title} package.`)} target="_blank" rel="noopener noreferrer" className="btn-pkg">WhatsApp</a>
          )}
        </div>
      </div>

    </article>
  );
}
