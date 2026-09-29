import { useEffect, useRef } from 'react';
import { Check, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../ui/BrandIcons.jsx';
import { inquiryLinks } from '../../lib/inquiry.js';

/**
 * Confirmation shown after a form is submitted.
 * Delivered → the agency has the request. Not delivered → one tap to send it via WhatsApp or email.
 */
export default function InquirySuccess({ result, onReset }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const links = inquiryLinks(result);

  return (
    <div className="inquiry-success" role="status" aria-live="polite" tabIndex={-1} ref={ref}>
      <span className="inquiry-success__icon" aria-hidden="true">
        <Check size={28} strokeWidth={2.4} />
      </span>
      {result.delivered ? (
        <>
          <h3 className="h3">Thank you!</h3>
          <p>Our travel consultant will contact you shortly.</p>
        </>
      ) : (
        <>
          <h3 className="h3">{result.failed ? 'Almost there' : 'Your request is ready'}</h3>
          <p>
            {result.failed
              ? 'We couldn’t send your request automatically. Send it to our consultants in one tap and we’ll contact you shortly.'
              : 'Send it to our travel consultants in one tap — we’ll contact you shortly.'}
          </p>
          <div className="inquiry-success__actions">
            <a className="btn btn--whatsapp" href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Send via WhatsApp
            </a>
            <a className="btn btn--outline" href={links.email}>
              <Mail size={18} aria-hidden="true" /> Send by Email
            </a>
          </div>
        </>
      )}
      {onReset && (
        <button type="button" className="link-btn" onClick={onReset}>
          Start a new request
        </button>
      )}
    </div>
  );
}
