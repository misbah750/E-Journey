import { useState } from 'react';
import { submitInquiry, formatInquiry } from '../../lib/inquiry.js';

/** Submission state machine shared by every inquiry form. */
export default function useInquiry(source) {
  const [state, setState] = useState({ status: 'idle', result: null });

  const submit = async (data) => {
    setState({ status: 'sending', result: null });
    try {
      const result = await submitInquiry(data, source);
      setState({ status: 'done', result });
    } catch {
      // Endpoint unreachable — fall back to one-tap WhatsApp / email so the lead is never lost.
      setState({
        status: 'done',
        result: {
          delivered: false,
          failed: true,
          message: formatInquiry(data, source),
          subject: `Travel request: ${data.travelType || 'General'}`,
        },
      });
    }
  };

  return { ...state, submit, reset: () => setState({ status: 'idle', result: null }) };
}
