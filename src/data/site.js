/**
 * Company details — sourced from the e-Journey company profile.
 * Update here and every page, form, footer and schema snippet follows.
 */
export const site = {
  name: 'e-Journey Travel & Tours',
  shortName: 'e-Journey',
  tagline: 'Travel Beyond Destinations.',
  promise: 'Your Travel Peace Is Our Guarantee',
  description:
    'Personalized journeys, trusted expertise, and unforgettable experiences from Pakistan to the world.',

  address: {
    lines: ['Office 08, Akbar Paradise,', 'Block 10, Gulshan-e-Iqbal,', 'Main Rashid Minhas Road,', 'Karachi, Pakistan'],
    oneLine: 'Office 08, Akbar Paradise, Block 10, Gulshan-e-Iqbal, Main Rashid Minhas Road, Karachi, Pakistan',
    mapQuery: 'Akbar Paradise, Block 10, Gulshan-e-Iqbal, Rashid Minhas Road, Karachi',
  },

  phones: [
    { label: '021-34992200', tel: '+922134992200' },
    { label: '021-34993300', tel: '+922134993300' },
  ],
  mobiles: [
    { label: '0322-5100961', tel: '+923225100961' },
    { label: '0335-5100991', tel: '+923355100991' },
    { label: '0332-6665977', tel: '+923326665977' },
  ],
  email: 'ejourneytravel@gmail.com',

  /** WhatsApp number in international format without "+" (0335-5100991). */
  whatsapp: '923355100991',
  whatsappLabel: '0335-5100991',
  whatsappGreeting: 'Hello e-Journey Travel & Tours, I would like assistance planning my trip.',

  /** Placeholder social links — replace with the official accounts when available. */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },
};

export const whatsappUrl = (text = site.whatsappGreeting) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailtoUrl = (subject = 'Travel inquiry', body = '') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;
