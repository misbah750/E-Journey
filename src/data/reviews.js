/**
 * Customer reviews from Google and Facebook.
 *
 * 1. Add the public profile links below (Google Business Profile reviews link and Facebook page reviews link).
 * 2. `summary` holds the rating shown on each profile. Update it when the numbers change on Facebook / Google.
 * 3. Copy reviews exactly as posted: reviewer name, rating, text, source and date. Never edit or invent them.
 *
 * The Reviews section on the homepage appears automatically once there is a review, a summary or a link.
 */
export const reviewLinks = {
  google: '',
  facebook: 'https://www.facebook.com/ejourneytravels/reviews',
};

/** Rating as shown on the profile (Facebook: "100% recommend (9 reviews)", checked 14 Oct 2026). */
export const reviewSummary = {
  facebook: { recommendPercent: 100, count: 9 },
};

export const reviews = [
  // { name: 'Reviewer name', source: 'Facebook', rating: 5, text: 'Review text exactly as posted.', date: '2026-10-01' },
];
