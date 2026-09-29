import { Link } from 'react-router-dom';
import { ArrowRight, Check, Route, Users } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { images } from '../../data/images.js';
import { aboutPillars } from '../../data/content.js';

export default function AboutIntro() {
  return (
    <Section id="about" tone="ivory" className="about-intro">
      <div className="split">
        <div className="about-intro__media">
          <Reveal variant="mask" className="about-intro__main">
            <Img image={images.hunzaAutumn} sizes="(max-width: 960px) 100vw, 45vw" />
          </Reveal>
          <Reveal variant="up" delay={250} className="about-intro__inset">
            <Img image={images.kaaba} sizes="260px" maxWidth={768} />
          </Reveal>
          <Reveal variant="up" delay={400} className="about-intro__badge">
            <span className="about-intro__badge-icon"><Route size={20} aria-hidden="true" /></span>
            <span>
              <strong>Two ways to travel</strong>
              <small>Customized independent tours or packaged group departures</small>
            </span>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">About e-Journey</p>
            <h2 className="h2">Travel That Feels <em>Personal</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead">
              e-Journey Travel &amp; Tours provides comprehensive travel services for individuals, families, groups,
              companies, students, honeymoon couples, international travelers, and Pakistanis living abroad.
            </p>
            <p className="body-copy">
              As a tour operator serving travellers to and from Pakistan, we plan journeys two ways: customized independent
              tours designed entirely around you, and packaged group departures for those who enjoy travelling in good
              company. Either way, one experienced team looks after every detail — from Pakistan’s Northern Areas to
              destinations around the world.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="pillars">
              {aboutPillars.map((p) => (
                <li key={p}><Check size={16} aria-hidden="true" /> {p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={260} className="about-intro__actions">
            <Link to="/about" className="btn btn--forest">
              Discover Our Story <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <span className="about-intro__note"><Users size={16} aria-hidden="true" /> Individuals · Families · Groups · Companies</span>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
