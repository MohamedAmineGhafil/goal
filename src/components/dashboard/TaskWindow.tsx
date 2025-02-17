// src/components/dashboard/TaskWindow.tsx
import React, { useState } from 'react';
import RankIcon from '../common/RankIcon';
import type { TasksByFrequency, TaskFrequency, Task } from '../../types/tasks';
import type { Rank } from '../../types/ranking';

interface ContextMenuProps {
  x: number;
  y: number;
  onRemove: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onRemove, onClose }) => {
  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div 
        className="fixed z-50 bg-gray-800 border-2 border-gray-600 py-1 shadow-[4px_4px_0px_0px_rgba(147,197,253,0.3)]"
        style={{ 
          left: `${x}px`, 
          top: `${y}px`,
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
            onClose();
          }}
          className="w-full px-4 py-1 text-left text-white hover:bg-gray-700 font-fsex300"
        >
          Remove Goal
        </button>
      </div>
    </>
  );
};

interface TaskWindowProps {
  categoryId: string;
  title: string;
  tasks: TasksByFrequency;
  categoryXP: number;
  rank: Rank;
  onComplete: (type: TaskFrequency, index: number) => void;
  onDecrement: (type: TaskFrequency, index: number) => void;
  onRemoveTask: (type: TaskFrequency, index: number) => void;
  onManage: () => void;
}

const TaskWindow: React.FC<TaskWindowProps> = ({
  title,
  tasks,
  categoryXP,
  rank,
  onComplete,
  onDecrement,
  onRemoveTask,
  onManage
}) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    type: TaskFrequency;
    index: number;
  } | null>(null);

  const getTaskOpacity = (count: number): string => {
    if (count === 0) return 'opacity-100';
    if (count === 1) return 'opacity-90';
    if (count === 2) return 'opacity-80';
    if (count === 3) return 'opacity-70';
    return 'opacity-60';
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    type: TaskFrequency,
    index: number
  ) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      type,
      index
    });
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-600 shadow-[4px_4px_0px_0px_rgba(147,197,253,0.3)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-600">
        <div className="flex items-center gap-3">
          <RankIcon rank={rank} size={24} />
          <div>
            <div className="font-fsex300" style={{ color: rank.color }}>
              {title}
            </div>
            <div className="text-sm text-gray-400">
              {categoryXP} XP - {rank.name}
            </div>
          </div>
        </div>
        <button
          onClick={onManage}
          className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-600 border-2 border-gray-600"
        >
          Manage
        </button>
      </div>

      {/* Tasks */}
      <div className="p-4 space-y-4">
        {(['daily', 'weekly', 'monthly', 'achievement'] as TaskFrequency[]).map((type) => (
          <div key={type} className="space-y-2">
            <h3 className="text-gray-400 uppercase text-sm">{type}</h3>
            {tasks[type].map((task: Task, index: number) => (
              <div
                key={index}
                onClick={() => onComplete(type, index)}
                onContextMenu={(e) => handleContextMenu(e, type, index)}
                className={`flex items-center justify-between p-2 border-2 border-gray-600 cursor-pointer ${getTaskOpacity(task.count)}`}
                style={{
                  backgroundColor: task.count > 0 ? '#2d3748' : '#1a202c',
                  transition: 'all 0.2s ease'
                }}
              >
                <span className="font-fsex300">{task.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: rank.color }}>
                    +{task.xp}XP
                  </span>
                  {task.count > 0 && (
                    <>
                      <span className="text-sm text-gray-400">×{task.count}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDecrement(type, index);
                        }}
                        className="px-2 text-red-500 hover:text-red-400"
                      >
                        -
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRemove={() => onRemoveTask(contextMenu.type, contextMenu.index)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default TaskWindow;