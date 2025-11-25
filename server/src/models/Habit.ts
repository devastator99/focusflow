import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Title is required'] 
    },
    notes: { 
      type: String, 
      default: '' 
    },
    positive: { 
      type: Boolean, 
      required: true,
      default: false 
    },
    negative: { 
      type: Boolean, 
      required: true,
      default: false 
    },
    difficulty: { 
      type: String, 
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
      required: true
    },
    counter: { 
      type: Number, 
      default: 0,
      min: 0
    }
  },
  { 
    timestamps: true 
  }
);

export interface IHabit extends mongoose.Document {
  id: string;
  title: string;
  notes?: string;
  positive: boolean;
  negative: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  counter: number;
  createdAt: Date;
  updatedAt: Date;
}

const Habit = mongoose.model<IHabit>('Habit', habitSchema);
export default Habit;