// src/types/progress.ts
export interface CompletedTask {
    categoryId: string;
    type: 'daily' | 'weekly' | 'monthly' | 'achievement';
    taskName: string;
    xp: number;
    count: number;
  }
  
  export interface DailyProgressType {
    date: string;
    completedTasks: CompletedTask[];
    totalXP: number;
  }