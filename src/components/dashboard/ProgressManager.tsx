import React, { useState } from 'react';
import RetroWindow from '../common/RetroWindow';
import RankIcon from '../common/RankIcon';
import { getRankForXP, getNextRank } from '../../types/ranking';
import { format } from 'date-fns';

interface ProgressManagerProps {
  currentXP: number;
  onSaveProgress: (date: string) => void;
  onEditXP: (newXP: number) => void;
}

const ProgressManager: React.FC<ProgressManagerProps> = ({
  currentXP,
  onSaveProgress,
  onEditXP
}) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [editingXP, setEditingXP] = useState(false);
  const [newXP, setNewXP] = useState(currentXP.toString());

  const currentRank = getRankForXP(currentXP);
  const nextRank = getNextRank(currentRank);

  const calculateProgress = () => {
    if (!nextRank) return 100;
    const totalXPNeeded = nextRank.minXP - currentRank.minXP;
    const currentProgress = currentXP - currentRank.minXP;
    return (currentProgress / totalXPNeeded) * 100;
  };

  return (
    <RetroWindow 
      title="Progress Manager"
      className="shadow-[4px_4px_0px_0px_rgba(147,197,253,0.3)]"
    >
      <div className="space-y-4">
        {/* Rank Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RankIcon rank={currentRank} size={32} />
            <div>
              <div 
                className="font-fsex300" 
                style={{ color: currentRank.color }}
              >
                {currentRank.name}
              </div>
              <div className="text-sm text-gray-400">
                {nextRank ? `Next: ${nextRank.name}` : 'Maximum Rank'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-fsex300">{currentXP} XP</div>
            {nextRank && (
              <div className="text-sm text-gray-400">
                {nextRank.minXP - currentXP} XP to next rank
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-700 border-2 border-gray-600">
          <div
            className="absolute h-full transition-all duration-300"
            style={{ 
              width: `${calculateProgress()}%`,
              backgroundColor: currentRank.color,
              boxShadow: `0 0 5px ${currentRank.shadowColor}`
            }}
          />
        </div>
  
          {/* XP Management */}
          <div className="border-b-2 border-gray-600 pb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setEditingXP(!editingXP)}
                className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 border-2 border-gray-600 font-fsex300"
              >
                {editingXP ? 'Cancel' : 'Edit XP'}
              </button>
            </div>
  
            {editingXP && (
              <div className="mt-4 space-y-2">
                <input
                  type="number"
                  value={newXP}
                  onChange={(e) => setNewXP(e.target.value)}
                  className="w-full px-2 py-1 bg-gray-700 text-white border-2 border-gray-600 font-fsex300"
                  placeholder="New XP value"
                />
                <button
                  onClick={() => {
                    const xpValue = parseInt(newXP);
                    if (!isNaN(xpValue) && xpValue >= 0) {
                      onEditXP(xpValue);
                      setEditingXP(false);
                    }
                  }}
                  className="px-4 py-2 bg-green-700 text-white hover:bg-green-600 border-2 border-gray-600 font-fsex300"
                >
                  Save XP
                </button>
              </div>
            )}
          </div>
  
          {/* Date Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-2 py-1 bg-gray-700 text-white border-2 border-gray-600 font-fsex300"
              />
              <button
                onClick={() => onSaveProgress(selectedDate)}
                className="px-4 py-2 bg-green-700 text-white hover:bg-green-600 border-2 border-gray-600 font-fsex300"
              >
                Save Progress
              </button>
            </div>
            <p className="text-sm text-gray-400 font-fsex300">
              This will save your current progress for the selected date
            </p>
          </div>
        </div>
      </RetroWindow>
    );
  };
  
  export default ProgressManager;