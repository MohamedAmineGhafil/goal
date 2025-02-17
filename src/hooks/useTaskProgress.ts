// src/hooks/useTaskProgress.ts
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Categories, TasksByFrequency, Task, TaskFrequency } from '../types/tasks';
import type { DailyProgressType } from '../types/progress';

  

export const useTaskProgress = (initialCategories: Categories) => {
  // Local storage state
  const [categories, setCategories] = useLocalStorage('categories', initialCategories);
  const [currentXP, setCurrentXP] = useLocalStorage('currentXP', 0);
  const [categoryXP, setCategoryXP] = useLocalStorage<Record<string, number>>('categoryXP', {});
  const [dailyProgress, setDailyProgress] = useLocalStorage<Record<string, DailyProgressType>>('dailyProgress', {});

  const exportProgress = useCallback(() => {
    const data = {
      categories,
      categoryXP,
      currentXP,
      dailyProgress
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project-delta-progress.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, [categories, categoryXP, currentXP, dailyProgress]);
    
    const importProgress = useCallback((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.categories) setCategories(data.categories);
          if (data.categoryXP) setCategoryXP(data.categoryXP);
          if (data.currentXP) setCurrentXP(data.currentXP);
          if (data.dailyProgress) setDailyProgress(data.dailyProgress);
        } catch (error) {
          console.error('Error importing progress:', error);
          // You might want to add some error handling UI here
        }
      };
      reader.readAsText(file);
    }, [setCategories, setCategoryXP, setCurrentXP, setDailyProgress]);

  const handleComplete = useCallback((
    categoryId: string,
    type: keyof TasksByFrequency,
    taskIndex: number
  ) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      const task = newCategories[categoryId].tasks[type][taskIndex];
      task.count += 1;
      return newCategories;
    });

    const xpGain = categories[categoryId].tasks[type][taskIndex].xp;
    setCurrentXP(prev => prev + xpGain);
    setCategoryXP(prev => ({
      ...prev,
      [categoryId]: (prev[categoryId] || 0) + xpGain
    }));
  }, [categories, setCategories, setCurrentXP, setCategoryXP]);

  const handleDecrement = useCallback((
    categoryId: string,
    type: keyof TasksByFrequency,
    taskIndex: number
  ) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      const task = newCategories[categoryId].tasks[type][taskIndex];
      if (task.count > 0) {
        task.count -= 1;
        const xpLoss = task.xp;
        setCurrentXP(curr => curr - xpLoss);
        setCategoryXP(prev => ({
          ...prev,
          [categoryId]: Math.max(0, (prev[categoryId] || 0) - xpLoss)
        }));
      }
      return newCategories;
    });
  }, [setCategories, setCurrentXP, setCategoryXP]);

  const saveProgress = useCallback((date: string) => {
    const completedTasks = Object.entries(categories).flatMap(([categoryId, category]) =>
      Object.entries(category.tasks).flatMap(([type, tasks]) =>
        tasks.filter((task: Task) => task.count > 0).map((task: Task) => ({
          categoryId,
          type: type as TaskFrequency,  // Explicit type assertion here
          taskName: task.name,
          xp: task.xp,
          count: task.count
        }))
      )
    );

    if (completedTasks.length > 0) {
      setDailyProgress(prev => ({
        ...prev,
        [date]: {
          date,
          completedTasks,
          totalXP: currentXP
        }
      }));

      // Reset daily tasks after saving
      setCategories(prev => {
        const newCategories = { ...prev };
        Object.values(newCategories).forEach(category => {
          category.tasks.daily = category.tasks.daily.map(task => ({
            ...task,
            count: 0
          }));
        });
        return newCategories;
      });
    }
  }, [categories, currentXP, setDailyProgress, setCategories]);

  const editXP = useCallback((newXP: number) => {
    setCurrentXP(newXP);
  }, [setCurrentXP]);

  const addTask = useCallback((
    categoryId: string,
    task: { name: string; xp: number; frequency: keyof TasksByFrequency }
  ) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      newCategories[categoryId].tasks[task.frequency].push({
        name: task.name,
        xp: task.xp,
        count: 0
      });
      return newCategories;
    });
  }, [setCategories]);

  const removeTask = useCallback((categoryId: string, type: keyof TasksByFrequency, index: number) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      newCategories[categoryId].tasks[type] = newCategories[categoryId].tasks[type].filter((_, i) => i !== index);
      localStorage.setItem('categories', JSON.stringify(newCategories));
      return newCategories;
    });
  }, []);

  const editCategory = useCallback((categoryId: string, newTitle: string) => {
    setCategories(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        title: newTitle
      }
    }));
  }, [setCategories]);

  const deleteCategory = useCallback((categoryId: string) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      delete newCategories[categoryId];
      return newCategories;
    });
    setCategoryXP(prev => {
      const newXP = { ...prev };
      delete newXP[categoryId];
      return newXP;
    });
  }, [setCategories, setCategoryXP]);

  const addCategory = useCallback((title: string, emoji: string) => {
    const categoryId = title.toLowerCase().replace(/\s+/g, '-');
    setCategories(prev => ({
      ...prev,
      [categoryId]: {
        title: `${title} ${emoji}`,
        tasks: {
          daily: [],
          weekly: [],
          monthly: [],
          achievement: []
        }
      }
    }));
  }, [setCategories]);

  return {
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
    exportProgress,    // Make sure these are included
    importProgress     // in the return object
  };
};