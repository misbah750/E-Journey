import { Link } from 'react-router-dom';
import { ArrowUpRight, Moon, Star } from 'lucide-react';
import Img from '../ui/Img.jsx';
import { formatPKR } from '../../data/packages.js';
import { site } from '../../data/site.js';

/** Signature package card — mirrors the agency's printed package cards. */
export default function PackageCard({ pkg, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const detail = `/packages/${pkg.slug}`;
  const [first, second] = pkg.images;

  return (
    <article className="pkg">
      <div className={`pkg__media ${second ? 'pkg__media--dual' : ''}`}>
        <Img image={first} sizes="(max-width: 760px) 90vw, 40vw" maxWidth={1080} />
        {second && <Img image={second} sizes="(max-width: 760px) 60vw, 26vw" maxWidth={1080} />}
        <Link to={detail} className="pkg__go" aria-label={`View details: ${pkg.titleAccent} ${pkg.titleRest}`}>
          <ArrowUpRight size={24} aria-hidden="true" />
        </Link>
      </div>

      <div className="pkg__body">
        <p className="pkg__tier">
          {pkg.tier} <span aria-hidden="true">|</span> {pkg.tierLine}
        </p>
        <p className="pkg__meta">
          {pkg.rating && (
            <>
              <span className="pkg__rating">
                <Star size={16} aria-hidden="true" /> {pkg.rating.score.toFixed(2)} ({pkg.rating.count.toLocaleString('en-US')})
              </span>
              <span className="pkg__sep" aria-hidden="true" />
            </>
          )}
          <span className="pkg__nights"><Moon size={15} aria-hidden="true" /> {pkg.name}</span>
          <span className="pkg__sep" aria-hidden="true" />
          <span>{pkg.region}</span>
        </p>

        <hr className="pkg__rule" />

        <H className="pkg__title">
          <span>{pkg.titleAccent}</span> {pkg.titleRest}
        </H>
        <p className="pkg__summary">{pkg.summary}</p>
        <ul className="pkg__stays">
          {pkg.stays.map((s) => (
            <li key={s.place}>{s.nights} Nights in {s.place}</li>
          ))}
        </ul>

        <hr className="pkg__rule" />

        <div className="pkg__price">
          <span className="pkg__price-label">{pkg.priceLabel}</span>
          <strong className="pkg__amount">{formatPKR(pkg.price)}</strong>
          <span className="pkg__basis">({pkg.basis})</span>
          {pkg.priceNote && <span className="pkg__note">*{pkg.priceNote}</span>}
        </div>

        <div className="pkg__actions">
          <Link to={`${detail}#book`} className="btn-pkg">Book Now</Link>
          <Link to={detail} className="btn-pkg">View Details</Link>
          <Link to={`/plan-your-trip?package=${pkg.slug}`} className="btn-pkg">Customize</Link>
        </div>
      </div>

      <p className="pkg__contact">
        <strong>Contact Us:</strong>
        <a href={`tel:${site.phones[0].tel}`}>{site.phones[0].label}</a>
        <span aria-hidden="true">|</span>
        <a href={`tel:${site.mobiles[0].tel}`}>{site.mobiles[0].label}</a>
      </p>
    </article>
  );
}
