import { useState } from 'react';
import {
  Mountain, Sun, Heart, Home, Gem, Landmark, BriefcaseBusiness, User, Users, UsersRound,
  Building2, ArrowRight, ArrowLeft, Minus, Plus, LoaderCircle, MapPin, Baby,
} from 'lucide-react';
import Field, { Honeypot, todayISO } from './Field.jsx';
import InquirySuccess from './InquirySuccess.jsx';
import useInquiry from './useInquiry.js';
import { KaabaIcon } from '../ui/BrandIcons.jsx';
import { validateContact } from '../../lib/inquiry.js';
import { budgetRanges } from '../../data/content.js';

const TODAY = todayISO();

const DESTINATIONS = [
  'Northern Pakistan', 'Dubai', 'Türkiye', 'Saudi Arabia (Umrah)',
  'Malaysia', 'Thailand', 'Qatar', 'Europe',
];
const COMPANIONS = [
  { id: 'Solo', icon: User }, { id: 'Couple', icon: Heart }, { id: 'Family', icon: Baby },
  { id: 'Friends', icon: UsersRound }, { id: 'Group', icon: Users }, { id: 'Company', icon: Building2 },
];
const EXPERIENCES = [
  { id: 'Adventure', icon: Mountain }, { id: 'Relaxation', icon: Sun }, { id: 'Honeymoon', icon: Heart },
  { id: 'Family', icon: Home }, { id: 'Luxury', icon: Gem }, { id: 'Cultural', icon: Landmark },
  { id: 'Religious', icon: KaabaIcon }, { id: 'Business', icon: BriefcaseBusiness },
];
const DURATIONS = ['A long weekend', 'About a week', 'Two weeks', 'Three weeks or more'];

export const STEPS = [
  { key: 'destination', label: 'Destination', title: 'Where do you want to go?' },
  { key: 'dates', label: 'Dates', title: 'When are you traveling?' },
  { key: 'companions', label: 'Travelers', title: 'Who are you traveling with?' },
  { key: 'experience', label: 'Experience', title: 'What type of experience?' },
  { key: 'budget', label: 'Budget', title: 'What is your approximate budget?' },
  { key: 'contact', label: 'Your details', title: 'Where should we send your plan?' },
];

