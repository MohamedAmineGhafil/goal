// src/components/dashboard/RankProgress.tsx
import React from 'react';
import { getRankForXP, getNextRank } from '../../types/ranking';

interface RankProgressProps {
  currentXP: number;
}

const RankProgress: React.FC<RankProgressProps> = ({ currentXP }) => {
  const currentRank = getRankForXP(currentXP);
  const nextRank = getNextRank(currentRank);
  
  const calculateProgress = () => {
    if (!nextRank) return 100;
    const xpForNextLevel = nextRank.minXP - currentRank.minXP;
    const currentProgress = currentXP - currentRank.minXP;
    return (currentProgress / xpForNextLevel) * 100;
  };

  const progress = calculateProgress();

  return (
    <div className="mb-6 text-center">
      {/* Rank Display */}
      <h2 className="text-xl mb-2" style={{ color: currentRank.color }}>
        {currentRank.name} - {currentXP} XP
      </h2>
      
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-800 w-full max-w-md mx-auto"
           style={{ boxShadow: '0 0 10px rgba(147, 197, 253, 0.3)' }}>
        <div
          className="absolute h-full transition-all duration-300"
          style={{ 
            width: `${progress}%`,
            backgroundColor: currentRank.color,
            boxShadow: `0 0 10px ${currentRank.color}`
          }}
        />
      </div>
      
      {/* Next Rank Info */}
      {nextRank && (
        <div className="mt-1 text-sm text-gray-400">
          {nextRank.minXP - currentXP} XP to {nextRank.name}
        </div>
      )}
    </div>
  );
};

export default RankProgress;