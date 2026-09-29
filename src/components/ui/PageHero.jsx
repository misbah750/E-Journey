import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Img from './Img.jsx';
import { useParallax } from '../../lib/hooks.js';

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((item, i) => (
          <li key={item.label}>
            <ChevronRight size={14} aria-hidden="true" />
            {item.to && i < items.length - 1 ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Cinematic hero for inner pages, with breadcrumbs. */
export default function PageHero({ image, eyebrow, title, lead, crumbs = [], children, tone = 'forest', size = 'md' }) {
  const bgRef = useParallax(0.18);
  return (
    <header className={`page-hero page-hero--${tone} page-hero--${size}`}>
      <div className="page-hero__media" ref={bgRef}>
        <Img image={image} eager sizes="100vw" />
      </div>
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="container page-hero__inner">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow eyebrow--light hero-anim" style={{ '--i': 1 }}>{eyebrow}</p>}
        <h1 className="display hero-anim" style={{ '--i': 2 }}>{title}</h1>
        {lead && <p className="page-hero__lead hero-anim" style={{ '--i': 3 }}>{lead}</p>}
        {children && <div className="page-hero__actions hero-anim" style={{ '--i': 4 }}>{children}</div>}
      </div>
    </header>
  );
}
