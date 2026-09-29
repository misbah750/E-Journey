/* Small hand-drawn icons that lucide does not ship (brand marks & the Kaaba). */

const base = (size, props) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': props['aria-label'] ? undefined : true,
  focusable: 'false',
  ...props,
});

export function KaabaIcon({ size = 24, strokeWidth = 1.6, ...props }) {
  return (
    <svg {...base(size, props)} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 3.5 6.6v10.8L12 21l8.5-3.6V6.6L12 3Z" />
      <path d="M3.5 6.6 12 10.2l8.5-3.6" />
      <path d="M12 10.2V21" />
      <path d="M3.5 9.4 12 13l8.5-3.6" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, ...props }) {
  return (
    <svg {...base(size, props)} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, ...props }) {
  return (
    <svg {...base(size, props)} fill="currentColor">
      <path d="M13.5 21v-7.2h2.4l.4-2.9h-2.8V9.1c0-.8.3-1.4 1.4-1.4h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.2H8.2v2.9h2.4V21h2.9Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }) {
  return (
    <svg {...base(size, props)} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon({ size = 20, ...props }) {
  return (
    <svg {...base(size, props)} fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 13.4c0-3.1-1.66-4.54-3.87-4.54a3.34 3.34 0 0 0-3.02 1.66V8.5h-3.37V20h3.37v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.39l-.5-6.6Z" />
    </svg>
  );
}
