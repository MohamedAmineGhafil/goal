// src/components/dashboard/GamifiedDashboard.tsx
import React, { useCallback, useState } from 'react';
import TaskWindow from './TaskWindow';
import ProgressManager from './ProgressManager';
import TaskManager from './TaskManager';
import CalendarView from '../calendar/CalendarView';
import { Calendar, Download, Upload } from 'lucide-react';
import { useTaskProgress } from '../../hooks/useTaskProgress';
import { initialCategories } from '../../data/initialCategories';
import { getRankForXP, getAverageRank } from '../../types/ranking';
import { TaskFrequency } from '../../types/tasks';

// In GamifiedDashboard.tsx

const GamifiedDashboard: React.FC = () => {
  const {
    categories,
    categoryXP,
    currentXP,
    dailyProgress,
    handleComplete,
    handleDecrement,
    saveProgress,
    editXP,
    addTask,
    removeTask,
    editCategory,
    deleteCategory,
    addCategory,
    exportProgress,
    importProgress
  } = useTaskProgress(initialCategories);
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'calendar'>('dashboard');
  const [managingCategory, setManagingCategory] = useState<string | null>(null);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    title: '',
    emoji: '📋'
  });
  
  const handleRemoveTask = useCallback((categoryId: string, frequency: TaskFrequency, taskIndex: number) => {
    removeTask(categoryId, frequency, taskIndex);
  }, [removeTask]);
  
  const averageRank = getAverageRank(categoryXP);
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Project Delta Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-fsex300 text-white mb-2">
          Project Delta Δ
        </h1>
        <p className="text-gray-400 font-fsex300">
          "The journey of a thousand miles begins with a single step." - Lao Tzu
        </p>
        {/* Rank Display */}
        <div className="mt-4 text-xl font-fsex300" style={{ color: averageRank.color }}>
          {averageRank.name} - {currentXP} XP
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 border-2 border-gray-700"
           style={{ boxShadow: `4px 4px 0px 0px rgba(147, 197, 253, 0.3)` }}>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView(currentView === 'dashboard' ? 'calendar' : 'dashboard')}
            className={`
              px-4 py-2 font-fsex300 flex items-center gap-2 border-2
              ${currentView === 'calendar' ? 'bg-gray-700 border-gray-500' : 'bg-gray-800 border-gray-600'}
              hover:bg-gray-700
            `}
          >
            <Calendar size={16} />
            {currentView === 'dashboard' ? 'Calendar' : 'Dashboard'}
          </button>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={exportProgress}
            className="px-4 py-2 bg-gray-800 text-white font-fsex300 border-2 border-gray-600 hover:bg-gray-700 flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
          
          <label className="px-4 py-2 bg-gray-800 text-white font-fsex300 border-2 border-gray-600 hover:bg-gray-700 flex items-center gap-2 cursor-pointer">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) importProgress(file);
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Progress Manager */}
      <div className="mb-6">
        <ProgressManager
          currentXP={currentXP}
          onSaveProgress={saveProgress}
          onEditXP={editXP}
        />
      </div>

      {/* Main Content */}
      {currentView === 'dashboard' ? (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Object.entries(categories).map(([id, category]) => (
              <TaskWindow
              key={id}
              categoryId={id}
              title={category.title}
              tasks={category.tasks}
              categoryXP={categoryXP[id] || 0}
              rank={getRankForXP(categoryXP[id] || 0)}
              onComplete={(type, index) => handleComplete(id, type, index)}
              onDecrement={(type, index) => handleDecrement(id, type, index)}
              onRemoveTask={(type, index) => handleRemoveTask(id, type, index)}
              onManage={() => setManagingCategory(id)}
            />
            ))}
          </div>

          {/* Add New Category Button */}
          <button
            onClick={() => setShowNewCategory(true)}
            className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white font-fsex300 hover:bg-gray-700 border-2 border-gray-700"
            style={{ boxShadow: `4px 4px 0px 0px rgba(147, 197, 253, 0.3)` }}
          >
            Add New Category
          </button>
        </>
      ) : (
        <CalendarView dailyProgress={dailyProgress} />
      )}

      {/* Category Management Modal */}
      {managingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <TaskManager
            categoryId={managingCategory}
            categoryTitle={categories[managingCategory].title}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onEditCategory={editCategory}
            onDeleteCategory={(id) => {
              if (window.confirm('Are you sure you want to delete this category?')) {
                deleteCategory(id);
                setManagingCategory(null);
              }
            }}
            onClose={() => setManagingCategory(null)}
          />
        </div>
      )}

      {/* New Category Modal */}
      {showNewCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 border-2 border-gray-700 w-full max-w-xl"
               style={{ boxShadow: `4px 4px 0px 0px rgba(147, 197, 253, 0.3)` }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-fsex300 text-white">New Category</h2>
              <button 
                onClick={() => setShowNewCategory(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 font-fsex300">Category Title</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 text-white border-2 border-gray-700 font-fsex300"
                  placeholder="Enter category title"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-fsex300">Category Emoji</label>
                <input
                  type="text"
                  value={newCategory.emoji}
                  onChange={(e) => setNewCategory({ ...newCategory, emoji: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 text-white border-2 border-gray-700 font-fsex300"
                  placeholder="Enter category emoji"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    if (newCategory.title.trim()) {
                      addCategory(newCategory.title, newCategory.emoji);
                      setNewCategory({ title: '', emoji: '📋' });
                      setShowNewCategory(false);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-green-700 text-white font-fsex300 hover:bg-green-600 border-2 border-green-900"
                >
                  Create Category
                </button>
                <button
                  onClick={() => setShowNewCategory(false)}
                  className="flex-1 px-4 py-2 bg-red-700 text-white font-fsex300 hover:bg-red-600 border-2 border-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamifiedDashboard;