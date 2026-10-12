import { ArrowRight, Info, FileSearch, ClipboardList, FolderCheck, Truck, BellRing, BriefcaseBusiness, Palmtree } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import Process from '../components/sections/Process.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FAQ from '../components/sections/FAQ.jsx';
import { images } from '../data/images.js';
import { useSeo } from '../lib/hooks.js';

const visaHelp = [
  { icon: FileSearch, title: 'Visa information', text: 'Clear, up-to-date guidance on what your destination requires.' },
  { icon: ClipboardList, title: 'Application guidance', text: 'Help completing forms accurately and completely.' },
  { icon: FolderCheck, title: 'Documentation support', text: 'A personalised checklist and review of your documents.' },
  { icon: Truck, title: 'Passport collection & dispatch', text: 'Assistance coordinating passport handling.' },
  { icon: BellRing, title: 'Application updates', text: 'We keep you informed as your application progresses.' },
  { icon: BriefcaseBusiness, title: 'Corporate visa support', text: 'Business visas for employees and delegations.' },
  { icon: Palmtree, title: 'Leisure traveller support', text: 'Tourist and family-visit visas for holidays abroad.' },
];

const visaSteps = [
  { no: '01', title: 'Requirements', text: 'We explain exactly what your destination and visa type ask for.' },
  { no: '02', title: 'Documents', text: 'You receive a clear checklist and help preparing each item.' },
  { no: '03', title: 'Submission', text: 'Your application is lodged and passports handled with care.' },
  { no: '04', title: 'Updates', text: 'You stay informed until your passport is returned.' },
];

export default function Visa() {
  useSeo({
    title: 'Visa Assistance in Karachi, Pakistan',
    description:
      'Visa assistance from e-Journey Travel & Tours, Karachi — visa information, application guidance, documentation support, passport dispatch assistance and updates for leisure and corporate travellers.',
  });

  return (
    <>
      <PageHero
        image={images.passport}
        eyebrow="Visa Assistance"
        title={<>Visa Assistance Without the <em>Guesswork</em></>}
        lead="Visa procedures can be time-consuming. Our team helps you understand requirements, prepare applications, coordinate document handling and stay informed throughout the process."
        crumbs={[{ label: 'Visa Assistance' }]}
      >
        <a href="#visa-inquiry" className="btn btn--gold btn--lg">Get Visa Assistance <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>

      <Section tone="ivory">
        <SectionHeading eyebrow="How We Help" title={<>Guidance at <em>Every Step</em></>} align="center" />
        <div className="benefit-layout">
          <Reveal variant="mask" className="benefit-layout__photo">
            <Img image={images.passportClose} sizes="(max-width: 960px) 100vw, 40vw" maxWidth={1080} />
            <span>Guidance from checklist to passport return</span>
          </Reveal>
          <ul className="benefit-grid benefit-grid--2">
            {visaHelp.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 4) * 80} className="benefit-card">
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
            Visa decisions are made solely by the relevant embassy or consulate. We help you prepare a complete, accurate
            application and keep you informed — processing times and outcomes remain at the discretion of the issuing
            authority.
          </p>
        </Reveal>
      </Section>

      <Process steps={visaSteps} eyebrow="The Process" title={<>Four Steps to a <em>Stronger Application</em></>} />

      <Section id="visa-inquiry" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Visa Inquiry"
            title={<>Tell Us Where You’re <em>Heading</em></>}
            lead="Share your destination, visa type and travel date. A consultant will explain the requirements and next steps."
          >
            <FormAside image={images.paris} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="visa" source="Visa assistance page" defaults={{ travelType: 'Visa' }} submitLabel="Get Visa Assistance" />
          </Reveal>
        </div>
      </Section>

      <FAQ />
    </>
  );
}
