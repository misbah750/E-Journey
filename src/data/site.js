import contact from '../content/settings/contact.json';

/**
 * Company details. Contact information is edited from the admin page (/admin → Settings → Contact Details)
 * and every page, form, footer and schema snippet follows.
 */

/** "0335-5100991" or "+92 335 5100991" → "+923355100991" for tel: links. */
const toTel = (n) => {
  const digits = String(n).replace(/\D/g, '');
  if (digits.startsWith('92')) return `+${digits}`;
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`;
  return `+${digits}`;
};

const lines = (contact.addressLines || []).filter(Boolean);

export const site = {
  name: 'e-Journey Travel & Tours',
  shortName: 'e-Journey',
  tagline: 'Travel Beyond Destinations.',
  promise: 'Your Travel Peace Is Our Guarantee',
  description:
    'Personalized journeys, trusted expertise, and unforgettable experiences from Pakistan to the world.',

  address: {
    lines,
    oneLine: lines.map((l) => l.replace(/,\s*$/, '')).join(', '),
    area: contact.area || '',
    mapQuery: contact.mapQuery || lines.join(' '),
  },

  /** Mobile numbers. The first one is used wherever a single "call us" number is shown. */
  mobiles: (contact.mobiles || []).filter(Boolean).map((label) => ({ label, tel: toTel(label) })),
  email: contact.email,
  emailAlt: contact.emailAlt || '',
  director: { name: contact.directorName, title: contact.directorTitle || 'Director', email: contact.directorEmail },

  /** WhatsApp number in international format without "+". */
  whatsapp: toTel(contact.whatsapp).slice(1),
  whatsappLabel: contact.whatsapp,
  whatsappGreeting: 'Hello e-Journey Travel & Tours, I would like assistance planning my trip.',

  social: {
    facebook: contact.facebook || '',
    instagram: contact.instagram || '',
    linkedin: contact.linkedin || '',
  },
};

export const whatsappUrl = (text = site.whatsappGreeting) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailtoUrl = (subject = 'Travel inquiry', body = '') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;
