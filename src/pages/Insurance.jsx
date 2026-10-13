import { ArrowRight, Info, Globe2, Stamp, GraduationCap, Users, BriefcaseBusiness, Plane } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Process from '../components/sections/Process.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { useSeo } from '../lib/hooks.js';

const who = [
  { icon: Globe2, title: 'International travellers', text: 'Cover suited to your destination and trip length.' },
  { icon: Stamp, title: 'Visa applicants', text: 'Guidance on insurance where a visa requires it, such as Schengen visas.' },
  { icon: Users, title: 'Families', text: 'Policies that include everyone travelling together.' },
  { icon: GraduationCap, title: 'Students', text: 'Support for study trips and educational tours.' },
  { icon: BriefcaseBusiness, title: 'Corporate travellers', text: 'Insurance arranged alongside business travel.' },
  { icon: Plane, title: 'Domestic trips', text: 'Support for travel within Pakistan too.' },
];

const steps = [
  { no: '01', title: 'Share Your Trip', text: 'Destination, dates, travellers and any visa requirement.' },
  { no: '02', title: 'Compare Options', text: 'We explain suitable policies and what they cover.' },
  { no: '03', title: 'Get Covered', text: 'Your policy is arranged and documents shared with you.' },
  { no: '04', title: 'Travel Assured', text: 'Guidance on who to contact if you need to claim.' },
];

export default function Insurance() {
  useSeo({
    title: 'Travel Insurance Assistance',
    description:
      'Travel insurance support from e-Journey Travel & Tours for international and domestic trips, visa applications, families, students and corporate travellers.',
  });

  return (
    <>
      <PageHero
        image={images.wingSunset}
        eyebrow="Travel Insurance"
        title={<>Travel Covered, <em>Travel Assured</em></>}
        lead="Travel insurance support for international and domestic travellers, so an unexpected moment doesn’t become an unexpected cost."
        crumbs={[{ label: 'Services', to: '/services' }, { label: 'Travel Insurance' }]}
      >
        <a href="#insurance-inquiry" className="btn btn--gold btn--lg">Request Insurance Support <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>

      <Section tone="ivory">
        <SectionHeading eyebrow="Who It’s For" title={<>Cover for Every Kind of <em>Traveller</em></>} align="center" />
        <div className="benefit-layout">
          <Reveal variant="mask" className="benefit-layout__photo">
            <Img image={images.familyMountains} sizes="(max-width: 960px) 100vw, 40vw" maxWidth={1080} />
            <span>Cover for families, students and business travellers</span>
          </Reveal>
          <ul className="benefit-grid benefit-grid--2">
            {who.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 90} className="benefit-card">
                <span className="benefit-card__icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="notice">
          <Info size={20} aria-hidden="true" />
          <p>
            Policies are issued by licensed insurers. Coverage, exclusions and claims are governed by the insurer’s policy
            wording. We’ll help you understand the options before you choose.
          </p>
        </Reveal>
      </Section>

      <Process steps={steps} eyebrow="How It Works" title={<>Insurance, <em>Made Simple</em></>} />

      <Section id="insurance-inquiry" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Insurance Request"
            title={<>Tell Us About <em>Your Trip</em></>}
            lead="We’ll recommend suitable cover and explain it clearly."
          >
            <FormAside image={images.beachPalms} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="insurance" source="Travel insurance page" defaults={{ travelType: 'Travel Insurance' }} submitLabel="Request Insurance Support" />
          </Reveal>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
