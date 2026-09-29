import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Section, { SectionHeading } from '../ui/Section.jsx';
import { testimonials } from '../../data/content.js';

export default function Testimonials({ tone = 'sand' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const go = (d) => setIndex((i) => (i + d + count) % count);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || count < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [paused, count]);

  return (
    <Section id="testimonials" tone={tone} className="testimonials">
      <SectionHeading eyebrow="Traveller Stories" title={<>Journeys, In Their <em>Own Words</em></>} align="center" />
      <Reveal
        className="quote-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Quote size={44} className="quote-carousel__mark" aria-hidden="true" />
        <div className="quote-carousel__slides" aria-live={paused ? 'polite' : 'off'}>
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className={`quote-slide ${i === index ? 'is-active' : ''}`}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.trip} · {t.destination}</span>
                {!t.verified && (
                  <em className="placeholder-tag">Customer testimonial — replace with verified customer feedback</em>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="quote-carousel__controls">
          <button type="button" className="round-btn round-btn--dark" onClick={() => go(-1)} aria-label="Previous testimonial">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <div className="dots" role="group" aria-label="Choose testimonial">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button type="button" className="round-btn round-btn--dark" onClick={() => go(1)} aria-label="Next testimonial">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </Reveal>
    </Section>
  );
}
