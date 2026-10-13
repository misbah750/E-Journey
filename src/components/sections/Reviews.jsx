import { ExternalLink, Star } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { FacebookIcon } from '../ui/BrandIcons.jsx';
import { reviews, reviewLinks } from '../../data/reviews.js';

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
    </svg>
  );
}

const formatReviewDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

/** Real customer reviews from Google / Facebook. Renders nothing until data/reviews.js has content. */
export default function Reviews({ tone = 'sand' }) {
  const links = [
    reviewLinks.google && { href: reviewLinks.google, label: 'Read our Google reviews', icon: <GoogleMark /> },
    reviewLinks.facebook && { href: reviewLinks.facebook, label: 'Read our Facebook reviews', icon: <FacebookIcon size={16} /> },
  ].filter(Boolean);
  if (!reviews.length && !links.length) return null;

  return (
    <Section id="reviews" tone={tone} className="reviews">
      <SectionHeading
        eyebrow="Reviews"
        title={<>What Our Travellers <em>Say</em></>}
        lead="Feedback from customers on Google and Facebook."
        align="center"
      />
      {reviews.length > 0 && (
        <ul className="reviews__grid">
          {reviews.map((r, i) => (
            <Reveal as="li" key={`${r.name}-${i}`} delay={(i % 3) * 90} className="review-card">
              <div className="review-card__stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} size={16} aria-hidden="true" className={s < r.rating ? 'is-on' : ''} />
                ))}
              </div>
              <blockquote>{r.text}</blockquote>
              <p className="review-card__by">
                <strong>{r.name}</strong>
                <span>
                  {r.source === 'Facebook' ? <FacebookIcon size={14} /> : <GoogleMark />} {r.source}
                  {r.date ? ` · ${formatReviewDate(r.date)}` : ''}
                </span>
              </p>
            </Reveal>
          ))}
        </ul>
      )}
      {links.length > 0 && (
        <Reveal className="reviews__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              {l.icon} {l.label} <ExternalLink size={15} aria-hidden="true" />
            </a>
          ))}
        </Reveal>
      )}
    </Section>
  );
}
