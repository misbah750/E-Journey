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
      { to: '/destinations', label: 'Destinations' },
      { to: '/pakistan-tours', label: 'Tours' },
      { to: '/services', label: 'Services' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { to: '/services#international-tickets', label: 'Flights' },
      { to: '/hotels', label: 'Hotels' },
      { to: '/visa-assistance', label: 'Visa Assistance' },
      { to: '/travel-insurance', label: 'Travel Insurance' },
      { to: '/corporate-travel', label: 'Corporate Travel' },
      { to: '/hajj-umrah', label: 'Hajj & Umrah' },
    ],
  },
  {
    title: 'Travel',
    links: [
      { to: '/pakistan-tours', label: 'Pakistan' },
      { to: '/international-tours', label: 'International' },
      { to: '/plan-your-trip?style=Honeymoon', label: 'Honeymoon' },
      { to: '/plan-your-trip?style=Family', label: 'Family' },
      { to: '/services#groups', label: 'Groups' },
      { to: '/corporate-travel', label: 'Corporate' },
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
              A Karachi-based tour operator providing domestic and international travel, Hajj &amp; Umrah, visa assistance,
              hotels and corporate travel for travellers to and from Pakistan.
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
              {site.phones.map((p) => (
                <li key={p.tel}><a href={`tel:${p.tel}`}><Phone size={16} aria-hidden="true" />{p.label}</a></li>
              ))}
              <li><a href={`tel:${site.mobiles[0].tel}`}><Phone size={16} aria-hidden="true" />{site.mobiles[0].label}</a></li>
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
