import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Packages from '../components/sections/Packages.jsx';
import DestinationRows from '../components/sections/DestinationRows.jsx';
import { Honeymoon } from '../components/sections/Lifestyle.jsx';
import VisaBand from '../components/sections/VisaBand.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { internationalDestinations } from '../data/destinations.js';
import { useSeo } from '../lib/hooks.js';

export default function InternationalTours() {
  useSeo({
    title: 'International Tour Packages from Pakistan',
    description:
      'International holidays from Pakistan — Dubai, Qatar, Türkiye, Malaysia, Thailand, Europe and Saudi Arabia. Flights, hotels, visas and tours arranged by e-Journey Travel & Tours.',
  });

  return (
    <>
      <PageHero
        image={images.cappadocia}
        eyebrow="International Tours"
        title={<>The World, <em>Thoughtfully Planned</em></>}
        lead="International holiday experiences from Pakistan — flights, visas, hotels and sightseeing arranged together, around the way you like to travel."
        crumbs={[{ label: 'Destinations', to: '/destinations' }, { label: 'International Tours' }]}
      >
        <a href="#plan" className="btn btn--gold btn--lg">Request a Quote <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>

      <Packages
        tone="ivory"
        only="gulf"
        eyebrow="Gulf Escapes"
        title={<>Signature <em>City &amp; Desert</em> Journeys</>}
        lead="Our signature Gulf packages — flexible for couples and families, and fully customizable."
      />

      <Section tone="white" className="dest-rows-section">
        <SectionHeading
          eyebrow="Destinations"
          title={<>Where the World <em>Opens Up</em></>}
          lead="Inspiration for your next international holiday. Every itinerary is tailored — tell us what you love and we’ll shape the trip."
          align="center"
        />
        <DestinationRows items={internationalDestinations} headingLevel={3} />
      </Section>

      <Honeymoon />
      <VisaBand />

      <Section id="plan" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Plan an International Trip"
            title={<>Let’s Create a Journey <em>Designed Around You</em></>}
            lead="Tell us where you’d like to go and when. We’ll come back with flights, stays and experiences that fit."
          >
            <FormAside image={images.istanbul} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="full" source="International tours page" defaults={{ travelType: 'Holiday' }} />
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
