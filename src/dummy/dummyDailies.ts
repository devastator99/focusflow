import type { Daily } from "../types/Daily";

const dummyDailies: Daily[] = [
  {
    _id: "1",
    title: "Wake up early",
    notes: "Before 8AM",
    difficulty: "medium",
    completedToday: false,
    streak: 4,
    days: { mon: true, tue: true, wed: true, thu: true, fri: false, sat: false, sun: false },
  },
  {
    _id: "2",
    title: "Meditation",
    difficulty: "easy",
    completedToday: true,
    streak: 10,
    notes: "",
    days: { mon: true, tue: false, wed: true, thu: false, fri: true, sat: false, sun: true },
  }
];

export default dummyDailies;