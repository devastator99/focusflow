import axios from "axios";
import type { Habit } from "../types/Habit";

const API = "http://localhost:5000/habits";

export const getHabits = () => axios.get(API);
export const addHabit = (habit: Habit) => axios.post(API, habit);
export const updateHabit = (id: string, data: Partial<Habit>) => axios.patch(`${API}/${id}`, data);
export const deleteHabit = (id: string) => axios.delete(`${API}/${id}`);
