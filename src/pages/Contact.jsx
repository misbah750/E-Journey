import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import { ContactCards, MapEmbed } from '../components/sections/ContactSection.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import FAQ from '../components/sections/FAQ.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import { contactTravelTypes } from '../data/content.js';
import { site, whatsappUrl, mapLinkUrl } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

export default function Contact() {
  const [params] = useSearchParams();
  const type = params.get('type');
  const defaults = type && contactTravelTypes.includes(type) ? { travelType: type } : {};

  useSeo({
    title: 'Contact Us',
    description:
      'Contact e-Journey Travel & Tours at Office 08, Akbar Paradise, Block 10, Gulshan-e-Iqbal, Karachi. Call or WhatsApp +92 335 5100991, or email info@ejourney.net.',
  });

  const quick = [
    { href: `tel:${site.mobiles[0].tel}`, icon: Phone, label: 'Call us', value: site.mobiles[0].label },
    { href: whatsappUrl(), icon: WhatsAppIcon, label: 'WhatsApp', value: site.whatsappLabel, external: true },
    { href: `mailto:${site.email}`, icon: Mail, label: 'Email', value: site.email },
    { href: mapLinkUrl, icon: MapPin, label: 'Visit us', value: 'Gulshan-e-Iqbal, Karachi', external: true },
  ];

  return (
    <>
      <PageHero
        size="sm"
        image={images.planning}
        eyebrow="Contact"
        title={<>Ready to Start Your <em>Journey?</em></>}
        lead="Tell us where you want to go. We’ll help you plan how to get there."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="quick-actions" aria-label="Contact options">
        <div className="container">
          <ul>
            {quick.map(({ href, icon: Icon, label, value, external }, i) => (
              <Reveal as="li" key={label} delay={i * 70}>
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="quick-actions__icon"><Icon size={22} aria-hidden="true" /></span>
                  <span><small>{label}</small><strong>{value}</strong></span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Section tone="ivory" id="inquiry">
        <div className="contact__layout">
          <div>
            <SectionHeading
              eyebrow="Talk to a Travel Consultant"
              title={<>We’re Here to <em>Help</em></>}
              lead="Visit our Karachi office, call or message us, or send a detailed request and a consultant will respond personally."
            />
            <Reveal delay={100}><ContactCards /></Reveal>
            <Reveal delay={160}><MapEmbed /></Reveal>
          </div>
          <Reveal delay={120}>
            <InquiryForm
              variant="full"
              source="Contact page"
              travelTypeOptions={contactTravelTypes}
              defaults={defaults}
              title="Submit a travel request"
              intro="The more you tell us, the better we can tailor your journey."
            />
          </Reveal>
        </div>
      </Section>

      <FAQ tone="white" />
    </>
  );
}
