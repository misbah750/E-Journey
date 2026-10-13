import { Link } from 'react-router-dom';
import { ArrowRight, Target, Compass, HandHeart, Route, UsersRound, Check } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Img from '../components/ui/Img.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Section, { SectionHeading } from '../components/ui/Section.jsx';
import WhyUs from '../components/sections/WhyUs.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';
import { BrandLogo } from '../components/ui/Logo.jsx';
import { images } from '../data/images.js';
import { audiences, coreValues } from '../data/content.js';
import { site } from '../data/site.js';
import { useSeo } from '../lib/hooks.js';

const purpose = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To be the leading travel and related services company of choice by providing premier services and innovative travel options to our customers across Pakistan and overseas.',
  },
  {
    icon: Compass,
    title: 'Our Vision',
    text: 'To maintain reputable market leadership and continuous excellence in the travel and tourism industry, locally and worldwide.',
  },
  {
    icon: HandHeart,
    title: 'Our Philosophy',
    text: 'Travelling means not just to visit a place but to truly explore it. We bring cultural connection and spiritual depth closer to every traveller, so each departure becomes an unforgettable experience.',
  },
];

const divisions = [
  {
    no: '01',
    title: 'Pilgrim Services Desk',
    text: 'Experienced coordinators, advised by religious scholars, who guide pilgrims before and during Umrah, overseeing hotels, transfers and Ziyarat across Makkah and Madinah.',
    foot: 'Makkah & Madinah specialists',
  },
  {
    no: '02',
    title: 'Corporate Travel Solutions',
    text: 'Dedicated travel management for private companies and multinationals seeking cost-effective corporate ticketing, accommodation and responsive service.',
    foot: 'Corporate & group operations',
  },
  {
    no: '03',
    title: 'Visa & Worldwide Leisure',
    text: 'Visa assistance and documentation support, alongside custom international holidays and domestic tours of Pakistan’s Northern Areas.',
    foot: 'Visa guidance & tour planning',
  },
];

export default function About() {
  useSeo({
    title: 'About Us',
    description:
      'About e-Journey Travel & Tours, a Karachi-based tour operator offering customized independent tours, packaged group departures, Umrah, visa assistance and corporate travel.',
  });

  return (
    <>
      <PageHero
        image={images.attabad}
        eyebrow="Who We Are"
        title={<>About <em>e-Journey</em></>}
        lead="A Pakistan-based tour operator providing comprehensive travel services for individuals and groups travelling to and from the country."
        crumbs={[{ label: 'About Us' }]}
      />

      <Section tone="ivory" className="story">
        <div className="split">
          <div>
            <Reveal>
              <p className="eyebrow">Our Story</p>
              <h2 className="h2">A Tour Operator Built on <em>Value &amp; Care</em></h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lead">
                e-Journey Travel &amp; Tours is one of Pakistan’s leading tour operators, providing comprehensive travel
                management and pilgrimage operations for groups and individuals travelling to and from the country.
              </p>
              <p className="body-copy">
                We handle domestic and international travel, from Pakistan’s Northern Areas to destinations around the
                world, with expert consultation at every step. Guided by our commitment to value for money and client
                satisfaction, our annual traveller volume has grown more than tenfold, supported by continuous investment
                in contemporary travel technology and uncompromising quality standards.
              </p>
            </Reveal>
          </div>
          <div className="story-collage" aria-hidden="true">
            <Reveal variant="fade" className="story-collage__a">
              <Img image={images.madinah} sizes="320px" maxWidth={768} alt="" />
            </Reveal>
            <Reveal variant="fade" delay={160} className="story-collage__b">
              <Img image={images.dubaiSunset} sizes="320px" maxWidth={768} alt="" />
            </Reveal>
            <Reveal variant="fade" delay={300} className="story-collage__c">
              <Img image={images.hunza} sizes="260px" maxWidth={768} alt="" />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="white" className="brand-band">
        <div className="brand-band__inner">
          <Reveal variant="scale" className="brand-band__logo">
            <BrandLogo width={520} />
          </Reveal>
          <Reveal delay={150} className="brand-band__text">
            <p className="eyebrow">Our Promise</p>
            <p className="brand-band__quote">“{site.promise}”</p>
            <p className="body-copy">
              A journey in motion, guided with care, from the first conversation to the moment you return home. It is the
              standard behind every ticket, stay and itinerary we arrange.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeading eyebrow="Guiding Principles" title={<>Our Mission, Vision &amp; <em>Purpose</em></>} align="center" />
        <ul className="purpose-grid">
          {purpose.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 100} className="purpose-card">
              <span className="purpose-card__icon"><Icon size={24} aria-hidden="true" /></span>
              <h3 className="h3">{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <div className="section-head-row">
          <SectionHeading eyebrow="How We Travel" title={<>Two Ways to Explore, <em>One Standard of Care</em></>} />
        </div>
        <div className="ways-grid">
          <Reveal className="way-card">
            <span className="way-card__icon"><Route size={24} aria-hidden="true" /></span>
            <h3 className="h3">Customized Independent Tours</h3>
            <p>Your destination, your dates, your pace. We design the itinerary around you: flights, stays, transfers and experiences included.</p>
            <ul className="check-list check-list--single">
              <li><Check size={16} aria-hidden="true" /> Built entirely around your preferences</li>
              <li><Check size={16} aria-hidden="true" /> Ideal for couples, families and private groups</li>
              <li><Check size={16} aria-hidden="true" /> Flexible dates and hotel choices</li>
            </ul>
            <Link to="/plan-your-trip" className="link-arrow link-arrow--strong">Design my trip <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
          <Reveal delay={120} className="way-card way-card--dark">
            <span className="way-card__icon"><UsersRound size={24} aria-hidden="true" /></span>
            <h3 className="h3">Packaged Group Departures</h3>
            <p>Travel in good company on a planned itinerary, with every arrangement taken care of from departure to return.</p>
            <ul className="check-list check-list--single">
              <li><Check size={16} aria-hidden="true" /> Fixed itineraries with clear inclusions</li>
              <li><Check size={16} aria-hidden="true" /> Ideal for pilgrims, students and first-time travellers</li>
              <li><Check size={16} aria-hidden="true" /> Great value through group arrangements</li>
            </ul>
            <Link to="/destinations" className="link-arrow link-arrow--strong">See signature packages <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <div className="section-head-row">
          <SectionHeading
            eyebrow="The Pillars of Our Service"
            title={<>Our Core <em>Values</em></>}
            lead="Standards that accept no compromise, across every part of our operation."
          />
        </div>
        <ul className="values-grid">
          {coreValues.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 80} className="value-card">
              <span className="value-card__icon"><Icon size={20} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="forest">
        <SectionHeading
          eyebrow="Expertise & Operations"
          title={<>Our Dedicated <em>Divisions</em></>}
          lead="Specialists handling every facet of pilgrim, corporate and leisure travel."
          align="center"
        />
        <ul className="divisions-grid">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 100} className="division-card">
              <span className="division-card__no">Division {d.no}</span>
              <h3 className="h3">{d.title}</h3>
              <p>{d.text}</p>
              <span className="division-card__foot">{d.foot}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Who We Serve" title={<>Journeys for <em>Every Traveller</em></>} align="center" />
        <Reveal className="audience-list">
          {audiences.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </Reveal>
      </Section>

      <WhyUs tone="white" />
      <FinalCTA />
    </>
  );
}
