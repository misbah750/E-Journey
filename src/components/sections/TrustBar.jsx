import Reveal from '../ui/Reveal.jsx';
import { trustItems } from '../../data/content.js';

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Why travellers trust e-Journey">
      <div className="container">
        <ul className="trust__list">
          {trustItems.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 70} className="trust__item">
              <span className="trust__icon"><Icon size={22} aria-hidden="true" /></span>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
