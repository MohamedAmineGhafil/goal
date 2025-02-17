// src/components/calendar/DateXPView.tsx
import React from 'react';
import type { DailyProgressType } from '../../types/progress';

interface DateXPViewProps {
  progress: DailyProgressType;
  onClose: () => void;
}

const DateXPView: React.FC<DateXPViewProps> = ({ progress, onClose }) => {
  // Group tasks by category
  const groupedTasks = progress.completedTasks.reduce((acc, task) => {
    if (!acc[task.categoryId]) {
      acc[task.categoryId] = [];
    }
    acc[task.categoryId].push(task);
    return acc;
  }, {} as Record<string, typeof progress.completedTasks>);

  return (
    <div className="bg-gray-800 border-2 border-gray-700 w-full max-w-xl shadow-retro">
      <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
        <h2 className="text-xl font-fsex300 text-white">
          XP Sources - {new Date(progress.date).toLocaleDateString()}
        </h2>
        <button 
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-6">
        {Object.entries(groupedTasks).map(([categoryId, tasks]) => (
          <div key={categoryId} className="space-y-2">
            <h3 className="text-gray-400 uppercase text-sm font-fsex300">{categoryId}</h3>
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-900 border border-gray-700"
              >
                <span className="font-fsex300 text-white">{task.taskName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-fsex300">+{task.xp}XP</span>
                  {task.count > 1 && (
                    <span className="text-yellow-500 text-sm font-fsex300">×{task.count}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="border-t-2 border-gray-700 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-fsex300">Total XP</span>
            <span className="text-green-500 font-fsex300">+{progress.totalXP}XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateXPView;