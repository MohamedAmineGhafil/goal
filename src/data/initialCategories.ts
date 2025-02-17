// src/data/initialCategories.ts

interface Task {
    name: string;
    xp: number;
    count: number;
  }
  
  interface TasksByFrequency {
    daily: Task[];
    weekly: Task[];
    monthly: Task[];
    achievement: Task[];
  }
  
  interface Category {
    title: string;
    tasks: TasksByFrequency;
  }
  
  interface Categories {
    [key: string]: Category;
  }
  
  export const initialCategories: Categories = {
    professional: {
      title: 'Professional Life',
      tasks: {
        daily: [
          { name: 'Do a leetcode challenge', xp: 10, count: 0 },
          { name: 'Dedicate 30 to 60 min for learning', xp: 10, count: 0 },
          { name: 'Read back Claude convos', xp: 10, count: 0 }
        ],
        weekly: [
          { name: 'Watch one YouTube playlist for CS', xp: 50, count: 0 },
          { name: 'Make a fully understood app', xp: 50, count: 0 }
        ],
        monthly: [
          { name: 'Obtain one new certification', xp: 200, count: 0 },
          { name: 'Expand skill set and add it to CV', xp: 200, count: 0 }
        ],
        achievement: [
          { name: 'Get a high paying job by July', xp: 500, count: 0 },
          { name: 'Finish portfolio by April-May', xp: 500, count: 0 },
          { name: 'Get into freelancing by May', xp: 500, count: 0 }
        ]
      }
    },
    health: {
      title: 'Health & Fitness',
      tasks: {
        daily: [
          { name: '8 hours of sleep', xp: 10, count: 0 },
          { name: 'Take creatine', xp: 10, count: 0 },
          { name: 'Minimize sugar intake', xp: 10, count: 0 },
          { name: 'Stretch and do Yoga', xp: 10, count: 0 }
        ],
        weekly: [
          { name: 'Perform better than previous week', xp: 50, count: 0 },
          { name: 'Take creatine for the whole week', xp: 50, count: 0 }
        ],
        monthly: [
          { name: 'Body measurements tracking', xp: 200, count: 0 },
          { name: 'Fitness assessment for exercises', xp: 200, count: 0 }
        ],
        achievement: [
          { name: 'Weigh 70kg with 10-12% body fat', xp: 500, count: 0 },
          { name: 'Become fully flexible', xp: 500, count: 0 }
        ]
      }
    },
    hobbies: {
      title: 'Hobbies',
      tasks: {
        daily: [
          { name: 'Relax and game', xp: 10, count: 0 },
          { name: 'Do not spend more than an hour on reels', xp: 10, count: 0 }
        ],
        weekly: [
          { name: 'Draw two art pieces', xp: 50, count: 0 },
          { name: 'Learn new boxing technique', xp: 50, count: 0 }
        ],
        monthly: [
          { name: 'Become apt at a drawing skill', xp: 200, count: 0 },
          { name: 'Post art pieces on discord', xp: 200, count: 0 }
        ],
        achievement: [
          { name: 'Create a manga chapter', xp: 500, count: 0 }
        ]
      }
    },
    knowledge: {
      title: 'Knowledge',
      tasks: {
        daily: [
          { name: 'Consume french media', xp: 10, count: 0 },
          { name: 'Learn one new concept', xp: 10, count: 0 }
        ],
        weekly: [
          { name: 'Discuss learned concept with a person', xp: 50, count: 0 },
          { name: 'Be up to date with the news', xp: 50, count: 0 }
        ],
        monthly: [
          { name: 'Finish one book', xp: 200, count: 0 }
        ],
        achievement: [
          { name: 'Language proficiency', xp: 500, count: 0 },
          { name: 'Subject matter expertise', xp: 500, count: 0 }
        ]
      }
    }
  };
  
  // Level system
  export const levelThresholds = [
    { name: 'Novice', xp: 0 },
    { name: 'Intermediate', xp: 1000 },
    { name: 'Advanced', xp: 3000 },
    { name: 'Expert', xp: 6000 },
    { name: 'Master', xp: 10000 }
  ];
  
  // Inspirational quotes
  export const quotes = [
    '"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Continuous improvement is better than delayed perfection." - Mark Twain',
    '"The journey of a thousand miles begins with a single step." - Lao Tzu'
  ];