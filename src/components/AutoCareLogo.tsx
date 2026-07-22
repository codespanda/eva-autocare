export function AutoCareLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4.5l1.8 3.2 3.4-1.4 1 3.5 3.6-0.4 0.3 3.6 3.5 0.7-0.7 3.5 3.2 1.8-1.8 3.2 2.6 2.6-2.6 2.6 1.8 3.2-3.2 1.8 0.7 3.5-3.5 0.7-0.3 3.6-3.6-0.4-1 3.5-3.4-1.4L24 43.5l-1.8-3.2-3.4 1.4-1-3.5-3.6 0.4-0.3-3.6-3.5-0.7 0.7-3.5-3.2-1.8 1.8-3.2L7.1 24l2.6-2.6-1.8-3.2 3.2-1.8-0.7-3.5 3.5-0.7 0.3-3.6 3.6 0.4 1-3.5 3.4 1.4L24 4.5z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="12.5" stroke="white" strokeWidth="1.6" />
      <path
        d="M15.5 27.5l1.3-4a2 2 0 011.9-1.4h10.6a2 2 0 011.9 1.4l1.3 4"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="14.5" y="27.5" width="19" height="4.2" rx="1.4" stroke="white" strokeWidth="1.7" />
      <circle cx="19" cy="31.7" r="1.3" fill="white" />
      <circle cx="29" cy="31.7" r="1.3" fill="white" />
      <path d="M18.5 23.5h11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="33" cy="12" r="3.4" fill="#2f6fed" stroke="#0b1220" strokeWidth="1" />
      <path
        d="M33 9.2c1.1 1.4 1.9 2.4 1.9 3.3a1.9 1.9 0 11-3.8 0c0-.9.8-1.9 1.9-3.3z"
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
}
