import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { KaabaIcon } from '../ui/BrandIcons.jsx';
import { HajjNote } from './UmrahBand.jsx';
import { images } from '../../data/images.js';
import { aboutPillars } from '../../data/content.js';

export default function AboutIntro() {
  return (
    <Section id="about" tone="ivory" className="about-intro">
      <div className="split">
        <div className="about-intro__media">
          <Reveal variant="mask" className="about-intro__main">
            <Img image={images.kaaba} sizes="(max-width: 960px) 100vw, 45vw" />
          </Reveal>
          <Reveal variant="up" delay={250} className="about-intro__inset">
            <Img image={images.madinah} sizes="260px" maxWidth={768} />
          </Reveal>
          <Reveal variant="up" delay={400} className="about-intro__badge">
            <span className="about-intro__badge-icon"><KaabaIcon size={20} /></span>
            <span>
              <strong>Umrah specialists</strong>
              <small>Religious scholars guide you before and during your pilgrimage</small>
            </span>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">About e-Journey</p>
            <h2 className="h2">From Makkah to the World, <em>Travel That Feels Personal</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead">
              e-Journey Travel &amp; Tours provides comprehensive travel services — from Umrah to holidays across
              Pakistan and around the world — for individuals, families, groups, companies and Pakistanis living abroad.
            </p>
          </Reveal>
          <Reveal delay={170} className="about-intro__pilgrim">
            <span className="about-intro__pilgrim-icon"><KaabaIcon size={22} /></span>
            <span>
              <strong>Umrah</strong>
              <small>
                Umrah packages with hotels near the Haramain, transport and meals, and religious scholars guiding you
                before and during your journey to Makkah and Madinah.
              </small>
              <HajjNote as="span" className="hajj-note--light" />
            </span>
          </Reveal>
          <Reveal delay={220}>
            <p className="body-copy">
              Beyond pilgrimage, we plan journeys two ways: customized independent tours designed entirely around you, and
              packaged group departures for those who enjoy travelling in good company.
            </p>
            <ul className="pillars">
              {aboutPillars.map((p) => (
                <li key={p}><Check size={16} aria-hidden="true" /> {p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280} className="about-intro__actions">
            <Link to="/umrah" className="btn btn--gold">
              Explore Umrah <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/about" className="btn btn--outline">
              Discover Our Story
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
