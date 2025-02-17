// src/components/common/PixelatedIcons.tsx
import React from 'react';

interface IconProps {
  className?: string;
}

export const PixelatedCheck: React.FC<IconProps> = ({ className = '' }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M3 8 L7 12 L13 4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const PixelatedCross: React.FC<IconProps> = ({ className = '' }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M4 4 L12 12 M12 4 L4 12"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const PixelatedWindowControls: React.FC = () => (
  <div className="flex gap-2">
    <button className="w-4 h-4 border border-gray-600 bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xs">-</button>
    <button className="w-4 h-4 border border-gray-600 bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xs">□</button>
    <button className="w-4 h-4 border border-gray-600 bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-xs">×</button>
  </div>
);

export const PixelatedTrophy: React.FC<IconProps> = ({ className = '' }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M4 3 h8 v2 h2 v4 h-2 v1 h-2 v2 h4 v1 h-10 v-1 h4 v-2 h-2 v-1 h-2 v-4 h2 v-2"
      fill="currentColor"
    />
  </svg>
);

export const PixelatedCalendar: React.FC<IconProps> = ({ className = '' }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M3 2 h10 v12 h-10 v-12 M3 5 h10 M5 3 v2 M11 3 v2"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
  </svg>
);