import { useState } from 'react';
import { MapPin, Phone, Smartphone, Mail, ExternalLink, Map } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { WhatsAppIcon } from '../ui/BrandIcons.jsx';
import Img from '../ui/Img.jsx';
import { images } from '../../data/images.js';
import InquiryForm from '../forms/InquiryForm.jsx';
import { site, whatsappUrl, mapEmbedUrl, mapLinkUrl } from '../../data/site.js';
import { contactTravelTypes } from '../../data/content.js';

export function ContactCards() {
  return (
    <ul className="contact-cards">
      <li className="contact-card contact-card--wide">
        <span className="contact-card__icon"><MapPin size={20} aria-hidden="true" /></span>
        <span>
          <strong>Office</strong>
          <address>{site.address.lines.map((l) => <span key={l}>{l}</span>)}</address>
          <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
            Get directions <ExternalLink size={14} aria-hidden="true" />
          </a>
        </span>
      </li>
      <li className="contact-card">
        <span className="contact-card__icon"><Phone size={20} aria-hidden="true" /></span>
        <span>
          <strong>Phone</strong>
          {site.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`}>{p.label}</a>)}
        </span>
      </li>
      <li className="contact-card">
        <span className="contact-card__icon"><Smartphone size={20} aria-hidden="true" /></span>
        <span>
          <strong>Mobile</strong>
          {site.mobiles.map((p) => <a key={p.tel} href={`tel:${p.tel}`}>{p.label}</a>)}
        </span>
      </li>
      <li className="contact-card contact-card--wide">
        <span className="contact-card__icon"><Mail size={20} aria-hidden="true" /></span>
        <span>
          <strong>Email</strong>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
      </li>
      <li className="contact-card contact-card--wa contact-card--wide">
        <span className="contact-card__icon"><WhatsAppIcon size={20} /></span>
        <span>
          <strong>WhatsApp</strong>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Chat with a consultant</a>
        </span>
      </li>
    </ul>
  );
}

/** Google Map that loads only when requested (privacy- and performance-friendly). */
export function MapEmbed() {
  const [load, setLoad] = useState(false);
  return (
    <div className="map">
      {load ? (
        <iframe
          title="Map showing the e-Journey office in Gulshan-e-Iqbal, Karachi"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button type="button" className="map__placeholder" onClick={() => setLoad(true)}>
          <span className="map__pin"><Map size={22} aria-hidden="true" /></span>
          <strong>Akbar Paradise, Gulshan-e-Iqbal</strong>
          <small>Main Rashid Minhas Road, Karachi</small>
          <span className="map__cta">Show interactive map</span>
        </button>
      )}
    </div>
  );
}

/** Photo card with direct call / WhatsApp actions. */
export function TalkCard() {
  return (
    <div className="talk-card">
      <Img image={images.wingSunset} sizes="(max-width: 1000px) 100vw, 40vw" maxWidth={1080} />
      <div className="talk-card__body">
        <p className="eyebrow eyebrow--light">Prefer to talk?</p>
        <p className="talk-card__title">Our consultants are a message away.</p>
        <div className="talk-card__actions">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--sm">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
          <a href={`tel:${site.phones[0].tel}`} className="btn btn--ghost-light btn--sm">
            <Phone size={16} aria-hidden="true" /> {site.phones[0].label}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection({ variant = 'short', tone = 'white', eyebrow = 'Contact', title, lead, defaults }) {
  return (
    <Section id="contact" tone={tone} className="contact">
      <div className="contact__layout">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title || <>Talk to a <em>Travel Consultant</em></>}
            lead={lead || 'Visit our Karachi office, call, or send a request — we’ll respond personally.'}
          />
          <Reveal delay={100}>
            <ContactCards />
          </Reveal>
          <Reveal delay={160}>
            <MapEmbed />
          </Reveal>
        </div>
        <Reveal delay={120} className="contact__form">
          <InquiryForm
            variant={variant}
            source="Contact section"
            travelTypeOptions={contactTravelTypes}
            defaults={defaults}
            title="Send a travel request"
            intro="Share a few details and a consultant will get back to you."
          />
          <TalkCard />
        </Reveal>
      </div>
    </Section>
  );
}
