// src/components/dashboard/LevelProgress.tsx
import React from 'react';
import RetroWindow from '../common/RetroWindow';
import { PixelatedTrophy } from '../common/PixelatedIcons';
import { levelThresholds } from '../../data/initialCategories';

interface LevelProgressProps {
  currentXP: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ currentXP }) => {
  const getCurrentLevel = () => {
    let currentLevel = levelThresholds[0];
    for (const level of levelThresholds) {
      if (currentXP >= level.xp) {
        currentLevel = level;
      } else {
        break;
      }
    }
    return currentLevel;
  };

  const getProgress = () => {
    const currentLevel = getCurrentLevel();
    const nextLevelIndex = levelThresholds.findIndex(level => level.name === currentLevel.name) + 1;
    const nextLevel = levelThresholds[nextLevelIndex];
    
    if (!nextLevel) return 100;

    const xpForNextLevel = nextLevel.xp - currentLevel.xp;
    const currentProgress = currentXP - currentLevel.xp;
    return (currentProgress / xpForNextLevel) * 100;
  };

  const currentLevel = getCurrentLevel();
  const progress = getProgress();

  return (
    <RetroWindow title="Level Progress">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PixelatedTrophy className="text-yellow-500" />
            <span className="text-xl text-white font-fsex300">
              {currentLevel.name}
            </span>
          </div>
          <span className="text-white font-fsex300">{currentXP} XP</span>
        </div>

        <div className="h-4 bg-gray-900 border border-gray-700 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-fsex300">{currentLevel.name}</span>
          <span className="text-gray-400 font-fsex300">
            {currentLevel.name !== 'Master' && 
              `${Math.ceil(levelThresholds[levelThresholds.findIndex(l => l.name === currentLevel.name) + 1].xp - currentXP)} XP to ${
                levelThresholds[levelThresholds.findIndex(l => l.name === currentLevel.name) + 1].name
              }`
            }
          </span>
        </div>
      </div>
    </RetroWindow>
  );
};

export default LevelProgress;