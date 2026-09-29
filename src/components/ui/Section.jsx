import Reveal from './Reveal.jsx';

/** Eyebrow + editorial heading + lead paragraph. `title` accepts JSX for <em> accents. */
export function SectionHeading({ eyebrow, title, lead, align = 'left', as: H = 'h2', className = '', children }) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H className="h2">{title}</H>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </Reveal>
  );
}

/** Standard section wrapper. tone: ivory | sand | white | navy | ink | emerald */
export default function Section({ id, tone = 'ivory', className = '', children, container = true, ...rest }) {
  return (
    <section id={id} className={`section section--${tone} ${className}`} {...rest}>
      {container ? <div className="container">{children}</div> : children}
    </section>
  );
}
