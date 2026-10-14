import settings from '../content/settings/reviews.json';

/**
 * Customer reviews, edited from the admin page (/admin → Settings → Reviews).
 *
 * - Links open the Google and Facebook review pages.
 * - Ratings are typed in as shown on each profile; update them when the numbers change.
 * - Reviews are copied exactly as posted: name, rating (Google) or "recommends" (Facebook), text, date.
 *
 * The Reviews section on the homepage appears once there is a rating, a link or a review.
 */
const toNumber = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

export const reviewLinks = {
  google: settings.googleLink || '',
  facebook: settings.facebookLink || '',
};

const googleRating = toNumber(settings.googleRating);
const facebookPercent = toNumber(settings.facebookRecommendPercent);

export const reviewSummary = {
  google: googleRating != null ? { rating: googleRating, count: toNumber(settings.googleCount) || 0 } : null,
  facebook: facebookPercent != null ? { recommendPercent: facebookPercent, count: toNumber(settings.facebookCount) || 0 } : null,
};

export const reviews = (settings.reviews || [])
  .filter((r) => r.name && r.text)
  .map((r) => ({ name: r.name, source: r.source || 'Google', rating: toNumber(r.rating), text: r.text, date: r.date || '' }));
