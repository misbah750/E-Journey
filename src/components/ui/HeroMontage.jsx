import { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin, Pause, Play } from 'lucide-react';

/**
 * Cinematic hero montage of famous places.
 *  - Desktop / fast connections: muted video clips that crossfade in sequence.
 *  - Phones, data-saver or slow connections: a Ken Burns slideshow of the clips' poster frames.
 *  - prefers-reduced-motion: a single still image, no cycling.
 * The progress bar drives the timing, and waits while a clip buffers.
 */
function pickMode() {
  if (typeof window === 'undefined') return 'images';
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'still';
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g|3g/.test(conn.effectiveType || ''))) return 'images';
  if (window.innerWidth < 768) return 'images';
  return 'video';
}

export function useMontage(clips) {
  const [mode] = useState(pickMode);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(mode !== 'video');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(() => new Set([0, 1 % clips.length]));
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const quality =
    typeof window !== 'undefined' && window.innerWidth * (window.devicePixelRatio || 1) > 1500 ? 'hd' : 'sd';

  const count = clips.length;
  const halted = paused || !visible;

  const goTo = useCallback(
    (i) => {
      setIndex(i);
      setLoaded((prev) => new Set([...prev, i, (i + 1) % count]));
    },
    [count],
  );
  const next = useCallback(() => goTo((index + 1) % count), [goTo, index, count]);

  // Pause while the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden), { threshold: 0.05 });
    io.observe(el);
    const onVisibility = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Start the active clip from its chosen moment.
  useEffect(() => {
    if (mode !== 'video') {
      setRunning(true);
      return undefined;
    }
    setRunning(false);
    const v = videoRefs.current[index];
    if (!v) return undefined;
    const clip = clips[index];
    const start = () => {
      try {
        v.currentTime = clip.start;
      } catch {
        /* not seekable yet */
      }
      v.play().catch(() => setRunning(true));
    };
    if (v.readyState >= 1) start();
    else v.addEventListener('loadedmetadata', start, { once: true });
    // If a clip can't start, show its poster frame for the segment instead of stalling.
    const fallback = setTimeout(() => setRunning(true), 7000);
    const settle = setTimeout(() => {
      videoRefs.current.forEach((other, i) => {
        if (other && i !== index) other.pause();
      });
    }, 1600);
    return () => {
      clearTimeout(fallback);
      clearTimeout(settle);
      v.removeEventListener('loadedmetadata', start);
    };
  }, [index, mode, clips]);

  // Pause / resume the active clip.
  useEffect(() => {
    if (mode !== 'video') return;
    const v = videoRefs.current[index];
    if (!v) return;
    if (halted) v.pause();
    else if (v.readyState >= 1) v.play().catch(() => {});
  }, [halted, index, mode]);

  // Browsers may defer autoplay (power saving, background tabs) — retry when the page
  // becomes visible or on the visitor's first interaction.
  useEffect(() => {
    if (mode !== 'video' || halted) return undefined;
    const retry = () => {
      const v = videoRefs.current[index];
      if (v && v.paused && !document.hidden) v.play().catch(() => {});
    };
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((e) => window.addEventListener(e, retry, { passive: true }));
    document.addEventListener('visibilitychange', retry);
    const again = setTimeout(retry, 1200);
    return () => {
      events.forEach((e) => window.removeEventListener(e, retry));
      document.removeEventListener('visibilitychange', retry);
      clearTimeout(again);
    };
  }, [index, halted, mode]);

  return { clips, mode, index, running, halted, paused, setPaused, setRunning, goTo, next, loaded, rootRef, videoRefs, quality };
}

/** Background layers — place inside the hero's media container. */
export function MontageLayers({ montage }) {
  const { clips, mode, index, loaded, rootRef, videoRefs, quality, setRunning, halted } = montage;
  const shown = mode === 'still' ? [clips[0]] : clips;

  return (
    <div className={`montage montage--${mode} ${halted ? 'is-halted' : ''}`} ref={rootRef} aria-hidden="true">
      {shown.map((clip, i) => {
        const active = i === index;
        const inUse = loaded.has(i);
        return (
          <div key={clip.key} className={`montage__layer ${active ? 'is-active' : ''}`}>
            {mode === 'video' ? (
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={inUse ? clip[quality] : undefined}
                poster={inUse ? clip.poster : undefined}
                muted
                loop
                playsInline
                autoPlay={active && !halted}
                preload={inUse ? 'auto' : 'none'}
                disablePictureInPicture
                onPlaying={() => active && setRunning(true)}
                onWaiting={() => active && setRunning(false)}
                onError={() => active && setRunning(true)}
              />
            ) : (
              inUse && <img src={clip.poster} alt="" decoding="async" fetchPriority={i === 0 ? 'high' : undefined} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Location caption, progress and pause control — place inside the hero content. */
export function MontageControls({ montage }) {
  const { clips, mode, index, running, halted, paused, setPaused, goTo, next } = montage;
  const clip = clips[index];
  if (mode === 'still') {
    return (
      <div className="montage-ui">
        <p className="montage-ui__place"><MapPin size={14} aria-hidden="true" /> <span><strong>{clips[0].place}</strong> {clips[0].country}</span></p>
      </div>
    );
  }
  return (
    <div className="montage-ui" role="group" aria-label="Background video of famous places">
      <p className="montage-ui__place" key={clip.key}>
        <MapPin size={14} aria-hidden="true" />
        <span><strong>{clip.place}</strong> {clip.country}</span>
      </p>
      <div className="montage-ui__row">
        <div className="montage-ui__bars">
          {clips.map((c, i) => (
            <button
              key={c.key}
              type="button"
              className={`montage-ui__bar ${i < index ? 'is-done' : ''} ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show ${c.place}, ${c.country}`}
              aria-current={i === index ? 'true' : undefined}
            >
              {i === index && (
                <span
                  className="montage-ui__fill"
                  style={{ animationDuration: `${c.length}s`, animationPlayState: running && !halted ? 'running' : 'paused' }}
                  onAnimationEnd={next}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="montage-ui__toggle"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
