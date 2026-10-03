import React from 'react';

export const ScissorsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

export const RazorIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19L19 4" />
    <path d="M14 4h5v5" />
    <path d="M6 14l-2 2a2.8 2.8 0 004 4l2-2" />
    <path d="M8 12l4-4" />
  </svg>
);

export const BrushIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    <path d="M3 21h18" />
    <circle cx="6" cy="18" r="2" />
  </svg>
);

export const CrownIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 18h18l-2-10-5 5-4-8-4 8-5-5-2 10z" />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
    <circle cx="3" cy="8" r="1" fill="currentColor" />
    <circle cx="21" cy="8" r="1" fill="currentColor" />
  </svg>
);

export const PomadeJarIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="50" cy="20" rx="36" ry="10" stroke="#d4af37" strokeWidth="2.5" fill="#181a20" />
    <rect x="14" y="20" width="72" height="14" rx="4" stroke="#d4af37" strokeWidth="2.5" fill="#1e2129" />
    <ellipse cx="50" cy="34" rx="36" ry="7" stroke="#d4af37" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M18 34 C18 34, 16 58, 26 64 C36 70, 64 70, 74 64 C84 58, 82 34, 82 34" stroke="#d4af37" strokeWidth="2.5" fill="#13151a" />
    {/* Metallic label stripe */}
    <path d="M22 42 H78 V52 H22 Z" fill="#d4af37" opacity="0.25" stroke="#d4af37" strokeWidth="1.2" />
    <text x="50" y="49" fill="#f5d77f" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1.2">VOLCANIC</text>
  </svg>
);

export const BeardOilIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Dropper bulb */}
    <path d="M36 8 C36 4, 44 4, 44 8 L44 14 L36 14 Z" fill="#d4af37" />
    {/* Dropper collar */}
    <rect x="33" y="14" width="14" height="6" rx="2" stroke="#d4af37" strokeWidth="2" fill="#1f222b" />
    {/* Bottle neck */}
    <rect x="35" y="20" width="10" height="8" stroke="#d4af37" strokeWidth="2" fill="#15171d" />
    {/* Bottle shoulders & body */}
    <path d="M35 28 C26 30, 24 38, 24 44 L24 82 C24 88, 30 92, 40 92 C50 92, 56 88, 56 82 L56 44 C56 38, 54 30, 45 28 Z" stroke="#d4af37" strokeWidth="2.5" fill="#13151a" />
    {/* Glass dropper pipette interior glow */}
    <line x1="40" y1="28" x2="40" y2="76" stroke="#f5d77f" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <circle cx="40" cy="80" r="2" fill="#ffd868" />
    {/* Gold brand badge */}
    <rect x="29" y="50" width="22" height="24" rx="2" stroke="#d4af37" strokeWidth="1.5" fill="#1a1d24" />
    <text x="40" y="60" fill="#f5d77f" fontSize="6" fontWeight="bold" textAnchor="middle">OUD</text>
    <text x="40" y="68" fill="#d4af37" fontSize="4.5" textAnchor="middle">OIL</text>
  </svg>
);

export const ShampooIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Pump dispenser */}
    <path d="M38 6 L48 6 C52 6, 52 10, 48 10 L42 10" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="38" y="10" width="4" height="6" fill="#d4af37" />
    <rect x="32" y="16" width="16" height="5" rx="1.5" stroke="#d4af37" strokeWidth="2" fill="#1f222b" />
    {/* Bottle bottle */}
    <rect x="24" y="24" width="32" height="68" rx="6" stroke="#d4af37" strokeWidth="2.5" fill="#13151a" />
    {/* Cross / Apothecary Emblem */}
    <rect x="37" y="44" width="6" height="18" rx="1" fill="#d4af37" />
    <rect x="31" y="50" width="18" height="6" rx="1" fill="#d4af37" />
    <text x="40" y="74" fill="#f5d77f" fontSize="5.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">BIOTINA</text>
  </svg>
);
