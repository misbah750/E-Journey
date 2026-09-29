import { useEffect, useRef } from 'react';

let observer;
function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  return observer;
}

/** Adds `is-visible` to an element the first time it scrolls into view. */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el) return undefined;
    if (!io) {
      el.classList.add('is-visible');
      return undefined;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return ref;
}

/**
 * Scroll-triggered entrance. variant: up | fade | scale | left | right | mask
 */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`}
      style={delay ? { '--reveal-delay': `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
