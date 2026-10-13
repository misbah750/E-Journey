import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Heart, MapPinned, BedDouble, Car, Camera, Route } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import Section from '../ui/Section.jsx';
import { images } from '../../data/images.js';

const honeymoonStyles = [
  { label: 'Romantic escapes', note: 'Istanbul · Paris · Cappadocia' },
  { label: 'Beach holidays', note: 'Maldives · Thailand · Langkawi' },
  { label: 'Mountain retreats', note: 'Hunza · Skardu · Swiss Alps' },
  { label: 'Luxury resorts', note: 'Overwater villas & desert hideaways' },
  { label: 'International honeymoon packages', note: 'Tailor-made, end to end' },
];

export function Honeymoon() {
  return (
    <Section id="honeymoon" tone="ivory" className="romance">
      <div className="split split--media-left">
        <div className="romance__media">
          <Reveal variant="mask" className="romance__main">
            <Img image={images.maldives} sizes="(max-width: 960px) 100vw, 45vw" />
          </Reveal>
          <Reveal variant="up" delay={200} className="romance__inset">
            <Img image={images.couple} sizes="280px" maxWidth={768} />
          </Reveal>
          <Reveal variant="fade" delay={350} className="romance__badge" aria-hidden="true">
            <Heart size={18} />
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow">Honeymoons</p>
            <h2 className="h2">Begin Your Story Somewhere <em>Beautiful</em></h2>
            <p className="lead">Tailor-made honeymoon experiences designed around unforgettable moments.</p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="editorial-list">
              {honeymoonStyles.map((s) => (
                <li key={s.label}>
                  <Link to="/plan-your-trip?style=Honeymoon">
                    <span className="editorial-list__label">{s.label}</span>
                    <span className="editorial-list__note">{s.note}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <Link to="/plan-your-trip?style=Honeymoon" className="btn btn--forest">
              Plan My Honeymoon <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const familyFeatures = [
  { icon: MapPinned, title: 'Family-friendly destinations', text: 'Places that work for every age.' },
  { icon: BedDouble, title: 'Accommodation assistance', text: 'Family rooms, suites and apartments.' },
  { icon: Car, title: 'Transportation', text: 'Flights, transfers and comfortable road travel.' },
  { icon: Camera, title: 'Sightseeing', text: 'Paced for children and grandparents alike.' },
  { icon: Route, title: 'Customized itineraries', text: 'Built around school holidays and your pace.' },
];

export function Family() {
  return (
    <Section id="family" tone="white" className="family">
      <div className="split">
        <div>
          <Reveal>
            <p className="eyebrow">Family Travel</p>
            <h2 className="h2">More Than a Vacation. <em>A Memory You’ll Keep.</em></h2>
            <p className="lead">
              Holidays that give everyone something to remember, planned with the practical details families care about.
            </p>
          </Reveal>
          <ul className="feature-list">
            {familyFeatures.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 70}>
                <span className="feature-list__icon"><Icon size={20} aria-hidden="true" /></span>
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <Link to="/plan-your-trip?style=Family" className="btn btn--forest">
              Plan a Family Trip <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="family__media">
          <Reveal variant="mask" className="family__main">
            <Img image={images.family} sizes="(max-width: 960px) 100vw, 45vw" />
          </Reveal>
          <Reveal variant="up" delay={220} className="family__card">
            <Img image={images.familyMountains} sizes="240px" maxWidth={768} />
            <span>From the beaches of the Gulf to the valleys of the north.</span>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
