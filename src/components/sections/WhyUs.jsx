import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import { images } from '../../data/images.js';
import Section from '../ui/Section.jsx';
import { whyUs } from '../../data/content.js';

export default function WhyUs({ tone = 'white' }) {
  return (
    <Section id="why" tone={tone} className="why">
      <div className="why__layout">
        <div className="why__intro">
          <Reveal>
            <p className="eyebrow">Why e-Journey</p>
            <h2 className="h2">Why Travel With <em>e-Journey?</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <blockquote className="why__quote">
              <p>Travelling means not just to visit a place but to truly explore it.</p>
              <footer>The e-Journey philosophy</footer>
            </blockquote>
            <p className="body-copy">
              Knowledge of the destination, a personal approach and genuine care for every traveller. That is how we
              turn trips into journeys worth remembering.
            </p>
            <Link to="/about" className="link-arrow link-arrow--strong">
              Our mission &amp; values <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal variant="mask" delay={200} className="why__photo">
            <Img image={images.deosai} sizes="(max-width: 960px) 100vw, 36vw" maxWidth={1080} />
            <span>Deosai Plains, Gilgit-Baltistan</span>
          </Reveal>
        </div>
        <ul className="why__grid">
          {whyUs.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 90} className="why-card">
              <span className="why-card__top">
                <span className="why-card__icon"><Icon size={22} aria-hidden="true" /></span>
                <span className="why-card__no">0{i + 1}</span>
              </span>
              <h3 className="why-card__title">{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
