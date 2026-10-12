import { useState } from 'react';
import { Check } from 'lucide-react';
import Img from '../ui/Img.jsx';
import Reveal from '../ui/Reveal.jsx';
import { images } from '../../data/images.js';
import Section from '../ui/Section.jsx';
import TripBuilder, { STEPS } from '../forms/TripBuilder.jsx';

export default function TripBuilderSection({ id = 'trip-builder', tone = 'sand', initial, headingLevel = 2 }) {
  const [step, setStep] = useState(0);
  const H = `h${headingLevel}`;
  return (
    <Section id={id} tone={tone} className="builder">
      <div className="builder__layout">
        <Reveal className="builder__intro">
          <p className="eyebrow">Custom Trip Builder</p>
          <H className="h2">Build Your Perfect <em>Journey</em></H>
          <p className="lead">Your trip should fit you — not the other way around.</p>
          <p className="body-copy">
            Answer five quick questions and a travel consultant will shape a package around your destination, dates,
            travel companions, style and budget.
          </p>
          <ol className="builder__steps" aria-label="Planner steps">
            {STEPS.map((s, i) => (
              <li key={s.key} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}>
                <span className="builder__dot">{i < step ? <Check size={14} aria-hidden="true" /> : i + 1}</span>
                {s.label}
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={150}>
          <TripBuilder initial={initial} onStepChange={setStep} />
          <div className="builder__photos" aria-hidden="true">
            <Img image={images.attabad} sizes="(max-width: 960px) 33vw, 18vw" maxWidth={768} alt="" />
            <Img image={images.dubai} sizes="(max-width: 960px) 33vw, 18vw" maxWidth={768} alt="" />
            <Img image={images.cappadocia} sizes="(max-width: 960px) 33vw, 18vw" maxWidth={768} alt="" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
