// src/types/ranking.ts
export interface Rank {
    name: string;
    minXP: number;
    color: string;
    shadowColor: string;
    icon?: string;
  }
  
  export interface CompletionColors {
    bg: string;
    shadow: string;
  }
  
  export const RANKS: Record<string, Rank[]> = {
    BRONZE: [
      { name: 'Bronze I', minXP: 0, color: '#CD7F32', shadowColor: '#DFA07A' },
      { name: 'Bronze II', minXP: 100, color: '#CD7F32', shadowColor: '#DFA07A' },
      { name: 'Bronze III', minXP: 200, color: '#CD7F32', shadowColor: '#DFA07A' },
      { name: 'Bronze IV', minXP: 300, color: '#CD7F32', shadowColor: '#DFA07A' },
      { name: 'Bronze V', minXP: 400, color: '#CD7F32', shadowColor: '#DFA07A' },
    ],
    SILVER: [
      { name: 'Silver I', minXP: 500, color: '#C0C0C0', shadowColor: '#E8E8E8' },
      { name: 'Silver II', minXP: 600, color: '#C0C0C0', shadowColor: '#E8E8E8' },
      { name: 'Silver III', minXP: 700, color: '#C0C0C0', shadowColor: '#E8E8E8' },
      { name: 'Silver IV', minXP: 800, color: '#C0C0C0', shadowColor: '#E8E8E8' },
      { name: 'Silver V', minXP: 900, color: '#C0C0C0', shadowColor: '#E8E8E8' },
    ],
    GOLD: [
      { name: 'Gold I', minXP: 1000, color: '#FFD700', shadowColor: '#FFE766' },
      { name: 'Gold II', minXP: 1200, color: '#FFD700', shadowColor: '#FFE766' },
      { name: 'Gold III', minXP: 1400, color: '#FFD700', shadowColor: '#FFE766' },
      { name: 'Gold IV', minXP: 1600, color: '#FFD700', shadowColor: '#FFE766' },
      { name: 'Gold V', minXP: 1800, color: '#FFD700', shadowColor: '#FFE766' },
    ],
    PLATINUM: [
      { name: 'Platinum I', minXP: 2000, color: '#E5E4E2', shadowColor: '#F0F0F0' },
      { name: 'Platinum II', minXP: 2300, color: '#E5E4E2', shadowColor: '#F0F0F0' },
      { name: 'Platinum III', minXP: 2600, color: '#E5E4E2', shadowColor: '#F0F0F0' },
      { name: 'Platinum IV', minXP: 2900, color: '#E5E4E2', shadowColor: '#F0F0F0' },
      { name: 'Platinum V', minXP: 3200, color: '#E5E4E2', shadowColor: '#F0F0F0' },
    ],
    DIAMOND: [
      { name: 'Diamond I', minXP: 3500, color: '#B9F2FF', shadowColor: '#D6F7FF' },
      { name: 'Diamond II', minXP: 4000, color: '#B9F2FF', shadowColor: '#D6F7FF' },
      { name: 'Diamond III', minXP: 4500, color: '#B9F2FF', shadowColor: '#D6F7FF' },
      { name: 'Diamond IV', minXP: 5000, color: '#B9F2FF', shadowColor: '#D6F7FF' },
      { name: 'Diamond V', minXP: 5500, color: '#B9F2FF', shadowColor: '#D6F7FF' },
    ],
    MASTER: [
      { name: 'Master', minXP: 6000, color: '#FF4444', shadowColor: '#FF7777' },
    ],
    GRAND_WIZARD: [
      { name: 'Grand Wizard of Goal', minXP: 7000, color: '#FF00FF', shadowColor: '#FF66FF' },
    ]
  };
  
  export const getCompletionColors = (count: number): CompletionColors => {
    switch (count) {
      case 0:
        return { bg: '#1f2937', shadow: '#374151' }; // Dark gray
      case 1:
        return { bg: '#065f46', shadow: '#047857' }; // Green
      case 2:
        return { bg: '#1e40af', shadow: '#1d4ed8' }; // Blue
      case 3:
        return { bg: '#5b21b6', shadow: '#7c3aed' }; // Purple
      default:
        return { bg: '#b45309', shadow: '#d97706' }; // Gold
    }
  };
  
  export const getRankForXP = (xp: number): Rank => {
    const allRanks = Object.values(RANKS).flat();
    for (let i = allRanks.length - 1; i >= 0; i--) {
      if (xp >= allRanks[i].minXP) {
        return allRanks[i];
      }
    }
    return allRanks[0];
  };
  
  export const getNextRank = (currentRank: Rank): Rank | null => {
    const allRanks = Object.values(RANKS).flat();
    const currentIndex = allRanks.findIndex(rank => rank.name === currentRank.name);
    if (currentIndex === -1 || currentIndex === allRanks.length - 1) return null;
    return allRanks[currentIndex + 1];
  };
  
  export const getAverageRank = (categoryXPs: Record<string, number>): Rank => {
    const avgXP = Object.values(categoryXPs).reduce((sum, xp) => sum + xp, 0) / 
      Math.max(Object.keys(categoryXPs).length, 1);
    return getRankForXP(avgXP);
  };