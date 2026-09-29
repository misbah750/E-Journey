import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import { images } from '../../data/images.js';
import { useParallax } from '../../lib/hooks.js';

export default function FinalCTA({
  image = images.wingSunset,
  title = <>Ready to Start Your <em>Journey?</em></>,
  text = 'Tell us where you want to go. We’ll help you plan how to get there.',
  primary = { to: '/plan-your-trip', label: 'Plan My Trip' },
  secondary = { to: '/contact', label: 'Contact e-Journey' },
}) {
  const ref = useParallax(0.15);
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__media" ref={ref}>
        <Img image={image} sizes="100vw" />
      </div>
      <div className="final-cta__shade" aria-hidden="true" />
      <Reveal className="container final-cta__inner">
        <p className="eyebrow eyebrow--light eyebrow--center">Let’s create a journey designed around you</p>
        <h2 id="final-cta-title" className="display display--md">{title}</h2>
        <p className="final-cta__text">{text}</p>
        <div className="final-cta__actions">
          <Link to={primary.to} className="btn btn--gold btn--lg">
            {primary.label} <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to={secondary.to} className="btn btn--ghost-light btn--lg">{secondary.label}</Link>
        </div>
      </Reveal>
    </section>
  );
}
