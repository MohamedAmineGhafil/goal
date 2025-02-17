// src/components/dashboard/TaskManager.tsx
import React, { useState } from 'react';
import { TaskFrequency } from '../../types/tasks';

interface TaskManagerProps {
    categoryId: string;
    categoryTitle: string;
    onAddTask: (categoryId: string, task: {
      name: string;
      xp: number;
      frequency: TaskFrequency;
    }) => void;
    onRemoveTask: (categoryId: string, frequency: TaskFrequency, taskIndex: number) => void;  // Updated order
    onEditCategory: (categoryId: string, newTitle: string) => void;
    onDeleteCategory: (categoryId: string) => void;
    onClose: () => void;
  }

const TaskManager: React.FC<TaskManagerProps> = ({
    categoryId,
    categoryTitle,
    onAddTask,
    onEditCategory,
    onDeleteCategory,
    onClose
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(categoryTitle);
  const [newTask, setNewTask] = useState({
    name: '',
    xp: 10,
    frequency: 'daily' as TaskFrequency
  });

  return (
    <div className="bg-[#1a1a2e] border border-gray-700" 
         style={{ boxShadow: '0 0 10pxrgba(147, 197, 253, 0.3)' }}>
      {/* Header */}
      <div className="bg-[#1a1a2e] px-4 py-2 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-fsex300 text-white">Task Manager</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-600 text-sm"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Category'}
          </button>
        </div>
        <button 
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Category Edit */}
      {isEditing && (
        <div className="p-4 border-b border-gray-700 bg-[#1e1e33]">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#1a1a2e] text-white border border-gray-700 mb-3"
            placeholder="New category name"
          />
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (newTitle.trim()) {
                  onEditCategory(categoryId, newTitle);
                  setIsEditing(false);
                }
              }}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this category?')) {
                  onDeleteCategory(categoryId);
                }
              }}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              Delete Category
            </button>
          </div>
        </div>
      )}

      {/* Add Task Form */}
      <div className="p-4 space-y-4">
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="w-full px-3 py-2 bg-[#1a1a2e] text-white border border-gray-700"
          placeholder="New task name"
        />
        
        <div className="flex gap-3">
          <input
            type="number"
            value={newTask.xp}
            onChange={(e) => setNewTask({ ...newTask, xp: parseInt(e.target.value) || 0 })}
            className="w-24 px-3 py-2 bg-[#1a1a2e] text-white border border-gray-700"
            placeholder="XP"
          />
          
          <select
            value={newTask.frequency}
            onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value as TaskFrequency })}
            className="flex-1 px-3 py-2 bg-[#1a1a2e] text-white border border-gray-700"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="achievement">Achievement</option>
          </select>
        </div>

        <button
          onClick={() => {
            if (newTask.name.trim()) {
              onAddTask(categoryId, newTask);
              setNewTask({
                name: '',
                xp: 10,
                frequency: 'daily'
              });
            }
          }}
          className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskManager;