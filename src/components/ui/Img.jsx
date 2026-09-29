import { useEffect, useRef } from 'react';
import { unsplash } from '../../data/images.js';

const WIDTHS = [480, 768, 1080, 1440, 1920];

/**
 * Responsive, lazy-loaded photo that fades in once decoded.
 * `image` is an entry from data/images.js ({ id, alt, position }).
 */
export default function Img({ image, sizes = '100vw', maxWidth = 1920, eager = false, className = '', alt, style, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth) el.classList.add('is-loaded');
  }, [image?.id]);

  if (!image) return null;
  const widths = WIDTHS.filter((w) => w <= maxWidth);
  const srcSet = widths.map((w) => `${unsplash(image.id, w)} ${w}w`).join(', ');

  return (
    <img
      ref={ref}
      src={unsplash(image.id, Math.min(1440, maxWidth))}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt ?? image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
      className={`img ${className}`}
      style={image.position ? { objectPosition: image.position, ...style } : style}
      {...rest}
    />
  );
}
