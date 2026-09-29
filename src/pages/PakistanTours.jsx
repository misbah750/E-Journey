import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, GraduationCap, Mountain, BriefcaseBusiness, Home } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import DestinationRows from '../components/sections/DestinationRows.jsx';
import PakistanGallery from '../components/sections/PakistanGallery.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { pakistanDestinations } from '../data/destinations.js';
import { useSeo } from '../lib/hooks.js';

const styles = [
  { icon: Home, label: 'Family holidays' },
  { icon: Heart, label: 'Honeymoons' },
  { icon: GraduationCap, label: 'Student & school tours' },
  { icon: Users, label: 'Group departures' },
  { icon: Mountain, label: 'Adventure & trekking' },
  { icon: BriefcaseBusiness, label: 'Corporate retreats' },
];

export default function PakistanTours() {
  useSeo({
    title: 'Pakistan Tours — Hunza, Skardu & Northern Areas',
    description:
      'Northern Pakistan tours from Karachi: Hunza, Skardu, Fairy Meadows, Naran & Kaghan, Swat, Neelum Valley, Murree and Islamabad — customized or group departures by e-Journey Travel & Tours.',
  });

  return (
    <>
      <PageHero
        image={images.hunza}
        eyebrow="Pakistan Tours"
        title={<>Discover the Beauty of <em>Pakistan</em></>}
        lead="Glacial lakes, alpine meadows and some of the highest peaks on earth — journeys through the Northern Areas and beyond, planned end to end."
        crumbs={[{ label: 'Destinations', to: '/destinations' }, { label: 'Pakistan Tours' }]}
      >
        <a href="#plan" className="btn btn--gold btn--lg">Explore Pakistan Tours <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>

      <Section tone="ivory">
        <div className="split split--top">
          <Reveal>
            <p className="eyebrow">Domestic Travel</p>
            <h2 className="h2">From Karachi to the <em>Roof of the World</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ marginTop: 0 }}>
              We arrange domestic flights, road journeys, hotels and guided sightseeing across Pakistan — with particular
              expertise in the Northern Areas. Choose a customized independent tour or join a packaged group departure.
            </p>
            <ul className="style-chips" aria-label="Tour styles">
              {styles.map(({ icon: Icon, label }) => (
                <li key={label}><Icon size={17} aria-hidden="true" /> {label}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" className="dest-rows-section">
        <DestinationRows items={pakistanDestinations} />
      </Section>

      <PakistanGallery />

      <Section id="plan" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Plan a Pakistan Tour"
            title={<>Tell Us Where You’d <em>Like to Go</em></>}
            lead="Share your dates, group size and interests. A consultant will suggest the best route, stays and season for your trip."
          >
            <Link to="/plan-your-trip?destination=Northern%20Pakistan" className="link-arrow link-arrow--strong">
              Or use the step-by-step trip builder <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="full" source="Pakistan tours page" defaults={{ travelType: 'Holiday', destination: 'Northern Pakistan' }} />
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
