import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Users, Heart, GraduationCap, Mountain, BriefcaseBusiness, Home } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import DestinationRows from '../components/sections/DestinationRows.jsx';
import PackageCard from '../components/sections/PackageCard.jsx';
import PakistanGallery from '../components/sections/PakistanGallery.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { pakistanDestinations } from '../data/destinations.js';
import { domesticPackages } from '../data/packages.js';
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
    title: 'Pakistan Tours: Hunza, Skardu & Northern Areas',
    description:
      'Northern Pakistan tours from Karachi: Hunza, Skardu, Fairy Meadows, Naran & Kaghan, Minimarg, Swat, Neelum Valley and Murree. Customized or group departures by e-Journey Travel & Tours.',
  });

  return (
    <>
      <PageHero
        image={images.hunza}
        eyebrow="Pakistan Tours"
        title={<>Discover the Beauty of <em>Pakistan</em></>}
        lead="Glacial lakes, alpine meadows and some of the highest peaks on earth. Journeys through the Northern Areas and beyond, planned end to end."
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
              We arrange domestic flights, road journeys, hotels and guided sightseeing across Pakistan, with particular
              expertise in the Northern Areas. Choose a customized independent tour or join a packaged group departure.
            </p>
            <p className="rate-note">
              <CalendarClock size={16} aria-hidden="true" />{' '}
              {domesticPackages.length
                ? 'Domestic tour packages are refreshed every two months. Ask us for the current departures.'
                : 'Domestic tour packages will be shared soon. Meanwhile, ask us for a custom quote.'}
            </p>
            <ul className="style-chips" aria-label="Tour styles">
              {styles.map(({ icon: Icon, label }) => (
                <li key={label}><Icon size={17} aria-hidden="true" /> {label}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {domesticPackages.length > 0 && (
        <Section id="packages" tone="sand" className="packages">
          <SectionHeading
            eyebrow="Domestic Tour Packages"
            title={<>Pakistan Tours, <em>Ready to Book</em></>}
            lead="Current packages across Pakistan. Prices are per person; your consultant confirms dates and hotels."
            align="center"
          />
          <div className={`pkg-grid ${domesticPackages.length === 1 ? 'pkg-grid--single' : ''}`}>
            {domesticPackages.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 100}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section tone="white" className="dest-rows-section">
        <DestinationRows items={pakistanDestinations} tourDetails />
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
            <FormAside image={images.passu} />
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
