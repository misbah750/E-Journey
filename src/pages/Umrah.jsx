import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, CalendarClock, Stamp } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FormAside from '../components/ui/FormAside.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import UmrahBand, { Ornament } from '../components/sections/UmrahBand.jsx';
import UmrahPackages, { describeUmrahChoice } from '../components/sections/UmrahPackages.jsx';
import { Accordion } from '../components/sections/FAQ.jsx';
import InquiryForm from '../components/forms/InquiryForm.jsx';
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx';
import { images } from '../data/images.js';
import { umrahTypes, umrahRateNote, umrahVisa, hasCurrentPrice, umrahFromPrice, nextDeparture } from '../data/umrah.js';
import { formatPKR, formatDate } from '../data/packages.js';
import { whatsappUrl } from '../data/site.js';
import { faqJsonLd, useSeo } from '../lib/hooks.js';

const pilgrimFaqs = [
  { q: 'How often do Umrah rates change?', a: 'Umrah rates move with the season, so we update them every 15 days to a month. Ask us for the current rate for your dates and we’ll send it the same day.' },
  { q: 'What is the difference between Group and Individual Umrah?', a: 'Group Umrah travels together as a group movement with a scholar guiding the group. Individual Umrah is planned around your own dates, hotels and length of stay.' },
  { q: 'Do scholars accompany the groups?', a: 'Yes. Religious scholars provide guidance before and during the pilgrimage, so every ritual is performed with confidence.' },
  { q: 'What room sharing options are available?', a: 'Sharing, quad, triple and double rooms are available — each package lists the price for every option.' },
  { q: 'Is assistance available for elderly pilgrims or wheelchair users?', a: 'Please mention any mobility or special assistance needs when you enquire, and our pilgrim desk will plan the arrangements with you.' },
  { q: 'Can you help with Hajj?', a: 'For Hajj, please contact us directly to discuss your plans — our team will talk you through the options.' },
];

export default function Umrah() {
  const [booking, setBooking] = useState({ umrahType: '' });
  const groupFrom = umrahFromPrice();
  const bookPackage = (group, index) => {
    const next = nextDeparture(group);
    setBooking({ umrahType: 'Group Umrah', package: describeUmrahChoice(group, index), ...(next ? { travelDate: next } : {}) });
  };
  useSeo({
    title: 'Umrah Packages from Pakistan — Group, Individual & Five Star',
    description:
      'Group, individual and five star Umrah from Karachi with scholar guidance, hotels near the Haramain, Umrah e-Visa and current rates updated every 15 days, by e-Journey Travel & Tours.',
    jsonLd: faqJsonLd(pilgrimFaqs),
  });

  return (
    <div className="pilgrim-page">
      <PageHero
        tone="emerald"
        image={images.kaabaClose}
        eyebrow="Umrah Services"
        title={<>Umrah, Guided <em>With Care</em></>}
        lead="Group, individual and five star Umrah from Pakistan — visa, tickets, hotels near the Haramain and scholar guidance, all arranged for you."
        crumbs={[{ label: 'Umrah' }]}
      >
        <a href="#packages" className="btn btn--gold btn--lg">View Umrah Packages <ArrowRight size={18} aria-hidden="true" /></a>
        <a
          href={whatsappUrl('Assalam o Alaikum e-Journey, please send me the current Umrah rates.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost-light btn--lg"
        >
          <WhatsAppIcon size={18} /> Get Current Rates
        </a>
      </PageHero>

      <UmrahPackages onBook={bookPackage} />

      <Section id="umrah-types" tone="ivory">
        <SectionHeading
          eyebrow="Ways to Travel"
          title={<>Three Ways to Perform <em>Umrah</em></>}
          lead="Pick the style that suits your family. Every option includes visa and ticket arrangements, hotels and transport."
          align="center"
        >
          <p className="rate-note"><CalendarClock size={16} aria-hidden="true" /> {umrahRateNote}</p>
        </SectionHeading>

        <ul className="umrah-types">
          {umrahTypes.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 100} className="umrah-type" id={t.id}>
              <div className="umrah-type__media">
                <Img image={t.image} sizes="(max-width: 900px) 100vw, 33vw" maxWidth={1080} />
              </div>
              <div className="umrah-type__body">
                <p className="umrah-type__tag">{t.tagline}</p>
                <h3 className="umrah-type__title">{t.title}</h3>
                <p className="umrah-type__text">{t.text}</p>
                <ul className="check-list check-list--single">
                  {t.points.map((p) => (
                    <li key={p}><Check size={16} aria-hidden="true" /> {p}</li>
                  ))}
                </ul>
                <div className="umrah-type__price">
                  {t.id === 'group' && groupFrom ? (
                    <>
                      <span>Current departures from</span>
                      <strong>{formatPKR(groupFrom)}</strong>
                      <small>Per person · <a href="#packages">see packages above</a></small>
                    </>
                  ) : hasCurrentPrice(t) ? (
                    <>
                      <span>Starting from</span>
                      <strong>{formatPKR(t.price)}</strong>
                      <small>Per person · valid till {formatDate(t.validTill)}</small>
                    </>
                  ) : (
                    <>
                      <span>This period’s rate</span>
                      <strong className="umrah-type__ask">Ask for the current rate</strong>
                      <small>Rates are updated every 15 days</small>
                    </>
                  )}
                </div>
                <div className="umrah-type__actions">
                  <a href="#pilgrim-inquiry" onClick={() => setBooking({ umrahType: t.title })} className="btn btn--forest">
                    Enquire <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <a
                    href={whatsappUrl(`Assalam o Alaikum e-Journey, please send me the current rate for ${t.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    aria-label={`Ask for the ${t.title} rate on WhatsApp`}
                  >
                    <WhatsAppIcon size={17} /> Rate
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="umrah-visa">
          <span className="umrah-visa__icon"><Stamp size={22} aria-hidden="true" /></span>
          <span className="umrah-visa__text">
            <strong>{umrahVisa.label}</strong>
            <small>Need only the visa? We process Umrah visas too.</small>
          </span>
          <strong className={`umrah-visa__price ${umrahVisa.price ? '' : 'umrah-visa__price--ask'}`}>{umrahVisa.price || 'Ask for the current rate'}</strong>
          <Link to="/visa-assistance" className="link-arrow">All visa prices <ArrowRight size={15} aria-hidden="true" /></Link>
        </Reveal>
      </Section>

      <UmrahBand cta={false} />

      <Section tone="ivory">
        <div className="faq__layout">
          <Reveal className="faq__intro">
            <p className="eyebrow">Pilgrim Questions</p>
            <h2 className="h2">Before You <em>Travel</em></h2>
            <Ornament />
            <p className="lead">Our Umrah consultants are on hand to answer anything else — including hotel distances and upgrades.</p>
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
            eyebrow="Plan Your Umrah"
            title={<>Begin Your <em>Journey of Faith</em></>}
            lead="Share your Umrah type, dates and room sharing. Our pilgrim desk will send this period’s rate and availability."
          >
            <FormAside image={images.madinahCourtyard} />
          </SectionHeading>
          <Reveal delay={120}>
            <InquiryForm
              key={JSON.stringify(booking)}
              variant="pilgrimage"
              source="Umrah page"
              defaults={{ travelType: 'Umrah', departureCity: 'Karachi', ...booking }}
              submitLabel="Get My Umrah Rate"
            />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
