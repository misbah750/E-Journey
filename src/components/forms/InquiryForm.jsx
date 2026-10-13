import { useMemo, useState } from 'react';
import { ArrowRight, LoaderCircle, Lock } from 'lucide-react';
import Field, { Honeypot, todayISO } from './Field.jsx';
import InquirySuccess from './InquirySuccess.jsx';
import useInquiry from './useInquiry.js';
import { validateContact } from '../../lib/inquiry.js';
import { travelTypes, budgetRanges, accommodationPrefs } from '../../data/content.js';

const TODAY = todayISO();

const DEFS = {
  name: { label: 'Full Name', required: true, autoComplete: 'name', placeholder: 'Your full name' },
  email: { label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  phone: { label: 'Phone / WhatsApp', type: 'tel', required: true, autoComplete: 'tel', placeholder: '+92 3XX XXXXXXX' },
  travelType: { label: 'Travel Type', type: 'select', options: travelTypes, placeholder: 'Select travel type' },
  destination: { label: 'Destination', placeholder: 'Where would you like to go?' },
  departureCity: { label: 'Departure City', placeholder: 'e.g. Karachi' },
  travelDate: { label: 'Travel Date', type: 'date', min: TODAY },
  returnDate: { label: 'Return Date', type: 'date', min: TODAY },
  travelers: { label: 'Number of Travelers', type: 'number', min: 1, inputMode: 'numeric', placeholder: 'e.g. 2' },
  budget: { label: 'Budget Range', type: 'select', options: budgetRanges, placeholder: 'Select a range' },
  accommodation: { label: 'Preferred Accommodation', type: 'select', options: accommodationPrefs, placeholder: 'Select a category' },
  company: { label: 'Company Name', required: true, autoComplete: 'organization', placeholder: 'Your company' },
  country: { label: 'Destination Country', required: true, placeholder: 'e.g. United Kingdom, Schengen, UAE' },
  visaType: { label: 'Visa Type', type: 'select', options: ['Tourist / Visit', 'Business', 'Family Visit', 'Umrah', 'Transit', 'Other'], placeholder: 'Select visa type' },
  applicants: { label: 'Number of Applicants', type: 'number', min: 1, inputMode: 'numeric', placeholder: 'e.g. 1' },
  checkIn: { label: 'Check-in', type: 'date', min: TODAY },
  checkOut: { label: 'Check-out', type: 'date', min: TODAY },
  rooms: { label: 'Rooms', type: 'number', min: 1, inputMode: 'numeric', placeholder: 'e.g. 1' },
  umrahType: { label: 'Umrah Type', type: 'select', options: ['Group Umrah', 'Individual Umrah', 'Five Star Umrah', 'Not sure yet'], placeholder: 'Select Umrah type' },
  tripType: { label: 'Trip Type', type: 'select', options: ['Return', 'One-way', 'Multi-city'], placeholder: 'Select trip type' },
  from: { label: 'From', required: true, placeholder: 'e.g. Karachi' },
  to: { label: 'To', required: true, placeholder: 'e.g. Dubai' },
  travelClass: { label: 'Class', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First'], placeholder: 'Select class' },
  sharing: { label: 'Room Sharing', type: 'select', options: ['Sharing', 'Quad', 'Triple', 'Double', 'Not sure'], placeholder: 'Select sharing' },
  package: { label: 'Package', full: true, placeholder: 'e.g. PIA 20 Nights — Package 02' },
  configuration: { label: 'Travelling As', type: 'select', options: ['Per Person', 'Duo / Couple', 'Family', 'Group'], placeholder: 'Select' },
  requirement: { label: 'Services Needed', type: 'select', options: ['Full travel management', 'Flights', 'Hotels', 'Visa assistance', 'Travel insurance', 'Group / incentive trip', 'Emergency travel'], placeholder: 'Select' },
  message: { label: 'Additional Requirements', type: 'textarea', full: true, placeholder: 'Tell us anything that will help us plan — preferences, special occasions, accessibility needs…' },
};

const VARIANTS = {
  full: ['name', 'email', 'phone', 'travelType', 'destination', 'departureCity', 'travelDate', 'returnDate', 'travelers', 'budget', 'accommodation', 'message'],
  short: ['name', 'phone', 'email', 'travelType', 'destination', 'message'],
  visa: ['name', 'phone', 'email', 'country', 'visaType', 'travelDate', 'applicants', 'message'],
  corporate: ['name', 'company', 'phone', 'email', 'requirement', 'destination', 'travelDate', 'travelers', 'message'],
  hotel: ['name', 'phone', 'email', 'destination', 'checkIn', 'checkOut', 'travelers', 'rooms', 'accommodation', 'message'],
  pilgrimage: ['name', 'phone', 'email', 'umrahType', 'departureCity', 'travelDate', 'travelers', 'sharing', 'package', 'message'],
  flights: ['name', 'phone', 'email', 'tripType', 'from', 'to', 'travelDate', 'returnDate', 'travelers', 'travelClass', 'message'],
  insurance: ['name', 'phone', 'email', 'destination', 'travelDate', 'returnDate', 'travelers', 'message'],
  booking: ['name', 'phone', 'email', 'configuration', 'departureCity', 'travelDate', 'travelers', 'message'],
};

/** Booking requests need an email address so the confirmation can be sent in writing. */
const EMAIL_REQUIRED = ['booking', 'pilgrimage'];

/** Universal travel inquiry form. `defaults` pre-fills fields (e.g. travelType, destination, package). */
export default function InquiryForm({
  variant = 'full', defaults = {}, source = 'Website inquiry', submitLabel = 'Submit Travel Request', title, intro,
  travelTypeOptions,
}) {
  const names = VARIANTS[variant] || VARIANTS.full;
  const emailRequired = EMAIL_REQUIRED.includes(variant);
  const initial = useMemo(
    () => ({ ...Object.fromEntries(names.map((n) => [n, ''])), _gotcha: '', ...defaults }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variant, JSON.stringify(defaults)],
  );
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const { status, result, submit, reset } = useInquiry(source);

  const onChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateContact(values, { requireEmail: emailRequired });
    names.forEach((n) => {
      if (DEFS[n].required && !values[n]?.toString().trim() && !errs[n]) errs[n] = `Please add your ${DEFS[n].label.toLowerCase()}.`;
    });
    setErrors(errs);
    const first = names.find((n) => errs[n]);
    if (first) {
      e.currentTarget.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    submit(values);
  };

  if (status === 'done') {
    return (
      <div className="form-card">
        <InquirySuccess result={result} onReset={() => { reset(); setValues(initial); }} />
      </div>
    );
  }

  return (
    <form className="form-card inquiry-form" onSubmit={onSubmit} noValidate>
      {(title || intro) && (
        <div className="form-card__head">
          {title && <h3 className="h3">{title}</h3>}
          {intro && <p>{intro}</p>}
        </div>
      )}
      <div className="form-grid">
        {names.map((n) => (
          <Field
            key={n}
            name={n}
            {...DEFS[n]}
            {...(n === 'travelType' && travelTypeOptions ? { options: travelTypeOptions } : {})}
            {...(n === 'email' && emailRequired ? { required: true } : {})}
            value={values[n]}
            onChange={onChange}
            error={errors[n]}
          />
        ))}
        <Honeypot value={values._gotcha} onChange={onChange} />
      </div>
      <div className="form-card__footer">
        <p className="form-card__privacy">
          <Lock size={15} aria-hidden="true" /> Your details are used only to respond to your request.
        </p>
        <button type="submit" className="btn btn--gold btn--lg" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <><LoaderCircle size={18} className="spin" aria-hidden="true" /> Sending…</>
          ) : (
            <>{submitLabel} <ArrowRight size={18} aria-hidden="true" /></>
          )}
        </button>
      </div>
    </form>
  );
}
