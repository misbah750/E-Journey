import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import TripBuilderSection from '../components/sections/TripBuilderSection.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import { getPackage } from '../data/packages.js';
import { site, whatsappUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

const STYLES = ['Adventure', 'Relaxation', 'Honeymoon', 'Family', 'Luxury', 'Cultural', 'Religious', 'Business'];

export default function PlanTrip() {
  const [params] = useSearchParams();
  const pkg = getPackage(params.get('package') || '');
  const style = params.get('style');
  const destination = params.get('destination');

  const initial = {};
  if (pkg) {
    initial.otherDestination = pkg.title;
    initial.message = `I'd like to customize the ${pkg.title} package.`;
  }
  if (destination) initial.otherDestination = destination;
  if (style && STYLES.includes(style)) initial.experience = [style];
  if (style === 'Family') initial.companions = 'Family';
  if (style === 'Honeymoon') initial.companions = 'Couple';
  if (style === 'Group') initial.companions = 'Group';

  useSeo({
    title: 'Plan Your Trip — Custom Travel Package',
    description:
      'Build a custom travel package with e-Journey Travel & Tours: choose your destination, dates, travel companions, experience and budget, and a consultant will design your journey.',
  });

  // Keyed by the query so switching between Honeymoon / Family / Group links resets the builder.
  return (
    <Fragment key={params.toString()}>
      <PageHero
        size="sm"
        image={images.passu}
        eyebrow="Plan Your Trip"
        title={<>Let’s Create a Journey <em>Designed Around You</em></>}
        lead="Five quick questions — then a real travel consultant takes it from there."
        crumbs={[{ label: 'Plan Your Trip' }]}
      />

      <TripBuilderSection tone="ivory" initial={initial} />

      <Section tone="white" id="detailed-request">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Prefer a Detailed Form?"
            title={<>Submit a <em>Travel Request</em></>}
            lead="Share every detail at once — or reach us directly."
          >
            <div className="faq__help">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
              <a href={`tel:${site.mobiles[0].tel}`} className="btn btn--outline">
                <Phone size={18} aria-hidden="true" /> {site.mobiles[0].label}
              </a>
            </div>
            <FormAside image={images.wing} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm
              variant="full"
              source="Plan your trip page"
              defaults={pkg ? { destination: pkg.title, travelType: 'Holiday' } : ['Honeymoon', 'Family', 'Group'].includes(style) ? { travelType: style } : {}}
            />
          </Reveal>
        </div>
      </Section>
    </Fragment>
  );
}
