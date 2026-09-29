import { Link } from 'react-router-dom';
import { ArrowRight, Check, Tent, Accessibility, Hotel, UsersRound } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import HajjBand, { Ornament } from '../components/sections/HajjBand.jsx';
import Packages from '../components/sections/Packages.jsx';
import Process from '../components/sections/Process.jsx';
import { Accordion } from '../components/sections/FAQ.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import { getPackage } from '../data/packages.js';
import { whatsappUrl } from '../data/site.js';
import { faqJsonLd, useSeo } from '../lib/hooks.js';

const pilgrimSteps = [
  { no: '01', title: 'Choose Your Journey', text: 'Umrah, Hajj or Ziyarat — we help you select dates, hotels and room sharing.' },
  { no: '02', title: 'Visa & Documentation', text: 'We guide you through visa requirements and prepare your paperwork.' },
  { no: '03', title: 'Pre-Travel Guidance', text: 'Religious scholars brief you on rituals and etiquette before departure.' },
  { no: '04', title: 'Travel in Peace', text: 'Transfers, hotels and Ziyarat handled, with guidance throughout.' },
];

const pilgrimFaqs = [
  { q: 'Do scholars accompany the groups?', a: 'Yes. Religious scholars provide guidance before and during the pilgrimage, so every ritual is performed with confidence.' },
  { q: 'What room sharing options are available?', a: 'Packages are quoted on a quad sharing basis, with triple and double sharing available on request. Your consultant will confirm the difference in price.' },
  { q: 'Can I request hotels closer to the Haram or an upgrade?', a: 'Yes. Hotel distance, room upgrades and other preferences can be tailored — ask your consultant for the options available for your dates.' },
  { q: 'Is assistance available for elderly pilgrims or wheelchair users?', a: 'Please mention any mobility or special assistance needs when you enquire, and our pilgrim desk will plan the arrangements with you.' },
  { q: 'Do you offer Hajj packages?', a: 'Yes. Hajj packages are announced each season. Register your interest and our pilgrim desk will contact you with details when they are available.' },
];

const care = [
  { icon: Hotel, title: 'Hotels near the Haramain', text: 'Stays chosen for comfortable access to Masjid al-Haram and Masjid an-Nabawi.' },
  { icon: UsersRound, title: 'Scholar-guided groups', text: 'Authentic guidance before and during your pilgrimage.' },
  { icon: Accessibility, title: 'Special assistance', text: 'Tell us about mobility needs and we’ll plan around them.' },
];

export default function HajjUmrah() {
  const umrah = getPackage('umrah-20-night-platinum');
  useSeo({
    title: 'Hajj & Umrah Packages from Pakistan',
    description:
      'Umrah packages from Karachi with scholar guidance, hotels near the Haramain and guided Ziyarat — plus Hajj packages and Najaf & Karbala Ziyarat by e-Journey Travel & Tours.',
    jsonLd: faqJsonLd(pilgrimFaqs),
  });

  return (
    <div className="pilgrim-page">
      <PageHero
        tone="emerald"
        image={images.kaabaClose}
        eyebrow="Hajj & Umrah Services"
        title={<>Pilgrimage, Guided <em>With Care</em></>}
        lead="Umrah, Hajj and Ziyarat journeys from Pakistan — hotels near the Haramain, scholar guidance and every arrangement handled with care, so your heart stays on worship."
        crumbs={[{ label: 'Hajj & Umrah' }]}
      >
        <a href="#packages" className="btn btn--gold btn--lg">View Packages <ArrowRight size={18} aria-hidden="true" /></a>
        <a href="#pilgrim-inquiry" className="btn btn--ghost-light btn--lg">Plan My Umrah</a>
      </PageHero>

      <HajjBand cta={false} />

      <Packages
        tone="sand"
        only="spiritual"
        eyebrow="Pilgrimage Packages"
        title={<>Journeys to the <em>Holy Cities</em></>}
        lead="Umrah in Makkah and Madinah, and Ziyarat in Najaf and Karbala — each with dedicated time for worship and reflection."
      />

      <Section tone="white">
        <div className="split split--top">
          <div>
            <Reveal>
              <p className="eyebrow">What’s Included</p>
              <h2 className="h2">The 20-Night <em>Platinum Umrah</em></h2>
              <p className="lead">{umrah.summary}</p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="check-list check-list--single">
                {umrah.inclusions.map((item) => (
                  <li key={item}><Check size={16} aria-hidden="true" /> {item}</li>
                ))}
              </ul>
              <Link to={`/packages/${umrah.slug}`} className="btn btn--forest">
                See the Day-by-Day Itinerary <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <ul className="care-list">
            {care.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 90}>
                <span className="care-list__icon"><Icon size={22} aria-hidden="true" /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </Reveal>
            ))}
            <Reveal as="li" delay={300} className="care-list__hajj">
              <span className="care-list__icon"><Tent size={22} aria-hidden="true" /></span>
              <span>
                <strong>Hajj packages</strong>
                <small>Announced each season. Register your interest and our pilgrim desk will contact you.</small>
              </span>
            </Reveal>
          </ul>
        </div>
      </Section>

      <Process tone="forest" steps={pilgrimSteps} eyebrow="Your Pilgrimage" title={<>From Intention to <em>Arrival</em></>} />

      <Section tone="ivory">
        <div className="faq__layout">
          <Reveal className="faq__intro">
            <p className="eyebrow">Pilgrim Questions</p>
            <h2 className="h2">Before You <em>Travel</em></h2>
            <Ornament />
            <p className="lead">Our Umrah consultants are on hand to answer anything else — including custom hotel distances and upgrades.</p>
            <div className="faq__help">
              <a href={whatsappUrl('Assalam o Alaikum e-Journey, I would like help planning my Umrah.')} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                <WhatsAppIcon size={18} /> Talk to an Umrah Consultant
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Accordion items={pilgrimFaqs} />
          </Reveal>
        </div>
      </Section>

      <Section id="pilgrim-inquiry" tone="emerald" className="pilgrim pilgrim--form">
        <div className="form-layout">
          <SectionHeading
            eyebrow="Plan Your Pilgrimage"
            title={<>Begin Your <em>Journey of Faith</em></>}
            lead="Share your preferred dates, departure city and room sharing. Our pilgrim desk will contact you with availability and options."
          />
          <Reveal delay={120}>
            <InquiryForm variant="pilgrimage" source="Hajj & Umrah page" defaults={{ travelType: 'Umrah', package: 'Umrah', departureCity: 'Karachi' }} submitLabel="Plan My Umrah" />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
