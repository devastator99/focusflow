export interface Daily {
  _id: string;
  title: string;
  notes?: string;
  difficulty: "easy" | "medium" | "hard";
  completedToday: boolean;
  days: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
  };
  streak: number;
}
