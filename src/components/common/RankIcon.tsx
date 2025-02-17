// src/components/common/RankIcon.tsx
import React from 'react';
import type { Rank } from '../../types/ranking';

interface RankIconProps {
  rank: Rank;
  size?: number;
  className?: string;
}

const RankIcon: React.FC<RankIconProps> = ({ rank, size = 24, className = '' }) => {
  // Create pixel-art paths for each rank tier
  const getTierPath = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return (
          <path
            d="M4 12 L12 4 L20 12 L16 12 L16 20 L8 20 L8 12 Z"
            fill={rank.color}
            stroke={rank.shadowColor}
            strokeWidth="1"
            style={{ imageRendering: 'pixelated' }}
          />
        );
      case 'Silver':
        return (
          <path
            d="M12 4 L20 12 L16 12 L16 20 L8 20 L8 12 L4 12 Z M8 14 h8"
            fill={rank.color}
            stroke={rank.shadowColor}
            strokeWidth="1"
            style={{ imageRendering: 'pixelated' }}
          />
        );
      case 'Gold':
        return (
          <path
            d="M12 4 L20 12 L16 12 L16 20 L8 20 L8 12 L4 12 Z M8 14 h8 M12 8 l0 8"
            fill={rank.color}
            stroke={rank.shadowColor}
            strokeWidth="1"
            style={{ imageRendering: 'pixelated' }}
          />
        );
      case 'Platinum':
        return (
          <>
            <path
              d="M12 4 L20 12 L16 12 L16 20 L8 20 L8 12 L4 12 Z"
              fill={rank.color}
              stroke={rank.shadowColor}
              strokeWidth="1"
              style={{ imageRendering: 'pixelated' }}
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              fill={rank.shadowColor}
              style={{ imageRendering: 'pixelated' }}
            />
          </>
        );
      case 'Diamond':
        return (
          <path
            d="M12 4 L20 8 L20 16 L12 20 L4 16 L4 8 Z"
            fill={rank.color}
            stroke={rank.shadowColor}
            strokeWidth="1"
            style={{ imageRendering: 'pixelated' }}
          />
        );
      case 'Master':
        return (
          <>
            <path
              d="M12 4 L20 8 L20 16 L12 20 L4 16 L4 8 Z"
              fill={rank.color}
              stroke={rank.shadowColor}
              strokeWidth="1"
              style={{ imageRendering: 'pixelated' }}
            />
            <path
              d="M8 8 L16 8 L12 16 Z"
              fill={rank.shadowColor}
              style={{ imageRendering: 'pixelated' }}
            />
          </>
        );
      case 'Grand Wizard':
        return (
          <>
            <path
              d="M12 4 L20 8 L20 16 L12 20 L4 16 L4 8 Z"
              fill={rank.color}
              stroke={rank.shadowColor}
              strokeWidth="1"
              style={{ imageRendering: 'pixelated' }}
            />
            <path
              d="M8 8 L16 8 L12 16 Z M12 6 L14 10 L10 10 Z"
              fill={rank.shadowColor}
              style={{ imageRendering: 'pixelated' }}
            />
          </>
        );
      default:
        return null;
    }
  };

  const tier = rank.name.split(' ')[0];

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {getTierPath(tier)}
    </svg>
  );
};

export default RankIcon;