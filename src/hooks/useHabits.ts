// src/hooks/useHabits.ts
import { useState, useCallback } from 'react';
import type { Habit } from '../types/Habit';
import { HABIT_STRENGTH_THRESHOLD, DEFAULT_HABIT_VALUES } from '../constants/habits';

type HabitBase = Omit<Habit, '_id' | 'id' | 'createdAt' | 'updatedAt'>;

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addHabit = useCallback(async (habitData: Omit<HabitBase, 'counter'>) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const newHabit = {
        ...habitData,
        ...DEFAULT_HABIT_VALUES,
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setHabits(prev => [...prev, newHabit]);
      return newHabit;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add habit'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setHabits(prev => 
        prev.map(habit => 
          habit._id === id 
            ? { ...habit, ...updates, updatedAt: new Date().toISOString() }
            : habit
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update habit'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      setHabits(prev => prev.filter(habit => habit._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete habit'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getHabitStrength = (counter: number) => {
    return counter > HABIT_STRENGTH_THRESHOLD ? 'strong' : 'weak';
  };

  return {
    habits,
    loading,
    error,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitStrength,
  };
};