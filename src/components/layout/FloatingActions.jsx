import { Link } from 'react-router-dom';
import { Phone, Compass } from 'lucide-react';
import { WhatsAppIcon } from '../ui/BrandIcons.jsx';
import { site, whatsappUrl } from '../../data/site.js';
import { useScrolled } from '../../lib/hooks.js';

/** Floating WhatsApp button (desktop) and sticky contact bar (mobile). */
export default function FloatingActions() {
  const shown = useScrolled(420);
  return (
    <>
      <a
        className="wa-fab"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with e-Journey on WhatsApp"
      >
        <WhatsAppIcon size={28} />
        <span className="wa-fab__label">Chat with us</span>
      </a>

      <nav className={`mobile-bar ${shown ? 'is-shown' : ''}`} aria-label="Quick contact">
        <a href={`tel:${site.mobiles[0].tel}`}>
          <Phone size={19} aria-hidden="true" /> Call
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mobile-bar__wa">
          <WhatsAppIcon size={19} /> WhatsApp
        </a>
        <Link to="/plan-your-trip" className="mobile-bar__cta">
          <Compass size={19} aria-hidden="true" /> Plan Trip
        </Link>
      </nav>
    </>
  );
}
