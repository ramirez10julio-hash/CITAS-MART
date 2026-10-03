import React from 'react';

interface CitaSmartLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'full' | 'compact' | 'icon-only';
}

export const CitaSmartLogo: React.FC<CitaSmartLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'full',
}) => {
  const heights = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Scalable SVG Emblem */}
      <div className={`relative ${heights[size]} aspect-square shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gold Gradients */}
            <linearGradient id="goldGradient" x1="0" y1="0" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="35%" stopColor="#f5d77f" />
              <stop offset="70%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#997b24" />
            </linearGradient>

            <linearGradient id="goldBadge" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffd868" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>

            {/* Barber Pole Striping Pattern */}
            <pattern id="barberPoleStripes" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#dc2626" strokeWidth="6" />
              <line x1="7" y1="0" x2="7" y2="20" stroke="#ffffff" strokeWidth="4" />
              <line x1="13" y1="0" x2="13" y2="20" stroke="#2563eb" strokeWidth="6" />
            </pattern>
          </defs>

          {/* Calendar Body Outline */}
          <rect
            x="20"
            y="28"
            width="100"
            height="90"
            rx="16"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            className="opacity-95"
          />

          {/* Calendar Top Rings */}
          <rect x="36" y="14" width="7" height="18" rx="3.5" fill="#ffffff" />
          <rect x="68" y="14" width="7" height="18" rx="3.5" fill="#ffffff" />
          <rect x="96" y="14" width="7" height="18" rx="3.5" fill="#ffffff" />

          {/* Calendar Days Matrix (Left Side) */}
          {/* Day 1 */}
          <rect x="30" y="52" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.8" />
          {/* Day 2 */}
          <rect x="46" y="52" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.8" />
          {/* Day 3 (Gold checked day) */}
          <rect x="30" y="68" width="12" height="12" rx="3" fill="url(#goldBadge)" />
          <path d="M33 74 L35.5 76.5 L40 71.5" stroke="#111317" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Day 4 */}
          <rect x="46" y="68" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.8" />
          {/* Day 5 */}
          <rect x="30" y="85" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.8" />
          {/* Day 6 */}
          <rect x="46" y="85" width="10" height="10" rx="2.5" fill="#ffffff" opacity="0.8" />

          {/* Barber Pole (Right Side of Calendar) */}
          {/* Pole Top Cap */}
          <ellipse cx="120" cy="30" rx="14" ry="4" fill="#ffffff" />
          <rect x="114" y="24" width="12" height="6" rx="2" fill="#ffffff" />
          {/* Pole Body */}
          <rect x="111" y="32" width="18" height="68" rx="4" fill="url(#barberPoleStripes)" stroke="#ffffff" strokeWidth="2.5" />
          {/* Pole Bottom Cap */}
          <ellipse cx="120" cy="102" rx="14" ry="4" fill="#ffffff" />
          <rect x="114" y="102" width="12" height="6" rx="2" fill="#ffffff" />

          {/* Silhouette of Gentleman Barber Head & Beard (Facing right) */}
          <path
            d="M 64 45 
               C 74 38, 92 42, 98 48 
               C 92 51, 84 52, 79 56 
               C 88 56, 96 61, 95 68 
               C 90 68, 86 67, 83 71
               C 89 74, 91 80, 88 85
               C 84 89, 78 91, 74 97
               C 70 102, 65 106, 56 107
               C 64 100, 68 94, 69 88
               C 65 89, 61 88, 59 84
               C 56 79, 61 74, 64 71
               C 62 65, 59 55, 64 45 Z"
            fill="#ffffff"
          />

          {/* Ear & Beard Detail Line */}
          <path
            d="M 66 76 C 68 76, 70 78, 69 81 C 68 83, 66 83, 65 81"
            stroke="#111317"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Wordmark */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline tracking-tight">
            <span className="font-bold text-white tracking-normal font-sans text-xl sm:text-2xl drop-shadow-sm">
              Cita
            </span>
            <span className="font-black text-xl sm:text-2xl font-sans tracking-tight ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd868] via-[#e5c158] to-[#c59b27] drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
              Smart
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-[1px] w-3 bg-[#d4af37]/60" />
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.22em] font-semibold text-[#f3e5ab] whitespace-nowrap">
                Tu cita, nuestra prioridad
              </span>
              <span className="h-[1px] w-3 bg-[#d4af37]/60" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
