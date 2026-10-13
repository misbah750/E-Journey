import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../ui/Logo.jsx';
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../ui/BrandIcons.jsx';
import { site, whatsappUrl, mapLinkUrl } from '../../data/site.js';

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/services', label: 'All Services' },
      { to: '/plan-your-trip', label: 'Plan Your Trip' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/ticketing', label: 'Ticketing' },
      { to: '/visa-assistance', label: 'Visa' },
      { to: '/umrah', label: 'Umrah' },
      { to: '/travel-insurance', label: 'Travel Insurance' },
      { to: '/hotels', label: 'Hotels' },
      { to: '/corporate-travel', label: 'Corporate Travel' },
    ],
  },
  {
    title: 'Tourism',
    links: [
      { to: '/international-tours', label: 'International Tours' },
      { to: '/pakistan-tours', label: 'Domestic Tours' },
      { to: '/plan-your-trip?style=Honeymoon', label: 'Honeymoon' },
      { to: '/plan-your-trip?style=Family', label: 'Family' },
      { to: '/plan-your-trip?style=Group', label: 'Group' },
    ],
  },
];

function Social({ href, label, children }) {
  // Placeholder until official accounts are supplied (see data/site.js → social).
  if (!href) {
    return (
      <span className="social social--pending" title={`${label} — coming soon`} aria-label={`${label} (coming soon)`} role="img">
        {children}
      </span>
    );
  }
  return (
    <a className="social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <BrandLogo light className="footer__logo" width={280} />
            <p className="footer__tagline">Travel beyond destinations.</p>
            <p className="footer__blurb">
              A Karachi-based travel agency for air tickets, international and domestic tours, visas, Umrah and
              travel insurance.
            </p>
            <div className="footer__social">
              <Social href={site.social.facebook} label="Facebook"><FacebookIcon /></Social>
              <Social href={site.social.instagram} label="Instagram"><InstagramIcon /></Social>
              <a className="social" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={20} />
              </a>
              <Social href={site.social.linkedin} label="LinkedIn"><LinkedInIcon /></Social>
            </div>
          </div>

          {columns.map((col) => (
            <nav className="footer__col" key={col.title} aria-label={col.title}>
              <h2 className="footer__title">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col footer__contact">
            <h2 className="footer__title">Contact</h2>
            <ul>
              <li>
                <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin size={16} aria-hidden="true" />
                  <span>Office 08, Akbar Paradise, Block 10, Gulshan-e-Iqbal, Karachi</span>
                </a>
              </li>
              {site.mobiles.slice(0, 2).map((p) => (
                <li key={p.tel}><a href={`tel:${p.tel}`}><Phone size={16} aria-hidden="true" />{p.label}</a></li>
              ))}
              <li><a href={`mailto:${site.email}`}><Mail size={16} aria-hidden="true" />{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} e-Journey Travel &amp; Tours. All Rights Reserved.</p>
          <Link to="/plan-your-trip" className="footer__plan">
            Plan your trip <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
