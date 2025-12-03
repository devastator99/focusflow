import express from "express";
import Habit from "../models/Habit.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// GET all habits
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, difficulty, positive } = req.query;
    
    // Build filter
    const filter: any = {};
    if (difficulty) filter.difficulty = difficulty;
    if (positive !== undefined) filter.positive = positive === 'true';
    
    const habits = await Habit.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });
      
    const total = await Habit.countDocuments(filter);
    
    res.json({
      success: true,
      data: habits,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching habits:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habits'
    });
  }
});

// GET single habit
router.get("/:id", 
  param('id').isMongoId().withMessage('Invalid habit ID'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      
      if (!habit) {
        return res.status(404).json({
          success: false,
          message: 'Habit not found'
        });
      }
      
      res.json({
        success: true,
        data: habit
      });
    } catch (error) {
      console.error('Error fetching habit:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch habit'
      });
    }
  }
);

// POST create habit
router.post("/",
  [
    body('title')
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters')
      .trim(),
    body('notes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Notes must be less than 500 characters')
      .trim(),
    body('difficulty')
      .isIn(['easy', 'medium', 'hard'])
      .withMessage('Difficulty must be easy, medium, or hard'),
    body('positive')
      .isBoolean()
      .withMessage('Positive must be a boolean'),
    body('negative')
      .isBoolean()
      .withMessage('Negative must be a boolean'),
    body('counter')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Counter must be a non-negative integer')
  ],
  handleValidationErrors,
  async (req: any, res: any) => {
    try {
      const habit = await Habit.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Habit created successfully',
        data: habit
      });
    } catch (error) {
      console.error('Error creating habit:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create habit'
      });
    }
  }
);

// PATCH update habit
router.patch("/:id",
  [
    param('id').isMongoId().withMessage('Invalid habit ID'),
    body('title')
      .optional()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters')
      .trim(),
    body('notes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Notes must be less than 500 characters')
      .trim(),
    body('difficulty')
      .optional()
      .isIn(['easy', 'medium', 'hard'])
      .withMessage('Difficulty must be easy, medium, or hard'),
    body('positive')
      .optional()
      .isBoolean()
      .withMessage('Positive must be a boolean'),
    body('negative')
      .optional()
      .isBoolean()
      .withMessage('Negative must be a boolean'),
    body('counter')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Counter must be a non-negative integer')
  ],
  handleValidationErrors,
  async (req: any, res: any) => {
    try {
      const habit = await Habit.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!habit) {
        return res.status(404).json({
          success: false,
          message: 'Habit not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Habit updated successfully',
        data: habit
      });
    } catch (error) {
      console.error('Error updating habit:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update habit'
      });
    }
  }
);

// DELETE habit
router.delete("/:id",
  param('id').isMongoId().withMessage('Invalid habit ID'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const habit = await Habit.findByIdAndDelete(req.params.id);
      
      if (!habit) {
        return res.status(404).json({
          success: false,
          message: 'Habit not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Habit deleted successfully',
        data: habit
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete habit'
      });
    }
  }
);

// GET habit statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const stats = await Habit.aggregate([
      {
        $group: {
          _id: null,
          totalHabits: { $sum: 1 },
          positiveHabits: { $sum: { $cond: ['$positive', 1, 0] } },
          negativeHabits: { $sum: { $cond: ['$negative', 1, 0] } },
          easyHabits: { $sum: { $cond: [{ $eq: ['$difficulty', 'easy'] }, 1, 0] } },
          mediumHabits: { $sum: { $cond: [{ $eq: ['$difficulty', 'medium'] }, 1, 0] } },
          hardHabits: { $sum: { $cond: [{ $eq: ['$difficulty', 'hard'] }, 1, 0] } },
          avgCounter: { $avg: '$counter' },
          totalCounter: { $sum: '$counter' }
        }
      }
    ]);
    
    const difficultyStats = await Habit.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 },
          avgCounter: { $avg: '$counter' }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        summary: stats[0] || {
          totalHabits: 0,
          positiveHabits: 0,
          negativeHabits: 0,
          easyHabits: 0,
          mediumHabits: 0,
          hardHabits: 0,
          avgCounter: 0,
          totalCounter: 0
        },
        byDifficulty: difficultyStats
      }
    });
  } catch (error) {
    console.error('Error fetching habit stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habit statistics'
    });
  }
});

export default router;
