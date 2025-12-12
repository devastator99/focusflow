// src/constants/habits.ts
export const HABIT_STRENGTH_THRESHOLD = 10;

export const DIFFICULTY_LEVELS = {
  easy: { 
    color: "green", 
    gradient: "from-green-500 to-green-300" 
  },
  medium: { 
    color: "gold", 
    gradient: "from-yellow-500 to-yellow-300" 
  },
  hard: { 
    color: "red", 
    gradient: "from-red-500 to-pink-400" 
  }
} as const;

export const DEFAULT_HABIT_VALUES = {
  counter: 0,
  positive: true,
  negative: false
} as const;