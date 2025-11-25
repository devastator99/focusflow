export interface Habit {
  _id?: string;
  title: string;
  notes?: string;
  positive: boolean;
  negative: boolean;
  difficulty: string;
  counter: number;
  datesCompleted?: string[];
  streak?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type HabitInput = Omit<Habit, '_id' | 'id' | 'createdAt' | 'updatedAt'>;