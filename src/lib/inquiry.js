import { site, whatsappUrl, mailtoUrl } from '../data/site.js';

const ENDPOINT = import.meta.env.VITE_INQUIRY_ENDPOINT;

const LABELS = {
  name: 'Name',
  phone: 'Phone / WhatsApp',
  email: 'Email',
  travelType: 'Travel type',
  package: 'Package',
  destination: 'Destination',
  from: 'From',
  to: 'To',
  departureCity: 'Departure city',
  departure: 'Departure date',
  returnDate: 'Return date',
  checkIn: 'Check-in',
  checkOut: 'Check-out',
  travelDate: 'Travel date',
  travelers: 'Travellers',
  guests: 'Guests',
  rooms: 'Rooms',
  travelClass: 'Travel class',
  budget: 'Budget',
  accommodation: 'Accommodation',
  experience: 'Experience',
  companions: 'Travelling with',
  visaType: 'Visa type',
  country: 'Destination country',
  applicants: 'Applicants',
  sharing: 'Room sharing',
  company: 'Company',
  requirement: 'Requirement',
  configuration: 'Configuration',
  flexible: 'Dates flexible',
  duration: 'Trip length',
  message: 'Additional requirements',
};

/** Human-readable summary of an inquiry (used for WhatsApp / email delivery). */
export function formatInquiry(data, source) {
  const lines = [`New travel request — ${source || 'e-Journey website'}`, ''];
  Object.entries(data).forEach(([key, value]) => {
    if (value === '' || value == null || value === false || key.startsWith('_')) return;
    const v = Array.isArray(value) ? value.join(', ') : value === true ? 'Yes' : value;
    if (Array.isArray(value) && !value.length) return;
    lines.push(`${LABELS[key] || key}: ${v}`);
  });
  return lines.join('\n');
}

/**
 * Delivers an inquiry.
 *  - With VITE_INQUIRY_ENDPOINT set: POSTs JSON (Formspree, Web3Forms, Getform or your own API).
 *  - Without it: returns the formatted message so the visitor can send it via WhatsApp or email.
 * Never fabricates a booking — it only ever confirms that a request was received.
 */
export async function submitInquiry(data, source) {
  const message = formatInquiry(data, source);
  const subject = `Travel request: ${data.travelType || 'General'}${data.name ? ` — ${data.name}` : ''}`;

  if (data._gotcha) return { delivered: true, message, subject }; // honeypot: silently accept bots

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, source, _subject: subject, message }),
    });
    if (!res.ok) throw new Error(`Inquiry endpoint responded ${res.status}`);
    return { delivered: true, message, subject };
  }

  return { delivered: false, message, subject };
}

export const inquiryLinks = (result) => ({
  whatsapp: whatsappUrl(result.message),
  email: mailtoUrl(result.subject, result.message),
  phone: `tel:${site.mobiles[0].tel}`,
});

/** Minimal validation shared by every form. Returns { field: message }. */
export function validateContact(values, { requireEmail = false } = {}) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please tell us your name.';
  const digits = (values.phone || '').replace(/\D/g, '');
  if (digits.length < 10) errors.phone = 'Please enter a phone or WhatsApp number we can reach you on.';
  if (values.email?.trim() || requireEmail) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) errors.email = 'Please enter a valid email address.';
  }
  return errors;
}
