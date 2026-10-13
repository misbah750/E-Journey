import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import { SectionHeading } from '../ui/Section.jsx';
import { images } from '../../data/images.js';

const SLIDES = [
  { name: 'Hunza', region: 'Gilgit-Baltistan', image: images.hunza, slug: 'hunza' },
  { name: 'Skardu', region: 'Gilgit-Baltistan', image: images.shangrila, slug: 'skardu' },
  { name: 'Fairy Meadows', region: 'Nanga Parbat', image: images.fairyMeadows, slug: 'fairy-meadows' },
  { name: 'Attabad Lake', region: 'Upper Hunza', image: images.attabad, slug: 'hunza' },
  { name: 'Naran', region: 'Kaghan Valley', image: images.naran, slug: 'naran-kaghan' },
  { name: 'Swat', region: 'Khyber Pakhtunkhwa', image: images.swat, slug: 'swat' },
  { name: 'Kashmir', region: 'Neelum Valley', image: images.kashmir, slug: 'kashmir' },
  { name: 'Deosai Plains', region: 'Skardu', image: images.deosai, slug: 'skardu' },
];

/** Immersive horizontal gallery: native swipe/scroll, mouse drag, and arrow controls. */
export default function PakistanGallery() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });

  useEffect(() => {
    const el = trackRef.current;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    const card = el.querySelector('.gallery__item');
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 360), behavior: 'smooth' });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { active: true, x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
    trackRef.current.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove('is-dragging');
  };
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section className="section section--ink gallery-section" aria-labelledby="pk-title">
      <div className="container">
        <div className="section-head-row">
          <SectionHeading
            eyebrow="Northern Areas & Beyond"
            title={<span id="pk-title">Discover the Beauty of <em>Pakistan</em></span>}
            lead="Glacial lakes, alpine meadows and some of the highest peaks on earth. Journeys through Pakistan’s north, planned by people who know the road."
          />
          <Reveal delay={120} className="section-head-row__aside section-head-row__aside--end">
            <div className="gallery__controls">
              <button type="button" className="round-btn" onClick={() => scrollBy(-1)} aria-label="Previous destinations">
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" className="round-btn" onClick={() => scrollBy(1)} aria-label="Next destinations">
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <ul
        className="gallery__track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        aria-label="Pakistan destinations gallery"
      >
        {SLIDES.map((s, i) => (
          <li key={s.name} className="gallery__item" style={{ '--i': i }}>
            <Link to={`/pakistan-tours#${s.slug}`} draggable="false">
              <Img image={s.image} sizes="(max-width: 760px) 78vw, 30vw" maxWidth={1080} draggable="false" />
              <span className="gallery__caption">
                <span className="gallery__region"><MapPin size={13} aria-hidden="true" /> {s.region}</span>
                <span className="gallery__name">{s.name}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="container gallery__footer">
        <div className="gallery__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
        <Link to="/pakistan-tours" className="btn btn--gold">
          Explore Pakistan Tours <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
