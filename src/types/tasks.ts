// src/types/tasks.ts
export type TaskFrequency = 'daily' | 'weekly' | 'monthly' | 'achievement';

export interface Task {
  name: string;
  xp: number;
  count: number;
}

export interface TasksByFrequency {
  daily: Task[];
  weekly: Task[];
  monthly: Task[];
  achievement: Task[];
}

export interface Category {
  title: string;
  tasks: TasksByFrequency;
}

export interface Categories {
  [key: string]: Category;
}

export interface CompletedTask {
  categoryId: string;
  type: TaskFrequency;
  taskName: string;
  xp: number;
  count: number;
}

export interface Level {
  name: string;
  xp: number;
}