import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { WhatsAppIcon } from '../ui/BrandIcons.jsx';
import { navLinks } from '../../data/content.js';
import { site, whatsappUrl } from '../../data/site.js';
import { useBodyLock, useScrolled } from '../../lib/hooks.js';

export default function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const burgerRef = useRef(null);

  useEffect(() => setOpen(false), [pathname]);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isParentActive = (link) => link.children?.some((c) => c.to === pathname);

  return (
    <>
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container nav__inner">
        <Logo light={!scrolled || open} />

        <nav className="nav__menu" aria-label="Primary">
          <ul>
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.label} className="nav__item has-menu">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `nav__link ${isActive || isParentActive(link) ? 'active' : ''}`}
                  >
                    {link.label}
                    <ChevronDown size={14} aria-hidden="true" className="nav__chev" />
                  </NavLink>
                  <div className="nav__dropdown">
                    <ul>
                      {link.children.map((c) => (
                        <li key={c.to + c.label}>
                          <Link to={c.to}>
                            <span>{c.label}</span>
                            <small>{c.desc}</small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.label} className="nav__item">
                  <NavLink to={link.to} end={link.end} className="nav__link">
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="nav__actions">
          <Link to="/plan-your-trip" className="btn btn--gold btn--sm nav__cta">
            Plan Your Trip
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>

      <div id="mobile-menu" className={`drawer ${open ? 'is-open' : ''}`} inert={!open} aria-label="Menu">
        <nav className="drawer__nav" aria-label="Mobile">
          <ul className="drawer__links">
            {navLinks.map((link, i) => (
              <li key={link.label} style={{ '--i': i }}>
                <NavLink to={link.to} end={link.end}>{link.label}</NavLink>
                {link.children && (
                  <ul className="drawer__sub">
                    {link.children.filter((c) => c.to !== link.to).map((c) => (
                      <li key={c.to}><Link to={c.to}>{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer__footer">
          <Link to="/plan-your-trip" className="btn btn--gold btn--lg btn--block">
            Plan Your Trip <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <div className="drawer__contact">
            <a href={`tel:${site.mobiles[0].tel}`}><Phone size={18} aria-hidden="true" /> {site.mobiles[0].label}</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> WhatsApp</a>
            <a href={`mailto:${site.email}`}><Mail size={18} aria-hidden="true" /> Email</a>
          </div>
        </div>
      </div>
    </>
  );
}
