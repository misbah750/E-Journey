import { ArrowRight, HandCoins, Headset, Plane, Siren, Layers, UsersRound } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import CorporateBand from '../components/sections/CorporateBand.jsx';
import Process from '../components/sections/Process.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { images } from '../data/images.js';
import { useSeo } from '../lib/hooks.js';

const benefits = [
  { icon: HandCoins, title: 'Cost-effective arrangements', text: 'Fares and hotels selected to respect your travel budget.' },
  { icon: Headset, title: 'Dedicated coordination', text: 'A responsive team that knows your company’s requirements.' },
  { icon: Plane, title: 'Strong airline relationships', text: 'Flexible ticketing and reliable seat availability.' },
  { icon: Layers, title: 'Everything in one place', text: 'Tickets, hotels, visas and insurance handled together.' },
  { icon: Siren, title: 'Emergency travel support', text: 'Help with urgent changes when plans shift at short notice.' },
  { icon: UsersRound, title: 'Groups & incentives', text: 'Conferences, team trips and incentive travel for staff.' },
];

const corporateSteps = [
  { no: '01', title: 'Share Your Requirements', text: 'Travellers, routes, dates and any company travel policy.' },
  { no: '02', title: 'Receive Options', text: 'Recommended fares, hotels and arrangements for approval.' },
  { no: '03', title: 'We Arrange Everything', text: 'Tickets, hotels, visas and insurance coordinated for your team.' },
  { no: '04', title: 'Support on the Road', text: 'Assistance with changes and emergencies while you travel.' },
];

export default function Corporate() {
  useSeo({
    title: 'Corporate Travel Management in Pakistan',
    description:
      'Corporate travel services from e-Journey Travel & Tours, Karachi: business flight bookings, hotel reservations, visa assistance, travel insurance and emergency travel support for companies.',
  });

  return (
    <>
      <PageHero
        image={images.cabin}
        eyebrow="Corporate Travel"
        title={<>Corporate Travel <em>Management</em></>}
        lead="Cost-effective travel management for companies: business flights, hotels, visas, insurance and support, coordinated by one dedicated team."
        crumbs={[{ label: 'Corporate Travel' }]}
      >
        <a href="#corporate-inquiry" className="btn btn--gold btn--lg">Talk to Corporate Travel Team <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>

      <CorporateBand showCta={false} />

      <Section tone="ivory">
        <SectionHeading eyebrow="Why Companies Choose Us" title={<>Business Travel Without the <em>Busywork</em></>} align="center" />
        <div className="benefit-layout">
          <Reveal variant="mask" className="benefit-layout__photo">
            <Img image={images.handshake} sizes="(max-width: 960px) 100vw, 40vw" maxWidth={1080} />
            <span>Cost-effective travel, one dedicated team</span>
          </Reveal>
          <ul className="benefit-grid benefit-grid--2">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 90} className="benefit-card">
                <span className="benefit-card__icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Process steps={corporateSteps} eyebrow="How We Work" title={<>A Simple <em>Corporate Workflow</em></>} />

      <Section id="corporate-inquiry" tone="sand">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Corporate Inquiry"
            title={<>Plan Your Company’s <em>Travel</em></>}
            lead="Tell us about your team’s travel needs, whether a one-off trip or ongoing travel management, and our corporate desk will be in touch."
          >
            <FormAside image={images.dubai} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm variant="corporate" source="Corporate travel page" defaults={{ travelType: 'Corporate' }} submitLabel="Talk to Corporate Travel Team" />
          </Reveal>
        </div>
      </Section>

      <FinalCTA
        image={images.handshake}
        title={<>Travel That Works as Hard <em>as Your Team</em></>}
        text="From a single business trip to company-wide travel management."
        primary={{ to: '/corporate-travel#corporate-inquiry', label: 'Plan Corporate Travel' }}
      />
    </>
  );
}
