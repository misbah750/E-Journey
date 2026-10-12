import Img from './Img.jsx';

const STEPS = [
  { title: 'We review your request', text: 'A consultant reads every detail you share.' },
  { title: 'We get in touch', text: 'By phone, WhatsApp or email — whichever suits you.' },
  { title: 'You receive your options', text: 'Suggested arrangements and pricing to review.' },
];

/** Photo + "what happens next" card that sits beside inquiry forms. */
export default function FormAside({ image, caption }) {
  return (
    <div className="form-aside">
      <div className="form-aside__photo">
        <Img image={image} sizes="(max-width: 960px) 100vw, 34vw" maxWidth={1080} />
        {caption && <span className="form-aside__caption">{caption}</span>}
      </div>
      <p className="form-aside__title">What happens next</p>
      <ol className="form-aside__steps">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <span className="form-aside__no">{i + 1}</span>
            <span>
              <strong>{s.title}</strong>
              <small>{s.text}</small>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
