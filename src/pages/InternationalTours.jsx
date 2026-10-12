import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Packages from '../components/sections/Packages.jsx';
import DestinationRows from '../components/sections/DestinationRows.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { images } from '../data/images.js';
import { internationalDestinations } from '../data/destinations.js';
import { useSeo } from '../lib/hooks.js';

export default function InternationalTours() {
  useSeo({
    title: 'International Tour Packages from Pakistan',
    description:
      'International tour packages from Pakistan — Thailand, Malaysia, Bali, Sri Lanka, Uzbekistan, Azerbaijan and Egypt, with hotels, transfers, tours and visa. By e-Journey Travel & Tours, Karachi.',
  });

  return (
    <>
      <PageHero
        image={images.cappadocia}
        eyebrow="International Tours"
        title={<>The World, <em>Thoughtfully Planned</em></>}
        lead="Ready-to-book tour packages with hotels, breakfast, transfers, sightseeing and visa — or a holiday designed entirely around you."
        crumbs={[{ label: 'Destinations', to: '/destinations' }, { label: 'International Tours' }]}
      >
        <a href="#packages" className="btn btn--gold btn--lg">View Packages <ArrowRight size={18} aria-hidden="true" /></a>
        <a href="#plan" className="btn btn--ghost-light btn--lg">Request a Custom Quote</a>
      </PageHero>

      <Packages tone="ivory" />

      <Section tone="white" className="dest-rows-section">
        <SectionHeading
          eyebrow="Tailor-Made Holidays"
          title={<>Somewhere Else <em>in Mind?</em></>}
          lead="We also plan custom holidays to these destinations. Tell us what you love and we’ll shape the trip."
          align="center"
        />
        <DestinationRows items={internationalDestinations} headingLevel={3} />
      </Section>

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
    </>
  );
}