/** Five-step custom package planner that ends in a travel inquiry. */
export default function TripBuilder({ initial = {}, onStepChange }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    destination: '', otherDestination: '', departure: '', returnDate: '', duration: '', flexible: false,
    companions: '', travelers: 2, experience: [], budget: '',
    name: '', phone: '', email: '', message: '', _gotcha: '', ...initial,
  });
  const [errors, setErrors] = useState({});
  const { status, result, submit, reset } = useInquiry('Custom trip builder');

  const set = (name, value) => {
    setData((d) => ({ ...d, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };
  const go = (n) => {
    setStep(n);
    onStepChange?.(n);
  };
  const toggleExperience = (id) =>
    set('experience', data.experience.includes(id) ? data.experience.filter((x) => x !== id) : [...data.experience, id]);

  const destinationValue = data.otherDestination.trim() || data.destination;

  const next = (e) => {
    e.preventDefault();
    if (step === 0 && !destinationValue) {
      setErrors({ destination: 'Choose a destination or type your own.' });
      return;
    }
    if (step < STEPS.length - 1) return go(step + 1);
    const errs = validateContact(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    submit({
      travelType: data.experience.includes('Honeymoon') ? 'Honeymoon' : data.experience.includes('Religious') ? 'Umrah' : 'Holiday',
      destination: destinationValue,
      departure: data.departure,
      returnDate: data.returnDate,
      duration: data.duration,
      flexible: data.flexible,
      companions: data.companions,
      travelers: data.travelers,
      experience: data.experience,
      budget: data.budget,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      _gotcha: data._gotcha,
    });
  };

  if (status === 'done') {
    return (
      <div className="builder__card">
        <InquirySuccess result={result} onReset={() => { reset(); go(0); }} />
      </div>
    );
  }

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form className="builder__card" onSubmit={next} noValidate aria-labelledby="builder-step-title">
      <div className="builder__top">
        <span className="builder__count">Step {step + 1} of {STEPS.length}</span>
        <span className="builder__label">{current.label}</span>
      </div>
      <div className="builder__progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div key={step} className="builder__step">
        <h3 className="h3" id="builder-step-title">{current.title}</h3>

        {current.key === 'destination' && (
          <>
            <div className="chip-grid" role="radiogroup" aria-label="Popular destinations">
              {DESTINATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={data.destination === d && !data.otherDestination}
                  className="chip"
                  onClick={() => { set('destination', d); set('otherDestination', ''); }}
                >
                  <MapPin size={15} aria-hidden="true" /> {d}
                </button>
              ))}
            </div>
            <Field
              name="otherDestination"
              label="Or tell us where"
              placeholder="Any city, country or region"
              value={data.otherDestination}
              onChange={set}
              error={errors.destination}
            />
          </>
        )}

        {current.key === 'dates' && (
          <>
            <div className="form-grid">
              <Field name="departure" label="Departure" type="date" min={TODAY} value={data.departure} onChange={set} />
              <Field name="returnDate" label="Return" type="date" min={data.departure || TODAY} value={data.returnDate} onChange={set} />
            </div>
            <p className="builder__sub">Or roughly how long?</p>
            <div className="chip-grid" role="radiogroup" aria-label="Trip length">
              {DURATIONS.map((d) => (
                <button key={d} type="button" role="radio" aria-checked={data.duration === d} className="chip" onClick={() => set('duration', data.duration === d ? '' : d)}>
                  {d}
                </button>
              ))}
            </div>
            <label className="check">
              <input type="checkbox" checked={data.flexible} onChange={(e) => set('flexible', e.target.checked)} />
              <span>My dates are flexible</span>
            </label>
          </>
        )}

        {current.key === 'companions' && (
          <>
            <div className="option-grid" role="radiogroup" aria-label="Travelling with">
              {COMPANIONS.map(({ id, icon: Icon }) => (
                <button key={id} type="button" role="radio" aria-checked={data.companions === id} className="option-card" onClick={() => set('companions', id)}>
                  <Icon size={22} aria-hidden="true" />
                  <span>{id}</span>
                </button>
              ))}
            </div>
            <div className="stepper">
              <span id="traveller-count-label">Number of travelers</span>
              <div className="stepper__controls">
                <button type="button" aria-label="Fewer travelers" onClick={() => set('travelers', Math.max(1, data.travelers - 1))}><Minus size={16} /></button>
                <output aria-labelledby="traveller-count-label" aria-live="polite">{data.travelers}</output>
                <button type="button" aria-label="More travelers" onClick={() => set('travelers', Math.min(99, data.travelers + 1))}><Plus size={16} /></button>
              </div>
            </div>
          </>
        )}

        {current.key === 'experience' && (
          <>
            <p className="builder__sub">Choose as many as you like.</p>
            <div className="option-grid option-grid--4">
              {EXPERIENCES.map(({ id, icon: Icon }) => (
                <button key={id} type="button" aria-pressed={data.experience.includes(id)} className="option-card" onClick={() => toggleExperience(id)}>
                  <Icon size={22} aria-hidden="true" />
                  <span>{id}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {current.key === 'budget' && (
          <>
            <p className="builder__sub">An estimate for the whole trip helps us recommend the right options.</p>
            <div className="chip-grid chip-grid--stack" role="radiogroup" aria-label="Approximate budget">
              {budgetRanges.map((b) => (
                <button key={b} type="button" role="radio" aria-checked={data.budget === b} className="chip chip--wide" onClick={() => set('budget', b)}>
                  {b}
                </button>
              ))}
            </div>
          </>
        )}

        {current.key === 'contact' && (
          <>
            <ul className="builder__summary" aria-label="Your selections">
              <li><strong>Destination</strong>{destinationValue}</li>
              {(data.departure || data.duration) && <li><strong>When</strong>{data.departure || data.duration}{data.flexible ? ' (flexible)' : ''}</li>}
              <li><strong>Travelers</strong>{data.travelers}{data.companions ? ` · ${data.companions}` : ''}</li>
              {data.experience.length > 0 && <li><strong>Style</strong>{data.experience.join(', ')}</li>}
              {data.budget && <li><strong>Budget</strong>{data.budget}</li>}
            </ul>
            <div className="form-grid">
              <Field name="name" label="Full Name" required autoComplete="name" placeholder="Your name" value={data.name} onChange={set} error={errors.name} />
              <Field name="phone" label="Phone / WhatsApp" type="tel" required autoComplete="tel" placeholder="+92 3XX XXXXXXX" value={data.phone} onChange={set} error={errors.phone} />
              <Field name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" value={data.email} onChange={set} error={errors.email} full />
              <Field name="message" label="Anything else?" type="textarea" placeholder="Special occasions, must-see places, accessibility needs…" value={data.message} onChange={set} full />
              <Honeypot value={data._gotcha} onChange={set} />
            </div>
          </>
        )}
      </div>

      <div className="builder__nav">
        {step > 0 ? (
          <button type="button" className="btn btn--ghost-dark" onClick={() => go(step - 1)}>
            <ArrowLeft size={18} aria-hidden="true" /> Back
          </button>
        ) : <span />}
        <button type="submit" className="btn btn--forest btn--lg" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <><LoaderCircle size={18} className="spin" aria-hidden="true" /> Sending…</>
          ) : step === STEPS.length - 1 ? (
            <>Request My Custom Package <ArrowRight size={18} aria-hidden="true" /></>
          ) : (
            <>Continue <ArrowRight size={18} aria-hidden="true" /></>
          )}
        </button>
      </div>
    </form>
  );
}
