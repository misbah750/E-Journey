import { useRef, useState } from 'react';
import {
  Plane, PlaneTakeoff, PlaneLanding, BedDouble, Compass, Stamp, BriefcaseBusiness, MapPin,
  Globe2, Building2, ArrowRight, ArrowLeft, ShieldCheck, User, Phone, Mail, LoaderCircle,
} from 'lucide-react';
import Field, { Honeypot, todayISO } from './Field.jsx';
import InquirySuccess from './InquirySuccess.jsx';
import useInquiry from './useInquiry.js';
import { KaabaIcon } from '../ui/BrandIcons.jsx';
import { validateContact } from '../../lib/inquiry.js';
import { budgetRanges } from '../../data/content.js';

const TODAY = todayISO();
const travellerOptions = ['1 Adult', '2 Adults', '3 Adults', '4 Adults', '2 Adults + Children', 'Group (6+)'];

const TABS = [
  {
    id: 'flights', label: 'Flights', icon: Plane, travelType: 'Flights', cta: 'Search / Request Quote',
    fields: [
      { name: 'from', label: 'From', placeholder: 'City or airport', icon: PlaneTakeoff, initial: 'Karachi', required: true, errorText: 'Where are you flying from?' },
      { name: 'to', label: 'To', placeholder: 'Where to?', icon: PlaneLanding, required: true, errorText: 'Where are you flying to?' },
      { name: 'departure', label: 'Departure', type: 'date', min: TODAY, required: true, errorText: 'Choose a departure date.' },
      { name: 'returnDate', label: 'Return', type: 'date', min: TODAY },
      { name: 'travelers', label: 'Travelers', type: 'select', options: travellerOptions, initial: '1 Adult' },
      { name: 'travelClass', label: 'Travel Class', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First'], initial: 'Economy' },
    ],
  },
  {
    id: 'hotels', label: 'Hotels', icon: BedDouble, travelType: 'Hotel', cta: 'Find Accommodation',
    fields: [
      { name: 'destination', label: 'Destination', placeholder: 'City or area', icon: MapPin, required: true, errorText: 'Where would you like to stay?' },
      { name: 'checkIn', label: 'Check-in', type: 'date', min: TODAY, required: true, errorText: 'Choose a check-in date.' },
      { name: 'checkOut', label: 'Check-out', type: 'date', min: TODAY },
      { name: 'guests', label: 'Guests', type: 'select', options: ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'], initial: '2 Guests' },
      { name: 'rooms', label: 'Rooms', type: 'select', options: ['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms'], initial: '1 Room' },
    ],
  },
  {
    id: 'tours', label: 'Tours', icon: Compass, travelType: 'Holiday', cta: 'Build My Trip',
    fields: [
      { name: 'destination', label: 'Destination', placeholder: 'e.g. Hunza, Türkiye', icon: MapPin, required: true, errorText: 'Where would you like to go?' },
      { name: 'travelDate', label: 'Travel Date', type: 'date', min: TODAY },
      { name: 'travelers', label: 'Travelers', type: 'select', options: travellerOptions, initial: '2 Adults' },
      { name: 'budget', label: 'Budget', type: 'select', options: budgetRanges, placeholder: 'Select budget' },
      { name: 'travelType', label: 'Travel Type', type: 'select', options: ['Holiday', 'Honeymoon', 'Family', 'Group', 'Adventure', 'Corporate retreat'], initial: 'Holiday' },
    ],
  },
  {
    id: 'visa', label: 'Visa', icon: Stamp, travelType: 'Visa', cta: 'Get Visa Assistance',
    fields: [
      { name: 'country', label: 'Destination Country', placeholder: 'e.g. UAE, UK, Schengen', icon: Globe2, required: true, errorText: 'Which country are you applying for?' },
      { name: 'visaType', label: 'Visa Type', type: 'select', options: ['Tourist / Visit', 'Business', 'Family Visit', 'Umrah', 'Transit', 'Other'], initial: 'Tourist / Visit' },
      { name: 'travelDate', label: 'Planned Travel', type: 'date', min: TODAY },
      { name: 'applicants', label: 'Applicants', type: 'select', options: ['1', '2', '3', '4', '5+'], initial: '1' },
    ],
  },
  {
    id: 'umrah', label: 'Umrah', icon: KaabaIcon, travelType: 'Umrah', cta: 'Plan My Umrah',
    fields: [
      { name: 'package', label: 'Journey', type: 'select', options: ['Umrah', 'Hajj', 'Iraq Ziyarat (Najaf & Karbala)'], initial: 'Umrah' },
      { name: 'departureCity', label: 'Departure City', placeholder: 'e.g. Karachi', icon: MapPin, initial: 'Karachi' },
      { name: 'travelDate', label: 'Preferred Date', type: 'date', min: TODAY },
      { name: 'travelers', label: 'Pilgrims', type: 'select', options: travellerOptions, initial: '2 Adults' },
      { name: 'sharing', label: 'Room Sharing', type: 'select', options: ['Quad', 'Triple', 'Double', 'Not sure'], initial: 'Quad' },
    ],
  },
  {
    id: 'corporate', label: 'Corporate Travel', icon: BriefcaseBusiness, travelType: 'Corporate', cta: 'Talk to Corporate Team',
    fields: [
      { name: 'company', label: 'Company', placeholder: 'Company name', icon: Building2, required: true, errorText: 'Please add your company name.' },
      { name: 'requirement', label: 'Requirement', type: 'select', options: ['Full travel management', 'Flights', 'Hotels', 'Visa assistance', 'Travel insurance', 'Group / incentive trip'], initial: 'Full travel management' },
      { name: 'destination', label: 'Destination(s)', placeholder: 'Where is the team going?', icon: MapPin },
      { name: 'travelDate', label: 'Travel Date', type: 'date', min: TODAY },
      { name: 'travelers', label: 'Travelers', type: 'select', options: ['1 – 5', '6 – 15', '16 – 40', '40+'], initial: '1 – 5' },
    ],
  },
];

const initialValues = () =>
  Object.fromEntries(TABS.map((t) => [t.id, Object.fromEntries(t.fields.map((f) => [f.name, f.initial || '']))]));

/** Floating hero inquiry card — collects trip details, then contact details, and sends a quote request. */
export default function InquiryWidget() {
  const [active, setActive] = useState('flights');
  const [values, setValues] = useState(initialValues);
  const [contact, setContact] = useState({ name: '', phone: '', email: '', _gotcha: '' });
  const [step, setStep] = useState('trip');
  const [errors, setErrors] = useState({});
  const tabRefs = useRef([]);
  const { status, result, submit, reset } = useInquiry('Homepage quick inquiry');

  const tab = TABS.find((t) => t.id === active);
  const setField = (name, value) => {
    setValues((v) => ({ ...v, [active]: { ...v[active], [name]: value } }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };
  const setContactField = (name, value) => {
    setContact((c) => ({ ...c, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const selectTab = (id) => {
    setActive(id);
    setStep('trip');
    setErrors({});
  };

  const onTabKey = (e, index) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (index + dir + TABS.length) % TABS.length;
    selectTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const focusFirstError = (errs) => {
    const first = Object.keys(errs)[0];
    if (first) document.querySelector(`.widget [name="${first}"]`)?.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (step === 'trip') {
      const errs = {};
      tab.fields.forEach((f) => {
        if (f.required && !values[active][f.name]) errs[f.name] = f.errorText || 'This field is required.';
      });
      setErrors(errs);
      if (Object.keys(errs).length) return focusFirstError(errs);
      setStep('contact');
      return;
    }
    const errs = validateContact(contact);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    submit({ travelType: tab.travelType, ...values[active], ...contact });
  };

  const startOver = () => {
    reset();
    setStep('trip');
    setValues(initialValues());
  };

  return (
    <div className="widget" id="quick-inquiry">
      <div className="widget__tabs" role="tablist" aria-label="What do you need help with?">
        {TABS.map((t, i) => {
          const Icon = t.icon;
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls="widget-panel"
              tabIndex={selected ? 0 : -1}
              className="widget__tab"
              onClick={() => selectTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              <Icon size={17} aria-hidden="true" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="widget__body" id="widget-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        {status === 'done' ? (
          <InquirySuccess result={result} onReset={startOver} />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div key={`${active}-${step}`} className="widget__step">
              {step === 'trip' ? (
                <div className="widget__grid" style={{ '--cols': tab.fields.length }}>
                  {tab.fields.map((f) => (
                    <Field
                      key={f.name}
                      {...f}
                      value={values[active][f.name]}
                      onChange={setField}
                      error={errors[f.name]}
                    />
                  ))}
                </div>
              ) : (
                <div className="widget__grid widget__grid--contact" style={{ '--cols': 3 }}>
                  <Field name="name" label="Full Name" icon={User} placeholder="Your name" autoComplete="name" required value={contact.name} onChange={setContactField} error={errors.name} />
                  <Field name="phone" label="Phone / WhatsApp" type="tel" icon={Phone} placeholder="+92 3XX XXXXXXX" autoComplete="tel" required value={contact.phone} onChange={setContactField} error={errors.phone} />
                  <Field name="email" label="Email (optional)" type="email" icon={Mail} placeholder="you@example.com" autoComplete="email" value={contact.email} onChange={setContactField} error={errors.email} />
                  <Honeypot value={contact._gotcha} onChange={setContactField} />
                </div>
              )}
            </div>

            <div className="widget__footer">
              <p className="widget__note">
                <ShieldCheck size={18} aria-hidden="true" />
                {step === 'trip'
                  ? 'No payment needed — a consultant confirms availability and fares personally.'
                  : 'We’ll only use your details to respond to this request.'}
              </p>
              <div className="widget__buttons">
                {step === 'contact' && (
                  <button type="button" className="btn btn--ghost-dark" onClick={() => setStep('trip')}>
                    <ArrowLeft size={18} aria-hidden="true" /> Back
                  </button>
                )}
                <button type="submit" className="btn btn--forest btn--lg" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <><LoaderCircle size={18} className="spin" aria-hidden="true" /> Sending…</>
                  ) : step === 'trip' ? (
                    <>{tab.cta} <ArrowRight size={18} aria-hidden="true" /></>
                  ) : (
                    <>Send Request <ArrowRight size={18} aria-hidden="true" /></>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
