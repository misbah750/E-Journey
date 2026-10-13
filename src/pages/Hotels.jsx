import { ArrowRight, MapPin, Wallet, Users, Target } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Accommodation from '../components/sections/Accommodation.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { useSeo } from '../lib/hooks.js';

const regions = [
  { title: 'Pakistan', text: 'City hotels in Karachi, Lahore and Islamabad, and mountain stays across Hunza, Skardu, Swat and Naran.' },
  { title: 'Makkah & Madinah', text: 'Hotels selected for comfortable access to the Haramain for pilgrims.' },
  { title: 'Dubai & the UAE', text: 'City hotels, serviced apartments and desert resorts across the UAE.' },
  { title: 'Worldwide', text: 'Türkiye, Malaysia, Thailand, Europe and beyond, from budget to deluxe.' },
];

const considerations = [
  { icon: MapPin, label: 'Location that suits your plans' },
  { icon: Wallet, label: 'Your budget and room category' },
  { icon: Users, label: 'Who is travelling and room sharing' },
  { icon: Target, label: 'The purpose of your trip' },
];

export default function Hotels() {
  useSeo({
    title: 'Hotels & Accommodation Booking',
    description:
      'Hotel booking in Pakistan and worldwide with e-Journey Travel & Tours, from budget stays and self-catering units to premium hotels, luxury suites and resorts, including hotels near the Haramain.',
  });

  return (
    <>
      <PageHero
        image={images.resortPool}
        eyebrow="Hotels & Accommodation"
        title={<>Stay Somewhere <em>You’ll Love</em></>}
        lead="Worldwide accommodation from low-budget self-catering units to exclusive deluxe hotels, matched to your destination, budget and travel style."
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'Hotels & Accommodation' }]}
      >
        <a href="#hotel-inquiry" className="btn btn--gold btn--lg">Find Accommodation <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>

      <Accommodation cta={false} tone="ivory" />

      <Section tone="white">
        <div className="split split--top">
          <div>
            <Reveal>
              <p className="eyebrow">Where We Arrange Stays</p>
              <h2 className="h2">The Right Room, <em>Wherever You Go</em></h2>
            </Reveal>
            <Reveal delay={100}>
              <ul className="consider-list" aria-label="What we consider">
                {considerations.map(({ icon: Icon, label }) => (
                  <li key={label}><Icon size={18} aria-hidden="true" /> {label}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal variant="mask" delay={160} className="hotels-photo">
              <Img image={images.dubaiDesert} sizes="(max-width: 960px) 100vw, 45vw" maxWidth={1080} />
            </Reveal>
          </div>
          <ul className="region-list">
            {regions.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 80}>
                <span className="region-list__no">0{i + 1}</span>
                <span>
                  <strong>{r.title}</strong>
                  <small>{r.text}</small>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="hotel-inquiry" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Accommodation Request"
            title={<>Tell Us About <em>Your Stay</em></>}
            lead="Share your destination, dates and preferences, and we’ll suggest options across categories for you to choose from."
          >
            <FormAside image={images.shangrila} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="hotel" source="Hotels page" defaults={{ travelType: 'Hotel' }} submitLabel="Find Accommodation" />
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
