// src/components/calendar/DailyProgress.tsx
import React from 'react';
import RetroWindow from '../common/RetroWindow';
import { PixelatedCheck } from '../common/PixelatedIcons';
import type { DailyProgressType } from '../../types/progress';

interface DailyProgressProps {
  progress: DailyProgressType;
  onClose: () => void;
}

const DailyProgress: React.FC<DailyProgressProps> = ({ progress, }) => {
  // Group tasks by category
  const groupedTasks = progress.completedTasks.reduce((acc, task) => {
    if (!acc[task.categoryId]) {
      acc[task.categoryId] = [];
    }
    acc[task.categoryId].push(task);
    return acc;
  }, {} as Record<string, typeof progress.completedTasks>);

  return (
    <RetroWindow 
      title={`Progress - ${new Date(progress.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`}
      className="w-full"
    >
      <div className="space-y-6">
        {Object.entries(groupedTasks).map(([categoryId, tasks]) => (
          <div key={categoryId} className="space-y-2">
            <h3 className="text-gray-400 text-sm uppercase font-fsex300">
              {categoryId}
            </h3>
            {tasks.map((task, index) => (
              <div 
                key={index}
                className="flex items-center justify-between bg-gray-900 p-2 border border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <PixelatedCheck className="text-green-500" />
                  <span className="text-white font-fsex300">{task.taskName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-fsex300">+{task.xp}XP</span>
                  {task.count > 1 && (
                    <span className="text-yellow-500 text-sm font-fsex300">
                      ×{task.count}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="border-t border-gray-600 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-fsex300">Total XP</span>
            <span className="text-green-500 font-fsex300">+{progress.totalXP}XP</span>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};

export default DailyProgress;