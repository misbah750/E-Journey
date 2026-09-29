import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FlightPath from '../ui/FlightPath.jsx';
import { useMontage, MontageLayers, MontageControls } from '../ui/HeroMontage.jsx';
import InquiryWidget from '../forms/InquiryWidget.jsx';
import { heroClips } from '../../data/heroVideos.js';
import { useParallax } from '../../lib/hooks.js';

export default function Hero() {
  const mediaRef = useParallax(0.28);
  const montage = useMontage(heroClips);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media" ref={mediaRef}>
          <MontageLayers montage={montage} />
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <FlightPath className="hero__flight" />

        <div className="container hero__content">
          <p className="eyebrow eyebrow--light hero-anim" style={{ '--i': 0 }}>
            <span><span className="lc">e</span>-Journey Travel &amp; Tours</span>
          </p>
          <h1 id="hero-title" className="display hero-anim" style={{ '--i': 1 }}>
            Travel Beyond <em>Destinations.</em>
          </h1>
          <p className="hero__text hero-anim" style={{ '--i': 2 }}>
            Discover personalized travel experiences, seamless bookings, unforgettable holidays, and trusted travel
            assistance with e-Journey Travel &amp; Tours.
          </p>
          <div className="hero__actions hero-anim" style={{ '--i': 3 }}>
            <Link to="/plan-your-trip" className="btn btn--gold btn--lg">
              Plan My Journey <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn btn--ghost-light btn--lg">
              Explore Services
            </Link>
          </div>
          <div className="hero__montage hero-anim" style={{ '--i': 4 }}>
            <MontageControls montage={montage} />
          </div>
        </div>
      </section>

      <div className="hero-widget">
        <div className="container">
          <div className="hero-anim" style={{ '--i': 4 }}>
            <InquiryWidget />
          </div>
        </div>
      </div>
    </>
  );
}
