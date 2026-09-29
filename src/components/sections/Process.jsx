import Section, { SectionHeading } from '../ui/Section.jsx';
import { processSteps } from '../../data/content.js';
import { useScrollProgress } from '../../lib/hooks.js';

/** Horizontal (vertical on mobile) timeline that fills as the visitor scrolls. */
export default function Process({ tone = 'forest', steps = processSteps, eyebrow = 'How It Works', title }) {
  const [ref, progress] = useScrollProgress();
  const n = steps.length;
  return (
    <Section id="process" tone={tone} className="process">
      <SectionHeading
        eyebrow={eyebrow}
        title={title || <>Your Journey, <em>Step by Step</em></>}
        lead="A simple, personal process — with a real consultant beside you from the first message to the flight home."
        align="center"
      />
      <div className="process__wrap" ref={ref} style={{ '--progress': progress, '--n': n }}>
        <span className="process__line" aria-hidden="true"><span /></span>
        <ol className="process__list">
          {steps.map((s, i) => (
            <li key={s.no} className={`process__step ${progress >= (i / n) * 0.95 + 0.04 ? 'is-active' : ''}`}>
              <span className="process__node">{s.no}</span>
              <h3 className="process__title">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
