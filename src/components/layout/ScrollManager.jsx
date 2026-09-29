import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to top on navigation, or to the #hash target once it has rendered. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (tries++ < 25) timer = setTimeout(attempt, 60);
    };
    attempt();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
