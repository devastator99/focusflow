export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Habit {
  _id?: string;
  title: string;
  notes?: string;
  positive: boolean;
  negative: boolean;
  difficulty: Difficulty;
  counter: number;
  datesCompleted?: string[];
  streak?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type HabitInput = Omit<Habit, '_id' | 'id' | 'createdAt' | 'updatedAt'>;